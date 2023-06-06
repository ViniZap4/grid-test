import { useToolBoxContext } from "./ToolBoxContext"

export const ToolControl = () => {
  const {isOpened,setisOpened} = useToolBoxContext()

  return(
    <div>
      <button onClick={() => {
        setisOpened(p=> !p) 
      }}>
        {!isOpened? "open": "close"}ToolBox
      </button>
    </div>
  )
} 