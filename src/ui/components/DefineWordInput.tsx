import * as React from "react";
import { Input } from "../theme";
import { FC } from "react";

type DefineWordInputProps = {};

export const DefineWordInput: FC<DefineWordInputProps> = () => {
  const inputbox = React.useRef<HTMLInputElement | null>(null);

  function runWithInput() {
    const term = inputbox.current?.value;
    if (!term) return; //do nothing if input is empty
    inputbox.current.value = ""; // reset inputbox
    var newURL = encodeURI(
      `https://www.urbandictionary.com/define.php?term=${term}`
    );
    chrome.tabs.create({ url: newURL });
  }

  return (
    <Input
      type="text"
      placeholder="Urban Dictionary Lookup"
      ref={inputbox}
      onKeyPress={(e) => {
        if (e.key === "Enter") runWithInput();
      }}
    />
  );
};
