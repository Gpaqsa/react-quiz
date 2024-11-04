import React, { useReducer } from "react";

const date = new Date();
const initialState = {
  month: date.getMonth(),
  day: date.getDate(),
  year: date.getFullYear(),
};

const reducer = (state, action) => {
  console.log(state);

  switch (action.type) {
    case "nextMonth":
      return { ...state, month: (state.month + 1) % 12 };
    case "nextDay":
      return { ...state, day: state.day + 1 };
    case "nextYear":
      return { ...state, year: state.year + 1 };
    default:
      throw new Error("Unknown action");
  }
};

const UpdateDate = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { month, day, year } = state;

  const nextMonth = () => {
    dispatch({ type: "nextMonth" });
  };
  const nextDay = () => {
    dispatch({ type: "nextDay" });
  };
  const nextYear = () => {
    dispatch({ type: "nextYear" });
  };

  return (
    <div>
      <h1>{month}</h1>
      <h1>{day}</h1>
      <h1>{year}</h1>

      <div>
        <button onClick={nextMonth}>Next Month</button>
        <button onClick={nextDay}>Next Day</button>
        <button onClick={nextYear}>Next Year</button>
      </div>
    </div>
  );
};

export default UpdateDate;
