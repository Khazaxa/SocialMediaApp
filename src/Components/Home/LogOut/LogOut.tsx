import logOut from "../../../assets/logout.png";
import styles from "./LogOut.module.scss";

export function LogOut({
  setIsLogged,
}: {
  setIsLogged: (isLogged: boolean) => void;
}) {
  return (
    <div
      id={styles.logOut}
      onClick={() => {
        setIsLogged(false);
      }}
    >
      <img src={logOut} alt="logOut" />
      Log Out
    </div>
  );
}
