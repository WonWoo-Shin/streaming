import { CustomArrowProps } from "react-slick";
import { SlideArrowStyle } from "../styles/homeStyle";
import { TDirection } from "../type";

interface ISlideArroeProps extends CustomArrowProps {
  position: TDirection;
}

const leftPath =
  "M16.876 2.363a1.239 1.239 0 0 0-1.752 0l-8.761 8.76a1.239 1.239 0 0 0 0 1.753l8.76 8.761a1.239 1.239 0 1 0 1.753-1.752L8.991 12l7.885-7.885a1.239 1.239 0 0 0 0-1.752Z";
const rightPath =
  "M6.363 21.637a1.239 1.239 0 0 0 1.752 0l8.761-8.76a1.239 1.239 0 0 0 0-1.753l-8.76-8.761a1.239 1.239 0 1 0-1.753 1.752L14.248 12l-7.885 7.885a1.239 1.239 0 0 0 0 1.752Z";

export const SlideArrow = ({ onClick, position }: ISlideArroeProps) => {
  return (
    <SlideArrowStyle onClick={onClick} $position={position}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={position === "left" ? leftPath : rightPath}
          fill="currentColor"
        ></path>
      </svg>
    </SlideArrowStyle>
  );
};
