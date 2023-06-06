import { useRef } from 'react'
import GridLayout, { Layout } from "react-grid-layout"
import { useToolBoxContext } from "./ToolBoxContext"
import { nullpositionContents } from "./data"

export const ToolBox: React.FC = () => {
  const { isOpened, setCurrentElementId, currentData, setCurrentData, layoutNullContents } = useToolBoxContext()
  const divRef = useRef<HTMLDivElement>(null)


  return (
    <div ref={divRef} className={`toolBox ${isOpened ? "visible" : "hidden"}`} style={{
      height: `calc( ${currentData.filter(item => !item.position)?.length * (50 + 10) || 0}px + 1rem)`
    }}>
      {divRef && divRef.current && (
        <GridLayout
          isDraggable={false}
          layout={layoutNullContents}
          width={divRef.current.offsetWidth - 20}
          autoSize
          rowHeight={50}
          cols={1}
          // isBounded 
          isDroppable
        >
          {currentData.filter(item => !item.position).map((item) => (
            <div
              draggable
              onDrag={() => setCurrentElementId(item.id)}
              id={item.id.toString()} className="item"
              key={item.id.toString()}
            >
              {item.name}
            </div>
          ))}
        </GridLayout>
      )}
    </div>
  )
}