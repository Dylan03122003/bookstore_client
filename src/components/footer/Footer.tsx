import {
  AiFillYoutube,
  AiOutlineInstagram,
  AiOutlineTwitter,
} from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { GrLinkedinOption } from "react-icons/gr";

import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footer_top}>
        <div className={styles.footer_table}>
          <div>
            <div className={styles.footer_th}>PRODUCT</div>
          </div>
          <div>
            <div className={styles.footer_td}>Insights</div>
          </div>
          <div>
            <div className={styles.footer_td}>Risk Processing</div>
          </div>
          <div>
            <div className={styles.footer_td}>PCI Compliance</div>
          </div>
          <div>
            <div className={styles.footer_td}>Integrations</div>
          </div>
          <div>
            <div className={styles.footer_td}>Pricing</div>
          </div>
        </div>
        <div className={styles.footer_table}>
          <div>
            <div className={styles.footer_th}>FOR DEVELOPERS</div>
          </div>
          <div>
            <div className={styles.footer_td}>Docs</div>
          </div>
          <div>
            <div className={styles.footer_td}>Knowledge base</div>
          </div>
          <div>
            <div className={styles.footer_td}>Systom status</div>
          </div>
          <div>
            <div className={styles.footer_td}>Tutorials</div>
          </div>
          <div>
            <div className={styles.footer_td}>Blog</div>
          </div>
        </div>
        <div className={styles.footer_table}>
          <div>
            <div className={styles.footer_th}>FOR BRANDS</div>
          </div>
          <div>
            <div className={styles.footer_td}>Brands</div>
          </div>
          <div>
            <div className={styles.footer_td}>Porformance Marketing</div>
          </div>
          <div>
            <div className={styles.footer_td}>Publishers</div>
          </div>
          <div>
            <div className={styles.footer_td}>Styleguide</div>
          </div>
        </div>
        <div className={styles.footer_table}>
          <div>
            <div className={styles.footer_th}>RESOURCES</div>
          </div>
          <div>
            <div className={styles.footer_td}>Cose Studios</div>
          </div>
          <div>
            <div className={styles.footer_td}>Events</div>
          </div>
          <div>
            <div className={styles.footer_td}>Blog</div>
          </div>
          <div>
            <div className={styles.footer_td}>Portfolol</div>
          </div>
        </div>
        <div className={styles.footer_table}>
          <div>
            <div className={styles.footer_th}>ABOUT</div>
          </div>
          <div>
            <div className={styles.footer_td}>About us</div>
          </div>
          <div>
            <div className={styles.footer_td}>Press/News</div>
          </div>
          <div>
            <div className={styles.footer_td}>Careers/Team</div>
          </div>
          <div>
            <div className={styles.footer_td}>Contact Us</div>
          </div>
        </div>
      </div>
      <hr />
      <div className={styles.footer_bottom}>
        <ul className={styles.list}>
          <li className={styles.item}>Terms</li>
          <li className={styles.item}>Privacy</li>
          <li className={styles.item}>Securty</li>
        </ul>
        <p>@ 2020 Gro.Pro | All Rights Reserved</p>
        <div className={styles.icon}>
          <a href="#" className="bg-white p-2 rounded-full">
            {/* <i className="fa-brands fa-twitter"></i> */}
            <AiOutlineTwitter />
          </a>
          <a href="#" className="bg-white p-2 rounded-full">
            {/* <i className="fa-brands fa-instagram"></i> */}
            <AiOutlineInstagram />
          </a>
          <a href="#" className="bg-white p-2 rounded-full">
            {/* <i id="face" className="fa-brands fa-facebook-f"></i> */}
            <FaFacebookF />
          </a>
          <a href="#" className="bg-white p-2 rounded-full">
            {/* <i className="fa-brands fa-linkedin-in"></i> */}
            <GrLinkedinOption />
          </a>
          <a href="#" className="bg-white p-2 rounded-full">
            {/* <i className="fa-brands fa-youtube"></i> */}
            <AiFillYoutube />
          </a>
        </div>
      </div>
      <div className={styles.design}>
        <div className={styles.box1}></div>
        <div className={styles.box2}></div>
        <div className={styles.box3}></div>
        <div className={styles.box4}></div>
      </div>
    </div>
  );
};

export default Footer;
