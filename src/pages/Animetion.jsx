import React, { useState, useEffect, useRef } from "react";

const Animation = () => {
  const fieldWidth = 750;
  const fieldHeight = 450;
  const ballDiameter = 100;
  const maxX = fieldWidth - ballDiameter;
  const maxY = fieldHeight - ballDiameter;

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [running, setRunning] = useState(false);
  const [selectedButton, setSelectedButton] = useState("None");

  // สุ่มทิศทางเริ่มต้น
  const goRightRef = useRef(Math.random() < 0.5);
  const goDownRef = useRef(Math.random() < 0.5);

  // ความเร็วแบบ state (สามารถปรับเปลี่ยนได้)
  const [vx, setVx] = useState(20);
  const [vy, setVy] = useState(10);

  const ballRef = useRef();
  const buttons = ["None","Basketball","Football","Voleyball","Cartoon","Human","Logo"];

  // การเคลื่อนที่ของลูกบอล
  useEffect(() => {
    const interval = setInterval(() => {
      if (running) {
        setX(prevX => {
          let nextX = goRightRef.current ? prevX + vx : prevX - vx;

          if (nextX >= maxX) {
            goRightRef.current = false;
            setVx(v => Math.max(5, v + (Math.random() * 10 - 5))); // random -5 ถึง +5
          }
          if (nextX <= 0) {
            goRightRef.current = true;
            setVx(v => Math.max(5, v + (Math.random() * 10 - 5)));
          }

          return Math.min(Math.max(nextX, 0), maxX);
        });

        setY(prevY => {
          let nextY = goDownRef.current ? prevY + vy : prevY - vy;

          if (nextY >= maxY) {
            goDownRef.current = false;
            setVy(v => Math.max(5, v + (Math.random() * 10 - 5)));
          }
          if (nextY <= 0) {
            goDownRef.current = true;
            setVy(v => Math.max(5, v + (Math.random() * 10 - 5)));
          }

          return Math.min(Math.max(nextY, 0), maxY);
        });
      }
    }, 25);

    return () => clearInterval(interval);
  }, [running, vx, vy, maxX, maxY]);

  // เปลี่ยนภาพลูกบอล
  useEffect(() => {
    if (ballRef.current) {
      ballRef.current.style.left = x + "px";
      ballRef.current.style.top = y + "px";

      switch (selectedButton) {
        case "None":
          ballRef.current.style.backgroundImage = "none";
          ballRef.current.style.backgroundColor = "black";
          break;
        case "Basketball":
          ballRef.current.style.backgroundImage = "url('/pic/Basketball.svg')";
          break;
        case "Football":
          ballRef.current.style.backgroundImage = "url('public/pic/volleyball-ball.jpg')";
          break;
        case "Voleyball":
          ballRef.current.style.backgroundImage = "url('public/pic/Basketball.svg')";
          break;
        case "Cartoon":
          ballRef.current.style.backgroundImage = "url('public/pic/conan.jpg')";
          break;
        case "Human":
          ballRef.current.style.backgroundImage = "url('public/pic/human.jpg')";
          break;
        case "Logo":
          ballRef.current.style.backgroundImage = "url('public/pic/Red and Black Pizza Restaurant Logo.png')";
          break;
        default:
          ballRef.current.style.backgroundImage = "none";
      }
    }
  }, [x, y, selectedButton]);

  const handleRun = () => setRunning(!running);
  const handleSelect = (name) => {
    setSelectedButton(name);
    ballRef.current.style.backgroundColor = "transparent";
  };
  const getRunBtn = () => running ? <i className="bi bi-pause"></i> : <i className="bi bi-play"></i>;

  return (
    <div style={{
      margin: "auto",
      width: fieldWidth + 60 + "px",
      padding: "20px",
      borderRadius: "15px",
      backgroundColor: "#f8f9fa",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
    }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px", fontWeight: "bold" }}>Animation</h1>

      {/* Field */}
      <div style={{
        width: fieldWidth + "px",
        height: fieldHeight + "px",
        border: "2px solid #333",
        borderRadius: "15px",
        backgroundImage: "url('public/pic/bg.jpg')",
        backgroundPosition: "center",
        backgroundSize: "cover",
        position: "relative",
        overflow: "hidden",
        margin: "0 auto"
      }}>
        <div ref={ballRef} style={{
          width: ballDiameter + "px",
          height: ballDiameter + "px",
          borderRadius: "50%",
          position: "absolute",
          left: x + "px",
          top: y + "px",
          backgroundColor: "black",
          backgroundPosition: "center",
          backgroundSize: "contain",
          transition: "background-image 0.2s"
        }}></div>
      </div>

      {/* Controls */}
      <div className="d-flex flex-wrap align-items-center justify-content-center mt-3 gap-3">

        {/* Run/Pause */}
        <button
          className={`btn ${running ? "btn-warning" : "btn-success"}`}
          onClick={handleRun}
        >
          {getRunBtn()} {running ? "PAUSE" : "RUN"}
        </button>

        {/* Image Selection Buttons */}
        <div className="d-flex flex-wrap gap-2 justify-content-center">
          {buttons.map(btn => (
            <button
              key={btn}
              className={`btn ${selectedButton === btn 
                ? (btn === "None" ? "btn-secondary" : "btn-primary")
                : (btn === "None" ? "btn-outline-secondary" : "btn-outline-primary")}`}
              onClick={() => handleSelect(btn)}
            >
              {btn}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Animation;
