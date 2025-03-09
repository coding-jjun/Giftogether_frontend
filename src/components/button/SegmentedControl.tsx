import React from "react";
import * as styles from "./SegmentedControl.css";

interface SegmentedControlOption<T> {
  label: string;
  value: T;
}

interface SegmentedControlProps<T> {
  options: SegmentedControlOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

const SegmentedControl = <T,>({
  options,
  value,
  onChange,
}: SegmentedControlProps<T>) => {
  return (
    <div className={styles.buttonGroup}>
      {options.map((option) => (
        <button
          key={String(option.value)}
          className={`${styles.button} ${value === option.value ? "active" : ""}`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default SegmentedControl;
