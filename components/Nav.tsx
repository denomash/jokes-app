"use client";

import Image from "next/image";
import Link from "next/link";

import Button from "./Common/Button/Button";
import ToggleDarkMode from "./ToggleDarkMode";
import { useAuthContext } from "@context/AuthProvider";

/**
 * Navigation component
 * @returns
 */
const Nav = () => {
  const { token, logout } = useAuthContext();

  /**
   * Handle logout
   */
  const logOut = () => logout();

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center items-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Joker Logo"
          width={30}
          height={30}
          className="0bject-contain"
        />
        <p className="logo_text">Joker</p>
      </Link>

      <div className="flex">
        {token ? <Button onClick={logOut}>Sign Out</Button> : null}

        <ToggleDarkMode />
      </div>
    </nav>
  );
};

export default Nav;
