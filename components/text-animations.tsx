"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

// Text animation components
interface SplitTextProps {
  children: React.ReactNode
  className?: string
  [key: string]: any
}

export const SplitText = ({ children, className = "", ...rest }: SplitTextProps) => {
  if (typeof children !== "string") return <span className={className}>{children}</span>

  return (
    <span className={`inline-block ${className}`} {...rest}>
      {children.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.04 }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  )
}

interface GlitchTextProps {
  children: React.ReactNode
  className?: string
}

export const GlitchText = ({ children, className = "" }: GlitchTextProps) => {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 200)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <span
      className={`relative inline-block ${className} ${
        isGlitching
          ? "before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-purple-500/20 before:translate-x-[3px] after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-cyan-500/20 after:-translate-x-[3px]"
          : ""
      }`}
    >
      {children}
    </span>
  )
}

interface GradientTextProps {
  children: React.ReactNode
  className?: string
}

export const GradientText = ({ children, className = "" }: GradientTextProps) => {
  return (
    <span
      className={`bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 animate-gradient ${className}`}
    >
      {children}
    </span>
  )
}

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export const ScrollReveal = ({ children, className = "", delay = 0 }: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  strength?: number
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  disabled?: boolean
}

export const MagneticButton = ({ children, className = "", strength = 40, ...props }: MagneticButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const element = buttonRef.current
    if (!element || props.disabled) return

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = element.getBoundingClientRect()
      const x = e.clientX - left
      const y = e.clientY - top
      const centerX = width / 2
      const centerY = height / 2
      const distanceX = x - centerX
      const distanceY = y - centerY

      element.style.transform = `translate(${distanceX / strength}px, ${distanceY / strength}px)`
    }

    const handleMouseLeave = () => {
      element.style.transform = "translate(0, 0)"
    }

    element.addEventListener("mousemove", handleMouseMove)
    element.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      element.removeEventListener("mousemove", handleMouseMove)
      element.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [strength, props.disabled])

  return (
    <motion.button
      ref={buttonRef}
      whileHover={props.disabled ? {} : { scale: 1.05 }}
      whileTap={props.disabled ? {} : { scale: 0.95 }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  )
}

interface ClickSparkProps {
  children: React.ReactNode
  className?: string
}

export const ClickSpark = ({ children, className = "" }: ClickSparkProps) => {
  const [sparks, setSparks] = useState<Array<{ id: number; x: number; y: number; angle: number }>>([])

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newSparks = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i,
      x,
      y,
      angle: (i * Math.PI * 2) / 8,
    }))

    setSparks([...sparks, ...newSparks])
    setTimeout(() => {
      setSparks((prev) => prev.filter((spark) => !newSparks.includes(spark)))
    }, 1000)
  }

  return (
    <div className={`relative overflow-hidden ${className}`} onClick={handleClick}>
      {children}
      {sparks.map((spark) => (
        <motion.div
          key={spark.id}
          className="absolute w-2 h-2 bg-purple-500 rounded-full pointer-events-none"
          initial={{
            x: spark.x,
            y: spark.y,
            opacity: 1,
            scale: 0.8,
          }}
          animate={{
            x: spark.x + Math.cos(spark.angle) * 100,
            y: spark.y + Math.sin(spark.angle) * 100,
            opacity: 0,
            scale: 0,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      ))}
    </div>
  )
}

interface CircularTextProps {
  text: string
  className?: string
  radius?: number
}

export const CircularText = ({ text, className = "", radius = 100 }: CircularTextProps) => {
  return (
    <div className={`relative ${className}`} style={{ width: radius * 2, height: radius * 2 }}>
      {text.split("").map((char, i) => {
        const angle = (i * 360) / text.length
        const radian = (angle * Math.PI) / 180
        const x = radius + radius * Math.cos(radian)
        const y = radius + radius * Math.sin(radian)

        return (
          <div
            key={i}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 text-sm font-medium"
            style={{
              left: x,
              top: y,
              transform: `translate(-50%, -50%) rotate(${angle + 90}deg)`,
            }}
          >
            {char}
          </div>
        )
      })}
    </div>
  )
}

interface CountUpProps {
  end: number
  duration?: number
  className?: string
}

export const CountUp = ({ end, duration = 2000, className = "" }: CountUpProps) => {
  const [count, setCount] = useState(0)
  const countRef = useRef<HTMLSpanElement>(null)
  const isInView = useInView(countRef, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime: number | null = null
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime
      const percentage = Math.min(progress / duration, 1)
      setCount(Math.floor(percentage * end))

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, isInView])

  return (
    <span ref={countRef} className={className}>
      {count}
    </span>
  )
}
