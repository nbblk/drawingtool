import styles from "./App.module.css";
import { Layer, Line, Circle, Rect, Stage } from "react-konva";
import Menu from "./components/Menu";
import { useEffect, useRef, useState } from "react";

function App() {
  const defaultOptions = {
    tool: "line",
    color: "#000000",
    colorpickerActive: false,
    width: 5,
  };

  const savedOptions = localStorage.getItem("options")
    ? JSON.parse(localStorage.getItem("options"))
    : defaultOptions;

  const savedShapes = localStorage.getItem("shapes")
    ? JSON.parse(localStorage.getItem("shapes"))
    : [];

  const defaultRecord =
    savedShapes.length <= 40
      ? savedShapes
      : savedShapes.slice(savedShapes.length - 40, savedShapes.length - 1);

  const [options, setOptions] = useState(savedOptions);
  const [shapes, setShapes] = useState(savedShapes);
  const [record, setRecord] = useState(defaultRecord);

  const isDrawing = useRef(false);

  const changeTool = (event) => {
    setOptions({ ...options, tool: event.target.value });
  };

  const changeWidth = (event) => {
    const width = Number(event.target.value);
    if (width > 50 || width < 5)
      alert("Please enter the number between 5 and 50.");
    setOptions({ ...options, width: width });
  };

  const clickColorpicker = () => {
    setOptions({
      ...options,
      colorpickerActive: !options.colorpickerActive,
    });
  };

  const changeColor = (color) => {
    setOptions({ ...options, color: color.hex });
  };

  const onMouseDown = (event) => {
    isDrawing.current = true;
    const pos = event.target.getStage().getPointerPosition();
    setShapes([
      ...shapes,
      {
        tool: options.tool,
        color: options.color,
        width: options.width,
        points: [pos.x, pos.y],
      },
    ]);
  };

  const onMouseMove = (event) => {
    if (!isDrawing.current) {
      return;
    }
    const stage = event.target.getStage();
    const point = stage.getPointerPosition();
    let lastItem = shapes[shapes.length - 1];

    switch (options.tool) {
      case "line":
        lastItem.points = [
          lastItem.points[0],
          lastItem.points[1],
          point.x,
          point.y,
        ];
        shapes.splice(shapes.length - 1, 1, lastItem);
        setShapes(shapes.concat());
        break;
      case "circle":
        lastItem.points = [point.x, point.y];
        shapes.splice(shapes.length - 1, 1, lastItem);
        setShapes(shapes.concat());
        break;
      case "rect":
        lastItem.points = [
          lastItem.points[0],
          lastItem.points[1],
          point.x,
          point.y,
        ];
        shapes.splice(shapes.length - 1, 1, lastItem);
        setShapes(shapes.concat());
        break;
      default:
        break;
    }
  };

  const onMouseUp = () => {
    isDrawing.current = false;
  };

  const clickUndo = () => {
    const newShapes = [...shapes];
    newShapes.pop();

    setShapes(newShapes);
    setRecord(newShapes);
  };

  const clickRedo = () => {
    const newShapes = [...shapes];
    newShapes.push(shapes[shapes.length - 1]);

    setShapes(newShapes);
    setRecord(newShapes);
  };

  useEffect(() => {
    localStorage.setItem("shapes", JSON.stringify(shapes));
    localStorage.setItem("options", JSON.stringify(options));
  }, [shapes, options]);

  return (
    <div className={styles.app}>
      <Menu
        color={options.color}
        width={options.width}
        isColorpickerActive={options.colorpickerActive}
        changeTool={changeTool}
        changeWidth={changeWidth}
        changeColor={changeColor}
        clickColorpicker={clickColorpicker}
        clickUndo={clickUndo}
        clickRedo={clickRedo}
      />
      <Stage
        className={styles.stage}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      >
        <Layer>
          {shapes.map((shape, i) => {
            let element;
            switch (shape.tool) {
              case "line":
                return (element = (
                  <Line
                    key={i}
                    points={shape.points}
                    stroke={shape.color}
                    strokeWidth={shape.width}
                    tension={0.5}
                    lineCap="round"
                  />
                ));
              case "circle":
                return (element = (
                  <Circle
                    key={i}
                    x={shape.points[0]}
                    y={shape.points[1]}
                    radius={70}
                    stroke={shape.color}
                    strokeWidth={shape.width}
                  />
                ));
              case "rect":
                return (element = (
                  <Rect
                    key={i}
                    x={shape.points[0]}
                    y={shape.points[1]}
                    width={shape.points[2]}
                    height={shape.points[3]}
                    stroke={shape.color}
                    strokeWidth={shape.width}
                  />
                ));
              default:
                break;
            }
            return element;
          })}
        </Layer>
      </Stage>
    </div>
  );
}

export default App;
