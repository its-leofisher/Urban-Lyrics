import * as ReactDOM from "react-dom";
import * as React from "react";
import styled from "styled-components";

console.log("TEST");

const MyComponent = () => {
  return <Container>hello</Container>;
};

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  min-height: 400px;
  min-width: 400px;
  background-color: blueviolet; // temporary
`;

const root = document.createElement("div"); //Create our "root" div
document.body.appendChild(root); //Put root at the end of the html body

ReactDOM.render(<MyComponent />, root); //put myComponent in the root

console.log("TEST END");
