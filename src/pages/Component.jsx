import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// ---------- Value Component ----------
const Value = ({ name, value, setValue }) => {
  return (
    <div className="border border-black border-2 rounded-2 m-auto p-2 bg-secondary-subtle mt-3" style={{ width: 'fit-content' }}>
      <h1 className="text-primary">{name || 'Value'}</h1>
      <div className="d-flex justify-content-between align-items-center gap-2">
        <button className="btn btn-danger" onClick={() => setValue(p => p - 1)}>&minus;</button>
        <div className="fs-3 fw-bold">{value}</div>
        <button className="btn btn-success" onClick={() => setValue(p => p + 1)}>+</button>
      </div>
    </div>
  );
};

// ---------- Adder Component ----------
const Adder = ({ name }) => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  return (
    <div className="border border-black border-2 mx-auto rounded-3 mt-3 p-2" style={{ width: 'fit-content' }}>
      <h1 className="text-primary text-center">{name || 'ADDER'}</h1>
      <div className="d-flex justify-content-between align-items-center">
        <div className="badge bg-secondary">A = {a}</div>
        <div className="badge bg-primary">A + B = {a + b}</div>
        <div className="badge bg-secondary">B = {b}</div>
      </div>
      <div className="d-flex gap-2">
        <Value name='A' value={a} setValue={setA} />
        <Value name='B' value={b} setValue={setB} />
      </div>
    </div>
  );
};

// ---------- Temperature Component ----------
const Temperature = () => {
  const [celsius, setCelsius] = useState(25.0);
  const [fahrenheit, setFahrenheit] = useState(77.0);
  const [kelvin, setKelvin] = useState(298.15);

  const updateFromCelsius = (c) => {
    setCelsius(c);
    setFahrenheit((c * 9 / 5) + 32);
    setKelvin(c + 273.15);
  };

  const updateFromFahrenheit = (f) => {
    setFahrenheit(f);
    const c = (f - 32) * 5 / 9;
    setCelsius(c);
    setKelvin(c + 273.15);
  };

  const updateFromKelvin = (k) => {
    setKelvin(k);
    const c = k - 273.15;
    setCelsius(c);
    setFahrenheit((c * 9 / 5) + 32);
  };

  return (
    <div className="border border-black border-2 rounded-3 mx-auto p-3 mt-3 bg-secondary-subtle">
      <h1 className="text-center">TEMPERATURES</h1>
      <div className="d-flex justify-content-center gap-2 mb-3">
        <span className="badge bg-primary fs-6">{celsius.toFixed(2)} °C</span>
        <span className="badge bg-primary fs-6">{fahrenheit.toFixed(2)} °F</span>
        <span className="badge bg-primary fs-6">{kelvin.toFixed(2)} °K</span>
      </div>
      <div className="d-flex gap-2 justify-content-center align-items-center">
  <div className="border border-black border-2 rounded-3 p-2 bg-light">
    <h5>CELSIUS</h5>
    <div className="d-flex gap-2 align-items-center">
      <button className="btn btn-danger" onClick={() => updateFromCelsius(celsius - 1)}>-</button>
      <span className="fs-4 fw-bold">{celsius.toFixed(2)}</span>
      <button className="btn btn-success" onClick={() => updateFromCelsius(celsius + 1)}>+</button>
    </div>
  </div>
  <div className="border border-black border-2 rounded-3 p-2 bg-light">
    <h5>FAHRENHEIT</h5>
    <div className="d-flex gap-2 align-items-center">
      <button className="btn btn-danger" onClick={() => updateFromFahrenheit(fahrenheit - 1)}>-</button>
      <span className="fs-4 fw-bold">{fahrenheit.toFixed(2)}</span>
      <button className="btn btn-success" onClick={() => updateFromFahrenheit(fahrenheit + 1)}>+</button>
    </div>
  </div>
  <div className="border border-black border-2 rounded-3 p-2 bg-light">
    <h5>KELVIN</h5>
    <div className="d-flex gap-2 align-items-center">
      <button className="btn btn-danger" onClick={() => updateFromKelvin(kelvin - 1)}>-</button>
      <span className="fs-4 fw-bold">{kelvin.toFixed(2)}</span>
      <button className="btn btn-success" onClick={() => updateFromKelvin(kelvin + 1)}>+</button>
    </div>
  </div>
</div>
    </div>
  );
};

