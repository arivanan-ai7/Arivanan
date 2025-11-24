
import React from 'react';
import { BotIcon } from './icons';

export const TypingIndicator: React.FC = () => (
  <div className="flex items-start gap-3 justify-start">
    <BotIcon className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 p-1 text-indigo-500 dark:text-indigo-400" />
    <div className="max-w-lg px-4 py-3 rounded-2xl shadow-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none flex items-center space-x-1">
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
    </div>
  </div>
);
