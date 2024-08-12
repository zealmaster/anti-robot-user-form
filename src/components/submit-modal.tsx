import { useState } from "react";

const submitAnswers: string[] = [];

export function SubmitModal(params: { answers: string[] }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [userAnswer, setUserAnswer] = useState(["", "", ""]);
  const [modalOpen, setModalOpen] = useState(true);
  const storedAnswers = params.answers;

  // Function to submit answer inside modal
  const handleSubmitModal = () => {
    let correct = true;
    for (let i = 0; i < storedAnswers.length; i++) {
      if (storedAnswers[i] !== submitAnswers[i]) {
        correct = false;
        break;
      }
    }
    if (correct) setModalOpen(false);
  };

  const checkInputAnswer = (value: string, index: number) => {
    const newAnswers = [...userAnswer];
    newAnswers[index] = value;
    setUserAnswer(newAnswers);
    if (value === storedAnswers[index]) {
      submitAnswers.push(value);
      setErrorMessage("");
    } else {
      setErrorMessage("Incorrect answer, try again");
    }
  };

  return (
    <>
    {modalOpen && (
      <div className="modal-wrapper">
        <div className="modal">
          <p>A smart human? Provide all the previous answers</p>
          <div style={{ color: "red" }}>{errorMessage && errorMessage}</div>
          <label htmlFor="firstAnswer">
            <input
            name="firstAnswer"
            type="text"
            value={userAnswer[0]}
            onChange={(e) => checkInputAnswer(e.target.value, 0)}
          />
          </label>
          <label htmlFor="secondAnswer">
            <input
            name="secondAnswer"
            type="text"
            value={userAnswer[1]}
            onChange={(e) => checkInputAnswer(e.target.value, 1)}
          />
          </label>
          <label htmlFor="thirdAnswer">
            <input
            name="thirdAnswer"
            type="text"
            value={userAnswer[2]}
            onChange={(e) => checkInputAnswer(e.target.value, 2)}
          />
          </label>
          <button onClick={handleSubmitModal}>Answer</button>
        </div>
    </div>

      )}
    </>
  );
}
