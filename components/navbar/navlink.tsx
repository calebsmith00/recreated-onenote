import Tab from "@mui/material/Tab";
import Link from "next/link";
import { SetStateAction, useEffect, useState, Dispatch } from "react";
import links from "../../links.json";

export type NavLinkProps = {
  href: string;
  label?: string;
  value?: number;
  handleLinkClick: Function;
};

/**
 * @category Components
 * @param props
 */
const NavLink = ({ href, value, handleLinkClick, label }: NavLinkProps) => {
  const [index, setIndex] = useState<number>(1);

  useEffect(() => {
    const amountOfLinks = Object.keys(links).length;
    setIndex(value || amountOfLinks + 1);
  }, [value]);

  return (
    <Link href={href}>
      <Tab
        component="a"
        label={label}
        value={index}
        onClick={() => handleLinkClick(index)}
      />
    </Link>
  );
};

export default NavLink;
