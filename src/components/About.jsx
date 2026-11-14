import React from 'react'
import { mac } from '../assets'
import { ScrollReveal, ScrambledText } from '../minicomponents'


export const About = () => {

    const x = 'x';
    return (
        <section id='About' className=' text-white h-screen min-h-screen flex flex-col'>
            <div className='w-full h-10 flex flex-col gap-3 items-center mb-5 mt-10 '>
                <ScrollReveal duration={2} delay={0.5} distance={150}>
                    <div className='content-none bg-secondary h-[2px] w-1/3 rounded-full translate-x-5' />
                    <div className='content-none bg-primary h-[2px] w-1/3 rounded-full -translate-x-5 ' />
                </ScrollReveal>
            </div>
            <>
                <div className='flex md:flex-row flex-col h-full content-center self-center'>
                    <div className='h-full flex flex-col items-center md:items-start  '>
                        <ScrollReveal duration={2} delay={0.7} distance={50}>
                            <h1 className='font-Audiowide text-8xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent w-fit h-fit px-3 py-1 text-whiterounded-tl-3xl rounded-br-3xl'>
                                About Me
                            </h1>
                        </ScrollReveal>
                        <div className='flex flex-col h-full justify-around px-5 md:px-0'>

                            <div className=' font-Exo2'>
                                <ScrollReveal duration={2} delay={0.7} distance={50} className='md:max-w-[45vw] flex flex-col gap-7 self-center md:text-4xl text-2xl'>

                                    < div>
                                        <div><h1 className='font-bold'>Education</h1></div>
                                        <div><h3>• Master's in Computer Science Information System</h3></div>
                                        <div><h3>• Bachelor's in Computer Science Cyber Security</h3></div>
                                    </div>

                                    <p className=''>
                                        I'm a full-stack developer in New Jersey, building web applications
                                        end to end at UniPro International Uniforms. My background spans web
                                        development, machine-learning research and cybersecurity. I enjoy
                                        building websites and apps and solving the technical problems that come with them.<span className='text-primary font-bold'>Let's talk.</span>
                                    </p>
                                </ScrollReveal>

                            </div>
                            <div className='w-fit h-fit font-Exo2'>
                                <ScrollReveal duration={2} delay={0.3} distance={50} className='text-6xl bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent pb-8 text-wrap'>

                                    <h1 className="">
                                        Tech Stack & Frameworks
                                    </h1>

                                </ScrollReveal>

                                <ScrollReveal duration={2} delay={0.3} distance={50}>
                                    <ScrambledText
                                        className="scrambled-text-demo text-nowrap md:text-4xl text-2xl mt-3"
                                        radius={100}
                                        duration={1.2}
                                        speed={0.5}
                                        scrambleChars={x}>


                                        <ul className='columns-2 list-none '>
                                            <>
                                                <li>• Next.js</li>
                                                <li>• JavaScript</li>
                                                <li>• TypeScript</li>
                                                <li>• React</li>
                                                <li>• React Native</li>
                                                <li>• Tailwind CSS</li>
                                                <li>• Vite</li>
                                            </>
                                            <>
                                                <li>• PHP</li>
                                                <li>• Contentful</li>
                                                <li>• MySQL</li>
                                                <li>• Firebase</li>
                                                <li>• APIs</li>
                                                <li>• Node.js</li>
                                                <li>• Express.js</li>
                                            </>
                                        </ul>
                                    </ScrambledText>
                                </ScrollReveal>

                            </div>

                        </div>

                    </div>

                    <ScrollReveal duration={2} delay={0.7} distance={150} className=' hidden md:block'>
                        <div className='min-w-1/3 h-full flex w-[450px]'>
                            <img src={mac} alt="" className='object-contain' />
                        </div>
                    </ScrollReveal>
                </div>



            </>

        </section>
    )
}
