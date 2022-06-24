import Tabs from "@mui/material/Tabs";
import { useState } from "react";
import NavLink from "./navlink";
import links from "../../links.json" assert { type: "json" };

const Navbar = () => {
  const [activeLinkIndex, setActiveLinkIndex] = useState<number>(1);

  const handleLinkClick = (index: number) => {
    setActiveLinkIndex(index);
  };

  const retrieveLinks = () => {
    const linkElements = Object.values(links);
    return linkElements.map((link) => {
      return (
        <NavLink
          key={link.index}
          href={link.path}
          value={link.index}
          label={link.label}
          handleLinkClick={handleLinkClick}
        />
      );
    });
  };

  return <Tabs value={activeLinkIndex}>{retrieveLinks()}</Tabs>;
};

export default Navbar;
