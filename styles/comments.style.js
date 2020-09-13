import styled from "styled-components";

export const CommentsList = styled.section`
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Comment = styled.div`
  margin: 15px;
  padding: 5px;
  box-shadow: 5px 10px #888888;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h3 {
    font-size: 1.2rem;
    color: grey;
    margin: 5px 0;
  }
`;
