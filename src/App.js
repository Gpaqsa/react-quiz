import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import axios from "axios";
import Loader from "./components/Loader";
import { Error } from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
const initialState = {
  questions: [],

  // isLoading states: 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
};

const reducer = (state, action) => {
  console.log(state, action);

  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFaild":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    default:
      throw new Error("Unknown action");
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status, index } = state;

  // Default numQuestions to 0 if questions is undefined or not an array
  const numQuestions = Array.isArray(questions) ? questions.length : 0;

  const URL = "http://localhost:8000/questions";
  useEffect(() => {
    axios
      .get(URL)
      .then((res) => dispatch({ type: "dataReceived", payload: res.data }))
      .catch((error) => dispatch({ type: "dataFaild" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && questions[index] && (
          <Question question={questions[index]} />
        )}
      </Main>
    </div>
  );
}

export default App;
