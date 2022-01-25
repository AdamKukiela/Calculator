import { useState } from "react";

function App() {
  const [equation, setEquation] = useState(" ");
  const [result, setResult] = useState(" ");
  const mathOperators = ["/", "*", "+", "-", "."];

  function updateEquation(value: string): void {
    if (
      (mathOperators.includes(value) && equation === "") ||
      (mathOperators.includes(value) &&
        mathOperators.includes(equation.slice(-1)))
    ) {
      return;
    }
    setEquation(equation + value);

    if (!mathOperators.includes(value)) {
      setResult(eval(equation + value).toString());
    }
  }

  function createDigits(): JSX.Element[] {
    const digits = [];
    for (let i = 1; i < 10; i++) {
      digits.push(
        <button onClick={() => updateEquation(i.toString())} key={i}>
          {i}
        </button>
      );
    }
    return digits;
  }

  function outcome(): void {
    setEquation(eval(equation).toString());
  }

  function deleteEquation(): void {
    if (equation == "") {
      return;
    }

    const value = equation.slice(0, -1);

    setEquation(value);
  }

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          {result ? <span> ({result}) </span> : ""}
          {equation || "0"}
          <div className="operators">
            <button onClick={() => updateEquation("/")}>/</button>
            <button onClick={() => updateEquation("*")}>*</button>
            <button onClick={() => updateEquation("+")}>+</button>
            <button onClick={() => updateEquation("-")}>-</button>
            <button onClick={deleteEquation}>DEL</button>
          </div>
          <div className="digits">
            {createDigits()}
            <button onClick={() => updateEquation("0")}>0</button>
            <button onClick={() => updateEquation(".")}>.</button>
            <button onClick={outcome}>=</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
