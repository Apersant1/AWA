import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.hero}>
          <div className={styles.heroBackground}>
            <div className={styles.heroBackgroundInner}>
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
          <div className={styles.heroAssetFrame}>
            <Image
              src="/hero-asset.png"
              width={860}
              height={540}
              alt="Hero asset, NFT marketplace"
              quality={100}
              className={styles.heroAsset}
            />
          </div>
          <div
            className={styles.heroBodyContainer}
            onMouse={(e) => {
              if (e.type === "mouseenter") {
                setIsHovered(true);
              } else {
                setIsHovered(false);
              }
            }}
          >
            <div className={styles.heroBody}>
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

export default Home;
