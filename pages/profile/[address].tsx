// Import necessary modules and components
import { useContract, useOwnedNFTs, useValidDirectListings, useValidEnglishAuctions } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Container from "../../components/Container/Container";
import ListingWrapper from "../../components/ListingWrapper/ListingWrapper";
import NFTGrid from "../../components/NFT/NFTGrid";
import Skeleton from "../../components/Skeleton/Skeleton";
import styles from "../../styles/Profile.module.css";
import randomColor from "../../util/randomColor";

// Define the ProfilePage component
const ProfilePage = () => {
  // Initialize the router, tab state, and related variables
  const router = useRouter();
  const [tab, setTab] = useState<"nfts" | "listings" | "auctions">("nfts");

  // Initialize the NFT Collection and Marketplace contracts
  const { contract: nftCollection } = useContract(NFT_COLLECTION_ADDRESS);
  const { contract: marketplace } = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");

  // Fetch owned NFTs using the useOwnedNFTs hook
  const { data: ownedNfts, isLoading: loadingOwnedNfts } = useOwnedNFTs(nftCollection, router.query.address as string);

  // Fetch valid direct listings using the useValidDirectListings hook
  const { data: directListings, isLoading: loadingDirects } = useValidDirectListings(marketplace, {
    seller: router.query.address as string,
  });

  // Fetch valid English auctions using the useValidEnglishAuctions hook
  const { data: auctionListings, isLoading: loadingAuctions } = useValidEnglishAuctions(marketplace, {
    seller: router.query.address as string,
  });

  // Generate random colors for the cover image and profile picture
  const randomColors = [randomColor(), randomColor(), randomColor(), randomColor()];

  // Render the component
  return (
    // Wrap the content in the Container component
    <Container maxWidth="lg">
      {/* Render the profile header */}
      <div className={styles.profileHeader}>
        {/* Render the cover image with a gradient background */}
        <div
          className={styles.coverImage}
          style={{
            background: `linear-gradient(90deg, ${randomColors[0]}, ${randomColors[1]})`,
          }}
        />
        {/* Render the profile picture with a gradient background */}
        <div
          className={styles.profilePicture}
          style={{
            background: `linear-gradient(90deg, ${randomColors[2]}, ${randomColors[3]})`,
          }}
        />
        {/* Render the profile name */}
        <h1 className={styles.profileName}>
          {/* Display the address if available, or a loading skeleton */}
          {router.query.address ? (
            router.query.address.toString().substring(0, 4) + "..." + router.query.address.toString().substring(38, 42)
          ) : (
            <Skeleton width="320" />
          )}
        </h1>
      </div>

      {/* Render the tabs */}
      <div className={styles.tabs}>
        {/* Render the NFTs tab */}
        <h3
          className={`${styles.tab} ${tab === "nfts" ? styles.activeTab : ""}`}
          onClick={() => setTab("nfts")}
        >
          NFTs
        </h3>
        {/* Render the Listings tab */}
        <h3
          className={`${styles.tab} ${tab === "listings" ? styles.activeTab : ""}`}
          onClick={() => setTab("listings")}
        >
          Listings
        </h3>
        {/* Render the Auctions tab */}
        <h3
          className={`${styles.tab} ${tab === "auctions" ? styles.activeTab : ""}`}
          onClick={() => setTab("auctions")}
        >
          Auctions
        </h3>
      </div>

      {/* Render the active tab content */}
      <div
        className={`${tab === "nfts" ? styles.activeTabContent : styles.tabContent}`}
      >
        {/* Render the NFTGrid component */}
        <NFTGrid
          data={ownedNfts}
          isLoading={loadingOwnedNfts}
          emptyText="Looks like you don't have any NFTs from this collection. Head to the buy page to buy some!"
        />
      </div>

      {/* Render the active tab content */}
      <div
        className={`${tab === "listings" ? styles.activeTabContent : styles.tabContent}`}
      >
        {/* If direct listings are still loading, display a loading message */}
        {loadingDirects ? (
          <p>Loading...</p>
        ) : (
          // If there are no listings, display a message
          directListings && directListings.length === 0 ? (
            <p>Nothing for sale yet! Head to the sell tab to list an NFT.</p>
          ) : (
            // Otherwise, render the ListingWrapper components for each direct listing
            directListings?.map((listing) => (
              <ListingWrapper listing={listing} key={listing.id} />
            ))
          )
        )}
      </div>

      {/* Render the active tab content */}
      <div
        className={`${tab === "auctions" ? styles.activeTabContent : styles.tabContent}`}
      >
        {/* If auction listings are still loading, display a loading message */}
        {loadingAuctions ? (
          <p>Loading...</p>
        ) : (
          // If there are no auction listings, display a message
          auctionListings && auctionListings.length === 0 ? (
            <p>Nothing
