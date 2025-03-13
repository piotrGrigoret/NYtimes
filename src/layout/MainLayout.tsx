import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'

export const MainLayout = () => {
  return (
    <div className='w-full h-full flex flex-col	'>
        <Header/>
        <div className='flex-1'>
          <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}
