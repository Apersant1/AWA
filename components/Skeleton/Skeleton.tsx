import React from "react";
import classNames from "classnames";
import styles from "./Skeleton.module.css"; // Importing the styles from the Skeleton.module.css file

type Props = {
  width?: string; // Optional width property with string type
  height?: string; // Optional height property with string type
  className?: string; // Optional className property with string type
};

// Skeleton component definition
export default function Skeleton({ width, height, className }: Props) {
  const skeletonStyles = {
    width, // Setting the width from the props
    height, // Setting the height from the props
    borderRadius: "inherit", // Inheriting the border-radius from the parent element
  };

  const classList = classNames(styles.skeleton, className); // Combining the default and user-defined classes

  return <div style={skeletonStyles} className={classList} />; // Returning a div with the combined styles and classNames
}

