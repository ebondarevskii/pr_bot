import { GetUserBalancesReturn } from "@/types/api";
import { TRequestParams } from "@/types/axios";
import { TonToPolygonBridgeTx } from "@/types/bridge";
import axios, { AxiosResponse } from "axios";

const apiUrl =
  import.meta.env.VITE_API_URL || "https://dev-backend.predicton.live";

export const sendRequest = async <T, D = object>({
  url,
  method = "GET",
  data,
  params,
  headers,
  timeout,
}: TRequestParams<D>): Promise<T> => {
  const { data: responseData }: AxiosResponse<T> = await axios({
    method,
    url,
    headers: headers
      ? headers
      : {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
    data,
    params,
    timeout,
  });

  return responseData;
};

export type GetTonToPolygonBridgeTxParams = {
  tonAddressFrom: string;
  polygonAddressTo: string;
  amountIn: number;
};

export const getTonToPolygonBridgeTx = async ({
  tonAddressFrom,
  polygonAddressTo,
  amountIn,
}: GetTonToPolygonBridgeTxParams): Promise<TonToPolygonBridgeTx> => {
  return sendRequest<TonToPolygonBridgeTx>({
    url: `${apiUrl}/symbiosis/ton-to-polygon`,
    method: "POST",
    data: {
      tokenAmountIn: {
        address: "0x9328Eb759596C38a25f59028B146Fecdc3621Dfe",
        amount: amountIn.toString(),
        chainId: 85918,
        decimals: 6,
        symbol: "USDT",
        attributes: {
          ton: "EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs",
        },
      },
      tokenOut: {
        chainId: 137,
        address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
        symbol: "USDT",
        decimals: 6,
      },
      from: tonAddressFrom,
      to: polygonAddressTo,
      slippage: 200,
    },
  });
};

export type GetUserBalancesParams = {
  tonAddress: string;
  polygonAddress: string;
};

export const getUserBalances = async ({
  tonAddress,
  polygonAddress,
}: GetUserBalancesParams): Promise<GetUserBalancesReturn> => {
  return sendRequest<GetUserBalancesReturn>({
    url: `${apiUrl}/balances?tonAddress=${tonAddress}&polygonAddress=${polygonAddress}`,
  });
};

// export const getMarketPridictions = async ({
//   tonAddress,
//   polygonAddress,
// }: GetUserBalancesParams): Promise<GetUserBalancesReturn> => {
//   return sendRequest<GetUserBalancesReturn>({
//     url: `${apiUrl}/balances?tonAddress=${tonAddress}&polygonAddress=${polygonAddress}`,
//   });
// };
