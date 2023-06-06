import './App.css'

import { GridComponent } from './GridComponent'
import { ToolBox } from './ToolBox'
import { ToolControl} from './ToolControl'


function App() {
  return (
    <div className='page'>
      <ToolControl />
      <ToolBox />
      <GridComponent />
    </div>
  )
}

export default App
