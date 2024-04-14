import styles from "./Listcard.module.css";

export default function Listcard({
  livestock_name,
  livestock_type,
  livestock_status,
  owner_name,
  owner_contact,
  editHandler,
  ShowHandler,
}) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.card}>
          {/* Card Top */}
          <div className={styles.top}>
            <div className={styles.top_left}>
              <span>
                <p className={styles.text_title}>Livestock Name</p>
                <p className={styles.text}>{livestock_name}</p>
              </span>
              <span>
                <p className={styles.text_title}>Livestock Type</p>
                <p className={styles.text}>{livestock_type}</p>
              </span>
              <p className={styles.text2}>{livestock_status}</p>
            </div>
            <div className={styles.top_right}>
              <div className={styles.icon} onClick={editHandler}>
                <img src="/svg/edit.svg" alt="edit_icon"></img>
                <p className={styles.icon_text}>Edit</p>
              </div>
            </div>
          </div>

          {/* Card Bottom */}
          <div className={styles.buttom}>
            <div className={styles.buttom_left}>
              <div className={styles.buttom_left_text}>
                <span>
                  <img src="/svg/user.svg" alt="user_icon"></img>
                  <p className={styles.icon_text}>{owner_name}</p>
                </span>
                <span>
                  <img src="/svg/phone.svg" alt="phone_icon"></img>
                  <p className={styles.icon_text}>{owner_contact}</p>
                </span>
              </div>
            </div>
            <div className={styles.buttom_right} onClick={ShowHandler}>
              <img src="/svg/show_more.svg" alt="show_icon"></img>
              <p className={styles.icon_text}>Show more</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
