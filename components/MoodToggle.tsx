"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [isDarkMode, setIsDarkMode] = React.useState(theme === "dark")

  React.useEffect(() => {
    setIsDarkMode(theme === "dark")
  }, [theme])

  const toggleTheme = () => {
    const nextTheme = isDarkMode ? "light" : "dark"
    setTheme(nextTheme)
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div
      className="flex items-center justify-center cursor-pointer"
      onClick={toggleTheme}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDarkMode ? (
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: -90, scale: 0 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0 }}
            transition={{ duration: 0.1  }}
            className="hover:bg-slate-300 transition-all duration-100 p-1 rounded-md"

          >
            <Moon className="h-[1.5rem] w-[1.5rem]" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: -90, scale: 0 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0 }}
            transition={{ duration: 0.1 }}
            className="hover:bg-slate-100 transition-all duration-100 p-1 rounded-md"

>
            <Sun className="h-[1.5rem] w-[1.5rem]" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
