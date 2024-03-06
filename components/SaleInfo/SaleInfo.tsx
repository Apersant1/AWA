import { NFT as NFTType } from "@thirdweb-dev/sdk";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useContract,
  useCreateAuctionListing,
  useCreateDirectListing,
  Web3Button,
} from "@thirdweb-dev/react";
import {
  MARKETPLACE_ADDRESS,
  NFT_COLLECTION_ADDRESS,
} from "../../const/contractAddresses";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import toastStyle from "../../util/toastConfig";
import styles from "../../styles/Sale.module.css";
import profileStyles from "../../styles/Profile.module.css";

type Props = {
  nft: NFTType;
};

type AuctionFormData = {
  nftContractAddress: string;
  tokenId: string;
  startDate: string;
  endDate: string;
  floorPrice: string;
  buyoutPrice: string;
};

type DirectFormData = {
  nftContractAddress: string;
  tokenId: string;
  price: string;
  startDate: string;
  endDate: string;
};

export default function SaleInfo({ nft }: Props) {
  const router = useRouter();
  const { contract: marketplace } = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");
  const { contract: nftCollection } = useContract(NFT_COLLECTION_ADDRESS);
  const { mutateAsync: createAuctionListing } = useCreateAuctionListing(marketplace);
  const { mutateAsync: createDirectListing } = useCreateDirectListing(marketplace);
  const [tab, setTab] = useState<"direct" | "auction">("direct");
  const { register: registerAuction, handleSubmit: handleSubmitAuction, reset } = useForm<AuctionFormData>({
    defaultValues: {
      nftContractAddress: NFT_COLLECTION_ADDRESS,
      tokenId: nft.metadata.id,
      startDate: new Date().toISOString().slice(0, 16),
      endDate: new Date(Date.now() + 86400 * 7).toISOString().slice(0, 16),
      floorPrice: "0",
      buyoutPrice: "0",
    },
  });
  const { register: registerDirect, handleSubmit: handleSubmitDirect, reset: resetDirect } = useForm<DirectFormData>({
    defaultValues: {
      nftContractAddress: NFT_COLLECTION_ADDRESS,
      tokenId: nft.metadata.id,
      startDate: new Date().toISOString().slice(0, 16),
      endDate: new Date(Date.now() + 86400 * 7).toISOString().slice(0, 16),
      price: "0",
    },
  });

  const checkAndProvideApproval = async () => {
    if (!nftCollection) return;

    const hasApproval = await nftCollection.call("isApprovedForAll", [nft.owner, MARKETPLACE_ADDRESS]);

    if (!hasApproval) {
      const txResult = await nftCollection.call("setApprovalForAll", [MARKETPLACE_ADDRESS, true]);
      if (txResult) {
        toast.success("Marketplace approval granted", {
          icon: "👍",
          style: toastStyle,
          position: "bottom-center",
        });
      }
    }

    return true;
  };

  const handleSubmissionAuction = async (data: AuctionFormData) => {
    await checkAndProvideApproval();
    const txResult = await createAuctionListing({
      assetContractAddress: data.nftContractAddress,
      tokenId: data.tokenId,
      buyoutBidAmount: data.buyoutPrice,
      minimumBidAmount: data.floorPrice,
      startTimestamp: new Date(data.startDate).getTime() / 1000,
      endTimestamp: new Date(data.endDate).getTime() / 1000,
    });

    return txResult;
  };

  const handleSubmissionDirect = async (data: DirectFormData) => {
    await checkAndProvideApproval();
    const txResult = await createDirectListing({
      assetContractAddress: data.nftContractAddress,
      tokenId: data.tokenId,
      pricePerToken: data.price,
      startTimestamp: new Date(data.startDate).getTime() / 1000,
      endTimestamp: new Date(data.endDate).getTime() / 1000,
    });

    return txResult;
  };

  const onSubmitAuction = (data: AuctionFormData) => {
    handleSubmitAuction(data).then((txResult) => {
      toast("Listed Successfully!", {
        icon: "🥳",
        style: toastStyle,
        position: "bottom-center",
      });
      router.push(`/token/${NFT_COLLECTION_ADDRESS}/${nft.metadata.id}`);
      reset();
    });
  };

  const onSubmitDirect = (data: DirectFormData) => {
    handleSubmitDirect(data).then((txResult) => {
      toast("Listed Successfully!", {
        icon: "🥳",
        style: toastStyle,
        position: "bottom-center",
      });
      router.push(`/token/${NFT_COLLECTION_ADDRESS}/${nft.metadata.id}`);
      resetDirect();
    });
  };

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className={styles.saleInfoContainer} style={{ marginTop: -42 }}>
        <div className={profileStyles.tabs}>
          <h3
            className={`${profileStyles.tab} ${tab === "direct" ? profileStyles.active
