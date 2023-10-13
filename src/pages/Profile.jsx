import React from 'react'
import pfp from '../assets/samplepfp.png'

export default function Profile() {
  return (
    <main className='bg-blue-400 p-4'>
        <section className='flex flex-col items-center gap-2 text-white-400'>
            <img src={pfp} alt="" className='max-w-[100px]' />
            <h2 className='font-bold text-2xl'>Bobby Hill</h2>
            <p className='font-light'>I like turtles!</p>
        </section>
    </main>
  )
}
