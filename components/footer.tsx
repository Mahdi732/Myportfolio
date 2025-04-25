"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="py-8 border-t border-purple-900/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="text-2xl font-bold">
              <span className="relative">
                Mahdi<span className="text-purple-500">Rahhab</span>
              </span>
            </div>
            <p className="mt-2 text-gray-400">Full Stack Developer</p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              {[
                { icon: <Github className="w-5 h-5" />, href: "https://github.com/Mahdi732", label: "GitHub" },
                {
                  icon: <Linkedin className="w-5 h-5" />,
                  href: "https://linkedin.com/in/mahdi-rahhab",
                  label: "LinkedIn",
                },
                {
                  icon: <Mail className="w-5 h-5" />,
                  href: "mailto:elmahdirahhab@gmail.com",
                  label: "Email",
                },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 p-2 rounded-full hover:bg-purple-900/50 transition-colors duration-300"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 0] }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} El Mahdi Rahhab. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
