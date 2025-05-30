import Link from "next/link"
import styles from './Header.module.scss'

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <Link href='/'>
          AUS<span className={styles.logoCore}>NEWS</span>HUB
        </Link>
      </div>
      <nav className={styles.navContainer}>
        <ul className={styles.mainLinks}>
          <li>
            <Link href='/about'><span>About</span></Link>
          </li>
          <li>
            <Link href='/faq'><span>FAQ</span></Link>
          </li>
          <li>
            <Link href='/contact'><span>Contact</span></Link>
          </li>
        </ul>
        
        <ul className={styles.newsLinks}>
          <button>
            <Link href='/news/tech'><span>Tech</span>News</Link>
          </button>
          <button>
            <Link href='/news/health'><span>Health</span>News</Link>
          </button>
          <button>
            <Link href='/news/science'><span>Science</span>News</Link>
          </button>
          <button>
            <Link href='/news/sports'><span>Sports</span>News</Link>
          </button>
          <button>
            <Link href='/news/aus'><span>Aus</span>News</Link>
          </button>
          <button>
            <Link href='/news/world'><span>World</span>News</Link>
          </button>
        </ul>
      </nav>
    </header>
  )
}

export default Header