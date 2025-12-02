import React, { useEffect, useState, useRef } from 'react';
import { fetchProjects } from '../utils/contentfulClient';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const LinkIcon = () => (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
);

gsap.registerPlugin(ScrollTrigger);

const OptimizedImage = ({ src, alt, className }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [imageSrc, setImageSrc] = useState('');
    const imgRef = useRef(null);

    useEffect(() => {
        const optimizedSrc = `${src}?w=1200&fm=webp&q=80&fit=fill`;
        setImageSrc(optimizedSrc);
    }, [src]);

    useEffect(() => {
        if (!imgRef.current || !imageSrc) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = imageSrc;
                        observer.unobserve(img);
                    }
                });
            },
            { rootMargin: '50px' }
        );

        observer.observe(imgRef.current);

        return () => {
            if (imgRef.current) {
                observer.unobserve(imgRef.current);
            }
        };
    }, [imageSrc]);

    return (
        <div className="relative w-full h-full bg-gray-900">
            <img
                ref={imgRef}
                alt={alt}
                className={`${className} transition-opacity duration-300 ${
                    isLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setIsLoaded(true)}
                loading="lazy"
            />
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
            )}
        </div>
    );
};

export const Projects = () => {
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const projectRefs = useRef([]);
    const scrollTriggersRef = useRef([]);
    const [projects, setProjects] = useState([]);
    const [activeProject, setActiveProject] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const carouselRef = useRef(null);

    useEffect(() => {
        const getProjects = async () => {
            try {
                const fetchedProjects = await fetchProjects();
                console.log('Fetched Projects:', fetchedProjects);
                setProjects(fetchedProjects);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };
        getProjects();
    }, []);

    useEffect(() => {
        if (projects.length === 0) return;

        const timer = setTimeout(() => {
            setImagesLoaded(true);
        }, 300);

        return () => clearTimeout(timer);
    }, [projects]);

    useEffect(() => {
        if (!imagesLoaded || projects.length === 0) return;

        scrollTriggersRef.current.forEach(trigger => trigger.kill());
        scrollTriggersRef.current = [];

        projectRefs.current.forEach((project, index) => {
            if (!project) return;

            const image = project.querySelector('.project-image');
            const leftText = project.querySelector('.left-text');
            const rightText = project.querySelector('.right-text');

            gsap.set(image, {
                opacity: 0,
                scale: 0.8,
                willChange: "transform, opacity"
            });
            gsap.set([leftText, rightText], {
                opacity: 0,
                y: 20,
                willChange: "transform, opacity"
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: project,
                    start: "top 50%",
                    end: "top 50%",
                    toggleActions: "play none none reverse",
                    once: false,
                    onEnter: () => {
                        setTimeout(() => {
                            gsap.set([image, leftText, rightText], {
                                willChange: "auto"
                            });
                        }, 1000);
                    }
                }
            });

            scrollTriggersRef.current.push(tl.scrollTrigger);

            tl.to(image, {
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: "power3.out"
            })
            .to(leftText, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out"
            }, "-=0.5")
            .to(rightText, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out"
            }, "-=0.4");
        });

        return () => {
            scrollTriggersRef.current.forEach(trigger => trigger.kill());
            scrollTriggersRef.current = [];
        };
    }, [projects, imagesLoaded]);

    const handleTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
        setIsDragging(true);
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
    };

    const handleTouchEnd = (e) => {
        if (!isDragging) return;
        
        const touchEnd = e.changedTouches[0].clientX;
        const swipeThreshold = 50;
        const distance = touchStart - touchEnd;

        if (Math.abs(distance) > swipeThreshold) {
            if (distance > 0 && activeProject < projects.length - 1) {
                setActiveProject(activeProject + 1);
            } else if (distance < 0 && activeProject > 0) {
                setActiveProject(activeProject - 1);
            }
        }
        
        setIsDragging(false);
        setTouchStart(0);
    };

    const goToProject = (index) => {
        setActiveProject(index);
    };

    const goToPrevious = () => {
        if (activeProject > 0) {
            setActiveProject(activeProject - 1);
        }
    };

    const goToNext = () => {
        if (activeProject < projects.length - 1) {
            setActiveProject(activeProject + 1);
        }
    };

    return (
        <div id='Projects'>
            <section  className='md:hidden min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 px-4 py-12'>
                <div className="mb-10 font-Audiowide">
                    <div className="inline-block mb-4">
                        <h1 className='text-4xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent'>
                            Projects
                        </h1>
                        <div className="h-1 w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full mt-2"></div>
                    </div>
                    <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text">
                        Web Applications
                    </h2>
                </div>

                {projects.length > 0 && (
                    <div className="relative font-Exo2">
                        <div 
                            ref={carouselRef}
                            className="relative overflow-hidden"
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                            style={{ touchAction: 'pan-y' }}
                        >
                            <div 
                                className="flex will-change-transform"
                                style={{
                                    transform: `translate3d(-${activeProject * 100}%, 0, 0)`,
                                    transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                                }}
                            >
                                {projects.map((project, index) => (
                                    <div 
                                        key={project.sys?.id || index}
                                        className="w-full flex-shrink-0"
                                    >
                                        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border border-gray-800 mx-1">
                                            <div className="relative aspect-video w-full overflow-hidden bg-black">
                                                {Math.abs(index - activeProject) <= 1 && (
                                                    <img
                                                        src={project.fields.coverImage.fields.file.url}
                                                        alt={project.fields.title}
                                                        className='w-full h-full object-cover'
                                                        loading={index === 0 ? "eager" : "lazy"}
                                                    />
                                                )}
                                            </div>

                                            <div className="p-6 space-y-6">
                                                <div>
                                                    <h2 className='text-2xl font-black text-white mb-2 leading-tight'>
                                                        {project.fields.title}
                                                    </h2>
                                                    <div className="h-1 w-16 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full mb-4"></div>
                                                    <p className='text-base text-gray-300 leading-relaxed'>
                                                        {project.fields.description}
                                                    </p>
                                                </div>

                                                <div className="border-t border-gray-800 pt-4">
                                                    <h3 className='text-lg font-bold text-purple-400 mb-3 uppercase tracking-wide'>Tech Stack</h3>
                                                    <div className="flex flex-wrap gap-2">
                                                        {project.fields.techStack.map((tech, techIndex) => (
                                                            <span 
                                                                key={techIndex}
                                                                className="px-3 py-1.5 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-full text-xs font-medium text-cyan-300"
                                                            >
                                                                {tech}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className='flex flex-col gap-3 pt-2'>
                                                    <a
                                                        target='_blank'
                                                        rel='noopener noreferrer'
                                                        href={project.fields.linkAddress}
                                                        className='flex flex-row gap-3 items-center justify-center px-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg transition-transform duration-200 shadow-lg active:scale-95'
                                                    >
                                                        <span className="font-semibold text-white">Live Demo</span>
                                                        <LinkIcon />
                                                    </a>
                                                    <a
                                                        target='_blank'
                                                        rel='noopener noreferrer'
                                                        href={project.fields.repositoryLinkAddress}
                                                        className='flex flex-row gap-3 items-center justify-center px-5 py-3 border-2 border-purple-500 text-purple-400 rounded-lg transition-transform duration-200 active:scale-95'
                                                    >
                                                        <span className="font-semibold">Git Repository</span>
                                                        <LinkIcon />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-6 px-2">
                            <button
                                onClick={goToPrevious}
                                disabled={activeProject === 0}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                                    activeProject === 0
                                        ? 'bg-gray-800 text-gray-600 cursor-not-allowed opacity-50'
                                        : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white active:scale-95 shadow-lg'
                                }`}
                            >
                                ←
                            </button>
                            
                            <div className="flex gap-2">
                                {projects.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToProject(index)}
                                        className={`transition-all duration-300 rounded-full ${
                                            index === activeProject
                                                ? 'bg-gradient-to-r from-cyan-400 to-purple-600 w-8 h-2.5'
                                                : 'bg-gray-700 w-2.5 h-2.5'
                                        }`}
                                        aria-label={`Go to project ${index + 1}`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={goToNext}
                                disabled={activeProject === projects.length - 1}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                                    activeProject === projects.length - 1
                                        ? 'bg-gray-800 text-gray-600 cursor-not-allowed opacity-50'
                                        : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white active:scale-95 shadow-lg'
                                }`}
                            >
                                →
                            </button>
                        </div>

                        <div className="text-center mt-4 text-gray-400 text-sm">
                            Project {activeProject + 1} of {projects.length}
                        </div>
                    </div>
                )}
            </section>

            <section  className='hidden md:block min-h-screen py-20 px-4 md:px-24 bg-black'>
                <div className="mb-16 font-Audiowide">
                    <div className="inline-block mb-6">
                        <h1 className='text-6xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent'>
                            Projects
                        </h1>
                        <div className="h-1.5 w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full mt-2"></div>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text">
                        Web Applications
                    </h2>
                </div>
      
                <ul className='grid grid-cols-1 gap-32 w-full font-Exo2'>
                    {projects.map((project, index) => (
                        <li
                            key={project.sys?.id || index}
                            ref={el => projectRefs.current[index] = el}
                            className='h-fit w-full'
                        >
                            <div className='text-2xl h-full w-full bg-black/50 p-4 md:p-7 flex flex-col md:flex-row gap-10 justify-center'>
                                <div className='left-text flex flex-col gap-8 h-fit w-full md:w-[22vw] sticky top-1/3'>
                                    <div>
                                        <h3 className='text-2xl font-bold text-cyan-400 mb-4 tracking-wide uppercase'>Description</h3>
                                        <p className='text-lg md:text-xl text-gray-300 leading-relaxed font-light'>
                                            {project.fields.description}
                                        </p>
                                    </div>
                                    
                                    <div className="border-t border-gray-700/50 pt-6">
                                        <h3 className='text-2xl font-bold text-purple-400 mb-4 tracking-wide uppercase'>Tech Stack</h3>
                                        <ul className="flex flex-wrap gap-2">
                                            {project.fields.techStack.map((tech, techIndex) => (
                                                <li 
                                                    key={techIndex}
                                                    className="px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-full text-sm font-medium text-cyan-300 hover:from-cyan-500/20 hover:to-purple-500/20 transition-all duration-300"
                                                >
                                                    {tech}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className='flex flex-row w-full md:w-[50vw] relative'>
                                    <div className='project-image w-full h-full flex items-center justify-center px-[10px]'>
                                        <OptimizedImage
                                            src={project.fields.coverImage.fields.file.url}
                                            alt={project.fields.title}
                                            className='w-full h-full object-cover rounded-lg'
                                        />
                                    </div>
                                </div>

                                <div className='right-text flex flex-col justify-between gap-8 h-fit w-full md:w-[22vw] sticky top-1/3'>
                                    <div>
                                        <h2 className='text-3xl md:text-4xl font-black text-white mb-2 leading-tight'>
                                            {project.fields.title}
                                        </h2>
                                        <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full"></div>
                                    </div>
                                    
                                    <div className='flex flex-col gap-4'>
                                        <a
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            href={project.fields.linkAddress}
                                            className='group/link flex flex-row gap-3 items-center px-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 w-fit shadow-lg hover:shadow-cyan-500/50 hover:-translate-y-1'
                                        >
                                            <span className="font-semibold text-white">Live Demo</span>
                                            <LinkIcon />
                                        </a>
                                        <a
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            href={project.fields.repositoryLinkAddress}
                                            className='group/link flex flex-row gap-3 items-center px-5 py-3 border-2 border-purple-500 text-purple-400 rounded-lg hover:bg-purple-500 hover:text-white transition-all duration-300 w-fit hover:-translate-y-1'
                                        >
                                            <span className="font-semibold">Git Repository</span>
                                            <LinkIcon />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};