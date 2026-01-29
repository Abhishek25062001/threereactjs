import { useEffect, useState, useRef } from 'react'

export default function useIntersectionObserver(options = {}) {
    const [isIntersecting, setIsIntersecting] = useState(false)
    const [hasIntersected, setHasIntersected] = useState(false)
    const targetRef = useRef(null)

    useEffect(() => {
        const target = targetRef.current
        if (!target) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting)
                if (entry.isIntersecting && !hasIntersected) {
                    setHasIntersected(true)
                }
            },
            {
                threshold: options.threshold || 0.1,
                rootMargin: options.rootMargin || '50px',
                ...options,
            }
        )

        observer.observe(target)

        return () => {
            observer.disconnect()
        }
    }, [hasIntersected, options])

    return { targetRef, isIntersecting, hasIntersected }
}
