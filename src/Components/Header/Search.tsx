import { useEffect, useRef } from "react";
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
  const inputWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickOutside = (event: MouseEvent) => {
      if (
        inputWrapperRef.current &&
        !inputWrapperRef.current.contains(event.target as Node)
      ) {
        toggleSearchOpen();
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [toggleSearchOpen]);

  return (
    <InputWrapper ref={inputWrapperRef}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <SearchInput placeholder="제목으로 검색" />
    </InputWrapper>
  );
};
