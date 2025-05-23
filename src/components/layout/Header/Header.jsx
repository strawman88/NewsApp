import Link from "next/link"
import styles from './Header.module.scss'

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <Link href='/'>
          &lt;
          <span className={styles.logoCore}>&nbsp;AUSNEWSHUB&nbsp;</span>
          &#47;&gt;
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link href='/about'><span>About</span>Us</Link>
          </li>
          <li>
            <Link href='/news/tech'><span>Tech</span>News</Link>
          </li>
          <li>
            <Link href='/news/aus'><span>Aus</span>News</Link>
          </li>
          <li>
            <Link href='/news/world'><span>Globe</span>News</Link>
          </li>
          <li>
            <Link href='/contact'><span>Contact</span>Us</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header