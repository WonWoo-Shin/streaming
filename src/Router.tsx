import { Route, Routes, useLocation, useParams } from "react-router-dom";
import { Home } from "./Components/Home";
import { SearchResults } from "./Components/searchResult/SearchResults";
import { ItemModal } from "./Components/modal/ItemModal";
import { AnimatePresence } from "framer-motion";

export const Router = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  // return (
  //   <Routes>
  //     <Route path="/" element={<Home />} />
  //     <Route path="/modal/:mediaType/:itemId" element={<Home />} />
  //     <Route path="/search/:keyword" element={<SearchResults />}>
  //       <Route path="modal/:mediaType/:itemId" element={<SearchResults />} />
  //     </Route>
  //   </Routes>
  // );

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<Home />} />
        <Route path="/search/:keyword" element={<SearchResults />} />
      </Routes>

      <AnimatePresence
        onExitComplete={() => document.body.classList.remove("modal-open")}
      >
        {state?.backgroundLocation && (
          <Routes location={location}>
            <Route path="/modal/:mediaType/:itemId" element={<ItemModal />} />
          </Routes>
        )}
      </AnimatePresence>
    </>
  );
};
