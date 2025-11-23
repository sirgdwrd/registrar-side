"use client"

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LogoutConfirmationModal from './logoutConfirmation';
import Logo from '../../assets/img/gymnazu.png';

import {
    LayoutDashboard,
    FileUser,
    CreditCard,
    Settings,
    LifeBuoy,
    LogOut,
    Menu,
    X,
} from "lucide-react";

export default function DashboardSidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
    const [isMobile, setIsMobile] = useState(false);
    const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const handleConfirmLogout = () => {
        console.log("Logging out...");
        setLogoutModalOpen(false);
        console.log("Logged out successfully.Session Destroyed na lods");
    };

    const handleCloseModal = () => {
        setLogoutModalOpen(false);
    };

    const getIsActive = (item) => {
        if (item.path === '/registrar-dashboard') {
            return location.pathname === item.path;
        }
        return location.pathname.startsWith(item.path);
    };

const menuItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/registrar-dashboard' },
        { name: 'Applicant Management', icon: <FileUser size={18} />, path: '/registrar-dashboard/application-management' },
        { name: 'Student Management', icon: <CreditCard size={18} />, path: '/registrar-dashboard/student-management' },
        { name: 'Grading and Academics', icon: <Settings size={18} />, path: '/registrar-dashboard/grading-academics' },
        { name: 'Record and Archives', icon: <Settings size={18} />, path: '/registrar-dashboard/record-and-archives' },
        { name: 'Report and Analytics', icon: <Settings size={18} />, path: '/registrar-dashboard/report-and-analytics' },
        
];

const bottomMenuItems = [
        { name: 'Help Support', icon: <LifeBuoy size={18} />, path: '/registrar-dashboard/help-and-support' },
        { name: 'Logout', icon: <LogOut size={18} /> },
];

    const NavLink = ({ item, isActive, isCollapsed = false, isMobileLink = false }) => (
        <li className="relative group">
            <Link
                to={item.path}
                onClick={(e) => {
                    if (item.name === 'Logout') {
                        e.preventDefault();
                        setLogoutModalOpen(true);
                    } else if (isMobileLink) {
                        setMobileOpen(false);
                    }
                }}
                className={`flex items-center gap-3 p-2 rounded-xl transition-colors text-base ${isActive && item.name !== 'Logout' ? "bg-[#F3D67D] text-black font-bold" : "hover:bg-white/10"
                    } ${isCollapsed ? 'justify-center' : ''}`}
            >
                {item.icon}
                {!isCollapsed && (
                    <span className="whitespace-nowrap text-base">{item.name}</span>
                )}
            </Link>

            {isCollapsed && (
                <span className="
                    absolute left-full top-1/2 -translate-y-1/2 ml-4
                    bg-gray-900 text-white text-xs font-bold 
                    rounded-md p-2 
                    opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 
                    transition-all duration-200 ease-in-out
                    whitespace-nowrap
                    z-10
                ">
                    {item.name}
                </span>
            )}
        </li>
    );

    const SidebarContent = ({ isMobileView = false }) => {
        const currentCollapsed = isMobileView ? false : collapsed;

        if (isMobileView) {
            return (
                <aside className="h-screen bg-[#4D4135] dark:bg-slate-900 text-white flex flex-col w-64 p-4">
                    <header className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <img src={Logo} alt="Logo" className="h-10 w-10" />
                            <span className="font-bold text-sm">GYMNAZO</span>
                        </div>
                        <button onClick={() => setMobileOpen(false)} className="p-2 hover:bg-white/10 rounded-lg">
                            <X size={20} />
                        </button>
                    </header>
                    <nav className="flex-1 flex flex-col justify-between">
                        <ul className="space-y-1">
                            {menuItems.map((item) => (
                                <NavLink key={item.name} item={item} isActive={getIsActive(item)} isMobileLink={true} />
                            ))}
                        </ul>
                        <ul className="space-y-1">
                            {bottomMenuItems.map((item) => (
                                <NavLink key={item.name} item={item} isActive={getIsActive(item)} isMobileLink={true} />
                            ))}
                        </ul>
                    </nav>
                </aside>
            );
        }

        return (
            <aside className={`h-screen bg-transparent dark:bg-slate-900 text-white flex flex-col flex-shrink-0 transition-all duration-300 ${collapsed ? 'w-28' : 'w-72'}`}>
                {collapsed ? (
                    <div className="flex flex-col h-full items-center p-3 gap-3">
                        <div className="flex flex-col items-center space-y-4 bg-[#3C2F2F] dark:bg-slate-800 p-3 rounded-3xl shadow-lg flex-1 w-full">
                            <button onClick={() => setCollapsed(false)} className="p-2 hover:bg-white/10 rounded-full">
                                <Menu size={20} />
                            </button>
                            <img src={Logo} alt="Logo" className="h-10 w-10" />
                            <div className="w-8 h-[1px] bg-gray-600"></div>
                            <nav>
                                <ul className="space-y-1">
                                    {menuItems.map((item) => (
                                        <NavLink key={item.name} item={item} isActive={getIsActive(item)} isCollapsed={true} />
                                    ))}
                                </ul>
                            </nav>
                        </div>
                        <div className="flex flex-col items-center space-y-2 bg-[#3C2F2F] dark:bg-slate-800 p-3 rounded-3xl shadow-lg w-full">
                            <nav>
                                <ul className="space-y-1">
                                    {bottomMenuItems.map((item) => (
                                        <NavLink key={item.name} item={item} isActive={getIsActive(item)} isCollapsed={true} />
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col justify-between h-full p-3">
                        <div className="bg-[#3C2F2F] dark:bg-slate-800 rounded-3xl p-4 flex-1 flex flex-col shadow-lg">
                            <header className="flex flex-col items-center text-center mb-8 relative">
                                <button onClick={() => setCollapsed(true)} className="p-2 hover:bg-white/10 rounded-lg absolute top-0 right-0">
                                    <Menu size={20} />
                                </button>
                                <img src={Logo} alt="Logo" className="h-16 w-16 mb-2" />
                                <h2 className="font-bold text-sm leading-tight">GYMNAZO CHRISTIAN<br />ACADEMY</h2>
                            </header>
                            <nav className="flex-1">
                                <ul className="space-y-1">
                                    {menuItems.map((item) => (
                                        <NavLink key={item.name} item={item} isActive={getIsActive(item)} />
                                    ))}
                                </ul>
                            </nav>
                        </div>
                        <div className="bg-[#3C2F2F] dark:bg-slate-800 rounded-3xl p-4 mt-3 shadow-lg">
                            <nav>
                                <ul className="space-y-1">
                                    {bottomMenuItems.map((item) => (
                                        <NavLink key={item.name} item={item} isActive={getIsActive(item)} />
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </div>
                )}
            </aside>
        );
    };

    return (
        <>
            <div className="hidden md:block">
                <SidebarContent />
            </div>
            <div className={`md:hidden fixed inset-0 z-40 transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <SidebarContent isMobileView={true} />
            </div>
            {mobileOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={() => setMobileOpen(false)}
                ></div>
            )}

            <LogoutConfirmationModal
                isOpen={isLogoutModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmLogout}
            />
        </>
    );
}