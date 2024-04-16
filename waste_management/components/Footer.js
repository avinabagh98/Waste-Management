
import styles from "./Footer.module.css";

export default function Footer({ camera_button }) {

  return <div className={styles.footer}>
    <div className={styles.iconcontainer}>
      <span className={styles.icon}>
        <img src="/svg/home_icon.svg" alt="home"></img>
      </span>
      <p>Home</p>
    </div>

    <div className={styles.iconcontainer}>
      <span className={styles.icon} onClick={camera_button}>
        <img src="/svg/camera_icon.svg" alt="camera"></img>
      </span>
      <p>Chronic Spot</p>
    </div>


    <div className={styles.iconcontainer}>
      <span className={styles.icon}>
        <img src="/svg/mobile_icon.svg" alt="mobile"></img>
      </span>
      <p>M-Pin</p>
    </div>
  </div>
}
