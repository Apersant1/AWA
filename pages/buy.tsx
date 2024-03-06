import { useContract, useNFTs } from "@thirdweb-dev/react"; // Import hooks for working with smart contracts and NFTs from thirdweb
import React from "react"; // Import React library
import Container from "../components/Container/Container"; // Import Container component
import NFTGrid from "../components/NFT/NFTGrid"; // Import NFTGrid component
import { NFT_COLLECTION_ADDRESS } from "../const/contractAddresses"; // Import the address of the NFT collection contract

// Define the main functional component for the Buy page
export default function Buy() {
  // Load all of the NFTs from the NFT Collection
  const { contract } = useContract(NFT_COLLECTION_ADDRESS); // Retrieve the smart contract object using the useContract hook
  const { data, isLoading } = useNFTs(contract); // Fetch NFT data using the useNFTs hook

  return (
    <Container maxWidth="lg"> {/* Render the Container component with a maximum width of "lg" */}
      <h1>Buy NFTs</h1> {/* Display the title "Buy NFTs" */}
      <p>Browse which NFTs are available from the collection.</p> {/* Provide a brief description */}
      <NFTGrid
        data={data} {/* Pass the fetched NFT data to the NFTGrid component */}
        isLoading={isLoading} {/* Inform the NFTGrid component if the data is still loading */}
        emptyText={
          "Looks like there are no NFTs in this collection. Did you import your contract on the thirdweb dashboard? <https://thirdweb.com/dashboard>"
        } {/* Display this message if there are no NFTs in the collection */}
      />
    </Container>
  );
}
