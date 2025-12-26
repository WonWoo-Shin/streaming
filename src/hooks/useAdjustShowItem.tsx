import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useRecoilState } from "recoil";

import { screenState } from "../atom";

export const useAdjustShowItem = () => {
  const isBelow1400 = useMediaQuery({ query: "(max-width: 1400px)" });
  const isBelow1100 = useMediaQuery({ query: "(max-width: 1100px)" });
  const isBelow800 = useMediaQuery({ query: "(max-width: 800px)" });
  const isBelow500 = useMediaQuery({ query: "(max-width: 500px)" });

  const [showItem, setShowItem] = useRecoilState(screenState);

  useEffect(() => {
    let newValue = 6;
    if (isBelow500) newValue = 2;
    else if (isBelow800) newValue = 3;
    else if (isBelow1100) newValue = 4;
    else if (isBelow1400) newValue = 5;

    if (showItem !== newValue) {
      setShowItem(newValue);
    }
  }, [isBelow1400, isBelow1100, isBelow800, isBelow500, showItem]);
};
