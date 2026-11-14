import React from 'react'
import { neonBackground } from '../assets'
import { GridDistortion, ScrollReveal } from '../minicomponents'


export const Hero = () => {
  return (

    <main id='Home' className=' flex flex-col gap-y-10 pb-10 relative h-screen font-Audiowide'>

      <div className=' w-screen h-screen flex absolute'>
        <div className='w-screen h-screen ' >
          <GridDistortion
            imageSrc={neonBackground}
            grid={10}
            mouse={0.1}
            strength={0.15}
            relaxation={0.9}
            className="custom-class"
          />
        </div>

      </div>


        <ScrollReveal duration={2} delay={0.5} distance={150} className=' pointer-events-none'>
        <div className='flex flex-col h-screen items-center justify-center px-6 md:px-24 z-40 relative'>

          <div className='absolute w-full justify-center flex bottom-0 animate-bounce'>
            <p>Scroll Down</p>
          </div>

          <div className='flex flex-col gap-10 w-full md:w-3/4 text-center'>
            <h1 className='md:text-5xl text-3xl'>Brayan Martinez</h1>
            <p className='md:text-9xl text-5xl leading-tight'>
              <span className='Hero_transparent_text'>Full-stack</span> Developer
            </p>
            <p className='font-Exo2 md:text-4xl text-2xl'>
              Building web pages and solving technical problems.
            </p>
            <div className='flex flex-wrap justify-center gap-4 font-Exo2 md:text-3xl text-2xl pointer-events-auto'>
              <a
                href='#Projects'
                className='px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold text-white hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 hover:-translate-y-1'
              >
                View Projects
              </a>
              <a
                href='/Brayan_Martinez_Full_Stack_developer_Resume.pdf'
                target='_blank'
                rel='noopener noreferrer'
                className='px-8 py-4 bg-black/50 border-2 border-purple-500 rounded-lg font-semibold text-white hover:bg-purple-500 transition-all duration-300 hover:-translate-y-1'
              >
                Resume
              </a>
            </div>
          </div>

        </div>
        </ScrollReveal>

    </main>


  )
}
