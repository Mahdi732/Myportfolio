"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Code,
  Database,
  Layout,
  Server,
  Terminal,
  Workflow,
  Menu,
  X,
  ArrowRight,
  GraduationCap,
} from "lucide-react"
import {
  SplitText,
  GlitchText,
  GradientText,
  ScrollReveal,
  MagneticButton,
  ClickSpark,
  CircularText,
} from "@/components/text-animations"
import { useImageTrail, useScrollVelocity } from "@/hooks/animation-hooks"
import { sendEmail } from "@/lib/actions"

// Main component
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const sections = ["hero", "about", "skills", "projects", "education", "contact"]
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})
  const headerRef = useRef<HTMLElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const scrollVelocity = useScrollVelocity()
  const { trail } = useImageTrail()

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [formMessage, setFormMessage] = useState("")

  // Handle mouse move for effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Intersection observer for sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 },
    )

    Object.keys(sectionRefs.current).forEach((id) => {
      if (sectionRefs.current[id]) {
        observer.observe(sectionRefs.current[id]!)
      }
    })

    return () => observer.disconnect()
  }, [])

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus("submitting")
    setFormMessage("")

    try {
      const result = await sendEmail({
        to: "elmahdirahhab@gmail.com",
        from: formData.email,
        name: formData.name,
        subject: formData.subject,
        message: formData.message,
      })

      if (result.success) {
        setFormStatus("success")
        setFormMessage(result.message || "Thank you for your message! I'll get back to you soon.")
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        setFormStatus("error")
        setFormMessage(result.message || "There was an error sending your message. Please try again later.")
      }

      // Reset form status after 5 seconds
      setTimeout(() => {
        setFormStatus("idle")
        setFormMessage("")
      }, 5000)
    } catch (error) {
      console.error("Error sending email:", error)
      setFormStatus("error")
      setFormMessage("There was an error sending your message. Please try again later.")

      // Reset form status after 5 seconds
      setTimeout(() => {
        setFormStatus("idle")
        setFormMessage("")
      }, 5000)
    }
  }

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

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

  const [cursorVariant, setCursorVariant] = useState("default")
  const textEnter = () => setCursorVariant("text")
  const textLeave = () => setCursorVariant("default")

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      {/* Custom cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full bg-purple-500 mix-blend-difference pointer-events-none z-50"
        variants={cursorVariants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      />

      {/* Image trail effect */}
      {trail.map((point, i) => (
        <motion.div
          key={i}
          className="fixed w-4 h-4 rounded-full pointer-events-none z-40"
          style={{
            left: point.x,
            top: point.y,
            backgroundColor: `rgba(168, 85, 247, ${0.3 - i * 0.05})`,
            scale: 1 - i * 0.1,
          }}
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: i * 0.05 }}
        />
      ))}

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
      <motion.nav
        ref={headerRef}
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
            <GlitchText>
              Mahdi<span className="text-purple-500">Rahhab</span>
            </GlitchText>
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
                  <SplitText>Full Stack Developer</SplitText>
                </motion.div>
                <h1
                  className="text-5xl md:text-6xl lg:text-7xl font-bold"
                  onMouseEnter={textEnter}
                  onMouseLeave={textLeave}
                >
                  <SplitText>El Mahdi</SplitText>{" "}
                  <GradientText className="font-bold">
                    <SplitText>Rahhab</SplitText>
                  </GradientText>
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
                  <ClickSpark>
                    <MagneticButton
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full text-white font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 flex items-center gap-2 group"
                      onClick={() => scrollToSection("contact")}
                    >
                      Contact Me{" "}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </MagneticButton>
                  </ClickSpark>
                  <MagneticButton
                    className="px-6 py-3 bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-full text-white font-medium hover:bg-purple-900/20 transition-all duration-300"
                    onClick={() => scrollToSection("projects")}
                  >
                    View Projects
                  </MagneticButton>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.2 }}
                  className="flex gap-5 pt-4"
                >
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
                      <div className="w-full h-full rounded-full overflow-hidden">
                        <Image
                          src="/images/mahdi.png"
                          alt="El Mahdi Rahhab"
                          fill
                          className="object-cover"
                          priority
                        />
                      </div>
                    </div>
                  </motion.div>
                  <CircularText
                    text="FULL STACK DEVELOPER • WEB EXPERT • "
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-purple-300/40 pointer-events-none"
                    radius={150}
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Decorative elements */}
          <motion.div
            className="absolute top-1/4 left-10 w-20 h-20 border border-purple-500/20 rounded-full"
            animate={{
              y: [0, 15, 0],
              rotate: [0, 180],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          ></motion.div>
          <motion.div
            className="absolute bottom-1/4 right-10 w-32 h-32 border border-indigo-500/20 rounded-full"
            animate={{
              y: [0, -20, 0],
              rotate: [0, -180],
            }}
            transition={{
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          ></motion.div>
          <motion.div
            className="absolute top-1/3 right-1/4 w-10 h-10 bg-purple-500/10 rounded-full blur-sm"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          ></motion.div>
        </section>

        {/* About Section */}
        <section id="about" ref={(el) => (sectionRefs.current.about = el)} className="min-h-screen py-20 relative">
          <div className="container mx-auto px-4">
            <ScrollReveal className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                About <GradientText>Me</GradientText>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto"></div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <ScrollReveal delay={0.2} className="space-y-8">
                <motion.div
                  className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition-colors duration-300 hover:shadow-lg hover:shadow-purple-500/10"
                  whileHover={{ y: -5 }}
                >
                  <h3 className="text-xl font-semibold mb-4 text-purple-400">Personal Information</h3>
                  <div className="space-y-4">
                    {[
                      { icon: <MapPin className="text-purple-400 w-5 h-5" />, text: "Safi, Maroc" },
                      {
                        icon: <Mail className="text-purple-400 w-5 h-5" />,
                        text: "elmahdirahhab@gmail.com",
                        link: "mailto:elmahdirahhab@gmail.com",
                      },
                      {
                        icon: <Phone className="text-purple-400 w-5 h-5" />,
                        text: "0617104048",
                        link: "tel:+212617104048",
                      },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-900/30 flex items-center justify-center">
                          {item.icon}
                        </div>
                        {item.link ? (
                          <a href={item.link} className="text-gray-300 hover:text-purple-400 transition-colors">
                            {item.text}
                          </a>
                        ) : (
                          <span className="text-gray-300">{item.text}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition-colors duration-300 hover:shadow-lg hover:shadow-purple-500/10"
                  whileHover={{ y: -5 }}
                >
                  <h3 className="text-xl font-semibold mb-4 text-purple-400">Interests</h3>
                  <div className="flex flex-wrap gap-3">
                    {["Football", "Vélo", "Calisthenics", "Gaming"].map((interest, index) => (
                      <motion.span
                        key={index}
                        className="bg-purple-900/30 text-purple-300 px-4 py-2 rounded-full text-sm font-medium border border-purple-500/30"
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(147, 51, 234, 0.4)" }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {interest}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </ScrollReveal>

              <ScrollReveal delay={0.4} className="space-y-8">
                <motion.div
                  className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition-colors duration-300 hover:shadow-lg hover:shadow-purple-500/10"
                  whileHover={{ y: -5 }}
                >
                  <h3 className="text-xl font-semibold mb-4 text-purple-400">Languages</h3>
                  <div className="space-y-6">
                    {[
                      { name: "Arabe", level: "Natale", percentage: 100 },
                      { name: "Anglais", level: "Intermédiaire", percentage: 70 },
                      { name: "Français", level: "Élémentaire", percentage: 40 },
                    ].map((language, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-200">{language.name}</span>
                          <span className="text-gray-400">{language.level}</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${language.percentage}%` }}
                            transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full"
                          ></motion.div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition-colors duration-300 hover:shadow-lg hover:shadow-purple-500/10"
                  whileHover={{ y: -5 }}
                >
                  <h3 className="text-xl font-semibold mb-4 text-purple-400">Professional Profile</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Passionné par le développement web, je combine créativité et expertise technique pour concevoir des
                    applications performantes et intuitives. Autonome et motivé, je m'adapte rapidement aux nouvelles
                    technologies et défis pour apporter des solutions innovantes.
                  </p>
                </motion.div>
              </ScrollReveal>
            </div>
          </div>

          {/* Decorative elements */}
          <motion.div
            className="absolute top-1/3 left-10 w-40 h-40 border border-purple-500/10 rounded-full"
            animate={{
              x: [0, 10, 0],
              y: [0, 15, 0],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          ></motion.div>
          <motion.div
            className="absolute bottom-1/4 right-20 w-20 h-20 bg-indigo-500/10 rounded-full blur-md"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 7,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          ></motion.div>
        </section>

        {/* Skills Section */}
        <section id="skills" ref={(el) => (sectionRefs.current.skills = el)} className="min-h-screen py-20 relative">
          <div className="container mx-auto px-4">
            <ScrollReveal className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                Technical <GradientText>Skills</GradientText>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto"></div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Front-end",
                  icon: <Layout className="w-6 h-6 text-purple-400" />,
                  skills: ["HTML5", "CSS (Tailwind, Bootstrap)", "JavaScript (Alpine.js, React.js)"],
                },
                {
                  title: "Back-end",
                  icon: <Server className="w-6 h-6 text-purple-400" />,
                  skills: ["PHP (Laravel)"],
                },
                {
                  title: "Database",
                  icon: <Database className="w-6 h-6 text-purple-400" />,
                  skills: ["MySQL", "PostgreSQL"],
                },
                {
                  title: "Analysis & Design",
                  icon: <Code className="w-6 h-6 text-purple-400" />,
                  skills: ["UML (use case, class)"],
                },
                {
                  title: "Version Control",
                  icon: <Terminal className="w-6 h-6 text-purple-400" />,
                  skills: ["Git", "GitHub"],
                },
                {
                  title: "Project Management",
                  icon: <Workflow className="w-6 h-6 text-purple-400" />,
                  skills: ["Jira", "Scrum", "Agile", "Kanban"],
                },
              ].map((category, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <motion.div
                    className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 h-full hover:border-purple-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 group"
                    whileHover={{ y: -5, backgroundColor: "rgba(30, 30, 30, 0.8)" }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <motion.div
                        className="w-12 h-12 rounded-lg bg-purple-900/30 flex items-center justify-center group-hover:bg-purple-900/50 transition-colors duration-300"
                        whileHover={{ rotate: 5 }}
                      >
                        {category.icon}
                      </motion.div>
                      <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                    </div>
                    <ul className="space-y-3">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.li
                          key={skillIndex}
                          className="flex items-center gap-2 text-gray-300"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + skillIndex * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                          <span>{skill}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={0.6} className="mt-12">
              <h3 className="text-xl font-semibold text-center mb-6 text-purple-400">Other Tools</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {["VSCode", "PhpStorm", "Figma"].map((tool, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 px-6 py-3 rounded-lg text-gray-300 hover:border-purple-500/40 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tool}
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Decorative elements */}
          <motion.div
            className="absolute top-20 right-10 w-32 h-32 border border-purple-500/10 rounded-full"
            animate={{
              x: [0, -10, 0],
              y: [0, 10, 0],
            }}
            transition={{
              duration: 12,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          ></motion.div>
          <motion.div
            className="absolute bottom-20 left-10 w-24 h-24 bg-purple-500/10 rounded-full blur-md"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          ></motion.div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          ref={(el) => (sectionRefs.current.projects = el)}
          className="min-h-screen py-20 relative"
        >
          <div className="container mx-auto px-4">
            <ScrollReveal className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                My <GradientText>Projects</GradientText>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto"></div>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Luxury_V2: Drive & Loc Agency",
                  description:
                    "A car rental management system aimed at improving the website by introducing a creative and functional platform allowing customers to browse and book vehicles according to their needs.",
                  image: "/images/luxury.jpg",
                  technologies: ["PHP (OOP)", "SQL", "HTML", "CSS", "JavaScript (Alpine.js)", "MySQL"],
                  link: "https://github.com/Mahdi732/Luxury",
                },
                {
                  title: "WEATHERWISE",
                  description:
                    "A modern weather forecast web application that allows users to easily check current weather and short-term forecasts for any city, thanks to an intuitive interface and a third-party weather API.",
                  image: "/images/weather.webp",
                  technologies: ["React.js", "Tailwind CSS", "JavaScript", "Laravel (PHP)", "REST API"],
                  link: "https://weather-app-blond-chi-87.vercel.app/",
                },
                {
                  title: "FUT-Champions",
                  description:
                    "This application allows users to build their FUT team by adding, positioning, and modifying players while respecting tactical formations such as 4-4-2 or 4-3-3. The application emphasizes an interactive user interface and dynamic forms.",
                  image: "/images/owtwv8todbwx68perkjz.avif",
                  technologies: ["HTML", "CSS / Tailwind CSS", "JavaScript Vanilla"],
                  link: "https://github.com/Mahdi732/FUT-Champions",
                },
              ].map((project, index) => (
                <ScrollReveal key={index} delay={index * 0.2}>
                  <motion.div
                    className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl overflow-hidden hover:border-purple-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 h-full flex flex-col group"
                    whileHover={{ y: -10 }}
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                      <motion.div
                        className="absolute inset-0 bg-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                        whileHover={{ opacity: 0.2 }}
                      ></motion.div>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className="relative h-full w-full"
                      >
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <h3
                        className="text-xl font-semibold mb-2 text-white"
                        onMouseEnter={textEnter}
                        onMouseLeave={textLeave}
                      >
                        <GlitchText>{project.title}</GlitchText>
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
                      <MagneticButton
                        className="flex items-center justify-center gap-2 py-2 px-4 bg-purple-900/30 text-purple-300 rounded-lg border border-purple-500/30 hover:bg-purple-900/50 transition-colors duration-300 group"
                        strength={30}
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
                      </MagneticButton>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Decorative elements */}
          <motion.div
            className="absolute top-40 left-20 w-32 h-32 border border-purple-500/10 rounded-full"
            animate={{
              x: [0, 15, 0],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 18,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          ></motion.div>
          <motion.div
            className="absolute bottom-40 right-20 w-24 h-24 bg-indigo-500/10 rounded-full blur-md"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          ></motion.div>
        </section>

        {/* Education Section */}
        <section
          id="education"
          ref={(el) => (sectionRefs.current.education = el)}
          className="min-h-screen py-20 relative"
        >
          <div className="container mx-auto px-4">
            <ScrollReveal className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                My <GradientText>Education</GradientText>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto"></div>
            </ScrollReveal>

            <div className="max-w-3xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <motion.div
                  className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-full"
                  initial={{ height: 0 }}
                  whileInView={{ height: "100%" }}
                  transition={{ duration: 1.5 }}
                  viewport={{ once: true }}
                ></motion.div>

                {[
                  {
                    institution: "YOUCODE - UM6P",
                    degree: "Développement Web Full Stack",
                    period: "2024 - 2026",
                    icon: <GraduationCap className="w-8 h-8 text-purple-400" />,
                  },
                  {
                    institution: "Lycée Salah Din Ayoubi",
                    degree: "Baccalauréat en science Physiques",
                    period: "2024",
                    icon: <GraduationCap className="w-8 h-8 text-purple-400" />,
                  },
                ].map((item, index) => (
                  <ScrollReveal
                    key={index}
                    delay={index * 0.3}
                    className={`relative mb-12 ${
                      index % 2 === 0 ? "md:pr-8 md:ml-0 md:mr-auto md:text-right" : "md:pl-8 md:ml-auto md:mr-0"
                    } md:w-1/2 z-10`}
                  >
                    <motion.div
                      className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
                      whileHover={{ y: -5 }}
                    >
                      {/* Timeline dot */}
                      <motion.div
                        className={`absolute top-6 ${
                          index % 2 === 0 ? "right-0 md:-right-4" : "left-0 md:-left-4"
                        } w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center transform md:translate-x-0 -translate-x-1/2 md:translate-y-0`}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.5 }}
                        viewport={{ once: true }}
                      >
                        <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                        </div>
                      </motion.div>

                      <div className="flex items-center gap-4 mb-3">
                        <div className="bg-purple-900/30 p-3 rounded-full">{item.icon}</div>
                        <div>
                          <h3 className="text-xl font-semibold text-white">{item.institution}</h3>
                          <div className="flex items-center gap-2 text-gray-400 mt-1">
                            <span>{item.period}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-300">{item.degree}</p>
                    </motion.div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <motion.div
            className="absolute top-1/4 right-10 w-40 h-40 border border-purple-500/10 rounded-full"
            animate={{
              x: [0, -15, 0],
              y: [0, 10, 0],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          ></motion.div>
          <motion.div
            className="absolute bottom-1/3 left-20 w-20 h-20 bg-purple-500/10 rounded-full blur-md"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          ></motion.div>
        </section>

        {/* Contact Section */}
        <section id="contact" ref={(el) => (sectionRefs.current.contact = el)} className="min-h-screen py-20 relative">
          <div className="container mx-auto px-4">
            <ScrollReveal className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                Contact <GradientText>Me</GradientText>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto"></div>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <ScrollReveal delay={0.2} className="space-y-8">
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
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <motion.div
                  className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
                  whileHover={{ y: -5 }}
                >
                  <h3 className="text-2xl font-semibold mb-6 text-white">Send Me a Message</h3>

                  {formStatus === "success" && (
                    <div className="mb-6 p-4 bg-green-900/30 border border-green-500/30 rounded-lg text-green-400">
                      {formMessage || "Thank you for your message! I'll get back to you soon."}
                    </div>
                  )}

                  {formStatus === "error" && (
                    <div className="mb-6 p-4 bg-red-900/30 border border-red-500/30 rounded-lg text-red-400">
                      {formMessage || "There was an error sending your message. Please try again later."}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {[
                      { id: "name", label: "Name", type: "text", placeholder: "Your name" },
                      { id: "email", label: "Email", type: "email", placeholder: "Your email" },
                      { id: "subject", label: "Subject", type: "text", placeholder: "Subject" },
                    ].map((field) => (
                      <div key={field.id}>
                        <label htmlFor={field.id} className="block text-sm font-medium text-gray-300 mb-1">
                          {field.label}
                        </label>
                        <motion.input
                          id={field.id}
                          name={field.id}
                          type={field.type}
                          value={formData[field.id as keyof typeof formData]}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          required
                          className="w-full px-4 py-3 bg-gray-800/50 border border-purple-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                          whileFocus={{ borderColor: "rgba(147, 51, 234, 0.5)" }}
                        />
                      </div>
                    ))}

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                        Message
                      </label>
                      <motion.textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your message"
                        rows={5}
                        required
                        className="w-full px-4 py-3 bg-gray-800/50 border border-purple-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                        whileFocus={{ borderColor: "rgba(147, 51, 234, 0.5)" }}
                      />
                    </div>

                    <ClickSpark>
                      <MagneticButton
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 flex items-center justify-center gap-2 group"
                        disabled={formStatus === "submitting"}
                      >
                        {formStatus === "submitting" ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message{" "}
                            <motion.span
                              animate={{ x: [0, 5, 0] }}
                              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, repeatType: "loop" }}
                            >
                              →
                            </motion.span>
                          </>
                        )}
                      </MagneticButton>
                    </ClickSpark>
                  </form>
                </motion.div>
              </ScrollReveal>
            </div>
          </div>

          {/* Decorative elements */}
          <motion.div
            className="absolute top-1/3 right-10 w-32 h-32 border border-purple-500/10 rounded-full"
            animate={{
              x: [0, -10, 0],
              y: [0, 15, 0],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          ></motion.div>
          <motion.div
            className="absolute bottom-1/4 left-20 w-24 h-24 bg-indigo-500/10 rounded-full blur-md"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          ></motion.div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-purple-900/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <div className="text-2xl font-bold">
                  <GlitchText>
                    Mahdi<span className="text-purple-500">Rahhab</span>
                  </GlitchText>
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
      </div>
    </div>
  )
}
