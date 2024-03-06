import React from "react";
import classNames from "classnames";
import styles from "./Skeleton.module.css";

type Props = {
  width?: string;
  height?: string;
  className?: string;
};

export default function Skeleton({ width, height, className }: Props) {
  const skeletonStyles = {
    width,
    height,
    borderRadius: "inherit",
  };

  const classList = classNames(styles.skeleton, className);

  return <div style={skeletonStyles} className={classList} />;
}
