import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitModal } from "./components/submit-modal";
import "./App.css";

interface Form {
  name: string;
  email: string;
  password: string;
}

export const answers: string[] = [];

function App() {
  const navigate = useNavigate();
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
  const [submitModalOpen, setSubmitModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (inputsFilled() && answers.length === 3) {
      setSubmitButtonEnabled(false);
    } else {
      setSubmitButtonEnabled(true);
    }
  }, [formInputs, answers]);

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
    setSubmitModalOpen(true);
  };

  const handleEquationSubmit = () => {
    if (parseInt(userAnswer, 10) === correctAnswer) {
      answers.push(userAnswer);
      setModalOpen(false);
      setInputEnabled([false, false, false]);
      setUserAnswer("");
      setErrorMessage("");
    } else {
      setErrorMessage("Incorrect answer, try again.");
      setUserAnswer("");
    }
  };

  const generateEquation = () => {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const answer = num1 + num2;
    setEquation(`${num1} + ${num2}`);
    setCorrectAnswer(answer);
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

      {submitModalOpen && (
        <SubmitModal
          answers={answers}
          onSuccess={() => navigate("/success")}
        />
      )}
    </main>
  );
}

export default App;
