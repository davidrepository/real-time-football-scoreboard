import { createThemeContract, createTheme } from "@vanilla-extract/css";

const grayness = {
  gray1: "#111111",
};

const whiteness = {
  white: "#FFFFFF",
};

const blackness = {
  black: "#000000",
};

const colors = {
  red: "#ff0000",
  green: "#32CD32",
  blue: "#87CEFA",
  transparent: "transparent",
  ...whiteness,
  ...grayness,
  ...blackness,
};

export const breakpoints = {
  mobile: 0,
  tablet: 600,
  desktop: 1200,
  tv: 1800,
};

export const vars = createThemeContract({
  colors: {
    primary: ``,
    body: ``,
    background: ``,
    link: ``,
    linkHover: ``,
    ...colors,
  },
  font: {
    body: ``,
  },
});

const commonVars = {
  font: {
    body: "Inter, sans-serif",
  },
};

export const lightThemeClass = createTheme(vars, {
  colors: {
    primary: colors.black,
    body: colors.black,
    background: colors.white,
    link: colors.black,
    linkHover: colors.black,
    ...colors,
  },
  ...commonVars,
});

export const darkThemeClass = createTheme(vars, {
  colors: {
    primary: colors.white,
    body: colors.white,
    background: colors.black,
    link: colors.white,
    linkHover: colors.white,
    ...colors,
  },
  ...commonVars,
});
