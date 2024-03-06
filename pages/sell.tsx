import React, { useState } from "react";
import Container from "../components/Container/Container"; // Importing Container component
import NFTGrid from "../components/NFT/NFTGrid"; // Importing NFTGrid component
import { NFT as NFTType } from "@thirdweb-dev/sdk"; // Importing NFTType from thirdweb-dev SDK
import { useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react"; // Importing hooks from thirdweb-dev React
import SaleInfo from "../components/SaleInfo/SaleInfo"; // Importing SaleInfo component
import { NFT_COLLECTION_ADDRESS } from "../const/contractAddresses"; // Importing NFT_COLLECTION_ADDRESS
import tokenPageStyles from "../styles/Token.module.css"; // Importing tokenPageStyles
import ThirdwebNftMedia from "@thirdweb-dev/react/dist/components/nft/ThirdwebNftMedia"; // Importing ThirdwebNftMedia component

// Defining SalePageProps interface
interface SalePageProps {}

// Defining Sell component
const Sell: React.FC<SalePageProps> = () => {
  // Load all of the NFTs from the NFT Collection
  const contract = useContract(NFT_COLLECTION_ADDRESS); // Getting the contract instance using useContract hook
  const address = useAddress(); // Getting the user's address using useAddress hook
  const { data, isLoading } = useOwnedNFTs(contract, address); // Getting the owned NFTs using useOwnedNFTs hook

  // Setting up state for selected NFT
  const [selectedNft, setSelectedNft] = useState<NFTType | undefined>();

  // Handling NFT click and setting the selected NFT
  const overrideOnclickBehavior = (nft: NFTType) => {
    setSelectedNft(nft);
  };

  return (
    <Container maxWidth="lg"> {/* Rendering Container component with maxWidth prop set to "lg" */}
      <h1>Sell NFTs</h1> {/* Rendering h1 heading */}
      {!selectedNft ? ( {/* Checking if no NFT is selected */}
        <> {/* Rendering fragment */}
          <p>Select which NFT you&rsquo;d like to sell below.</p> {/* Rendering paragraph */}
          <NFTGrid {...{ // Rendering NFTGrid component with the following props
            data, // Passing data prop
            isLoading, // Passing isLoading prop
            overrideOnclickBehavior, // Passing overrideOnclickBehavior prop
            emptyText: "Looks like you don't own any NFTs in this collection. Head to the buy page to buy some!", // Passing emptyText prop
            key: (nft: NFTType) => nft.metadata.id, // Passing key prop
          }}>
            {(nft: NFTType) => ( // Mapping through data and rendering ThirdwebNftMedia component for each NFT
              <ThirdwebNftMedia
                metadata={nft.metadata} // Passing metadata prop
                className={tokenPageStyles.image} // Passing className prop
                alt={nft.metadata.name} // Passing alt prop
                height={200} // Passing height prop
                width={200} // Passing width prop
              />
            )}
          </NFTGrid>
        </>
      ) : (
        <div className={tokenPageStyles.container} style={{ marginTop: 0 }}> {/* Rendering div with class name and style prop if an NFT is selected */}
          <div className={tokenPageStyles.metadataContainer}> {/* Rendering div with class name */}
            <div className={tokenPageStyles.imageContainer}> {/* Rendering div with class name */}
              <ThirdwebNftMedia {...{ // Rendering ThirdwebNftMedia component with the following props
                metadata={selectedNft.metadata} // Passing metadata prop
                className={tokenPageStyles.image} // Passing className prop
                alt={selectedNft.metadata.name} // Passing alt prop
                height={200} // Passing height prop
                width={200} // Passing width prop
              }} />
              <button
                onClick={() => {
                  setSelectedNft(undefined);
                }}
                className={tokenPageStyles.crossButton} // Passing className prop
                aria-label="Close" // Setting aria-label for accessibility
              >
                X
              </button>
            </div>
          </div>

          <div className={tokenPageStyles.listingContainer}> {/* Rendering div with class name */}
            <p>You&rsquo;re about to list the following item for sale.</p> {/* Rendering paragraph */}
            <h1 className={tokenPageStyles.title}>
              {selectedNft?.metadata.name} {/* Rendering h1 heading with selected NFT's name */}
            </h1>
            <p className={tokenPageStyles.collectionName}>

