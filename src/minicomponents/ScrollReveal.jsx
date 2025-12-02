import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({ children, duration = 1, delay = 0, distance = 100, className = '' }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    
    gsap.fromTo(
      element,
      {
        y: distance,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: duration,
        delay: delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [duration, delay, distance]);

  return (
    <div  ref={elementRef} className={className}>
      {children}
    </div>
  );
};

export default ScrollReveal;
