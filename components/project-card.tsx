"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ExternalLink } from "lucide-react"

interface Project {
  title: string
  description: string
  image: string
  technologies: string[]
  link: string
}

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl overflow-hidden hover:border-purple-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 h-full flex flex-col group"
      whileHover={{ y: -10 }}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
        <motion.div
          className="absolute inset-0 bg-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
          whileHover={{ opacity: 0.2 }}
        ></motion.div>
        <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.5 }} className="relative h-full w-full">
          <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
        </motion.div>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-semibold mb-2 text-white">
          <span className="relative">{project.title}</span>
        </h3>
        <p className="text-gray-400 mb-4 flex-grow">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech, techIndex) => (
            <motion.span
              key={techIndex}
              className="bg-purple-900/30 text-purple-300 px-3 py-1 rounded-full text-xs font-medium border border-purple-500/30"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(147, 51, 234, 0.4)" }}
            >
              {tech}
            </motion.span>
          ))}
          {project.technologies.length > 3 && (
            <motion.span
              className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs font-medium"
              whileHover={{ scale: 1.05 }}
            >
              +{project.technologies.length - 3} more
            </motion.span>
          )}
        </div>
        <motion.button
          className="flex items-center justify-center gap-2 py-2 px-4 bg-purple-900/30 text-purple-300 rounded-lg border border-purple-500/30 hover:bg-purple-900/50 transition-colors duration-300 group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full"
          >
            View Project{" "}
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </motion.button>
      </div>
    </motion.div>
  )
}
