import { createContext, useContext, useState, useEffect} from 'react'
import { Layout } from 'react-grid-layout'
import { generateLayout, generateNullLayout } from './data'

export let data = [
  { id: 1, position: "1-1", name: "first item" },
  { id: 2, position: "2-1", name: "name 2" },
  { id: 3, position: "1-3", name: "testing contents" },
  { id: 4, position: "3-2", name: "testing another one" },
  { id: 5, position: "0-2", name: "hello" },
  { id: 6, position: "0-0", name: "こんにちは" },
  { id: 7, position: "3-0", name: "Ola" },
  
  { id: 8,  position: null, name: "null position" },
  { id: 9,  position: null, name: "test" },
  { id: 10, position: null, name: "testing drop" },
  { id: 12, position: null, name: "テスト" },
  { id: 13, position: null, name: "drag and drop me" },
  { id: 14, position: null, name: "List layout" },
  { id: 15, position: null, name: "new contents" },
]

interface IToolBoxContext {
  isOpened: boolean,
  setisOpened: React.Dispatch<React.SetStateAction<boolean>>
  currentElementId: number,
  setCurrentElementId: React.Dispatch<React.SetStateAction<number>>
  currentData: typeof data

  setCurrentData: React.Dispatch<React.SetStateAction<typeof data>>,
  layoutContents: Layout[],

  setLayoutContents: React.Dispatch<React.SetStateAction<Layout[]>>,
  layoutNullContents: Layout[]
  setLayoutNullContents: React.Dispatch<React.SetStateAction<Layout[]>>,
}

const ToolBoxContext = createContext<IToolBoxContext>({} as IToolBoxContext)

export const ToolBoxContextProvider = (props: React.PropsWithChildren) => {
  const [isOpened, setisOpened] = useState(false)
  const [currentElementId, setCurrentElementId] = useState(0)
  const [currentData, setCurrentData] = useState(data)


  const [layoutContents, setLayoutContents] = useState(generateLayout(currentData))
  const [layoutNullContents,setLayoutNullContents] = useState(generateLayout(currentData))

  useEffect(() =>{
    setLayoutContents(generateLayout(currentData))
    setLayoutNullContents(generateNullLayout(currentData))
  } , [currentData])
   


  return (
    <ToolBoxContext.Provider value={{
      isOpened, setisOpened,
      currentElementId, setCurrentElementId,
      currentData, setCurrentData,
      layoutContents, setLayoutContents,
      layoutNullContents, setLayoutNullContents 
    }}>
      {props.children}
    </ToolBoxContext.Provider>
  )
}

export const useToolBoxContext = () => useContext(ToolBoxContext)