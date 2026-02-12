import './App.css'
import { Sidebar } from './components/Sidebar'
import { Mainbar } from './components/MainBar'

function App() {

  return (
    <div className='app-container'>
      <Sidebar />
      <Mainbar />
    </div>
  )
}

export default App
