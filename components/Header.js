import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  return (
    <header className={`header`}>
      <Link href="/">
        <a>
          <Image
            alt="plusjam"
            src={"/images/logo.png"}
            width={84}
            height={36}
          />
        </a>
      </Link>
      <nav className={`nav`}>
        <Link href="/">
          <a className={``}>TOP</a>
        </Link>
        <Link href="/news">
          <a className={``}>NEWS</a>
        </Link>
        {/* <Link href="/contact">
          <a className={``}>CONTACT</a>
        </Link> */}
      </nav>
    </header>
  );
}
