import { useToolBoxContext } from "./ToolBoxContext";

export const ToolControl = () => {
  const {
   isOpened, setisOpened,
   isFixed, setIsFixed
  } = useToolBoxContext();

  return (
    <div className="toolControl">
      <button
        onClick={() => {
          setisOpened((p) => !p);
        }}
      >
        {!isOpened ? "open" : "close"}ToolBox
      </button>
      <button
        onClick={() => {
          setIsFixed((p) => !p);
        }}
      >
        {!isFixed ? "fixed" : "auto adjust"}
      </button>
    </div>
  );
};
