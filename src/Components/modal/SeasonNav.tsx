import { useState } from "react";
import {
  EpisodeCount,
  Season,
  SeasonSelect,
  SelectItem,
  SelectList,
} from "../../styles/modal/modalColumnListStyle";
import { ISeasons } from "../../type";

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
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const currentSeason =
    seasons[
      seasons.findIndex((season) => season.season_number === selectSeason)
    ];

  return (
    <Season>
      <EpisodeCount>{`${currentSeason.episode_count}개 에피소드`}</EpisodeCount>
      <SeasonSelect
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
    </Season>
  );
};
