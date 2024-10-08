import React, { useContext, useEffect } from "react";
import * as styles from "../css/Home.module.css";
import profileImages from "../assets/img_1-.jpeg";
import User from "../Context/User";
import GitHubIcon from "@mui/icons-material/GitHub";
import JavascriptIcon from "@mui/icons-material/Javascript";
import HtmlIcon from "@mui/icons-material/Html";
import { NavLink } from "react-router-dom";
import MySVG from "../assets/index";

const HomeComponent = () => {
  const { paragraph } = useContext(User);

  useEffect(() => {
    paragraph;
  }, []);

  return (
    <React.Fragment>
      <div className={styles.container_grid}>
        <img src={profileImages} alt="Profile" />
        <fieldset>
          <legend>My Profile</legend>
          <p>{paragraph}</p>
        </fieldset>
      </div>
      <div className={styles.fe_container}>
        <p>Frontend</p>
        <div className={styles.fe_item}>
          <img src={MySVG.webpacksvg} />
          <img src={MySVG.css} />
          <img src={MySVG.reactsvg} />
          <img src={MySVG.vitesvg} />
          <NavLink to="https://github.com/Jesko701" target="_blank">
            <GitHubIcon className={styles.svgStyle} />
          </NavLink>
          <JavascriptIcon className={styles.svgStyle} />
          <HtmlIcon className={styles.svgStyle} />
        </div>
      </div>

      <div className={styles.be_container}>
        <p>Backend</p>
        <div className={styles.be_item}>
          <img src={MySVG.postgres} />
          <img src={MySVG.docker} />
          <img src={MySVG.golang} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default HomeComponent;
