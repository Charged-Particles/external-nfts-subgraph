

export function standardNftId(tokenAddress: string, tokenId: string): string {
  return tokenAddress + '-' + tokenId;
}

export function nftAttributeId(protonNftId: string, attrIndex: string): string {
  return protonNftId + '-' + attrIndex;
}

export function nftId(contractAddress: string, tokenId: string): string {
  return contractAddress + '-' + tokenId;
}

export function nftTxId(nftId: string, txHash: string, eventType: string): string {
  return nftId + '-' + txHash + '-' + eventType;
}
