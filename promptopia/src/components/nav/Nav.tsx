'use client'

// Core
import {FC} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {useState, useEffect} from "react";
import {
    signIn,
    signOut,
    useSession,
    getProviders
} from 'next-auth/react';

const Nav: FC = () => {
    const {data: session} = useSession();
    const [providers, setProviders] = useState<unknown | null>(null);
    const [toggleDropDown, setToggleDropDown] = useState<boolean>(false);

    const signOutHandle = () => {
        setToggleDropDown(false);
        signOut();
    }
    useEffect(() => {
        (async () => {
            const response = await getProviders();
            setProviders(response)
        })()
    }, []);


    return (
        <nav className='flex-between w-full mb-16 pt-3'>
            <Link href='/' className='flex gap-2'>
                <Image
                    width={30}
                    height={30}
                    className='object-contain'
                    src='/assets/images/logo.svg'
                    priority={true}
                    alt='Probptopia logo'
                />
                <p className='logo_text'>Promptopia</p>
            </Link>

            <div className='sm:flex hidden'>
                {
                    session?.user ?
                        <div className='flex gap-3 md:gap-5'>
                            <Link
                                className='black_btn'
                                href='/create-prompt'
                            >
                                Create Post
                            </Link>
                            <button
                                type='button'
                                className='outline_btn'
                                onClick={signOutHandle}
                            >
                                Sign Out
                            </button>
                            <Link
                                href="/profile"
                            >
                                <Image
                                    width={37}
                                    height={37}
                                    src={session?.user?.image || "/assets/images/logo.svg"}
                                    className="rounded-full"
                                    priority={true}
                                    alt="profile"
                                />
                            </Link>

                        </div> :
                        <>
                            {
                                providers &&
                                Object.values(providers).map((provider) => (
                                    <button
                                        key={provider.name}
                                        type='button'
                                        onClick={() => signIn(provider.id)}
                                        className='black_btn'
                                    >
                                        Sign In
                                    </button>
                                ))
                            }
                        </>
                }
            </div>
            <div className='sm:hidden flex relative'>
                {
                    session?.user ? (
                        <div className='flex cursor-pointer'>
                            <Image
                                onClick={() => setToggleDropDown(prev => !prev)}
                                width={37}
                                height={37}
                                src={session?.user?.image || "/assets/images/logo.svg"}
                                className="rounded-full"
                                priority={true}
                                alt="profile"
                            />
                            {
                                toggleDropDown &&
                                <div className='dropdown'>
                                    <Link
                                        href="/profile"
                                        className="dropdown_link"
                                        onClick={() => setToggleDropDown(false)}
                                    >
                                        My Profile
                                    </Link>
                                    <Link
                                        href="/create-prompt"
                                        className="dropdown_link"
                                        onClick={() => setToggleDropDown(false)}
                                    >
                                        Create Prompt
                                    </Link>
                                    <button
                                        type='button'
                                        className='mt-5 w-full black_btn'
                                        onClick={signOutHandle}
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            }
                        </div>
                    ) : (
                        <>
                            {
                                providers &&
                                Object.values(providers).map((provider) => (
                                    <button
                                        key={provider.name}
                                        type='button'
                                        onClick={() => signIn(provider.id)}
                                        className='black_btn'
                                    >
                                        Sign In
                                    </button>
                                ))
                            }
                        </>
                    )

                }
            </div>
        </nav>
    );
}

export default Nav;