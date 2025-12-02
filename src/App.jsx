import './App.css'
import { Hero, Navbar, About, Projects, Contact } from './components'


function App() {


  return (
    <main className=' bg-black w-[100vw] overflow-clip relative'>
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Contact />
    </main>
  )
}

export default App
