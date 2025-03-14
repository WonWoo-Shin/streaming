import { Home } from "./Components/Home";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/globalStyle";
import { darkTheme, lightTheme } from "./theme";
import { useRecoilValue } from "recoil";
import { isDarkState } from "./atom";

function App() {
  const isDark = useRecoilValue(isDarkState);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/:mediaType/:itemId" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
