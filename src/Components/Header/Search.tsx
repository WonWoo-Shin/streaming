import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  InputWrapper,
  SearchBar,
  SearchIconWrapper,
  SearchInput,
} from "../../styles/headerStyle";
import { SearchIcon } from "./SearchIcon";
import { Transition, Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";

const defaultTransition: Transition = {
  ease: [0.25, 0.1, 0.25, 1],
  duration: 0.25,
};

const searchVariants: Variants = {
  initial: {
    width: "40px",
    paddingRight: 0,
  },
  animate: {
    width: "280px",
    paddingRight: "10px",
    transition: defaultTransition,
  },
  exit: {
    width: "40px",
    paddingRight: 0,
    transition: defaultTransition,
  },
};

const searchIconVariants: Variants = {
  initial: {
    translateX: 237,
  },
  animate: {
    translateX: 0,
    transition: defaultTransition,
  },
  exit: {
    translateX: 237,
    transition: defaultTransition,
  },
};

interface IProps {
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Search = ({ setIsSearchOpen }: IProps) => {
  const inputWrapperRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const clickOutside = (event: MouseEvent) => {
      if (
        inputWrapperRef.current &&
        !inputWrapperRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [setIsSearchOpen]);

  const [searchValue, setSearchValue] = useState("");
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
  };

  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!searchValue) return;
    navigate(`/search/${searchValue}`);
  };

  return (
    <SearchBar>
      <SearchIconWrapper
        variants={searchIconVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <SearchIcon />
      </SearchIconWrapper>
      <InputWrapper
        onSubmit={handleSubmit}
        variants={searchVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <SearchInput
          value={searchValue}
          onChange={handleChange}
          ref={inputWrapperRef}
          placeholder="제목으로 검색"
          autoFocus
        />
      </InputWrapper>
    </SearchBar>
  );
};
