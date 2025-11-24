
import React from 'react';
import type { Message } from '../types';
import { UserIcon, BotIcon } from './icons';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const messageText = message.parts.map(p => p.text).join('');

  const containerClasses = `flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'}`;
  const bubbleClasses = `max-w-xl px-4 py-3 rounded-2xl shadow-md ${isUser ? 'bg-indigo-500 text-white rounded-br-none' : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'}`;
  const icon = isUser 
    ? <UserIcon className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 p-1 text-gray-600 dark:text-gray-300" /> 
    : <BotIcon className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 p-1 text-indigo-500 dark:text-indigo-400" />;

  const messageContent = messageText.split('\n').map((line, index) => (
      <span key={index}>{line}<br/></span>
  ));

  return (
    <div className={containerClasses}>
      {!isUser && icon}
      <div className={bubbleClasses}>
        <p className="text-sm whitespace-pre-wrap">{messageContent}</p>
      </div>
      {isUser && icon}
    </div>
  );
};
