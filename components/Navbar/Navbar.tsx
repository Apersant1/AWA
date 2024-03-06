import { ConnectWallet, useAddress } from "@thirdweb-dev/react"
import Image from "next/image"
import Link from "next/link"
import styles from "./Navbar.module.css"

export function Navbar() {
  const address = useAddress()
  if (!address && typeof address === "string") {
    return <div>Error: failed to retrieve address</div>
  }

  return (
    <div className={styles.navContainer}>
      <nav className={styles.nav}>
        <div className={styles.navLeft}>
          <Link href="/" className={`${styles.homeLink} ${styles.navLeft}`} key="home-link">
            AWA
            <Image
              src="/logo.png"
              width={48}
              height={48}
              alt="NFT marketplace sample logo"
              title="Home"
            />
          </Link>

          <div className={styles.navMiddle}>
            <Link href="/buy" className={styles.link} key="buy-link">
              Buy
            </Link>
            <Link href="/sell" className={styles.link} key="sell-link">
              Sell
            </Link>
          </div>
        </div>

        <div className={styles.navRight}>
          <div className={styles.navConnect}>
            <ConnectWallet theme="dark" btnTitle="Connect Wallet" role="button" title="Connect Wallet" aria-label="Connect Wallet" />
          </div>
          {address && (
            <Link href={`/profile/${address}`} className={styles.link} key="profile-link">
              <Image
                className={styles.profileImage}
                src="/user-icon.png"
                width={42}
                height={42}
                alt="Profile"
                title="Profile"
                aria-label="Profile"
              />
            </Link>
          )}
        </div>
      </nav>
    </div
