import React, { useState } from "react";
import usePasswordGenerator from "./CustomHook/usePasswordGenerator";

const App = () => {
  const { password, errorMessage, generatePassword } = usePasswordGenerator();
  const [length, setLength] = useState(4);
  const [copied, setCopied] = useState(false);
  const [checkboxData, setCheckboxData] = useState([
    { title: "Include Uppercase Letters", state: false },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false },
  ]);

  const handleCheckboxChange = (i) => {
    const updatedCheckboxData = [...checkboxData];
    updatedCheckboxData[i].state = !updatedCheckboxData[i].state;
    setCheckboxData(updatedCheckboxData);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };
  return (
    <div className="container">
      {password && (
        <div className="header">
          <div className="title">{password}</div>
          <button className="copyBtn" onClick={() => handleCopy()}>
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      )}
      <div className="charlength">
        <span>
          <label>Character Length</label>
          <label>{length}</label>
        </span>
        <input
          type="range"
          min="2"
          max="20"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
      </div>

      <div className="checkboxes">
        {checkboxData.map((checkboxData, index) => {
          return (
            <div key={index}>
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange(index)}
                checked={checkboxData.state}
              />
              <label>{checkboxData.title}</label>
            </div>
          );
        })}
      </div>
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}

      <button
        text="Generate Password"
        className="generateBtn"
        onClick={() => generatePassword(checkboxData, length)}
      >
        Generate Password
      </button>
    </div>
  );
};

export default App;
