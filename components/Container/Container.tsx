import React from "react";
import styles from "./Container.module.css";

type Props = {
  // The maximum width of the container. Can be "xs", "sm", "md", "lg", or "xl".
  maxWidth: "xs" | "sm" | "md" | "lg" | "xl";
  // The content to be rendered within the container.
  children: React.ReactNode;
};

// A container component that sets the max-width of its children, and centers them on the page.
export default function Container({ maxWidth, children }: Props) {
  // The returned JSX represents the container with the specified max-width and centered content.
  return (
    <div
      // Apply the base container styling and the specific max-width styling.
      className={`${styles.container} ${styles[maxWidth]}`}
    >
      {children}
    </div>
  );
}

