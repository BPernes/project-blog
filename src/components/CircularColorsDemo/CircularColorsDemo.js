"use client";

import React from "react";
import clsx from "clsx";
import { Play, Pause, RotateCcw } from "react-feather";
import { motion } from "framer-motion";

import Card from "@/components/Card";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./CircularColorsDemo.module.css";

const COLORS = [
  { label: "red", value: "hsl(348deg 100% 60%)" },
  { label: "yellow", value: "hsl(50deg 100% 55%)" },
  { label: "blue", value: "hsl(235deg 100% 65%)" },
];

function CircularColorsDemo() {
  // TODO: This value should increase by 1 every second:
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  // idle, playing
  const [status, setStatus] = React.useState("idle");
  const id = React.useId();

  // TODO: This value should cycle through the colors in the
  // COLORS array:
  const selectedColor = COLORS[timeElapsed % COLORS.length];

  React.useEffect(() => {
    if (status === "idle") {
      return;
    }
    const intervalId = window.setInterval(() => {
      setTimeElapsed((currentTime) => currentTime + 1);
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [status]);

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected = color.value === selectedColor.value;

          return (
            <li className={styles.color} key={index}>
              {isSelected && (
                <motion.div
                  layoutId={`${id}-selected-outline-color`}
                  className={styles.selectedColorOutline}
                />
              )}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected && styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>{color.label}</VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          <button
            onClick={() => {
              if (status === "idle") {
                setStatus("playing");
                setTimeElapsed(timeElapsed + 1);
              } else {
                setStatus("idle");
              }
            }}
          >
            {status === "idle" ? <Play /> : <Pause />}
            <VisuallyHidden>
              {status === "idle" ? <Play /> : <Pause />}
            </VisuallyHidden>
          </button>
          <button
            onClick={() => {
              setTimeElapsed(0);
              setStatus("idle");
            }}
          >
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
