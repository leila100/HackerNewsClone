import styled from "styled-components";

export const CommentsList = styled.section`
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  a {
    text-decoration: none;
    font-size: 1.5rem;
    color: #395697;
    text-align: left;
  }
  h2 {
    text-align: center;
  }
`;

export const Comment = styled.div`
  margin: 15px;
  padding: 5px;
  box-shadow: 5px 10px #395697;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h3 {
    font-size: 1.2rem;
    color: #395697;
    margin: 5px 0;
  }
`;
