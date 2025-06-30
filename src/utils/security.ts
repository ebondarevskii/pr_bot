import CryptoJS from 'crypto-js';

export const generateNonce = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const hashData = (data: string, secret: string): string => {
  return CryptoJS.HmacSHA256(data, secret).toString();
};

export const validateTelegramHash = (initData: string, botToken: string): boolean => {
  try {
    const urlParams = new URLSearchParams(initData);
    const hash = urlParams.get('hash');
    
    if (!hash) return false;
    
    urlParams.delete('hash');
    const dataCheckString = Array.from(urlParams.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');
    
    const secretKey = CryptoJS.HmacSHA256(botToken, 'WebAppData');
    const calculatedHash = CryptoJS.HmacSHA256(dataCheckString, secretKey).toString();
    
    return calculatedHash === hash;
  } catch (error) {
    console.error('Error validating Telegram hash:', error);
    return false;
  }
};

export const sanitizeInput = (input: string): string => {
  return input.replace(/[<>]/g, '');
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

export const encryptData = (data: string, key: string): string => {
  return CryptoJS.AES.encrypt(data, key).toString();
};

export const decryptData = (encryptedData: string, key: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, key);
  return bytes.toString(CryptoJS.enc.Utf8);
};

// Generate ERC-20 transfer data
export const generateERC20TransferData = (to: string, amount: bigint): string => {
  // ERC-20 transfer function signature: transfer(address,uint256)
  const functionSignature = '0xa9059cbb';
  
  // Pad the recipient address to 32 bytes (remove 0x prefix, pad with zeros)
  const paddedTo = to.slice(2).padStart(64, '0');
  
  // Convert amount to hex and pad to 32 bytes
  const paddedAmount = amount.toString(16).padStart(64, '0');
  
  return functionSignature + paddedTo + paddedAmount;
};