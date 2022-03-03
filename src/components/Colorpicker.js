import { SketchPicker } from "react-color";
import styles from "./Colorpicker.module.css";

const Colorpicker = (props) => (
  <div style={{ position: "relative" }}>
    <div
      style={{ backgroundColor: props.color }}
      className={styles.currentColor}
      onClick={props.click}
    />
    {props.isActive ? (
      <SketchPicker
        className={styles.colorpicker}
        color={props.color}
        onChangeComplete={props.change}
      />
    ) : null}
  </div>
);

export default Colorpicker;
