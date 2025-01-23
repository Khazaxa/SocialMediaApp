import styles from "./RemoveBtn.module.scss";
import remove from "../../../assets/del.png";
import { useLocation, useNavigate } from 'react-router-dom';

export function RemoveBtn() {
  const location = useLocation();
  const navigate = useNavigate();

  const RemoveClick = () => {
    if (location.pathname === '/posts') {
      navigate("/posts", { state: { removeCheckboxesPosts: location.state?.removeCheckboxesPosts !== true } });;
    } else if (location.pathname === '/gallery') {
      navigate("/gallery", { state: { removeCheckboxesGallery: location.state?.removeCheckboxesGallery !== true } });;
    } else if (location.pathname === '/folders') {
      navigate("/folders", { state: { removeCheckboxesFolders: location.state?.removeCheckboxesFolders !== true } });
    }
  };

  return (
    <button id={styles.removeBtn} onClick={RemoveClick}>
      <img src={remove} alt="Remove Button" />
    </button>
  );
}
