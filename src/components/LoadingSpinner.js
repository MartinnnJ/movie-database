import { ImSpinner9 } from "react-icons/im";
import styles from './LoadingSpinner.module.scss';

function LoadingSpinner() {
  return (
    <div className="has-text-centered is-size-1">
      <ImSpinner9 className={styles.spinner} />
    </div>
  )
}

export default LoadingSpinner;