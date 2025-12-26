import { useEffect, useRef, useState } from "react";

import {
  EpisodeCount,
  Season,
  SeasonSelect,
  SelectItem,
  SelectList,
} from "../../../styles/modal/modalColumnListStyle";
import { ISeasons } from "../../../type";

interface IProps {
  seasons: ISeasons[];
  selectSeason: number;
  setSelectSeason: React.Dispatch<React.SetStateAction<number>>;
}

export const SeasonNav = ({
  seasons,
  selectSeason,
  setSelectSeason,
}: IProps) => {
  const seasonSelectRef = useRef<HTMLDivElement>(null);

  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const currentSeason =
    seasons[
      seasons.findIndex((season) => season.season_number === selectSeason)
    ];

  useEffect(() => {
    const clickOutside = (event: MouseEvent) => {
      if (
        seasonSelectRef.current &&
        !seasonSelectRef.current.contains(event.target as Node)
      ) {
        setIsSelectOpen(false);
      }
    };
    addEventListener("mousedown", clickOutside);
    return () => {
      removeEventListener("mousedown", clickOutside);
    };
  }, [seasonSelectRef]);

  return (
    <Season>
      <EpisodeCount>{`${currentSeason.episode_count}개 에피소드`}</EpisodeCount>
      {seasons.length > 1 && (
        <SeasonSelect
          ref={seasonSelectRef}
          onClick={() => setIsSelectOpen((prev) => !prev)}
          $isSelectOpen={isSelectOpen}
        >
          <span>{currentSeason.name}</span>
          {isSelectOpen && (
            <SelectList>
              {seasons.map((season) => (
                <SelectItem
                  key={season.id}
                  onClick={() => setSelectSeason(season.season_number)}
                >
                  {season.name}
                </SelectItem>
              ))}
            </SelectList>
          )}
        </SeasonSelect>
      )}
    </Season>
  );
};
