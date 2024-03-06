import type { AppProps } from "next/app";

// Importing ThirdwebProvider from @thirdweb-dev/react to set up the Thirdweb SDK
import { ThirdwebProvider } from "@thirdweb-dev/react";

// Importing the Navbar component for the navigation menu
import { Navbar } from "../components/Navbar/Navbar";

// Importing NextNProgress for a customizable progress bar
import NextNProgress from "nextjs-progressbar";

// Importing the contract addresses
import { NETWORK } from "../const/contractAddresses";

// Importing global styles
import "../styles/globals.css";

// The main App component that wraps all other components
function MyApp({ Component, pageProps }: AppProps) {
  // Rendering the customizable progress bar
  return (
    <ThirdwebProvider
      // Setting the client ID for the Thirdweb SDK
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID ?? ""}

      // Setting the active chain for the Thirdweb SDK
      activeChain={NETWORK}
    >
      {/* Rendering the progress bar when navigating between pages */}
      <NextNProgress
        // Customizing the color of the progress bar
        color="var(--color-tertiary)"

        // Setting the start position of the progress bar
        startPosition={0.3}

        // Setting the delay before showing the progress bar
        stopDelayMs={200}

        // Setting the height of the progress bar
        height={3}

        // Showing the progress bar on shallow navigations
        showOnShallow={true}
      />

      {/* Rendering the navigation menu above each component */}
      <Navbar />

      {/* Rendering the actual component (page) */}
      {!Component ? (
        <div>Loading...</div>
      ) : (
        <>
          {/* Passing the pageProps to the component */}
          <Component {...pageProps} />
        </>
      )}
    </ThirdwebProvider>
