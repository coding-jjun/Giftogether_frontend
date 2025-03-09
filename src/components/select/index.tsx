import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { GroupBase, StylesConfig } from "react-select";

const ReactSelect = dynamic(
  () => import("react-select").then((mod) => mod.default),
  {
    ssr: false,
  },
);

export interface OptionType {
  value: string;
  label: string;
}

export interface SelectProps {
  options: OptionType[];
  value?: OptionType;
  onChange: (newValue: any) => void;
  placeholder?: string;
  hasError?: boolean;
}

const Select = ({
  options,
  value,
  onChange,
  placeholder,
  hasError = false,
}: SelectProps) => {
  const customStyles = useMemo<
    StylesConfig<unknown, boolean, GroupBase<unknown>>
  >(
    () => ({
      container: (base) => ({
        ...base,
        width: "100%",
      }),
      control: (base) => ({
        ...base,
        width: "100%",
        height: "48px",
        borderRadius: "8px",
        border: `1px solid ${hasError ? "#F43C6B" : "#ccc"}`,
        color: "#424242",
        ":hover": {
          borderColor: "#e0e0e0",
        },
        boxShadow: "none",
      }),
      menu: (base) => ({
        ...base,
        borderRadius: "8px",
        overflow: "hidden",
      }),
      option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected
          ? "rgba(244, 60, 107, 0.2)"
          : state.isFocused
            ? "rgba(244, 60, 107, 0.1)"
            : "#fff",
        color: state.isSelected ? "#F43C6B" : "#424242",
        cursor: "pointer",
        padding: "10px 16px",
      }),
    }),
    [hasError],
  );

  return (
    <ReactSelect
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      styles={customStyles}
    />
  );
};

export default Select;
