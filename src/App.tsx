import React, { useEffect, useState } from "react";
import "./App.css";
import { SubmitModal } from "./components/submit-modal";

interface Form {
  name: string;
  email: string;
  password: string;
}

export const answers: string[] = [];

function App() {
  const [formInputs, setFormInputs] = useState<Form>({
    name: "",
    email: "",
    password: "",
  });
  const [inputEnabled, setInputEnabled] = useState<boolean[]>([
    false,
    false,
    false,
  ]);
  const [equation, setEquation] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitButtonDisabled, setSubmitButtonEnabled] = useState(true);
  const [submitModalOpen, setsubmitModalOpen] = useState<boolean>(false);

  useEffect(() => {
    // Check if submit button should be enabled
    if (inputsFilled() && answers.length === 3) {
      setSubmitButtonEnabled(false);
    } else {
      setSubmitButtonEnabled(true);
    }

    setInputEnabled([
      (formInputs.name.length > 0),
      !(formInputs.name.length > 0),
      !(formInputs.email.length > 0),
    ]);
  }, [formInputs]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const inputsFilled = (): boolean => {
    return Object.values(formInputs).every((value) => value.trim() !== "");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formInputs);
    //To do: Form submit button will only be active when the input fields are not empty
    setsubmitModalOpen(true);
  };

  //This function can be moved to InputModal component
  const handleEquationSubmit = () => {
    if (parseInt(userAnswer, 10) === correctAnswer) {
      answers.push(userAnswer);
      setModalOpen(false);
      setInputEnabled([
        false,
        !(formInputs.name.length > 0),
        !(formInputs.email.length > 0),
      ]);
      setUserAnswer("");
      setErrorMessage("");
      console.log(answers);
    } else {
      generateEquation()
      setErrorMessage("Incorrect answer, try again.");
      setUserAnswer("");
    }
  };

  const generateEquation = () => {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const num3 = Math.floor(Math.random() * 10);
    const num4 = Math.floor(Math.random() * 10);
    const answer = parseFloat(`${num1} + ${num2} / ${num3} * ${num4}`).toFixed(
      2
    );
    setEquation(`${num1} + ${num2} / ${num3} * ${num4}`);
    setCorrectAnswer(parseInt(answer));
  };

  const handleOnInputFocus = (index: number) => {
    generateEquation();
    if (answers[index] === undefined) {
      setInputEnabled((prev) => {
        const updated = [...prev];
        updated[index] = true;
        return updated;
      });
      setModalOpen(true);
    }
  };

  //To do: Create a function to handle maximum number of try for solving equation and providing the answers

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <h1>Anti Robot User Form</h1>
        <label htmlFor="name">
          Name
          <input
            name="name"
            id="name"
            type="text"
            value={formInputs.name}
            onChange={handleInputChange}
            disabled={inputEnabled[0]}
            onClick={() => handleOnInputFocus(0)}
          />
        </label>

        <label htmlFor="email">
          Email
          <input
            name="email"
            id="email"
            type="email"
            value={formInputs.email}
            onChange={handleInputChange}
            disabled={inputEnabled[1]}
            onClick={() => handleOnInputFocus(1)}
          />
        </label>

        <label htmlFor="password">
          Password
          <input
            name="password"
            id="password"
            type="password"
            value={formInputs.password}
            onChange={handleInputChange}
            disabled={inputEnabled[2]}
            onClick={() => handleOnInputFocus(2)}
          />
        </label>

        <button
          className={submitButtonDisabled ? "buttonDisabled" : "button"}
          type="submit"
          disabled={submitButtonDisabled}
        >
          Submit
        </button>
      </form>

      {/* Equation input modal. This can be move to a react component. */}
      {modalOpen && (
        <div className="modal">
          <p>Human? Solve: {equation}</p>
          <div style={{ color: "red" }}>{errorMessage && errorMessage}</div>
          <label htmlFor="userAnswer">
            <input
              name="userAnswer"
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
            />
          </label>
          <button className="button" onClick={handleEquationSubmit}>
            Answer
          </button>
        </div>
      )}

      {submitModalOpen && <SubmitModal answers={answers} />}
    </main>
  );
}

export default App;
