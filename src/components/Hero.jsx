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
            <h1 className='md:text-9xl text-5xl leading-tight'>
              <span className='Hero_transparent_text'>Full-stack</span> developer building{' '}
              <span className='Hero_transparent_text'>finance</span> and{' '}
              <span className='Hero_transparent_text'>data</span> tools.
            </h1>
            <p className='font-Exo2 md:text-4xl text-2xl'>
              Open to new opportunities in full-stack development.
            </p>
          </div>

        </div>
        </ScrollReveal>

    </main>


  )
}
