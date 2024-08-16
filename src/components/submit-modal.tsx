import { useState } from "react";
import { TimedModal } from "./timedModal";

const submitAnswers: string[] = [];

export function SubmitModal({
  answers,
  onSuccess,
}: {
  answers: string[];
  onSuccess: () => void;
}) {
  const [errorMessage, setErrorMessage] = useState("");
  const [userAnswer, setUserAnswer] = useState(["", "", ""]);
  const [modalOpen, setModalOpen] = useState(true);
  const storedAnswers = answers;
  const [inputAnswerAttempt, setInputAnswerAttempt] = useState(1);
  const [showResponseModal, setShowResponseModal] = useState<boolean>(false);
  const [submitAnswerAttempt, setSubmitAnswerAttempt] = useState<number>(1);

  const handleSubmitModal = () => {
    let correct = true;
    for (let i = 0; i < storedAnswers.length; i++) {
      if (storedAnswers[i] !== submitAnswers[i]) {
        correct = false;
        break;
      }
    }
    if (correct) {
      setModalOpen(false);
      onSuccess(); // Redirect to the success page
    } else {
      setErrorMessage("Incorrect answer, try again");
      setSubmitAnswerAttempt(submitAnswerAttempt + 1)
      if (submitAnswerAttempt === 3) {
        setModalOpen(false);
        setShowResponseModal(true);
      }
    }
  };

  const checkInputAnswer = (value: string, index: number) => {
    const newAnswers = [...userAnswer];
    newAnswers[index] = value;
    setUserAnswer(newAnswers);
    if (value === storedAnswers[index]) {
      submitAnswers[index] = value;
      setErrorMessage("");
    } else {
      setErrorMessage("Incorrect answer, try again");
      setInputAnswerAttempt(inputAnswerAttempt + 1)
      if (inputAnswerAttempt === 13) {
        setModalOpen(false);
        setShowResponseModal(true);
      }
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
                placeholder="Answer to first question"
              />
            </label>
            <label htmlFor="secondAnswer">
              <input
                name="secondAnswer"
                type="text"
                value={userAnswer[1]}
                onChange={(e) => checkInputAnswer(e.target.value, 1)}
                placeholder="Answer to second question"
              />
            </label>
            <label htmlFor="thirdAnswer">
              <input
                name="thirdAnswer"
                type="text"
                value={userAnswer[2]}
                onChange={(e) => checkInputAnswer(e.target.value, 2)}
                placeholder="Answer to third question"
              />
            </label>
            <button className="button" onClick={handleSubmitModal}>
              Answer
            </button>
          </div>
        </div>
      )}
      {showResponseModal && <TimedModal />}
    </>
  );
}
