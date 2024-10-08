import React from "react";
import * as styles from "../css/Footer.module.css";

function FooterComponent() {
  return (
    <React.Fragment>
      <footer className={styles.container}>
        <div className={styles.ul_container}>
          <ul>
            <li>
              <a href="https://github.com/Jesko701" target="_blank">Github</a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/jp701/" target="_blank">LinkedIn</a>
            </li>
          </ul>
        </div>
        <p>Copyright © Jovial Pattiasina. All Rights Reserved</p>
      </footer>
    </React.Fragment>
  );
}

export default FooterComponent;
