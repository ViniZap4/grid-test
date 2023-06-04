import GridLayout, { Layout } from "react-grid-layout";
import {contentsLayout, layout} from './data'
import { useState } from "react";

export const GridComponent = () => {
  const columns = 5
  const [placeholderPosition, setPlaceholderPosition ] = useState<{
    x: number, y: number
  }>()
  
  const onLayoutChange = (newLayout: Layout[]) => {
    //console.log("moved items", newLayout.filter((item: Layout) => item.moved === true))
  };

  const handleDrag = (layout : Layout[], oldItem: Layout, newItem: Layout) => {
    if(newItem.isDraggable) {
      setPlaceholderPosition({
        x: newItem.x, y: newItem.y
      })
      console.log("PlaceHolder")
    }
  }

  const handleDragStop = (
    layout: Layout[],
    oldItem: Layout,
    newItem: Layout,
    placeholder: Layout,
    event: MouseEvent,
    element: HTMLElement,
  ) => {
    console.log("Layout", layout)
    console.log("oldItem", oldItem)
    console.log("newItem", newItem)
    console.log("placeHolder", placeholder)
    console.log("event", event)
    console.log("element", element)
  }



  return (
    <GridLayout
      className="layout"
      layout={layout}
      cols={columns}
      // compactType={"vertical"}
      compactType={null}
      autoSize={true}
      width={window.document.body.offsetWidth}
      onDrag={handleDrag}
      isDroppable={true}
      onLayoutChange={onLayoutChange}
      // preventCollision
      // allowOverlap
      // isBounded
      onDragStop={handleDragStop}
    >
      {contentsLayout?.map((item) => (
        <div className="item" key={item.id.toString()}>
          {item.name}
        </div>
      ))}
    </GridLayout>
  )
}