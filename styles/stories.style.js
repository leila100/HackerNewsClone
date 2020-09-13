import styled from "styled-components";

export const StoriesContainer = styled.section`
  max-width: 1200px;
`;

export const Stories = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  align-content: center;
`;

export const Story = styled.div`
  width: 30%;
  margin: 15px;
  padding: 5px;
  box-shadow: 5px 10px #888888;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h2 {
    font-size: 1.4rem;
  }
  h3 {
    font-size: 1.2rem;
    color: grey;
  }
  h2,
  h3 {
    margin: 5px 0;
  }
`;
