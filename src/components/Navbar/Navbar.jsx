import React, { useState } from 'react';
import menuIcon from '../../assets/menu.svg';
import arrow from '../../assets/arrow.svg';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const redirectToLogin = () => {
    window.location.href = '/login';
  };

  return (
    <>
      <nav className="flex justify-between p-4 text-grey-400">
        <button onClick={toggleMenu}>
          <img src={menuIcon} alt="" />
        </button>
        <span>Today - 11 Oct</span>
        <span></span>
      </nav>

      <section className={`absolute -bottom-[954px] w-full ${isOpen ? '' : 'hidden'}`}>
        <div
          className={`bg-black-400 text-white-400 rounded-t-[32px] hover:cursor-pointer slide-up ${isOpen ? '' : 'hidden-div'}`}
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
          className={`bg-green-400 text-grey-400 rounded-t-[32px] -mt-[992px] hover:cursor-pointer slide-up ${isOpen ? '' : 'hidden-div'}`}
          style={{ animationDelay: '0.4s' }}
          onClick={redirectToLogin}
        >
          <div className="pt-10 pb-[1000px] px-4">
            <div className="flex justify-between">
              <span className="text-grey-400">Last updated - 01 Oct</span>
              <img src={arrow} alt="" />
            </div>
            <div className="text-xl font-bold mt-2">
              <h2>Gallery</h2>
            </div>
          </div>
        </div>

        <div
          className={`bg-blue-400 text-white-400 rounded-t-[32px] -mt-[992px] hover:cursor-pointer slide-up ${isOpen ? '' : 'hidden-div'}`}
          style={{ animationDelay: '0.6s' }}
          onClick={redirectToLogin}
        >
          <div className="pt-10 pb-[1000px] px-4">
            <div className="flex justify-between">
              <span>Last updated - 01 Oct</span>
              <img src={arrow} alt="" />
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
