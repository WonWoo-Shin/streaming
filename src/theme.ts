import { DefaultTheme } from "styled-components";

export const darkTheme: DefaultTheme = {
  background: {
    primary: "#141517",
    secondary: "#1E2022",
    tertiary: "#323539",
    loading: "#373a3f",
  },
  font: {
    primary: "#ffffff",
    secondary: "#e5e5e5",
    paragraph: "#d0d0d0",
    muted: "#8a8a8a",
  },
  scrollBar: {
    scrollTrack: "#1E2022",
    scrollThumb: "#686868",
  },
  etc: {
    imageBgColor: "rgba(30, 32, 34, 0.6)",
    divider: "#26282a",
    modalDivider: "#353739",
    boxShadow: "rgba(0, 0, 0, 0.75)",
    buttonHover: "rgba(255, 255, 255, 0.2)",
    pointGreen: "#00FFA3",
  },
};

export const lightTheme: DefaultTheme = {
  background: {
    primary: "#ffffff",
    secondary: "#F5F5F5",
    tertiary: "#dadada",
    loading: "#EEEEEE",
  },
  font: {
    primary: "#141517",
    secondary: "#2e3033",
    paragraph: "#4d4d4d",
    muted: "#8a8a8a",
  },
  scrollBar: {
    scrollTrack: "#F5F5F5",
    scrollThumb: "#B2B2B2",
  },
  etc: {
    imageBgColor: "rgba(245, 245, 245,0.4)",
    divider: "#EEEEEE",
    modalDivider: "rgba(0,0,0,0.1)",
    boxShadow: "rgba(0, 0, 0, 0.25)",
    buttonHover: "rgba(0, 0, 0, 0.2)",
    pointGreen: "#1BB373",
  },
};
