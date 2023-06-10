import GridLayout, { ItemCallback, Layout } from "react-grid-layout";
import { contentsLayout, data, generateLayout, generateNullLayout, getContents, layout } from './data'
import { useState } from "react";
import { useToolBoxContext } from "./ToolBoxContext";


export const GridComponent = () => {
  const columns = 5
  const [placeholderPosition, setPlaceholderPosition] = useState<{
    x: number, y: number
  }>()

  const { setCurrentElementId, currentElementId, currentData, setCurrentData, layoutContents, setLayoutContents, setLayoutNullContents } = useToolBoxContext()

  const handleDrag = (
    layout: Layout[],
    oldItem: Layout,
    newItem: Layout,
    placeholder: Layout,
    event: MouseEvent,
    element: HTMLElement
  ) => {
    element.style.zIndex = "3"

    return
    if (newItem) {
      setPlaceholderPosition({
        x: newItem.x, y: newItem.y
      })
    }
    let filteredArray: Layout[] = []
    let fixedArray = layoutContents
    layoutContents.forEach((object1) => {
      const newItem = layout.filter(object2 => {
        return object1.i === object2.i && ((object1.x !== object2.x) || (object1.y !== object2.y)) && (placeholder.x === object2.x || placeholder.y === object2.y)
      })
      if (!!newItem[0]) {
        filteredArray.push(newItem[0])
        // const indexFixed = filteredArray.findIndex((item)=> item.i === newItem[0].i) 
        // if(indexFixed > -1 ) fixedArray.splice(indexFixed, 1)
      }
    });

    // console.log("newLayout", ())
  };


  function getContents(array: typeof data) {
    return array.filter(item => !!item.position)
  }
  function getDifference(layout1: Layout[], layout2: Layout[]): Layout[] {
    let filteredArray: Layout[] = []
    layout1.forEach((object1) => {
      const newItem = layout2.filter(object2 => {
        return object1.i === object2.i && ((object1.x !== object2.x) || (object1.y !== object2.y))
      })

      if (!!newItem[0]) {
        filteredArray.push(newItem[0])
      }
    });

    return filteredArray
  }

  const handleOnDrop = (layout: Layout[], item: Layout, _e: Event) => {
    let newData = currentData
    const index = newData.findIndex(i => i.id === currentElementId)
    if (index !== -1) {
      newData[index].position = `${item.x}-${item.y}`
    }
    console.log("get dif", getDifference(layoutContents, layout))

    getDifference(layoutContents, layout).forEach((itemChanged) => {
      const index = newData.findIndex(i => i.id.toString() === itemChanged.i)
      if (index !== -1) {
        newData[index].position = `${itemChanged.x}-${itemChanged.y}`
      }
    })

    setCurrentData(newData)

    setLayoutContents(generateLayout(currentData))
    setLayoutNullContents(generateNullLayout(currentData))
    setCurrentElementId(-1)
  }

  const [isDragDrop, setIsDragDrop] = useState(false)
  const bodyWidth = window.document.body.offsetWidth
  const LayoutWidthSize = bodyWidth < 900 ? bodyWidth : bodyWidth / 2

  const handleDragStop = (
    _layout: Layout[],
    _oldItem: Layout,
    _newItem: Layout,
    _placeholder: Layout,
    event: MouseEvent,
    element: HTMLElement
  ) => {
    element.style.zIndex = "1"
    console.log("element", element);
    console.log("event", event);
    
  }


  return (
    <GridLayout
      layout={layoutContents}
      style={{
        width: LayoutWidthSize,
        position: "relative",
        marginLeft: LayoutWidthSize / 2,
        marginTop: "10rem",
      }}
      cols={columns}
      // compactType={"vertical"}
      compactType={null}
      autoSize
      onDrop={handleOnDrop}
      width={LayoutWidthSize}
      isDraggable={!isDragDrop}
      onDrag={handleDrag}
      onDragStop={handleDragStop}
      isDroppable
      preventCollision
    // allowOverlap
    // isBounded
    >
      {getContents(currentData)?.map((item) => (
        <div
          draggable={isDragDrop}
          className="item"
          key={item.id.toString()}
          onDrag={() => setCurrentElementId(item.id)}
        >
          {item.name}
        </div>
      ))}
    </GridLayout>
  )
}