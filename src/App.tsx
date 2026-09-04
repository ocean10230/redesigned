import { Routes, Route, useLocation } from 'react-router-dom'
import Home from "@/page/home"
import Transition from '@/layout/transition';
import NotFound from '@/page/404';
import Topbar from '@/layout/topbar';
import Footer from '@/layout/footer';

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

window.useTitle = (Title: string) => (document.title = Title)

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
      
      <Footer merge={location.pathname == "/"} />
    </>
  )
}

export default App