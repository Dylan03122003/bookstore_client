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
        <table className={styles.footer_table}>
          <tr>
            <th className={styles.footer_th}>PRODUCT</th>
          </tr>
          <tr>
            <td className={styles.footer_td}>Insights</td>
          </tr>
          <tr>
            <td className={styles.footer_td}>Risk Processing</td>
          </tr>
          <tr>
            <td className={styles.footer_td}>PCI Compliance</td>
          </tr>
          <tr>
            <td className={styles.footer_td}>Integrations</td>
          </tr>
          <tr>
            <td className={styles.footer_td}>Pricing</td>
          </tr>
        </table>
        <table className={styles.footer_table}>
          <tr>
            <th className={styles.footer_th}>FOR DEVELOPERS</th>
          </tr>
          <tr>
            <td className={styles.footer_td}>Docs</td>
          </tr>
          <tr>
            <td className={styles.footer_td}>Knowledge base</td>
          </tr>
          <tr>
            <td className={styles.footer_td}>Systom status</td>
          </tr>
          <tr>
            <td className={styles.footer_td}>Tutorials</td>
          </tr>
          <tr>
            <td className={styles.footer_td}>Blog</td>
          </tr>
        </table>
        <table className={styles.footer_table}>
          <tr>
            <th className={styles.footer_th}>FOR BRANDS</th>
          </tr>
          <tr>
            <td className={styles.footer_td}>Brands</td>
          </tr>
          <tr>
            <td className={styles.footer_td}>Porformance Marketing</td>
          </tr>
          <tr>
            <td className={styles.footer_td}>Publishers</td>
          </tr>
          <tr>
            <td className={styles.footer_td}>Styleguide</td>
          </tr>
        </table>
        <table className={styles.footer_table}>
          <tr>
            <th className={styles.footer_th}>RESOURCES</th>
          </tr>
          <tr>
            <td className={styles.footer_td}>Cose Studios</td>
          </tr>
          <tr>
            <td className={styles.footer_td}>Events</td>
          </tr>
          <tr>
            <td className={styles.footer_td}>Blog</td>
          </tr>
          <tr>
            <td className={styles.footer_td}>Portfolol</td>
          </tr>
        </table>
        <table className={styles.footer_table}>
          <tr>
            <th className={styles.footer_th}>ABOUT</th>
          </tr>
          <tr>
            <td className={styles.footer_td}>About us</td>
          </tr>
          <tr>
            <td className={styles.footer_td}>Press/News</td>
          </tr>
          <tr>
            <td className={styles.footer_td}>Careers/Team</td>
          </tr>
          <tr>
            <td className={styles.footer_td}>Contact Us</td>
          </tr>
        </table>
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
