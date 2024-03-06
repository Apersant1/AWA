import { BigNumber, BigNumberish } from "ethers";

interface TimeRemaining {
  value: number;
  unit: "seconds" | "minutes" | "hours" | "days";
}

export default function formatTimeRemaining(
  unixTimestamp: BigNumberish
): TimeRemaining {
  const now = Math.floor(Date.now() / 1000);
  const timeDifference = BigNumber.from(unixTimestamp).sub(now).toNumber();

  if (timeDifference < 1) {
    return { value: timeDifference, unit: "seconds" };
  }

  const units = [
    { name: "seconds", divisor: 1 },
    { name: "minutes", divisor: 60 },
    { name: "hours", divisor: 3600 },
    { name: "days", divisor: 86400 },
  ];

  for (const unit of units) {
    if (timeDifference >= unit.divisor) {
      return { value: Math.floor(timeDifference / unit.divisor), unit: unit.name };
    }
  }
}
