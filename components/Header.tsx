import React from 'react';
import { BotIcon } from './icons';

export const Header: React.FC = () => {
    return (
        <header className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center space-x-3">
                <BotIcon className="w-8 h-8 text-indigo-500" />
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                    Multilingual Chatbot
                </h1>
            </div>
        </header>
    );
};