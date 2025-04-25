"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react"
import ProjectCard from "@/components/project-card"
import ContactForm from "@/components/contact-form"
import SectionHeading from "@/components/section-heading"
import SocialLinks from "@/components/social-links"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")

  const sections = ["hero", "about", "skills", "projects", "education", "contact"]
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

  const textEnter = () => setCursorVariant("text")
  const textLeave = () => setCursorVariant("default")

  // Scroll to section
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false)
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth" })
  }

  // Cursor styles
  const cursorVariants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      opacity: 1,
    },
    text: {
      x: mousePosition.x - 75,
      y: mousePosition.y - 75,
      height: 150,
      width: 150,
      opacity: 0.1,
      mixBlendMode: "difference" as const,
    },
  }

  const projects = [
    {
      title: "FUT-Champions",
      description:
        "This application allows users to build their FUT team by adding, positioning, and modifying players while respecting tactical formations such as 4-4-2 or 4-3-3. The application emphasizes an interactive user interface and dynamic forms.",
      image: "/images/footchampion.jpg",
      technologies: ["HTML", "CSS / Tailwind CSS", "JavaScript Vanilla"],
      link: "https://github.com/Mahdi732/FUT-Champions",
    },
    {
      title: "WEATHERWISE",
      description:
        "A modern weather forecast web application that allows users to easily check current weather and short-term forecasts for any city, thanks to an intuitive interface and a third-party weather API.",
      image: "/images/weather.jpg",
      technologies: ["React.js", "Tailwind CSS", "JavaScript", "Laravel (PHP)", "REST API"],
      link: "https://github.com/Mahdi732/Weather-App",
    },
    {
      title: "Luxury_V2: Drive & Loc Agency",
      description:
        "A car rental management system aimed at improving the website by introducing a creative and functional platform allowing customers to browse and book vehicles according to their needs.",
      image: "/images/luxury.jpg",
      technologies: ["PHP (OOP)", "SQL", "HTML", "CSS", "JavaScript (Alpine.js)", "MySQL"],
      link: "https://github.com/Mahdi732/Luxury",
    },
  ]

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      {/* Custom cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full bg-purple-500 mix-blend-difference pointer-events-none z-50 hidden md:block"
        variants={cursorVariants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      />

      {/* Background effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,40,200,0.1)_0,rgba(0,0,0,0)_70%)]"></div>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.4) 0%, rgba(0, 0, 0, 0) 60%)`,
          }}
        ></div>
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-purple-900/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-indigo-900/10 rounded-full blur-[100px]"></div>

        {/* Noise overlay */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Navigation */}
      <Navbar
        activeSection={activeSection}
        sections={sections}
        scrollToSection={scrollToSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        textEnter={textEnter}
        textLeave={textLeave}
      />

      {/* Main Content */}
      <div className="pt-16">
        {/* Hero Section */}
        <section
          id="hero"
          ref={(el) => (sectionRefs.current.hero = el)}
          className="min-h-screen flex items-center relative overflow-hidden"
        >
          <div className="container mx-auto px-4 py-20 md:py-0">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="md:w-1/2 space-y-6 z-10"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="inline-block px-4 py-1 bg-purple-900/30 backdrop-blur-sm rounded-full border border-purple-500/30 text-purple-300 text-sm mb-4"
                >
                  Full Stack Developer
                </motion.div>
                <h1
                  className="text-5xl md:text-6xl lg:text-7xl font-bold"
                  onMouseEnter={textEnter}
                  onMouseLeave={textLeave}
                >
                  El Mahdi{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 animate-gradient font-bold">
                    Rahhab
                  </span>
                </h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="text-lg text-gray-300 max-w-lg"
                >
                  Passionate about web development, combining creativity and technical expertise to design
                  high-performance, intuitive applications. Self-motivated and adaptable to new technologies and
                  challenges.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="flex flex-wrap gap-4 pt-4"
                >
                  <motion.button
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full text-white font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 flex items-center gap-2 group"
                    onClick={() => scrollToSection("contact")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Contact Me{" "}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                  <motion.button
                    className="px-6 py-3 bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-full text-white font-medium hover:bg-purple-900/20 transition-all duration-300"
                    onClick={() => scrollToSection("projects")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Projects
                  </motion.button>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.2 }}
                  className="flex gap-5 pt-4"
                >
                  <SocialLinks />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="md:w-1/2 flex justify-center z-10"
              >
                <div className="relative w-64 h-64 md:w-80 md:h-80">
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 blur-2xl opacity-30"
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.3, 0.4, 0.3],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                  ></motion.div>
                  <motion.div
                    className="relative w-full h-full rounded-full overflow-hidden border-2 border-purple-500/30 p-1"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600 p-1">
                      <div className="w-full h-full rounded-full overflow-hidden bg-gray-800">
                        <Image
                          src="/placeholder.svg?height=400&width=400"
                          alt="El Mahdi Rahhab"
                          width={400}
                          height={400}
                          className="object-cover"
                          priority
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          ref={(el) => (sectionRefs.current.projects = el)}
          className="min-h-screen py-20 relative"
        >
          <div className="container mx-auto px-4">
            <SectionHeading title="My" highlight="Projects" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <ProjectCard key={index} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" ref={(el) => (sectionRefs.current.contact = el)} className="min-h-screen py-20 relative">
          <div className="container mx-auto px-4">
            <SectionHeading title="Contact" highlight="Me" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <h3 className="text-2xl font-semibold mb-6 text-white">Get In Touch</h3>
                <p className="text-gray-300 mb-8">
                  Feel free to reach out to me for any questions, project inquiries, or just to say hello! I'm always
                  open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                </p>

                <div className="space-y-6">
                  {[
                    {
                      icon: <Mail className="text-purple-400 w-6 h-6" />,
                      title: "Email",
                      content: "elmahdirahhab@gmail.com",
                      link: "mailto:elmahdirahhab@gmail.com",
                    },
                    {
                      icon: <Phone className="text-purple-400 w-6 h-6" />,
                      title: "Phone",
                      content: "0617104048",
                      link: "tel:+212617104048",
                    },
                    {
                      icon: <MapPin className="text-purple-400 w-6 h-6" />,
                      title: "Location",
                      content: "Safi, Maroc",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
                      whileHover={{ y: -5, backgroundColor: "rgba(30, 30, 30, 0.8)" }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="bg-purple-900/30 p-3 rounded-full">{item.icon}</div>
                        <div>
                          <h4 className="font-medium text-white">{item.title}</h4>
                          {item.link ? (
                            <a href={item.link} className="text-purple-400 hover:underline">
                              {item.content}
                            </a>
                          ) : (
                            <p className="text-gray-300">{item.content}</p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <ContactForm email="elmahdirahhab@gmail.com" />
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}
