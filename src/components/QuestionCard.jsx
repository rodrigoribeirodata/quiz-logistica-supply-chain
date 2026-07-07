import styles from './QuestionCard.module.css';

const CATEGORY_LABELS = {
  'conceitos-gerais': 'Conceitos Gerais',
  'siglas-termos': 'Siglas & Termos',
  'conceitos-negocio': 'Conceitos de Negócio',
  'indicadores': 'Indicadores',
  'estoque-demanda': 'Estoque & Demanda',
  'transporte-distribuicao': 'Transporte & Distribuição',
  'supply-chain-estrategico': 'Supply Chain Estratégico',
  'armazenagem-cd': 'Armazenagem & CD',
};

export default function QuestionCard({ question, feedbackState, onAnswer }) {
  const isAnswered = feedbackState !== null;

  function getCardClass() {
    if (!isAnswered) return styles.card;
    if (feedbackState.timedOut) return styles.card;
    return `${styles.card} ${feedbackState.correct ? styles.correct : styles.wrong}`;
  }

  function getBtnClass(btnValue) {
    if (!isAnswered) return styles.answerBtn;
    const userAnswer = feedbackState.userAnswer;
    const correctAnswer = question.answer;

    if (btnValue === userAnswer) {
      return `${styles.answerBtn} ${feedbackState.correct ? styles.selectedCorrect : styles.selectedWrong}`;
    }
    if (btnValue === correctAnswer && !feedbackState.correct) {
      return `${styles.answerBtn} ${styles.correctHint}`;
    }
    return styles.answerBtn;
  }

  function renderFeedbackStatus() {
    if (feedbackState.timedOut) {
      return <span className={`${styles.feedbackStatus} ${styles.timeout}`}>⏱ Tempo esgotado!</span>;
    }
    if (feedbackState.correct) {
      return <span className={`${styles.feedbackStatus} ${styles.correct}`}>✓ Correto!</span>;
    }
    return <span className={`${styles.feedbackStatus} ${styles.wrong}`}>✗ Incorreto</span>;
  }

  return (
    <div className={getCardClass()}>
      <span className={styles.categoryTag}>{CATEGORY_LABELS[question.category] ?? question.category}</span>
      <p className={styles.statement}>{question.statement}</p>

      <div className={styles.buttons}>
        <button
          className={getBtnClass(true)}
          onClick={() => !isAnswered && onAnswer(true)}
          disabled={isAnswered}
          aria-label="Verdadeiro"
        >
          ✓ Verdadeiro
        </button>
        <button
          className={getBtnClass(false)}
          onClick={() => !isAnswered && onAnswer(false)}
          disabled={isAnswered}
          aria-label="Falso"
        >
          ✗ Falso
        </button>
      </div>

      {isAnswered && (
        <div className={styles.feedback}>
          {renderFeedbackStatus()}
          <p className={styles.explanation}>{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
