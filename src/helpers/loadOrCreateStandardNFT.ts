import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  StandardNFT,
} from '../../generated/schema';

import {
  ERC721 as NftContract,
} from '../../generated/Rarible1/ERC721';

import { standardNftId } from './idTemplates';


export function loadOrCreateStandardNFT(
  tokenAddress: Address,
  tokenId: BigInt
): StandardNFT {
  const id = standardNftId(tokenAddress.toHex(), tokenId.toString());
  let _nft = StandardNFT.load(id);

  if (!_nft) {
    _nft = new StandardNFT(id);
    _nft.tokenId = tokenId;
    _nft.tokenAddress = tokenAddress;

    const boundNft = NftContract.bind(tokenAddress);
    const ownerResult = boundNft.try_ownerOf(tokenId);
    if (ownerResult.reverted) {
      _nft.owner = new Address(0);
    } else {
      _nft.owner = ownerResult.value;
      _nft.creator = ownerResult.value;
    }
    const metadataUriResult = boundNft.try_tokenURI(tokenId);
    if (metadataUriResult.reverted) {
      _nft.metadataUri = null;
    } else {
      _nft.metadataUri = metadataUriResult.value;
    }
    _nft.save();
  }

  return _nft as StandardNFT;
}
