import styles from './HeroSection.module.scss';


function HeroSection({ title, description, bgImage }) {
  // SEE on STATIC ASSETS: https://nextjs.org/docs/pages/building-your-application/optimizing/static-assets

  return (
    <div 
      className={styles.showcase}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className={styles.overlay}>
        <h1><span>{title}</span>news</h1>
        <p>{description}</p>
      </div>
      
    </div>
  );
}

export default HeroSection;