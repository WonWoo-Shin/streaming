import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles/App.css";

import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/globalStyle";
import { darkTheme, lightTheme } from "./theme";
import { useRecoilValue } from "recoil";
import { isDarkState } from "./atom";

import { Footer } from "./Components/Footer";
import { Router } from "./Router";

function App() {
  const isDark = useRecoilValue(isDarkState);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Router />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
