import { computeResults } from '../utils/quiz.js';
import { LEVELS, LEVEL_EMOJIS } from '../constants.js';
import styles from './ResultScreen.module.css';

function getRating(percentage) {
  if (percentage >= 80) return { emoji: '🏆', msg: 'Excelente! Domínio total!' };
  if (percentage >= 50) return { emoji: '👍', msg: 'Bom resultado! Continue estudando.' };
  return { emoji: '📚', msg: 'Continue praticando!' };
}

export default function ResultScreen({ answers, selectedLevel, onRestart }) {
  const { total, correct, percentage, byLevel } = computeResults(answers);
  const { emoji, msg } = getRating(percentage);

  return (
    <div className={styles.container}>
      <span className={styles.trophy}>{emoji}</span>

      <div className={styles.scoreBlock}>
        <span className={styles.score}>{correct} / {total}</span>
        <span className={styles.percentage}>{percentage}% de acerto</span>
      </div>

      <span className={styles.ratingMsg}>{msg}</span>

      {selectedLevel === 'misto' && (
        <div className={styles.breakdown}>
          <span className={styles.breakdownTitle}>Resultado por nível</span>
          {Object.entries(byLevel).map(([level, data]) => (
            data.total > 0 && (
              <div key={level} className={styles.breakdownRow}>
                <span className={styles.breakdownLevel} data-level={level}>
                  {LEVEL_EMOJIS[level]} {LEVELS[level]}
                </span>
                <span className={styles.breakdownScore}>
                  {data.correct}/{data.total} ({data.percentage}%)
                </span>
              </div>
            )
          ))}
        </div>
      )}

      <button className={styles.restartBtn} onClick={onRestart}>
        🔄 Jogar novamente
      </button>
    </div>
  );
}
