import React, { useEffect, useRef, useState } from "react";
import * as styles from "../css/Navbar.module.css"; // Ensure this matches the correct case and path
import { NavLink, useLocation } from "react-router-dom";

const NavbarComponent = () => {
  const [activeLink, setActiveLink] = useState("home");
  const animationRef = useRef(null);
  const location =
    useLocation(); /* Preventing mounting and Remounting to smooth animation */

  const navItems = [
    { name: "Home", path: "/" },
  ];

  function updateAnimation(element) {
    if (element && animationRef.current) {
      const left = element.offsetLeft;
      const width = element.offsetWidth;
      animationRef.current.style.left = `${left}px`;
      animationRef.current.style.width = `${width}px`;
    }
  }

  // Update the animation when the active link changes
  useEffect(() => {
    const activeElement = document.querySelector(`[data-name="${activeLink}"]`);
    updateAnimation(activeElement);
  }, [activeLink]);

  useEffect(() => {
    const currentPath = location.pathname;
    const activeItem = navItems.find((item) => item.path === currentPath);
    if (activeItem) {
      setActiveLink(activeItem.name.toLowerCase());
    }
  }, [location.pathname, navItems]);

  return (
    <React.Fragment>
      <nav className={styles.nav}>
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
            onClick={() => setActiveLink(item.name.toLowerCase())}
            data-name={item.name.toLowerCase()}
          >
            {item.name}
          </NavLink>
        ))}
        <div
          className={`${styles.animation}`}
          ref={animationRef}
        ></div>
      </nav>
    </React.Fragment>
  );
};

export default NavbarComponent;
