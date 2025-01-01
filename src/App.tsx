import { Home } from "./Components/Home";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles/App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={["/", "/modal=:movieId"]}>
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
