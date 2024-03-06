import { ThirdwebNftMedia, useContract, useValidDirectListings, useValidEnglishAuctions } from "@thirdweb-dev/react";
import { NFT } from "@thirdweb-dev/sdk";
import React, { useState } from "react";
import Skeleton from "../Skeleton/Skeleton";
import styles from "./NFT.module.css";

// Define the type for Props
type Props = {
  nft: NFT; // The NFT object to be displayed
};

// Define the NFTComponent functional component
const NFTComponent: React.FC<Props> = ({ nft }) => {
  // Initialize the state variables
  const [loading, setLoading] = useState(true); // Indicates if the NFT data is still loading
  const [error, setError] = useState<string | null>(null); // Stores any error message encountered during data fetching

  // Fetch the marketplace contract using the useContract hook
  const { contract: marketplace, isLoading: loadingContract } = useContract(
    MARKETPLACE_ADDRESS, // The address of the marketplace contract
    "marketplace-v3", // The marketplace contract's ABI (Application Binary Interface)
    error => setError(error) // Callback function to set the error message
  );

  // Fetch the direct listings for the NFT using the useValidDirectListings hook
  const { data: directListing, isLoading: loadingDirect } = useValidDirectListings(
    marketplace, // The marketplace contract instance
    {
      tokenContract: NFT_COLLECTION_ADDRESS, // The address of the NFT collection contract
      tokenId: nft.metadata.id, // The token ID of the NFT
    },
    error => setError(error) // Callback function to set the error message
  );

  // Fetch the English auctions for the NFT using the useValidEnglishAuctions hook
  const { data: auctionListing, isLoading: loadingAuction } = useValidEnglishAuctions(
    marketplace, // The marketplace contract instance
    {
      tokenContract: NFT_COLLECTION_ADDRESS, // The address of the NFT collection contract
      tokenId: nft.metadata.id, // The token ID of the NFT
    },
    error => setError(error) // Callback function to set the error message
  );

  // Conditionally render a Skeleton component or error message based on the loading and error states
  if (loading || loadingContract || loadingDirect || loadingAuction) {
    return <Skeleton width="100%" height="100%" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render the NFT component with the NFT data
  return (
    <div>
      <ThirdwebNftMedia metadata={nft.metadata} className={styles.nftImage} />

      <p className={styles.nftTokenId}>Token ID #{nft.metadata.id}</p>
      <p className={styles.nftName}>{nft.metadata.name}</p>

      <div className={styles.priceContainer}>
        {/* Render the direct listing or auction listing price based on their availability */}
        {directListing && directListing[0] ? (
          <div className={styles.nftPriceContainer} key={directListing[0].id}>
            <div>
              <p className={styles.nftPriceLabel}>Price</p>
              <p className={styles.nftPriceValue}>
                {`${directListing[0]?.currencyValuePerToken.displayValue} ${directListing[0]?.currencyValuePerToken.symbol}`}
              </p>
            </div>
          </div>
        ) : auctionListing && auctionListing[0] ? (
          <div className={styles.nftPriceContainer} key={auctionListing[0].id}>
            <div>
              <p className={styles.nftPriceLabel}>Minimum Bid</p>
              <p className={styles.nftPriceValue}>
                {`${auctionListing[0]?.minimumBidCurrencyValue.displayValue} ${auctionListing[0]?.minimumBidCurrencyValue.symbol}`}
              </p>
            </div>
          </div>
        ) : (
          <div className={styles.nftPriceContainer}>
            <div>
              <p className={styles.nftPriceLabel}>Price</p>
              <p className={styles.nftPriceValue}>Not for sale</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default
