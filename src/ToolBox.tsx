import { nullpositionContents } from "./data"

export const ToolBox: React.FC = () => {
  return(
    <div className="toolBox">
      {nullpositionContents.map((item) => (
        <div draggable={true} className="item" key={item.id.toString()}>
          {item.name}
        </div>
      ))}
    </div>
  )
}