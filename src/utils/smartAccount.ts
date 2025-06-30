import { type User } from '@privy-io/react-auth';

export const getLinkedSmartAccount = (user: User) => {
  if (!user.linkedAccounts) return null;
  
  return user.linkedAccounts.find(
    (account) => 
      account.type === 'wallet' && 
      'walletClientType' in account && 
      account.walletClientType === 'privy_smart_account'
  );
};

export const isSmartAccountLinked = (user: User, smartAccountAddress?: string) => {
  const linkedAccount = getLinkedSmartAccount(user);
  
  if (!linkedAccount) return false;
  
  // If no specific address provided, just check if any smart account is linked
  if (!smartAccountAddress) return true;
  
  // Check if the specific smart account address is linked
  // Use type guard to check if address exists
  if (!('address' in linkedAccount) || !linkedAccount.address) return false;
  
  return linkedAccount.address.toLowerCase() === smartAccountAddress.toLowerCase();
}; 