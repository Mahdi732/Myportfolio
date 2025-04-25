"use client"

import { motion } from "framer-motion"

interface SectionHeadingProps {
  title: string
  highlight: string
}

export default function SectionHeading({ title, highlight }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        {title}{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500">
          {highlight}
        </span>
      </h2>
      <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto"></div>
    </motion.div>
  )
}
