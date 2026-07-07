import styles from './Timer.module.css';

const RADIUS = 28;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function getTimerColor(timeLeft, totalTime) {
  const ratio = timeLeft / totalTime;
  if (ratio > 0.6) return 'var(--color-success)';
  if (ratio > 0.3) return 'var(--color-warning)';
  return 'var(--color-error)';
}

export default function Timer({ timeLeft, totalTime }) {
  const ratio = timeLeft / totalTime;
  const offset = CIRCUMFERENCE * (1 - ratio);
  const color = getTimerColor(timeLeft, totalTime);
  const isUrgent = timeLeft <= 5;

  return (
    <div className={`${styles.wrapper} ${isUrgent ? styles.urgent : ''}`}>
      <svg className={styles.svg} viewBox="0 0 72 72" aria-hidden="true">
        <circle className={styles.trackCircle} cx="36" cy="36" r={RADIUS} />
        <circle
          className={styles.arcCircle}
          cx="36"
          cy="36"
          r={RADIUS}
          stroke={color}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
        />
      </svg>
      <span className={styles.number} style={{ color }} aria-live="polite" aria-label={`${timeLeft} segundos`}>
        {timeLeft}
      </span>
    </div>
  );
}
