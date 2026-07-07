import { LEVELS, LEVEL_EMOJIS, LEVEL_DESCRIPTIONS } from '../constants.js';
import styles from './HomeScreen.module.css';

export default function HomeScreen({ onStart }) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span className={styles.emoji}>🎯</span>
        <h1 className={styles.title}>Verdadeiro ou Falso</h1>
        <p className={styles.subtitle}>
          Teste seus conhecimentos em <strong>Logística &amp; Supply Chain</strong>.
          Escolha um nível e responda 10 perguntas contra o relógio.
        </p>
      </header>

      <section className={styles.levelsSection}>
        <p className={styles.levelsLabel}>Escolha o nível</p>
        <div className={styles.levelsGrid}>
          {Object.entries(LEVELS).map(([key, label]) => (
            <button
              key={key}
              className={styles.levelBtn}
              data-level={key}
              onClick={() => onStart(key)}
              aria-label={`Jogar no nível ${label}`}
            >
              <span className={styles.levelEmoji}>{LEVEL_EMOJIS[key]}</span>
              <span className={styles.levelName} data-level={key}>{label}</span>
              <span className={styles.levelDesc}>{LEVEL_DESCRIPTIONS[key]}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
