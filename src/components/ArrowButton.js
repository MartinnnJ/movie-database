import { BiSolidUpArrow } from 'react-icons/bi';
import styles from './ArrowButton.module.scss';

function ArrowButton({ onBtnClick }) {
  return (
    <div className={styles.btn} onClick={onBtnClick}>
      <BiSolidUpArrow />
    </div>
  )
}

export default ArrowButton;