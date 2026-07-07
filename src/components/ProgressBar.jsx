import styles from './ProgressBar.module.css';

export default function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>Pergunta {current} de {total}</span>
      <div className={styles.track} role="progressbar" aria-valuenow={current} aria-valuemin={1} aria-valuemax={total}>
        <div className={styles.fill} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
