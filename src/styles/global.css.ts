import { globalStyle } from "@vanilla-extract/css";

globalStyle(`*`, {
  boxSizing: "border-box",
  margin: 0,
  padding: 0,
});

globalStyle(`html, body`, {
  minHeight: `100%`,
});

globalStyle(`html`, {
  fontSize: "62.5%",
  color: "#000",
});

globalStyle(`body`, {
  lineHeight: 1.6,
  WebkitFontSmoothing: `antialiased`,
});

globalStyle(`h1, h2, h3, h4, h5, h6, p, label`, {
  overflowWrap: `break-word`,
});

globalStyle(`ul, ol`, {
  listStyle: "none",
});

globalStyle(`button`, {
  border: "none",
  backgroundColor: "transparent",
  cursor: "pointer",
});
