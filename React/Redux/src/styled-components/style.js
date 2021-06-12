import styled from "styled-components";

export const Warp = styled.div`
  background-color: pink;
  height: 500px;
  h2 {
    font-size: 30px;
    color: ${(props) => props.Variable.color};
  }
  span {
    text-decoration: underline;
    font-size: 24px;
  }
`;

export const Div = styled.div`
  font-size: 20px;
  color: red;
  h2 {
    color: rebeccapurple;
    font-size: 30px;
  }
`;

export const Li = styled.li`
  list-style: none;
  color: blue;
`;

export const Ui = styled.ul`
  background-color: rebeccapurple;
`;
