"use client";

import React, { ReactNode, useEffect, useRef, useState } from "react";

interface AosFadeUpProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    distance?: number;
}

const FadeUp: React.FC<AosFadeUpProps> = ({
    children,
    className = "",
    delay = 0,
    duration = 600,
    distance = 30,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Trigger animation every time element enters viewport
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        setIsVisible(true);
                    }, delay);
                } else {
                    // Reset when element leaves viewport (optional)
                    setIsVisible(false);
                }
            },
            {
                threshold: 0.1, // Trigger when 10% of element is visible
                rootMargin: '0px 0px -50px 0px', // Adjust this to trigger earlier/later
            }
        );

        const currentElement = elementRef.current;
        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, [delay]);

    return (
        <div
            ref={elementRef}
            className={className}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : `translateY(${distance}px)`,
                transition: `opacity ${duration}ms ease-in-out, transform ${duration}ms ease-in-out`,
                transitionDelay: `${delay}ms`,
            }}
        >
            {children}
        </div>
    );
};

export default FadeUp;