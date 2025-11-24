
import React, { useState, useEffect } from 'react';
import type { Chat } from '@google/genai';
import { Header } from './components/Header';
import { ChatWindow } from './components/ChatWindow';
import { ChatInput } from './components/ChatInput';
import { createChatSession } from './services/geminiService';
import type { Message } from './types';

const App: React.FC = () => {
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initChat = () => {
      try {
        const session = createChatSession();
        setChatSession(session);
        setMessages([
          {
            role: 'model',
            parts: [{ text: "Hello! I'm here for a casual chat. Feel free to talk to me in English, Tamil, Malayalam, Hindi, or Telugu." }],
            timestamp: new Date(),
          },
        ]);
      } catch (e) {
        if (e instanceof Error) {
          setError(`Initialization failed: ${e.message}. Please ensure your API key is configured correctly.`);
        } else {
          setError('An unknown error occurred during initialization.');
        }
        console.error(e);
      }
    };
    initChat();
  }, []);

  const handleSendMessage = async (inputText: string) => {
    if (!chatSession || !inputText.trim()) return;

    const userMessage: Message = {
      role: 'user',
      parts: [{ text: inputText }],
      timestamp: new Date(),
    };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const stream = await chatSession.sendMessageStream({
        message: inputText,
      });
      
      let modelResponse = '';
      setMessages(prev => [...prev, { role: 'model', parts: [{ text: '' }], timestamp: new Date() }]);

      for await (const chunk of stream) {
        const chunkText = chunk.text;
        if(chunkText) {
            modelResponse += chunkText;
            setMessages(prev => {
                const newMessages = [...prev];
                const lastMessage = newMessages[newMessages.length - 1];
                if (lastMessage.role === 'model') {
                    lastMessage.parts = [{ text: modelResponse }];
                }
                return newMessages;
            });
        }
      }

    } catch (e) {
        if (e instanceof Error) {
            setError(`Error: ${e.message}`);
        } else {
            setError('An unexpected error occurred.');
        }
        console.error(e);
        setMessages(prev => [...prev, {role: 'model', parts: [{text: 'Sorry, I encountered an error. Please try again.'}], timestamp: new Date()}]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-h-screen bg-white dark:bg-gray-800 font-sans">
      <Header />
      <ChatWindow messages={messages} isLoading={isLoading} />
      {error && <div className="p-4 text-center text-red-500 bg-red-100 dark:bg-red-900 dark:text-red-300">{error}</div>}
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default App;
