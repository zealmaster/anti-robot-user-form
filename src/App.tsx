  import React, { useEffect, useRef, useState } from "react";
  import "./App.css";
  import { SubmitModal } from "./components/submit-modal";
  import { TimedModal } from "./components/timedModal";

  interface Form {
    name: string;
    email: string;
    password: string;
  }

  // export const answers: string[] = [];

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
    const [answerAttempt, setAnswerAttempt] = useState(1);
    const [showResponseModal, setShowResponseModal] = useState<boolean>(false);
    const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
    const [answers, setAnswers] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);


    useEffect(() => {
      // Check if submit button should be enabled
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
      setsubmitModalOpen(true);
    };

    //This function can be moved to InputModal component
    const handleEquationSubmit = () => {
      console.log(currentIndex);
      if (parseInt(userAnswer, 10) === correctAnswer && currentIndex !== null) {
        const updatedAnswers = [...answers];
        updatedAnswers[currentIndex] = userAnswer;
        setAnswers(updatedAnswers);
        setModalOpen(false);
        setUserAnswer("");
        setErrorMessage("");
        startTimer(currentIndex);
        console.log("answers", updatedAnswers, userAnswer);
      } else {
        setErrorMessage("Incorrect answer, try again.");
        setUserAnswer("");
        setAnswerAttempt(answerAttempt + 1);
        if (answerAttempt === 3) {
          setModalOpen(false);
          setShowResponseModal(true);
        }
      }
    };

    const generateEquation = () => {
      const num1 = Math.floor(Math.random() * 10);
      const num2 = Math.floor(Math.random() * 10);
      const answer = num1 + num2;
      setEquation(`${num1} + ${num2}`);
      setCorrectAnswer(answer);
    };

    // const handleOnInputFocus = (index: number) => {
    //   generateEquation();
    //     if (answers[index] === undefined) {
    //     console.log('input', answers[index]);
    //     setInputEnabled((prev) => {
    //       const updated = [...prev];
    //       updated[index] = true;
    //     console.log('inputUpdated', updated);
    //       return updated;
    //     });
    //     setModalOpen(true);
    //   }
    // };

    const handleOnInputFocus = (index: number) => {
      setCurrentIndex(index);
      generateEquation();
      if (answers[index] === undefined) {
        setInputEnabled((prev) => {
          const updated = [...prev];
          updated[index] = true;
          console.log(updated);
          return updated;
        });
        setModalOpen(true);
      }
    };

    const startTimer =( index: number) => {
      console.log('Timer started for', index);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        const updatedAnswers = [...answers];
        //@ts-ignore
        updatedAnswers[index] = undefined;
        setAnswers(updatedAnswers);
        console.log('Timer for', index, 'completed');
      }, 3000);
    }


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

            <button className={submitButtonDisabled ? 'buttonDisabled' : 'button'} type="submit" disabled={submitButtonDisabled}>
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
            /></label>
            <button className="button" onClick={handleEquationSubmit}>Answer</button>
          </div>
        )}

        {submitModalOpen && <SubmitModal answers={answers} />}
        {showResponseModal && <TimedModal />}
      </main>
    );
  }

  export default App;
