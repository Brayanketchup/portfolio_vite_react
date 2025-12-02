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
        <div className='flex md:flex-row flex-col gap-14 h-screen items-center justify-around px-24 z-40 relative'>

          <div className='absolute w-full justify-center flex bottom-0 animate-bounce'>
            <h1>Scroll Down</h1>
          </div>

          <>
            <div className='md:text-9xl text-7xl gap-x-4 flex flex-row flex-wrap w-1/2 justify-center'>
              <h1 className='Hero_transparent_text justify-center '>Designing</h1>
              <h1>Today's</h1>
              <h1 >Interfaces,</h1>
              <h1 className='Hero_transparent_text text-wrap'>Mastering</h1>
              <h1>Tomorrow's</h1>
              <h1>Tech</h1>
            </div>

          </>

        </div>
        </ScrollReveal>

    </main>


  )
}
