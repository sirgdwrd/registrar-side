import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, Sun, Moon, Bell, User, ArrowLeft } from 'lucide-react';
import DefaultProfilePic from '../../assets/img/jhego.jpg';

const Tooltip = ({ text }) => (
    <span className="
        absolute top-full left-1/2 -translate-x-1/2 mt-2
        bg-gray-900 text-white text-xs font-bold 
        rounded-md px-2 py-1 
        opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 
        transition-all duration-300 ease-in-out
        whitespace-nowrap z-50
    ">
        {text}
    </span>
);

const DashboardHeader = ({ setMobileOpen }) => {
        const [currentTime, setCurrentTime] = useState(new Date());
        const [openDropdown, setOpenDropdown] = useState(null);
        const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
        
        const [isDarkMode, setIsDarkMode] = useState(() => {
                if (typeof window !== 'undefined') {
                        return localStorage.theme === 'dark' || 
                                     (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
                }
                return false;
        });

        const notificationRef = useRef(null);
        const profileRef = useRef(null);
        
        useEffect(() => {
                const timer = setInterval(() => setCurrentTime(new Date()), 1000);
                return () => clearInterval(timer);
        }, []);

        useEffect(() => {
                if (isDarkMode) {
                        document.documentElement.classList.add('dark');
                        localStorage.theme = 'dark';
                } else {
                        document.documentElement.classList.remove('dark');
                        localStorage.theme = 'light';
                }
        }, [isDarkMode]);

        useEffect(() => {
                const handleClickOutside = (event) => {
                        if (openDropdown === 'notifications' && notificationRef.current && !notificationRef.current.contains(event.target)) {
                                setOpenDropdown(null);
                        }
                        if (openDropdown === 'profile' && profileRef.current && !profileRef.current.contains(event.target)) {
                                setOpenDropdown(null);
                        }
                };
                document.addEventListener('mousedown', handleClickOutside);
                return () => document.removeEventListener('mousedown', handleClickOutside);
        }, [openDropdown]);

        const toggleDropdown = (dropdown) => {
                setOpenDropdown(openDropdown === dropdown ? null : dropdown);
        };

        const formattedDate = currentTime.toLocaleDateString('en-US', {
                month: 'long', day: 'numeric', year: 'numeric',
        });

        const formattedTime = currentTime.toLocaleTimeString('en-US', {
                hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true,
        });

        const notifications = [
                { id: 1, message: 'New assignment posted for Math.', time: '5m ago' },
                { id: 2, message: 'Upcoming event: School Fair on Friday.', time: '1h ago' },
                { id: 3, message: 'Your tuition payment is due next week.', time: '1d ago' },
        ];

        // Mock user data
        const user = {
                fullName: 'John Doe',
                studentNumber: '2024-00001',
                profilePictureURL: null
        };

        return (
                <header className='sticky top-0 z-30 w-full bg-[#F9F9F9] dark:bg-slate-900 dark:border-b dark:border-slate-700 py-4 flex items-center justify-between'>
                        
                        {/*Mobile Search View */}
                        {isMobileSearchOpen && (
                                <div className="absolute inset-0 bg-[#F9F9F9] dark:bg-slate-900 w-full flex items-center px-4 z-40 sm:hidden">
                                        <button onClick={() => setIsMobileSearchOpen(false)} className="mr-2 text-gray-500 dark:text-gray-400">
                                                <ArrowLeft size={24} />
                                        </button>
                                        <div className='relative flex-1'>
                                                <input
                                                        type='text'
                                                        placeholder='Search...'
                                                        className='w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F3D67D]'
                                                        autoFocus
                                                />
                                                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-300' />
                                        </div>
                                </div>
                        )}

                        <div className="flex items-center flex-1">
                                <div className="relative group pl-6 md:hidden">
                                        <button
                                                onClick={() => setMobileOpen(true)}
                                                className="text-gray-500 dark:text-gray-400"
                                                aria-label="Open sidebar"
                                        >
                                                <Menu size={24} />
                                        </button>
                                        <Tooltip text="Open menu" />
                                </div>

                                <div className='hidden sm:block flex-1 max-w-sm md:pl-6'>
                                        <div className='relative'>
                                                <input
                                                        type='text'
                                                        placeholder='Search...'
                                                        className='w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F3D67D]'
                                                />
                                                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-300' />
                                        </div>
                                </div>
                        </div>

                        <div className='flex items-center gap-4 ml-4 pr-6'>
                                <div className='hidden sm:flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400'>
                                        <span>{formattedDate}</span>
                                        <span>-</span>
                                        <span>{formattedTime}</span>
                                </div>

                                <div className="relative group sm:hidden">
                                        <button onClick={() => setIsMobileSearchOpen(true)} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors">
                                                <Search className='w-5 h-5 text-gray-600 dark:text-gray-400' />
                                        </button>
                                        <Tooltip text="Search" />
                                </div>

                                <div className="relative group">
                                        <button onClick={() => setIsDarkMode(!isDarkMode)} className='p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors'>
                                                {isDarkMode ? <Sun className='w-5 h-5 text-yellow-400' /> : <Moon className='w-5 h-5 text-gray-600' />}
                                        </button>
                                        <Tooltip text={isDarkMode ? 'Light Mode' : 'Dark Mode'} />
                                </div>

                                <div className="relative group" ref={notificationRef}>
                                        <button onClick={() => toggleDropdown('notifications')} className='relative p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors'>
                                                <Bell className='w-5 h-5 text-gray-600 dark:text-gray-400' />
                                                <span className='absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full'></span>
                                        </button>
                                        <Tooltip text="Notifications" />
                                        {openDropdown === 'notifications' && (
                                                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-700 rounded-lg shadow-xl border dark:border-slate-600 animate-fade-in-down">
                                                        <div className="p-4 border-b dark:border-slate-600">
                                                                <h3 className="font-semibold text-gray-800 dark:text-white">Notifications</h3>
                                                        </div>
                                                        <ul className="py-2 max-h-64 overflow-y-auto">
                                                                {notifications.map(notif => (
                                                                        <li key={notif.id} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-600 cursor-pointer">
                                                                                <p className="text-sm text-gray-700 dark:text-gray-300">{notif.message}</p>
                                                                                <p className="text-xs text-gray-500 dark:text-gray-400">{notif.time}</p>
                                                                        </li>
                                                                ))}
                                                        </ul>
                                                </div>
                                        )}
                                </div>

                                <div className="relative group" ref={profileRef}>
                                        <button onClick={() => toggleDropdown('profile')} className='flex items-center gap-2 cursor-pointer'>
                                                <div className='w-10 h-10 rounded-full bg-gray-300 overflow-hidden'>
                                                        <img src={user.profilePictureURL || DefaultProfilePic} alt='User' className='w-full h-full object-cover' />
                                                </div>
                                                <div className='hidden md:block'>
                                                        <p className='text-sm font-semibold text-gray-800 dark:text-gray-200'>{user.fullName}</p>
                                                        <p className='text-xs text-gray-500 dark:text-gray-400'>{user.studentNumber}</p>
                                                </div>
                                        </button>
                                        <Tooltip text="Profile Settings" />
                                        {openDropdown === 'profile' && (
                                                 <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-700 rounded-lg shadow-xl border dark:border-slate-600 animate-fade-in-down">
                                                     <ul className="py-2">
                                                             <li>
                                                                     <Link
                                                                         to="/student-dashboard/my-account"
                                                                         onClick={() => setOpenDropdown(null)}
                                                                         className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-600 cursor-pointer flex items-center gap-3"
                                                                     >
                                                                         <User size={16} className="text-gray-600 dark:text-gray-400" />
                                                                         <span className="text-sm text-gray-700 dark:text-gray-300">My Account</span>
                                                                     </Link>
                                                             </li>

                                                     </ul>
                                                 </div>
                                        )}
                                </div>
                        </div>
                </header>
        );
};

export default DashboardHeader;