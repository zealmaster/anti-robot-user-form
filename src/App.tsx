import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitModal } from "./components/submit-modal";
import "./App.css";
import { TimedModal } from "./components/timedModal";

  interface Form {
    name: string;
    email: string;
    password: string;
  }

  // export const answers: string[] = [];

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


  useEffect(() => {
    if (inputsFilled()) {
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
    localStorage.setItem("name", formInputs.name)
    setSubmitModalOpen(true);
  };

  const handleEquationSubmit = () => {
    if (parseInt(userAnswer, 10) === correctAnswer && currentIndex !== null) {
      // answers.push(userAnswer);
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
      startTimer(currentIndex);
    } else {
      generateEquation()
      setErrorMessage("Incorrect answer, try again.");
      setUserAnswer("");
      setAnswerAttempt(answerAttempt + 1)
      if (answerAttempt === 3) {
        setShowResponseModal(true);
      }
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

    const startTimer = (index: number) => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setFormInputs((prev) => ({
          ...prev,
          [Object.keys(formInputs)[index] as keyof Form]: "",
        }));

        const updatedAnswers = [...answers];
        // @ts-ignore
        updatedAnswers[index] = undefined;
        setAnswers(updatedAnswers);
      }, 20000);
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
        {/* Equation input modal. This can be move to a react component. */}

      {submitModalOpen && (
        <SubmitModal
          answers={answers}
          onSuccess={() => navigate("/success")}
        />
      )}
      {showResponseModal && <TimedModal />}

    </main>
  );
}

  export default App;
