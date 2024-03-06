import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Home.module.css";

// Define the Home component as a NextPage
const Home: NextPage = () => {
  // Initialize state for hover effect
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={styles.container}>
      {/* Container for the main content */}
      <div className={styles.content}>
        {/* Hero section */}
        <div className={styles.hero}>
          {/* Background image with a gradient overlay */}
          <div className={styles.heroBackground}>
            <div className={styles.heroBackgroundInner}>
              {/* Gradient image */}
              <Image
                src="/hero-gradient.png"
                width={1390}
                height={1390}
                alt="Background gradient from red to blue"
                quality={100}
                className={styles.gradient}
              />
            </div>
          </div>
          {/* Frame for the hero asset image */}
          <div className={styles.heroAssetFrame}>
            {/* Hero asset image, in this case, an NFT marketplace */}
            <Image
              src="/hero-asset.png"
              width={860}
              height={540}
              alt="Hero asset, NFT marketplace"
              quality={100}
              className={styles.heroAsset}
            />
          </div>
          {/* Container for the hero body content */}
          <div
            className={styles.heroBodyContainer}
            onMouse={(e) => {
              // Hover effect handling
              if (e.type === "mouseenter") {
                setIsHovered(true);
              } else {
                setIsHovered(false);
              }
            }}
          >
            <div className={styles.heroBody}>
              {/* Title of the hero section */}
              <h1 className={styles.heroTitle}>
                <span
                  className={`${styles.heroTitleGradient} ${
                    isHovered ? styles.heroTitleHovered : ""
                  }`}
                >
                  Manipulate NFT
                </span>
                <br />
                faster than ever.
              </h1>
              {/* Subtitle with links to the creators' GitHub profiles */}
              <p className={styles.heroSubtitle}>
                <Link
                  className={styles.link}
                  href="https://github.com/Kyo473"
                  target="_blank"
                >
                  Created at <span>@Kyo473</span>
                </Link>
                <Link
                  className={styles.link}
                  href="https://github.com/Apersant1"
                  target="_blank"
                >
                  <span>@Captain_jasey</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the Home component
export default Home;
