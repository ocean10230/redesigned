import { Routes, Route, useLocation } from 'react-router-dom'
import Home from "@/page/Home"
import Transition from '@/layout/Transition';
import NotFound from '@/page/404';
import Topbar from '@/layout/Topbar';

const routes = [
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "*",
    element: <NotFound/>
  }
]

function App() {
  const location = useLocation()

  return (
    <>
      <Topbar/>
    
      <Routes location={location} key={location.pathname}>
        {
          routes.map((v, i) => <Route
            key={i}
            element={ <Transition OgComponent={v.element} /> }
            path={v.path} 
          />)
        }

      </Routes>
    </>
  )
}

export default App