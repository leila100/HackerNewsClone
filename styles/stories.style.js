import styled from "styled-components";

export const StoriesContainer = styled.section`
  max-width: 1200px;
`;

export const Stories = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  align-content: center;
  .card {
    width: 47%;
    margin: 15px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 8px;
    cursor: pointer;
    p {
      color: grey;
    }
    button {
      width: 40%;
      align-self: center;
      background-color: #395697;
      a {
        color: white;
      }
    }
  }
`;
