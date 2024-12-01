import { AccountBtn } from "../../Button/AccountBtn/AccountBtn";
import { AddBtn } from "../../Button/AddBtn/AddBtn";
import RemoveBtn from "../../Button/RemoveBtn/RemoveBtn";
import styles from "./TopBar.module.scss";

export function TopBar() {
  return (
    <div id={styles.topBar}>
      <RemoveBtn />
      <AddBtn />
      <AccountBtn />
    </div>
  );
}
