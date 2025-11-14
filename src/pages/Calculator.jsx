import React, { useState, useEffect } from "react";

const Calculator = () => {
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [operator, setOperator] = useState("");
  const [isSecond, setIsSecond] = useState(false);
  const [lastOperator, setLastOperator] = useState("");
  const [lastSecond, setLastSecond] = useState("");

  const updateDisplay = () => {
    return !isSecond ? (first === "" ? "0" : first) : (second === "" ? "0" : second);
  };

  const numberClick = (number) => {
    if (!isSecond) {
      if (first.length < 9) {
        setFirst(first === "0" ? number.toString() : first + number);
      }
    } else {
      if (second.length < 9) {
        setSecond(second === "0" ? number.toString() : second + number);
      }
    }
  };

  const operatorClick = (op) => {
    if (first === "") return;
    if (operator !== "" && isSecond && second !== "") {
      calculate();
    }
    setOperator(op);
    setIsSecond(true);
    setSecond("");
  };

  const calculate = () => {
    const num1 = parseFloat(first);
    let num2;

    if (second === "") {
      num2 = lastSecond !== "" ? parseFloat(lastSecond) : num1;
      if (lastSecond !== "") setOperator(lastOperator);
    } else {
      num2 = parseFloat(second);
    }

    let result = 0;
    if (operator === "+") result = num1 + num2;
    else if (operator === "-") result = num1 - num2;
    else return;

    setFirst(result.toString());
    setSecond("");
    setIsSecond(false);
    setLastOperator(operator);
    setLastSecond(num2.toString());
    setOperator("");
  };

  const equlClick = () => {
    if (first !== "" && (operator !== "" || lastOperator !== "")) {
      calculate();
    }
  };

  const ceClick = () => {
    setFirst("");
    setSecond("");
    setOperator("");
    setIsSecond(false);
    setLastOperator("");
    setLastSecond("");
  };

  const checkKeyBoard = (event) => {
    if (event.key >= "0" && event.key <= "9") {
      numberClick(Number(event.key));
    } else if (event.key === "+") {
      operatorClick("+");
    } else if (event.key === "-") {
      operatorClick("-");
    } else if (event.key === "Enter") {
      equlClick();
    } else if (event.key === "Escape") {
      ceClick();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", checkKeyBoard);
    return () => window.removeEventListener("keydown", checkKeyBoard);
  });

  const renderButton = (text, onClick, type = "blue", selected = false) => {
    const baseStyle = {
      borderRadius: "10px",
      width: "3rem",
      height: "3rem",
      fontSize: "1.2rem",
      margin: "0.25rem",
      fontWeight: "bold",
      cursor: onClick ? "pointer" : "not-allowed",
      opacity: onClick ? 1 : 0.6,
      border: "none",
      backgroundColor:
        type === "green"
          ? "rgb(160, 255, 160)"
          : type === "red"
          ? "rgb(255, 150, 150)"
          : "rgb(185, 185, 255)",
      transition: "background 0.2s",
    };

    if (selected) {
      baseStyle.backgroundColor = "lightsalmon";
    }

    return (
      <button key={text} style={baseStyle} onClick={onClick} disabled={!onClick}>
        {text}
      </button>
    );
  };

  return (
    <div
      style={{
        fontFamily: "fantasy",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "2rem",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, auto)",
          backgroundColor: "#f0f0f0",
          padding: "1rem",
          borderRadius: "20px",
          border: "2px solid black",
          width: "fit-content",
        }}
      >
        <div
          style={{
            gridColumn: "span 5",
            backgroundColor: "bisque",
            borderRadius: "10px",
            border: "2px solid gray",
            textAlign: "right",
            padding: "0.5rem",
            fontSize: "1.5rem",
            marginBottom: "1rem",
          }}
        >
          {updateDisplay()}
        </div>

        {renderButton("MC", null, "green")}
        {renderButton("MR", null, "green")}
        {renderButton("M+", null, "green")}
        {renderButton("M−", null, "green")}
        {renderButton("CE", ceClick, "red")}

        {renderButton("7", () => numberClick(7))}
        {renderButton("8", () => numberClick(8))}
        {renderButton("9", () => numberClick(9))}
        {renderButton("÷", null, "green")}
        {renderButton("SQ", null, "green")}

        {renderButton("4", () => numberClick(4))}
        {renderButton("5", () => numberClick(5))}
        {renderButton("6", () => numberClick(6))}
        {renderButton("×", null, "green")}
        {renderButton("%", null, "green")}

        {renderButton("1", () => numberClick(1))}
        {renderButton("2", () => numberClick(2))}
        {renderButton("3", () => numberClick(3))}
        {renderButton("−", () => operatorClick("-"), "green", operator === "-")}
        {renderButton("1/X", null, "green")}

        {renderButton("0", () => numberClick(0))}
        {renderButton(".", null)}
        {renderButton("+/−", null)}
        {renderButton("+", () => operatorClick("+"), "green", operator === "+")}
        {renderButton("=", equlClick, "green")}
      </div>

      <div style={{ fontSize: "1.5rem", marginTop: "1rem" }}>
        67159224 รัชภูมิ ธรรมประชา
      </div>
    </div>
  );
};

export default Calculator;
