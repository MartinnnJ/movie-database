import { BsStar, BsStarFill } from "react-icons/bs";
import styles from './FavoriteButton.module.scss';

function FavoriteButton({ type, onBtnClick }) {
  const outputValue = type === true ? <BsStarFill /> : <BsStar />;

  return <small className={styles.btn} onClick={() => onBtnClick(type)}>{outputValue}</small>;
}

export default FavoriteButton;