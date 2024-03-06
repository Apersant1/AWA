import React, { useState } from "react";
import Container from "../components/Container/Container";
import NFTGrid from "../components/NFT/NFTGrid";
import { NFT as NFTType } from "@thirdweb-dev/sdk";
import { useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import SaleInfo from "../components/SaleInfo/SaleInfo";
import { NFT_COLLECTION_ADDRESS } from "../const/contractAddresses";
import tokenPageStyles from "../styles/Token.module.css";
import ThirdwebNftMedia from "@thirdweb-dev/react/dist/components/nft/ThirdwebNftMedia";

interface SalePageProps {}

const Sell: React.FC<SalePageProps> = () => {
  // Load all of the NFTs from the NFT Collection
  const contract = useContract(NFT_COLLECTION_ADDRESS);
  const address = useAddress();
  const { data, isLoading } = useOwnedNFTs(contract, address);

  const [selectedNft, setSelectedNft] = useState<NFTType | undefined>();

  return (
    <Container maxWidth="lg">
      <h1>Sell NFTs</h1>
      {!selectedNft ? (
        <>
          <p>Select which NFT you&rsquo;d like to sell below.</p>
          <NFTGrid
            data={data}
            isLoading={isLoading}
            overrideOnclickBehavior={(nft: NFTType) => {
              setSelectedNft(nft);
            }}
            emptyText={
              "Looks like you don't own any NFTs in this collection. Head to the buy page to buy some!"
            }
            key={(nft: NFTType) => nft.metadata.id}
          >
            {(nft: NFTType) => (
              <ThirdwebNftMedia
                metadata={nft.metadata}
                className={tokenPageStyles.image}
                alt={nft.metadata.name}
                height={200}
                width={200}
              />
            )}
          </NFTGrid>
        </>
      ) : (
        <div className={tokenPageStyles.container} style={{ marginTop: 0 }}>
          <div className={tokenPageStyles.metadataContainer}>
            <div className={tokenPageStyles.imageContainer}>
              <ThirdwebNftMedia
                metadata={selectedNft.metadata}
                className={tokenPageStyles.image}
                alt={selectedNft.metadata.name}
                height={200}
                width={200}
              />
              <button
                onClick={() => {
                  setSelectedNft(undefined);
                }}
                className={tokenPageStyles.crossButton}
                aria-label="Close"
              >
                X
              </button>
            </div>
          </div>

          <div className={tokenPageStyles.listingContainer}>
            <p>You&rsquo;re about to list the following item for sale.</p>
            <h1 className={tokenPageStyles.title}>
              {selectedNft?.metadata.name}
            </h1>
            <p className={tokenPageStyles.collectionName}>
              Token ID #{selectedNft?.metadata.id}
            </p>

            <div className={tokenPageStyles.pricingContainer}>
              <SaleInfo nft={selectedNft} />
            </div>
          </div>
        </div>
      )}