// ---------- Timer Component ----------
const Timer = () => {
  const [second, setSecond] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => setSecond(prev => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const convertToString = sec => {
    const MIN = 60, HOUR = 3600, DAY = 86400;
    const day = Math.floor(sec / DAY);
    const hour = Math.floor((sec % DAY) / HOUR);
    const min = Math.floor((sec % HOUR) / MIN);
    const s = sec % MIN;
    return `${day} Day ${hour} Hr ${min} m ${s} s`;
  };

  return (
    <div className="border border-black border-2 rounded-3 mx-auto p-3 bg-secondary-subtle mt-3" style={{ width: "fit-content" }}>
      <h1 className="text-primary text-center">TIMER</h1>
      <input className="form-control fs-4 fw-bold text-end mb-4" style={{ minWidth: 280 }} value={convertToString(second)} readOnly />
      <div className="d-flex justify-content-center gap-3">
        <button className="btn btn-danger" onClick={() => { setSecond(0); setIsRunning(false); }}>
          <i className="bi bi-arrow-counterclockwise"></i>&nbsp;Reset
        </button>
        <button className={`btn ${isRunning ? 'btn-warning' : 'btn-success'}`} onClick={() => setIsRunning(!isRunning)}>
          <i className={`bi ${isRunning ? 'bi-pause' : 'bi-play'}`}></i>&nbsp;{isRunning ? 'Pause' : 'Run'}
        </button>
      </div>
    </div>
  );
};

// ---------- RadixCounter Component ----------
const RadixCounter = () => {
  const [value, setValue] = useState(0);

  const minusClick = () => setValue(prev => prev <= 0 ? 4095 : prev - 1);
  const resetClick = () => setValue(0);
  const plusClick = () => setValue(prev => prev >= 4095 ? 0 : prev + 1);

  const toHex = num => num.toString(16).toUpperCase().padStart(3, '0');
  const toOct = num => num.toString(8).padStart(4, '0');
  const toBin = num => num.toString(2).padStart(12, '0');

  return (
    <div className="border border-2 border-black rounded-3 p-3 m-auto mt-3" style={{ width: '400px' }}>
      <div className="text-center fw-bold fs-4">RADIX COUNTER</div>
      <div className="d-flex justify-content-between mt-3">
        <div className="text-center fw-bold"><div className="fw-bold">[HEX]</div>{toHex(value)}</div>
        <div className="text-center fw-bold"><div className="fw-bold">[DEC]</div>{value.toString().padStart(4, '0')}</div>
        <div className="text-center fw-bold"><div className="fw-bold">[OCT]</div>{toOct(value)}</div>
        <div className="text-center fw-bold"><div className="fw-bold">[BIN]</div>{toBin(value)}</div>
      </div>
      <div className="mt-3 d-flex justify-content-around">
        <button className="btn btn-danger px-4" onClick={minusClick}>&minus;</button>
        <button className="btn btn-secondary" onClick={resetClick}>RESET</button>
        <button className="btn btn-success px-4" onClick={plusClick}>+</button>
      </div>
    </div>
  );
};

// ---------- App Component ----------
const App = () => {
  const [counter, setCounter] = useState(3); // 👈 เพิ่ม state สำหรับ COUNTER

  return (
    <div className="container my-3">
      {/* 👇 เพิ่ม COUNTER ตรงนี้ */}
      <Value name="COUNTER" value={counter} setValue={setCounter} />

      <Adder name="Simple Adder" />
      <Temperature />
      <Timer />
      <RadixCounter />
    </div>
  );
};

export default App;