
"use client"

import React from 'react';
import { LogOut } from 'lucide-react';
import LogoutSlider from '../ui/LogoutSlider';

export default function LogoutConfirmation({ isOpen, onClose, onConfirm }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 transition-opacity duration-300 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-2xl transition-all duration-300 animate-in fade-in-90 slide-in-from-bottom-10 dark:bg-slate-900 dark:border dark:border-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
          <LogOut className="h-7 w-7 text-slate-500 dark:text-slate-400" />
        </div>

        <div className="mt-5">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50" id="modal-title">
            You are signing out
          </h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Slide the icon below to confirm and end your session.
          </p>
        </div>

        <div className="mt-8">
          <LogoutSlider onConfirm={onConfirm} />
        </div>
      </div>
    </div>
  );
}