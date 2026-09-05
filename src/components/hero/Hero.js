import BoardingPass from './BoardingPass';
import styles from './Hero.module.css';
import HeroContent from './HeroContent';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.heroGrid}>
          <HeroContent />
          <BoardingPass />
        </div>
      </div>
    </section>
  );
}
