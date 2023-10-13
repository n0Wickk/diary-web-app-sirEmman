import React, { useState, useEffect } from 'react';
import menuIcon from '../../assets/menu.svg';
import arrow from '../../assets/arrow.svg';
import exit from '../../assets/exit.svg'
import './Navbar.css';
import { useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';

export default function Navbar() {
  const location = useLocation();
  const isOnProfilePage = location.pathname === '/profile';

  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const getCurrentDate = () => {
      const today = new Date();
      const day = today.getDate();
      const month = today.toLocaleString('default', { month: 'short' });
      return `${day} ${month}`;
    };

    setCurrentDate(getCurrentDate());
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const redirectToLogin = () => {
    window.location.href = '/login';
  };

  const redirectToProfile = () => {
    window.location.href = '/profile';
  };

  return (
    <>
      <nav 
      className={`flex justify-between p-4 text-grey-400 items-baseline
      ${isOnProfilePage ? 'bg-blue-400 text-white-400' : ''}`}
      >
        <button 
        onClick={toggleMenu} 
        className='z-20'>
        <img 
        src={`${isOpen ? exit : menuIcon}`} 
        className={`${isOnProfilePage ? 'brightness-0 invert' : ''}`}/>
        </button>
        <span className='font-light text-sm'>
          {`Today - ${currentDate}`}
        </span>
        <span>
          <Icon icon="material-symbols:settings" color="white" width="19" />
        </span>
      </nav> 

      <section 
      className={`fixed -bottom-[954px] w-full
      ${isOpen ? '' : 'hidden'
      }`}>
      <div 
      className="fixed inset-0 backdrop-blur-[2px] z-0" 
      onClick={toggleMenu} />
        <div
          className={`bg-black-400 text-white-400 rounded-t-[32px] hover:cursor-pointer slide-up 
          ${isOpen ? '' : 'hidden-div'
        }`}
          style={{ animationDelay: '0.1s' }}
          onClick={redirectToLogin}
        >
          <div className="pt-10 pb-[1000px] px-4">
            <div className="flex justify-between">
              <span className="text-grey-400">Last updated - 01 Oct</span>
              <img src={arrow} alt="" />
            </div>
            <div className="text-xl font-bold mt-2">
              <h2>Diary Listing</h2>
            </div>
          </div>
        </div>

        <div
          className={`bg-green-400 text-grey-400 rounded-t-[32px] -mt-[992px] hover:cursor-pointer slide-up 
          ${isOpen ? '' : 'hidden-div'
        }`}
          style={{ animationDelay: '0.4s' }}
          onClick={redirectToLogin}
        >
          <div className="pt-10 pb-[1000px] px-4">
            <div className="flex justify-between">
              <span className="text-grey-400">Last updated - 01 Oct</span>
              <img src={arrow} className='filter brightness-50'/>
            </div>
            <div className="text-xl font-bold mt-2">
              <h2>Gallery</h2>
            </div>
          </div>
        </div>

        <div
          className={`bg-blue-400 text-white-400 rounded-t-[32px] -mt-[992px] hover:cursor-pointer slide-up 
          ${isOpen ? '' : 'hidden-div'
        }`}
          style={{ animationDelay: '0.6s' }}
          onClick={redirectToProfile}
        >
          <div className="pt-10 pb-[1000px] px-4">
            <div className="flex justify-between">
              <span>Last updated - 01 Oct</span>
              <img src={arrow} />
            </div>
            <div className="text-xl font-bold mt-2">
              <h2>Profile</h2>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
