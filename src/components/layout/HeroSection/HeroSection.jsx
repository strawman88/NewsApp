import styles from './HeroSection.module.scss';

function HeroSection({ title, description, bgImage }) {
  return (
    <div 
      className={styles.showcase}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className={styles.overlay}>
        <h1><span>{title}</span></h1>
        <p>{description}</p>
      </div>
      
    </div>
  );
}

export default HeroSection;