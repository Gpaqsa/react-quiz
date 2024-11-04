import React, { useReducer } from "react";
const initialState = { count: 0, step: 1 };

const reducer = (state, action) => {
  console.log(state, action);

  switch (action.type) {
    case "dec":
      return { ...state, count: state.count - state.step };
    case "inc":
      return { ...state, count: state.count + state.step };
    case "setCount":
      return { ...state, count: action.payload };
    case "setStep":
      return { ...state, step: action.payload };
    case "reset":
      return initialState;
    default:
      throw new Error("Unknown action");
  }
};

const DateCounter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  const date = new Date("Oct 26 2024");
  date.setDate(date.getDate() + count);

  const inc = () => {
    dispatch({ type: "inc" });
  };

  const dec = () => {
    dispatch({ type: "dec" });
  };

  const defineCount = (e) => {
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  };

  const reset = () => {
    dispatch({ type: "reset" });
  };
  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min={0}
          max={10}
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>
      <div>
        <button onClick={dec}>-</button>
        <input
          type="text"
          placeholder="0000"
          value={count}
          onChange={defineCount}
        />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

export default DateCounter;
