import * as ReactDOM from "react-dom";
import * as React from "react";
import styled from "styled-components";

console.log("TEST");

const MyComponent = () => {
  return (
    <div style={{ backgroundColor: "yellow", width: 180, height: 400 }}>
      <div style={{ paddingTop: 5, font: "bold 18px Arial" }}>Wishing Well</div>
      <div style={{ font: "italic 16px Arial" }}>Juice Wrld</div>
      <br />
      <div style={{ fontSize: 14 }}>
        [Intro] Mm-mm, mm-mm-mm-mm, mm-mm-mm, uh I can't breathe (Chopsquad), I
        can't breathe, 999 Waiting for the exhale I toss my pain with my wishes
        in a wishing well [Chorus] I can't breathe, I'm waiting for the exhale
        Toss my pain with my wishes in a wishing well Still no luck, but oh well
        I still try even though I know I'm gon' fail Stress on my shoulders like
        a anvil
      </div>
      <br />
      <input
        type="text"
        defaultValue="Search a word..."
        style={{ backgroundColor: "yellow", marginLeft: 5, display: "block" }}
      ></input>
      <input
        type="text"
        defaultValue="Search a song..."
        style={{ backgroundColor: "yellow", marginLeft: 5, display: "block" }}
      ></input>
    </div>
  );
};

// const Container = styled.div`
//   position: absolute;
//   top: 0;
//   right: 0;
//   min-height: 400px;
//   min-width: 400px;
//   background-color: blueviolet; // temporary
// `;

const root = document.createElement("div"); //Create our "root" div
document.body.appendChild(root); //Put root at the end of the html body

ReactDOM.render(<MyComponent />, root); //put myComponent in the root

console.log("TEST END");
