"use client";

import { forwardRef, ReactNode, ForwardedRef } from "react";
import { sprinkles } from "@/styles/sprinkles.css";

const classConnector = (arr: any) => {
  const parsed = arr.filter((i: any) => i && i !== "").join(" ");
  return parsed === "" ? undefined : parsed;
};

interface BoxProps {
  as?: React.ElementType;
  v?: any;
  s?: any;
  className?: string;
  children?: ReactNode;
  [key: string]: any;
}

export const Box = forwardRef(
  (
    {
      as: Component = "div",
      s = {},
      className = "",
      children,
      ...rest
    }: BoxProps,
    ref: ForwardedRef<unknown>
  ) => {
    return (
      <Component
        ref={ref}
        className={classConnector([sprinkles(s), className])}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);
