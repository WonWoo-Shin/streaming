import styled from "styled-components";

export const Wrapper = styled.div``;

export const Banner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  height: 100vh;
  background-size: cover;
`;

export const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 68px;
`;

export const Overview = styled.p`
  width: 50%;
  font-size: 25px;
  line-height: 140%;
`;

export const Slider = styled.div``;

export const Row = styled.ul`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  margin-bottom: 20px;
`;

export const Box = styled.li`
  background-color: white;
  height: 200px;
`;
