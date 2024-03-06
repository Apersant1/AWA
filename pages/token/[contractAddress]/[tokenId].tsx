import {
  MediaRenderer, // Importing MediaRenderer component
  ThirdwebNftMedia, // Importing ThirdwebNftMedia component
  useContract, // Importing useContract hook
  useContractEvents, // Importing useContractEvents hook
  useValidDirectListings, // Importing useValidDirectListings hook
  useValidEnglishAuctions, // Importing useValidEnglishAuctions hook
  Web3Button, // Importing Web3Button component
} from "@thirdweb-dev/react";
import React, { useState } from "react"; // Importing React and useState hook
import Container from "../../../components/Container/Container"; // Importing Container component
import { GetStaticProps, GetStaticPaths } from "next"; // Importing Next.js's GetStaticProps and GetStaticPaths
import { NFT, ThirdwebSDK } from "@thirdweb-dev/sdk"; // Importing NFT and ThirdwebSDK from thirdweb-dev
import { ETHERSCAN_URL, MARKETPLACE_ADDRESS, NETWORK, NFT_COLLECTION_ADDRESS } from "../../../const/contractAddresses"; // Importing contract addresses
import styles from "../../../styles/Token.module.css"; // Importing styles from Token.module.css
import Link from "next/link"; // Importing Link component from Next.js
import randomColor from "../../../util/randomColor"; // Importing randomColor utility function
import Skeleton from "../../../components/Skeleton/Skeleton"; // Importing Skeleton component
import toast, { Toaster } from "react-hot-toast"; // Importing toast and Toaster components from react-hot-toast
import toastStyle from "../../../util/toastConfig"; // Importing toastConfig utility function

type Props = { // Defining Props type
  nft: NFT;
  contractMetadata?: any;
};

const TokenPage = ({ nft, contractMetadata }: Props) => { // Defining TokenPage component with destructured Props
  const [bidValue, setBidValue] = useState<string>(""); // Declaring and initializing bidValue state using useState hook

  // Connect to marketplace smart contract
  const { contract: marketplace, isLoading: loadingContract } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );

  // Connect to NFT Collection smart contract
  const { contract: nftCollection } = useContract(NFT_COLLECTION_ADDRESS);

  // Load direct listings for the NFT
  const { data: directListing, isLoading: loadingDirect } = useValidDirectListings(
    marketplace,
    {
      tokenContract: NFT_COLLECTION_ADDRESS,
      tokenId: nft.metadata.id,
    }
  );

  // Load auction listings for the NFT
  const { data: auctionListing, isLoading: loadingAuction } =
    useValidEnglishAuctions(marketplace, {
      tokenContract: NFT_COLLECTION_ADDRESS,
      tokenId: nft.metadata.id,
    });

  // Load historical transfer events
  const { data: transferEvents, isLoading: loadingTransferEvents } =
    useContractEvents(nftCollection, "Transfer", {
      queryFilter: {
        filters: {
          tokenId: nft.metadata.id,
        },
        order: "desc",
      },
    });

  const isForSale = directListing?.[0] || auctionListing?.[0]; // Determine if the NFT is for sale

  const buyListing = async () => { // Function to buy the NFT from direct listing or auction
    if (auctionListing?.[0]) {
      return await marketplace?.englishAuctions.buyoutAuction(
        auctionListing[0].id
      );
    }

    if (directListing?.[0]) {
      return await marketplace?.directListings.buyFromListing(
        directListing[0].id,
        1
      );
    }

    throw new Error("No valid listing found for this NFT");
  };

  const createBidOrOffer = async () => { // Function to create a bid or offer for the NFT
    if (!bidValue) {
      toast(`Please enter a bid value`, {
        icon: "❌",
        style: toastStyle,
        position: "bottom-center",
      });
      return;
    }

    if (auctionListing?.[0]) {
      return await marketplace?.englishAuctions.makeBid(
        auctionListing[0].id,
        bidValue
      );
    }

    if (directListing?.[0]) {
      return await marketplace?.offers.makeOffer({
        assetContractAddress: NFT_COLLECTION_ADDRESS,
        tokenId: nft.metadata.id,
        totalPrice: bidValue,
      });
    }

    throw new Error("No valid listing found for this NFT");
  };

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Container maxWidth="lg">
        <div className={styles.container}>
          <div className={styles.metadataContainer}>
            <ThirdwebNftMedia metadata={nft.metadata} className={styles.image} />

            <div className={styles.descriptionContainer}>
              <h3 className={styles.descriptionTitle}>Description</h3>
              <p className={styles.description}>
                {nft.metadata.description}
              </p>

              <h3 className={styles.descriptionTitle}>Traits</h3>

              <div className={styles.traitsContainer}>
                {Object.entries(nft?.metadata?.attributes || {}).map(
                  ([key, value]) => (
                    <div className={styles.traitContainer} key={key}>
                      <p className={styles.traitName}>{key}</p>
                      <p className={styles.traitValue}>
                        {value?.toString() || ""}
                      </p>
                    </div>
                  )
                )}
              </div>

              <h3 className={styles.descriptionTitle}>History</h3>

