'use client';
import { Spinner } from 'react-bootstrap';
import { experimental_useObject as useObject } from 'ai/react';
import { Response } from '@/ai/schema';
import { useState,  useEffect } from 'react';

export default function Page() {
  const { object, submit, isLoading } = useObject({
    api: '/api/chat',
    schema: Response,
  });
  
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState<Array<{text: string, type: 'user' | 'assistant'}>>([]);
  let prevMessage = ""

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    
    if(messages.length > 0){
      prevMessage = messages[messages.length-1].text;
    }
    e.preventDefault();
    if (userInput.trim()) {
      setMessages(prev => [...prev, { text: userInput, type: 'user' }]);

      submit(userInput + "\nprevious response:"+ prevMessage);
      setUserInput('');
    }
  };

  useEffect(() => {
    if (object?.message && !isLoading) {
      setMessages((prev) => [...prev, { text: object.message!, type: 'assistant' }]);
    }
    if (object?.json && !isLoading) {
      setMessages((prev) => [...prev, { text: JSON.stringify(object.json, null, 2), type: 'assistant' }]);
    }
  }, [object?.message, isLoading, object?.json]);

  return (
    <div className="flex h-screen bg-neutral-900">
      <div className="flex-1 flex flex-col h-full">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {isLoading && (
            <div className="flex justify-center p-4">
              <Spinner animation="border" className="text-gray-400" />
            </div>
          )}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.type === 'user'
                    ? 'bg-neutral-700 text-white rounded-br-none'
                    : 'bg-neutral-700 text-white rounded-bl-none'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          
   
        </div>

        <div className="bg-neutral-900 p-4 border-t border-neutral-800">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto relative">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              disabled={isLoading}
              placeholder="Type your message here..."
              className="w-full p-4 pr-24 rounded-lg border border-neutral-700 
                       focus:outline-none focus:border-slate-500 focus:ring-1 
                       focus:ring-slate-500 bg-neutral-800 text-white"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="absolute right-4 top-1/2 -translate-y-1/2 px-4 py-2 
                       bg-slate-600 text-white rounded-md hover:bg-slate-700 
                       disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      </div>


    </div>
  );
}