import './App.css'
import { Route, Routes } from "react-router-dom";
import { MainLayout } from './layout/MainLayout';
import { MainPage } from './pages/MainPage';
import { NotFound } from './pages/NotFound';

function App() {

  return (
    <>
      <Routes>
      <Route path="/" element={<MainLayout/>}>
        <Route path="/" element={<MainPage/>}></Route>
        <Route path="/*" element={<NotFound/>}></Route>
      </Route>   
    </Routes>
    </>
  )
}

export default App
