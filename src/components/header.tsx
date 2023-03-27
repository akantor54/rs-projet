import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import styles from "../styles/components/Header.module.css";

const Header = () => {
  const { data: session } = useSession();
  return (
    <header className={styles.header}>
      <h2>JSP QUOI METTRE</h2>
      <nav className={styles.nav}>
        <ul className={styles.liens}>
          <li>
            <Link className={styles.lien} href="/">
              Home
            </Link>
          </li>
          <li>
            <Link className={styles.lien} href={`/profil/${session?.user?.id}`}>
              {session?.user?.name}
            </Link>
          </li>
        </ul>
        <button className={styles.disconnect} onClick={() => signOut()}>
          Deconnexion
        </button>
      </nav>
    </header>
  );
};

export default Header;
