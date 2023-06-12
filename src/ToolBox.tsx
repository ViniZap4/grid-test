import { useEffect, useRef } from 'react'
import GridLayout, { Layout } from "react-grid-layout"
import { useToolBoxContext } from "./ToolBoxContext"
import { nullpositionContents } from "./data"

export const ToolBox: React.FC = () => {
  const { isOpened, setCurrentElementId, currentData, setCurrentData, layoutNullContents, setToolBoxValues, toolBoxValues } = useToolBoxContext()
  const divRef = useRef<HTMLDivElement>(null)

  useEffect(()=> {
    if(!divRef) return
    if(!isOpened) return

    const height :number = divRef.current?.offsetHeight || 0
    const width :number = divRef.current?.offsetWidth || 0
    const left :number = divRef.current?.offsetLeft || 0
    const top :number = divRef.current?.offsetTop || 0

    setToolBoxValues({
      height, width, left, top
    })

    console.log(currentData);
    
  },[divRef, isOpened, currentData])


  useEffect(()=> {
    console.log("ToolBox", toolBoxValues);
  },[toolBoxValues])

  const itemHeight = 50 

  return (
    <div ref={divRef} className={`toolBox ${isOpened ? "visible" : "hidden"}`} style={{
      height: `calc( ${currentData.filter(item => !item.position)?.length * (itemHeight+ 10) || 0}px + 1rem)`
    }}>
      {divRef && divRef.current && (
        <GridLayout
          isDraggable={false}
          layout={layoutNullContents}
          width={divRef.current.offsetWidth - 20}
          autoSize
          rowHeight={itemHeight}
          cols={1}
          // isBounded 
          // isDroppable
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