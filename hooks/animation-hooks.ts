"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useScroll, useSpring, useTransform } from "framer-motion"

// Custom hooks with TypeScript types
export function useMagneticEffect(ref: React.RefObject<HTMLElement>, strength = 40) {
  useEffect(() => {
    const element = ref.current
    if (!element) return

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
  }, [ref, strength])
}

interface TrailPoint {
  x: number
  y: number
  timestamp: number
}

export function useImageTrail() {
  const [trail, setTrail] = useState<TrailPoint[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setTrail((prevTrail) => [{ x: e.clientX, y: e.clientY, timestamp: Date.now() }, ...prevTrail.slice(0, 5)])
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return { trail, mousePosition }
}

export function useScrollVelocity() {
  const { scrollY } = useScroll()
  const scrollVelocity = useSpring(
    useTransform(scrollY, (latest, prev) => latest - prev),
    {
      stiffness: 500,
      damping: 90,
      mass: 0.5,
    },
  )
  return scrollVelocity
}
