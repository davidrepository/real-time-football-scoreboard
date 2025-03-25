import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { vars } from "@/styles/theme.css";

const { colors } = vars;

const responsiveProperties: any = defineProperties({
  conditions: {
    mobile: {},
    tablet: { "@media": "screen and (min-width: 600px)" },
    desktop: { "@media": "screen and (min-width: 1200px)" },
    tv: { "@media": "screen and (min-width: 1800px)" },
  },
  defaultCondition: "mobile",
  responsiveArray: [`mobile`, `tablet`, `desktop`, `tv`],
  properties: {
    position: [`relative`, `absolute`, `fixed`, `sticky`],
    display: ["none", "grid", "flex", "block", "inline"],
  },
  shorthands: {
    w: ["width"],
    h: ["height"],

    minw: ["minWidth"],
    maxw: ["maxWidth"],
    minh: ["minHeight"],
    maxh: ["maxHeight"],

    cols: ["gridTemplateColumns"],
    rows: ["gridTemplateRows"],

    g: ["gap"],

    p: ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"],
    px: ["paddingLeft", "paddingRight"],
    py: ["paddingTop", "paddingBottom"],
    pt: ["paddingTop"],
    pr: ["paddingRight"],
    pb: ["paddingBottom"],
    pl: ["paddingLeft"],

    m: ["marginTop", "marginRight", "marginBottom", "marginLeft"],
    mx: ["marginLeft", "marginRight"],
    my: ["marginTop", "marginBottom"],
    mt: ["marginTop"],
    mr: ["marginRight"],
    mb: ["marginBottom"],
    ml: ["marginLeft"],

    radius: ["borderRadius"],

    bg: ["background"],
    bgc: ["backgroundColor"],
  },
});

const unresposiveProperties = defineProperties({
  properties: {
    textAlign: ["center", "left", "right"],
    textTransform: ["lowercase", "uppercase"],
    textDecoration: ["none", "underline"],
    mixBlendMode: ["difference"],
    zIndex: [1, 2, 3, 4],
    cursor: ["pointer"],
    flexGrow: [1],
    pointerEvents: ["none", "all"],
    userSelect: ["none", "all"],
  },
});

const fontProperties = defineProperties({
  conditions: {
    light: { "@media": `(prefers-color-scheme: light)` },
    dark: { "@media": "(prefers-color-scheme: dark)" },
    placeholder: { selector: `&::placeholder` },
  },
  defaultCondition: [`light`, `dark`],
  properties: {
    // fontSize,
  },
});

const colorProperties = defineProperties({
  conditions: {
    light: { "@media": `(prefers-color-scheme: light)` },
    dark: { "@media": "(prefers-color-scheme: dark)" },
    hover: { selector: `&:hover` },
    focus: { selector: `&:focus` },
    placeholder: { selector: `&::placeholder` },
  },
  defaultCondition: [`light`, `dark`],
  properties: {
    color: colors,
    background: colors,
    backgroundColor: colors,
    borderColor: colors,
  },
});

export const sprinkles = createSprinkles(
  responsiveProperties,
  unresposiveProperties,
  fontProperties,
  colorProperties
);
