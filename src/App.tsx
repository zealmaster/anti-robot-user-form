import React, { useState, useEffect, useRef } from "react";
import { Form, useNavigate } from "react-router-dom";
import { SubmitModal } from "./components/submit-modal";
import "./App.css";
import { TimedModal } from "./components/timedModal";
import { cursorTo } from "readline";

interface Form {
  name: string;
  email: string;
  password: string;
}

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
  const [answerAttempt, setAnswerAttempt] = useState(1);
  const [showResponseModal, setShowResponseModal] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isTyping, setTyping] = useState<boolean>(true);
  const [currentInput, setCurrentInput] = useState<string>("");

  useEffect(() => {
    if (inputsFilled()) {
      setSubmitButtonEnabled(false);
    } else {
      setSubmitButtonEnabled(true);
    }

    setInputEnabled([
      false,
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

    if(currentIndex !== null) {
      startTimer(currentIndex, value);
    }
  };

  const inputsFilled = (): boolean => {
    return Object.values(formInputs).every((value) => value.trim() !== "");
  };

  // Handle form submit by showing another modal to provide all the answers to the security questions provided to verify a user
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("name", formInputs.name);
    setSubmitModalOpen(true);
  };

  // Verify answer to the security question of each field.
  const handleEquationSubmit = () => {
    if (parseInt(userAnswer, 10) === correctAnswer && currentIndex !== null) {
      const updatedAnswers = [...answers];
      updatedAnswers[currentIndex] = userAnswer;
      setAnswers(updatedAnswers);
      setModalOpen(false);
      setInputEnabled([
        false,
        !(formInputs.name.length > 0),
        !(formInputs.email.length > 0),
      ]);
      setUserAnswer("");
      setErrorMessage("");
      setTyping(false);
      startTimer(currentIndex);
    } else {
      generateEquation();
      setErrorMessage("Incorrect answer, try again.");
      setUserAnswer("");
      setAnswerAttempt(answerAttempt + 1);
      if (answerAttempt === 3) {
        setModalOpen(false);
        setShowResponseModal(true);
      }
    }
  };

  // Generate random equation for security question.
  const generateEquation = () => {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const num3 = Math.floor(Math.random() * 10);
    const num4 = Math.floor(Math.random() * 10);
    const result1 = num2 / num3;
    const result2 = result1 * num4;
    const answer = parseFloat((num1 + result2).toFixed(2));
    setEquation(`${num1} + ${num2} / ${num3} * ${num4}`);
    setCorrectAnswer(answer);
  };

  // Open modal with security question if the field is not already verified.
  const handleOnInputFocus = (index: number) => {
    setCurrentIndex(index);
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

  // Timer to solve another security question again if a field is left empty after 20 second after verified to enter input value.
  const startTimer = (index: number, inputValue?: string) => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
      if (!inputValue) {
        const updatedAnswers = [...answers];
        // @ts-ignore
        updatedAnswers[index] = undefined;
        setAnswers(updatedAnswers);
      } else {
        clearTimeout(timeoutRef.current);
      }
    }, 5000);
  };

  console.log()

  // Check if a field is empty after verified to enter value.
  const checkedEmptyField = () => {
    if (
      currentIndex !== null &&
      formInputs[Object.keys(formInputs)[currentIndex] as keyof Form].length !==
        0
    ) {
      setTyping(true);
      console.log(isTyping);
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
            onKeyDown={checkedEmptyField}
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
            onKeyDown={checkedEmptyField}
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
            onKeyDown={checkedEmptyField}
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
        <SubmitModal answers={answers} onSuccess={() => navigate("/success")} />
      )}
      {showResponseModal && <TimedModal />}
    </main>
  );
}

export default App;
