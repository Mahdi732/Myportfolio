"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"

export default function SocialLinks() {
  return (
    <>
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
      ].map((social, index) => (
        <motion.a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-900/50 hover:scale-110 transition-all duration-300"
          aria-label={social.label}
          whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5 }}
        >
          {social.icon}
        </motion.a>
      ))}
    </>
  )
}
