import Elomusk from "./../../assets/elon-musk-3.jpg";
import styles from "./AboutPage.module.css";

const AboutPage = () => {
  return (
    <>
      <div className={styles.information}>
        <div className={styles["left-information"]}>
          <h2>We're shaping the future of mobile technology</h2>
          <p>
            "Gain insights info user attributes such as demographics.
            preferences, and social profiles across different continents and
            time zones, allowing you fo create engagement campaigns that truly
            connect with your audience. Keep users up-to-date with personalized
            messages about the latest news and events in their local fime zone,
            making it easier than ever fo grow a community of users who share
            your vision and values."
          </p>
        </div>

        <div className={styles["right-information"]}>
          <div className={styles["box"]}>
            <h3>5 Billion</h3>
            <p>Users Engaged Every Month</p>
          </div>
          <div className={styles["box"]}>
            <h3>17 Billion</h3>
            <p>Users Interactions Per Day</p>
          </div>
          <div className={styles["box"]}>
            <h3>24 Billion</h3>
            <p>Notifications Sent Every Day</p>
          </div>
          <div className={styles["box"]}>
            <h3>11</h3>
            <p>TechPatents</p>
          </div>
        </div>
      </div>

      <div className={styles["join-us"]}>
        <div className={styles["left-join-us"]}>
          <h3>Why Join Us</h3>
          <p>
            At Emplided, we take ownership and deliver results. We prioritize
            quality work over politics and empty promises
          </p>
        </div>

        <div className={styles["right-join-us"]}>
          <div className={styles["right-join-content"]}>
            <h4>Meaningful role</h4>
          </div>
          <div className={styles["right-join-content"]}>
            <h4>Learn & Grow</h4>
            <p>
              Expand your skills with unlimited access to MOOC platforms,
              sponsored courses, and challenging problem-solving opertunities.
              At Emplided, we're invested in your growth
            </p>
          </div>

          <div className={styles["right-join-content"]}>
            <h4>Internet Scale, global impact</h4>
          </div>
        </div>
      </div>

      <div className={styles["our-mission"]}>
        <div className={styles["our-mission-content"]}>
          <h2>Our Mission</h2>
          <p>
            We're buiding the economic infrastructure for the internet.
            Businesses of every size, be it new startups or public companies,
            use our software to accept payments and manage ther businesses
            online.
          </p>

          <div className={styles["our-mission-footer"]}>
            <div className={styles["our-mission-footer-content"]}>
              <h1>94%</h1>
              <div className={styles["color"]} id="first-color"></div>
              <p>CLIENT RETENTION</p>
            </div>

            <div className={styles["our-mission-footer-content"]}>
              <h1>70M+</h1>
              <div className={styles["color"]} id="second-color"></div>
              <p>EMAILS PER MONTH</p>
            </div>

            <div className={styles["our-mission-footer-content"]}>
              <h1>10K+</h1>
              <div className={styles["color"]} id="third-color"></div>
              <p>MONTHLY CAMPAIGNS</p>
            </div>
          </div>
        </div>

        <div className={styles["person-image"]}>
          <img src={Elomusk} />
        </div>
      </div>

      <div className={styles["our-mission-mobile"]}>
        <div className={styles["person-image"]}>
          <img src={Elomusk} />
        </div>

        <div className={styles["our-mission-mobile-content"]}>
          <h2>Our Mission</h2>
          <p>
            We're buiding the economic infrastructure for the internet.
            Businesses of every size, be it new startups or public companies,
            use our software to accept payments and manage ther businesses
            online.
          </p>

          <div className={styles["our-mission-mobile-footer"]}>
            <div className={styles["our-mission-mobile-footer-content"]}>
              <h1>94%</h1>
              <div
                className={`${styles["color"]} ${styles["first-color"]} `}
              ></div>
              <p>CLIENT RETENTION</p>
            </div>

            <div className={styles["our-mission-mobile-footer-content"]}>
              <h1>70M+</h1>
              <div className={styles["color"]} id="second-color"></div>
              <p>EMAILS PER MONTH</p>
            </div>

            <div className={styles["our-mission-mobile-footer-content"]}>
              <h1>10K+</h1>
              <div className={styles["color"]} id="third-color"></div>
              <p>MONTHLY CAMPAIGNS</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
