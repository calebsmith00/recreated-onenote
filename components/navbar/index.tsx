import Tabs from "@mui/material/Tabs";
import { useState } from "react";
import NavLink from "./navlink";
import links from "../../links.json" assert { type: "json" };

const Navbar = () => {
  const [activeLinkIndex, setActiveLinkIndex] = useState<number>(1);

  const handleLinkClick = (index: number) => {
    setActiveLinkIndex(index);
  };

  return (
    <Tabs value={activeLinkIndex}>
      {/* GET / */}
      <NavLink
        href={links.home.path}
        value={links.home.index}
        label={links.home.label}
        handleLinkClick={handleLinkClick}
      />

      {/* GET /create-template */}
      <NavLink
        href={links.create_template.path}
        value={links.create_template.index}
        label={links.create_template.label}
        handleLinkClick={handleLinkClick}
      />

      {/* GET /login */}
      <NavLink
        href={links.login.path}
        value={links.login.index}
        label={links.login.label}
        handleLinkClick={handleLinkClick}
      />
    </Tabs>
  );
};

export default Navbar;
