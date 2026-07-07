import { useState, useEffect } from 'react';
import { TIMER_SECONDS } from '../constants.js';
import ProgressBar from './ProgressBar.jsx';
import Timer from './Timer.jsx';
import QuestionCard from './QuestionCard.jsx';
import styles from './QuizScreen.module.css';

export default function QuizScreen({ questions, currentIndex, feedbackState, onAnswer, onTimeout, onNext }) {
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const question = questions[currentIndex];

  // Reset timer when question changes
  useEffect(() => {
    setTimeLeft(TIMER_SECONDS);
  }, [currentIndex]);

  // Countdown tick — pauses during feedback
  useEffect(() => {
    if (feedbackState !== null) return;
    if (timeLeft <= 0) {
      onTimeout();
      return;
    }
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timeLeft, feedbackState, onTimeout]);

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <div className={styles.progressWrapper}>
          <ProgressBar current={currentIndex + 1} total={questions.length} />
        </div>
        <Timer timeLeft={timeLeft} totalTime={TIMER_SECONDS} />
      </div>

      <QuestionCard
        question={question}
        feedbackState={feedbackState}
        onAnswer={onAnswer}
      />

      {feedbackState !== null && (
        <button className={styles.nextBtn} onClick={onNext}>
          {currentIndex + 1 < questions.length ? 'Próxima pergunta →' : 'Ver resultado 🏆'}
        </button>
      )}
    </div>
  );
}
