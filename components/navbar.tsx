"use client"

import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"

interface NavbarProps {
  activeSection: string
  sections: string[]
  scrollToSection: (id: string) => void
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  textEnter: () => void
  textLeave: () => void
}

export default function Navbar({
  activeSection,
  sections,
  scrollToSection,
  mobileMenuOpen,
  setMobileMenuOpen,
  textEnter,
  textLeave,
}: NavbarProps) {
  return (
    <motion.nav
      className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      style={{
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        borderBottom: "1px solid rgba(147, 51, 234, 0.2)",
      }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold"
          onMouseEnter={textEnter}
          onMouseLeave={textLeave}
        >
          <span className="relative">
            Mahdi<span className="text-purple-500">Rahhab</span>
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden md:flex space-x-6"
        >
          {sections.map((section) => (
            <motion.button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`capitalize py-1 px-2 relative ${
                activeSection === section ? "text-purple-400" : "text-gray-300 hover:text-purple-300"
              } transition-colors duration-300`}
              whileHover={{ scale: 1.05 }}
              onMouseEnter={textEnter}
              onMouseLeave={textLeave}
            >
              {section}
              {activeSection === section && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gray-300 hover:text-purple-400 transition-colors"
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={false}
        animate={{ height: mobileMenuOpen ? "auto" : 0, opacity: mobileMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden"
        style={{
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          borderBottom: mobileMenuOpen ? "1px solid rgba(147, 51, 234, 0.2)" : "none",
        }}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          {sections.map((section) => (
            <motion.button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`capitalize py-2 px-4 rounded-md ${
                activeSection === section
                  ? "bg-purple-900/20 text-purple-400"
                  : "text-gray-300 hover:bg-purple-900/10 hover:text-purple-300"
              } transition-colors duration-300`}
              whileTap={{ scale: 0.95 }}
            >
              {section}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  )
}
