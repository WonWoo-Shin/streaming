import { DefaultTheme } from "styled-components";

export const darkTheme: DefaultTheme = {
  background: {
    primary: "#141517",
    secondary: "#1E2022",
    tertiary: "#3D4145",
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
};

export const lightTheme: DefaultTheme = {
  background: {
    primary: "#ffffff",
    secondary: "#F5F5F5",
    tertiary: "#3D4145",
    loading: "#EEEEEE",
  },
  font: {
    primary: "#141517",
    secondary: "#2e3033",
    paragraph: "#d0d0d0",
    muted: "#8a8a8a",
  },
  scrollBar: {
    scrollTrack: "#F5F5F5",
    scrollThumb: "#686868",
  },
};
