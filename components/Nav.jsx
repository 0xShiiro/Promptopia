'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
  const isUserLoggedIn = true;
  const [providers, setprovider] = useState(null);
  const [ToggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const fetchProviders = async () => {
      const providers = await getProviders();
      setprovider(providers);
    }
    fetchProviders();
  })
  return (
    
      <nav className='w-full flex mb-16 pt-3 flex-between'>
        <Link href='/' className='flex gap-2 flex-center'>
          <Image src='assets/images/logo.svg'
            className='object-contain'
            alt="Promptopia logo"
            width={30}
            height={30} />
          <p className="logo_text">Promtopia</p>
        </Link>
        {/*Desktop navigation */}

        <div className='sm:flex hidden'>
          {isUserLoggedIn ? (
            <div className="flex gap-3 md:gap-5">
              <Link href='/create-prompt' className="black_btn">
                Create Post
              </Link>
              <button type="button" onClick={signOut} className="outline_btn">
                Sign Out
              </button>
              <Link href="/">
                <Image src="/assets/images/logo.svg"
                  width={37}
                  height={37}
                  alt="profile image"
                  className="rounded-full" />

              </Link>
            </div>
          ) : (
            <>
              {providers && Object.values(providers).map((provider) => {
                <button key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                  Sign in
                </button>
              })}
            </>
          )}
        </div>

        <div className="sm:hidden flex relative">
          {isUserLoggedIn ? (
            <div className="flex">
              <Image src="/assets/images/logo.svg"
                width={37}
                height={37}
                alt="profile image"
                className="rounded-full"
                onClick={() => setToggleDropdown((prev)=> !prev)}
              />
              {ToggleDropdown && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
            </div>


          ) : (
            <>
              {providers && Object.values(providers).map((provider) => {
                <button key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                  Sign in
                </button>
              })}
            </>
          )}
        </div>
      </nav>

  )
}

export default Nav
