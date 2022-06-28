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

    const ownerCall = boundNft.try_ownerOf(tokenId);
    if (!ownerCall.reverted) {
      _nft.owner = ownerCall.value;
    }

    // const uriCall = boundNft.try_tokenURI(tokenId);
    // if (!uriCall.reverted) {
    //   _nft.metadataUri = uriCall.value;
    // }

    _nft.save();
  }

  return _nft as StandardNFT;
}
