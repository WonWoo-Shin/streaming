import {
  InputWrapper,
  SearchIconWrapper,
  SearchInput,
} from "../../styles/headerStyle";
import { SearchIcon } from "./SearchIcon";

interface IProps {
  toggleSearchOpen: () => void;
}

export const Search = ({ toggleSearchOpen }: IProps) => {
  return (
    <InputWrapper>
      <SearchIconWrapper onClick={toggleSearchOpen}>
        <SearchIcon />
      </SearchIconWrapper>
      <SearchInput placeholder="제목으로 검색" />
    </InputWrapper>
  );
};
