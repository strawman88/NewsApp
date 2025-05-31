import styles from './Footer.module.scss'

function Footer() {
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <div className={styles.footerbottom}>
      <div className="container">
        <p className={styles.footerText}>
          <a href="/">AUSNEWSHUB</a> is a news website that provides the latest updates on technology, health, science, sports, Australian news, and world news. We are committed to delivering accurate and timely information to our readers. &copy; {getCurrentYear()} ALL RIGHTS RESERVED | <a href="/">AUSNEWSHUB</a>
        </p>

        <p>
          Images by{' '}
          <a
            href="https://pixabay.com/users/qimono-1962238/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1756274"
            target="_blank"
            rel="noopener noreferrer"
          >
            Arek Socha
          </a>{' '}
          from{' '}
          <a
            href="https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1756274"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pixabay
          </a>,{' '}
          <a
            href="https://pixabay.com/users/mintoosahu-2076123/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1252056"
            target="_blank"
            rel="noopener noreferrer"
          >
            mintoosahu
          </a>{' '}
          from{' '}
          <a
            href="https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1252056"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pixabay
          </a> and&nbsp;
          <a
            href="https://pixabay.com/users/schuetz-mediendesign-608937/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=546794"
            target="_blank"
            rel="noopener noreferrer"
          >
            Christoph Schütz
          </a>{' '}
          from{' '}
          <a
            href="https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=546794"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pixabay
          </a>
        </p>
      </div>
    </div>
  );
}

export default Footer;