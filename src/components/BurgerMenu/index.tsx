"use client"

import { useState, useEffect } from "react"
import { Menu, X, Newspaper } from "lucide-react"
import ThemeToggle from "../ThemeToogle"
import { useLocation } from "react-router-dom"
import { selectArticle, setSection } from "../../redux/slices/articleSlice"
import { useDispatch, useSelector } from "react-redux"

const BurgerMenu = () => {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { section } = useSelector(selectArticle)

  const SECTIONS = ["GENERAL", "SCIENCE", "ENTERTAINMENT", "TECHNOLOGY", "BUSINESS", "HEALTH", "SPORTS"]

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const handleSectionChange = (sec: string) => {
    dispatch(setSection(sec))
    setIsOpen(false) 
  }

  return (
    <>
      <div
        className={`flex items-center justify-between gap-6 absolute left-0 lg:static ${location.pathname === "/" ? "flex" : "hidden"}`}
      >
        <nav className="hidden lg:flex space-x-6">
          {SECTIONS.map((sec) => (
            <a
              key={sec}
              onClick={() => handleSectionChange(sec)}
              href="#"
              className={`font-bold font-latoBold text-sm relative group ${section === sec ? "" : ""}`}
            >
              {sec}
              <span
                className={`absolute bottom-0  left-0 w-full h-0.5 bg-primary transform ${
                  section === sec ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                } transition-all duration-300`}
              ></span>
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <ThemeToggle />
        </div>
        <button className="lg:hidden text-text" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:hidden`}
        onClick={() => setIsOpen(false)}
      >
        <aside className="bg-bg w-full h-full shadow-lg p-6 flex flex-col gap-20" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between ">
            <ThemeToggle />
            <button className="self-start text-text" onClick={() => setIsOpen(false)}>
              <X size={25} />
            </button>
          </div>

          <div className="flex flex-col gap-4 ">
            {SECTIONS.map((sec) => (
              <a
                key={sec}
                href="#"
                className={`font-bold font-latoBold text-xl ${section === sec ? "text-primary" : ""}`}
                onClick={() => handleSectionChange(sec)}
              >
                {sec}
              </a>
            ))}
          </div>
          <p className="flex items-center justify-end gap-1 ">
            <Newspaper />
            {section}
          </p>
        </aside>
      </div>
    </>
  )
}

export default BurgerMenu

