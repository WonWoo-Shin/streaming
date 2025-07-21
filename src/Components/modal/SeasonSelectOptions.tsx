import { useEffect, useRef } from "react";
import {
  SelectItem,
  SelectList,
} from "../../styles/modal/modalColumnListStyle";
import { ISeasons } from "../../type";

interface IProps {
  seasons: ISeasons[];
  seasonSelectRef: React.RefObject<HTMLDivElement>;
  setIsSelectOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectSeason: React.Dispatch<React.SetStateAction<number>>;
}

export const SeasonSelectOptions = ({
  seasons,
  seasonSelectRef,
  setIsSelectOpen,
  setSelectSeason,
}: IProps) => {
  const selectListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const clickOutside = (event: MouseEvent) => {
      if (
        seasonSelectRef.current &&
        seasonSelectRef.current.contains(event.target as Node)
      ) {
        return; // 선택기를 누를 경우 바깥 클릭 제외
      }
      if (
        selectListRef.current &&
        !selectListRef.current.contains(event.target as Node)
      ) {
        setIsSelectOpen(false);
      }
    };
    addEventListener("mousedown", clickOutside);
    return () => {
      removeEventListener("mousedown", clickOutside);
    };
  }, [selectListRef]);

  return (
    <SelectList ref={selectListRef}>
      {seasons.map((season) => (
        <SelectItem
          key={season.id}
          onClick={() => setSelectSeason(season.season_number)}
        >
          {season.name}
        </SelectItem>
      ))}
    </SelectList>
  );
};
