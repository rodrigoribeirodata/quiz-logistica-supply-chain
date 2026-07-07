import { useState, useCallback } from 'react';
import allQuestions from './data/questions.json';
import { shuffleArray, filterQuestions } from './utils/quiz.js';
import HomeScreen from './components/HomeScreen.jsx';
import QuizScreen from './components/QuizScreen.jsx';
import ResultScreen from './components/ResultScreen.jsx';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home'); // 'home' | 'quiz' | 'result'
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [feedbackState, setFeedbackState] = useState(null); // null | { correct, userAnswer, timedOut, explanation }

  const handleStart = useCallback((level) => {
    const filtered = filterQuestions(allQuestions, level);
    if (filtered.length === 0) return;
    const shuffled = shuffleArray(filtered);
    setSelectedLevel(level);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setAnswers([]);
    setFeedbackState(null);
    setCurrentScreen('quiz');
  }, []);

  const handleAnswer = useCallback((userAnswer) => {
    const question = questions[currentIndex];
    const correct = userAnswer === question.answer;
    setAnswers((prev) => [...prev, { id: question.id, level: question.level, correct }]);
    setFeedbackState({ correct, userAnswer, timedOut: false, explanation: question.explanation });
  }, [questions, currentIndex]);

  const handleTimeout = useCallback(() => {
    const question = questions[currentIndex];
    setAnswers((prev) => [...prev, { id: question.id, level: question.level, correct: false }]);
    setFeedbackState({ correct: false, userAnswer: null, timedOut: true, explanation: question.explanation });
  }, [questions, currentIndex]);

  const handleNext = useCallback(() => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= questions.length) {
      setCurrentScreen('result');
    } else {
      setCurrentIndex(nextIndex);
      setFeedbackState(null);
    }
  }, [currentIndex, questions.length]);

  const handleRestart = useCallback(() => {
    setCurrentScreen('home');
    setSelectedLevel(null);
    setQuestions([]);
    setCurrentIndex(0);
    setAnswers([]);
    setFeedbackState(null);
  }, []);

  if (currentScreen === 'home') {
    return <HomeScreen onStart={handleStart} />;
  }

  if (currentScreen === 'quiz') {
    return (
      <QuizScreen
        questions={questions}
        currentIndex={currentIndex}
        feedbackState={feedbackState}
        onAnswer={handleAnswer}
        onTimeout={handleTimeout}
        onNext={handleNext}
      />
    );
  }

  return (
    <ResultScreen
      answers={answers}
      selectedLevel={selectedLevel}
      onRestart={handleRestart}
    />
  );
}
