import styles from "./Menu.module.css";
import Colorpicker from "./Colorpicker";

const Menu = (props) => (
  <div className={styles.menu}>
    <label>tool:&nbsp;</label>
    <select onChange={props.changeTool}>
      <option value="line">line</option>
      <option value="curved">curved line</option>
      <option value="circle">circle</option>
      <option value="rect">rectangle</option>
      <option value="poly">polygon</option>
    </select>
    <label>color:&nbsp;</label>
    <Colorpicker
      color={props.color}
      isActive={props.isColorpickerActive}
      click={props.clickColorpicker}
      change={props.changeColor}
    />
    <label>line width:&nbsp;</label>
    <input type="number" min={5} max={50} value={props.width} onChange={props.changeWidth} />
    <button onClick={props.clickUndo}>undo</button>
    <button onClick={props.clickRedo}>redo</button>
  </div>
);

export default Menu;
