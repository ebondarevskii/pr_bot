import {
  ApiKeyCreds,
  ClobClient,
  OrderType,
  Side,
} from "@polymarket/clob-client";
import { useEffect, useState } from "react";
import { usePimlicoSmartAccount } from "./usePimlicoSmartAccount";
import { useWallets } from "@privy-io/react-auth";
import { ethers } from "ethers";

const host = "https://clob.polymarket.com";

// const constructSigner = (signer: JsonRpcSigner) => {
//   return {
//     ...signer,
//     _index: 1,
//     _address: signer.address,
//     connectUnchecked: signer.connect,
//     _signTypedData: signer.signTypedData,
//   };
// };

export const useOrder = () => {
  const { wallets } = useWallets();

  const { smartAccount } = usePimlicoSmartAccount();

  const [creds, setCreds] = useState<ApiKeyCreds>();

  const [signer, setSigner] = useState<ethers.JsonRpcSigner>();

  const embeddedWallet = wallets?.[0];

  console.log("creds: ", creds);

  useEffect(() => {
    const getCreds = async () => {
      const provider = await embeddedWallet?.getEthereumProvider();

      // @ts-ignore
      const ethersProvider = new ethers.BrowserProvider(provider);
      const walletSigner = await ethersProvider.getSigner();

      // @ts-ignore
      walletSigner._signTypedData = walletSigner.signTypedData;

      const credsResult = await new ClobClient(
        host,
        137,
        // @ts-ignore
        walletSigner
      ).createOrDeriveApiKey();

      setSigner(walletSigner);

      setCreds(credsResult);
    };

    if (embeddedWallet) {
      getCreds();
    }
  }, [embeddedWallet]);

  const getOrder = async ({
    tokenId,
    price,
    side,
    size,
  }: {
    tokenId: string;
    price: number;
    side: Side;
    size: number;
  }) => {
    if (!signer) {
      return;
    }

    const signatureType = 1;

    const clobClient = new ClobClient(
      host,
      137,
      // @ts-ignore
      signer,
      await creds,
      signatureType,
      smartAccount?.address || ""
    );

    const oneMinute = parseInt(
      ((new Date().getTime() + 60 * 1000 + 10 * 1000) / 1000).toString()
    );

    const resp2 = await clobClient.createAndPostOrder(
      {
        tokenID: tokenId, //Use https://docs.polymarket.com/developers/gamma-markets-api/get-markets to grab a sample token
        price: 0.1,
        side,
        size,
        expiration: oneMinute,
      },
      { tickSize: "0.001", negRisk: false }, //You'll need to adjust these based on the market. Get the tickSize and negRisk T/F from the get-markets above
      //{ tickSize: "0.001",negRisk: true },

      OrderType.GTC
    );
    console.log(resp2);
  };

  return { creds, getOrder };
};
