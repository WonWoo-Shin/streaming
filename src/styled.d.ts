import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    background: {
      primary: string;
      secondary: string;
      tertiary: string;
      loading: string;
    };
    font: {
      primary: string;
      secondary: string;
      paragraph: string;
      muted: string;
    };
    scrollBar: {
      scrollTrack: string;
      scrollThumb: string;
    };
    etc: {
      imageBgColor: string;
      divider: string;
      boxShadow: string;
      buttonHover: string;
    };
  }
}
