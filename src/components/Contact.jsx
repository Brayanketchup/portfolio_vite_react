
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Footer } from './Footer';

gsap.registerPlugin(ScrollTrigger);

const EmailIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GithubIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

export const Contact = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contactCardsRef = useRef([]);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'top 60%',
          toggleActions: 'play none none reverse'
        }
      });

      tl.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
      })
        .from(contactCardsRef.current, {
          opacity: 0,
          y: 30,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power2.out'
        }, '-=0.5')
        .from(ctaRef.current, {
          opacity: 0,
          scale: 0.9,
          duration: 0.8,
          ease: 'back.out(1.7)'
        }, '-=0.4');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const contactItems = [
    {
      platform: 'Email',
      value: 'Brayanrivas0226@gmail.com',
      link: 'mailto:brayanrivas0226@gmail.com',
      icon: <EmailIcon />,
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      platform: 'LinkedIn',
      value: 'Brayan\'s LinkedIn',
      link: 'https://www.linkedin.com/in/brayan0226/',
      icon: <LinkedInIcon />,
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      platform: 'Github',
      value: 'BrayanKetchup',
      link: 'https://github.com/Brayanketchup',
      icon: <GithubIcon />,
      gradient: 'from-purple-500 to-pink-600'
    }
  ];

  return (
    <div className='min-h-screen flex flex-col justify-between' id="Contact">
      <section
        ref={sectionRef}
        className="h-full bg-black py-20 px-4 md:px-24 relative overflow-hidden font-Exo2"
      >

        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">

          <div ref={titleRef} className="mb-20">
            <div className="inline-block mb-6">
              <h1 className='text-6xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent font-Audiowide'>
                Get In Touch
              </h1>
              <div className="h-1.5 w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full mt-2"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-400">
              Let's build something amazing together
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">

            <div className="space-y-6">
              {contactItems.map((item, index) => (
                <a
                  key={item.platform}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  ref={el => contactCardsRef.current[index] = el}
                  className="group block relative"
                >
                  <div className="relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 overflow-hidden hover:border-transparent transition-all duration-500">

                    <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}></div>
                    <div className="absolute inset-[1px] bg-gradient-to-br from-gray-900 to-black rounded-2xl"></div>

                    <div className="relative flex items-center gap-6">

                      <div className={`flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-r ${item.gradient} p-[2px] group-hover:scale-110 transition-transform duration-300`}>
                        <div className="w-full h-full bg-black rounded-xl flex items-center justify-center text-white">
                          {item.icon}
                        </div>
                      </div>


                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">
                          {item.platform}
                        </p>
                        <p className="text-lg md:text-xl text-white font-semibold truncate group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                          {item.value}
                        </p>
                      </div>


                      <div className="flex-shrink-0 text-gray-600 group-hover:text-cyan-400 transform translate-x-0 group-hover:translate-x-2 transition-all duration-300">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>


            <div ref={ctaRef} className="lg:sticky lg:top-32 space-y-8">

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-8 space-y-6">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-3">Start a Project</h3>
                    <p className="text-gray-400 text-lg leading-relaxed">
                      Have an idea? Let's discuss how we can bring your vision to life with cutting-edge technology.
                    </p>
                  </div>

                  <a
                    href="mailto:brayanrivas0226@gmail.com"
                    className="group/btn inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-white hover:from-cyan-400 hover:to-blue-500 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50"
                  >
                    <span>Send Message</span>
                    <svg className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>


              <div className="relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-white mb-1">Resume</h4>
                    <p className="text-gray-500 text-sm">Download my latest CV</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
                    <DownloadIcon />
                  </div>
                </div>
                <a
                  href="/Brayan_Martinez_Full_Stack_developer_Resume.pdf"
                  download="Brayan_Martinez_Resume_2025.pdf"
                  className="block w-full text-center py-3 bg-white/5 hover:bg-white/10 rounded-xl text-white font-medium transition-all duration-300 border border-gray-700 hover:border-purple-500/50"
                >
                  Download PDF
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>


  );
};
