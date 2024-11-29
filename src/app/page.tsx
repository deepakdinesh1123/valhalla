'use client';
import { Spinner } from 'react-bootstrap';
import { useChat } from 'ai/react';
import Terminal from '@/components/Terminal';
import { useState, useEffect } from 'react';
import * as shiki from 'shiki';
import { Copy, Check } from 'lucide-react';
import Image from 'next/image';
import Markdown from 'react-markdown';

export default function Page() {
  const { messages, input, handleInputChange, isLoading, handleSubmit  } = useChat (
    {
      api: "/api/chat"
    },
  );

  const [highlightedFlake, setHighlightedFlake] = useState('');
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [flakeOutput, setFlakeOutput] = useState('');
  const [activeTab, setActiveTab] = useState('output');
  const [flakeCopied, setFlakeCopied] = useState(false);

  useEffect(() => {
    {messages.map((message, index) => (
      message.toolInvocations?.map(toolInvocation => {
        const { toolName, toolCallId, state } = toolInvocation;
        if (state === 'result') {
          if (toolName === 'execute code') {
            const { result } = toolInvocation;
            console.log("Result is ", result);
          }
        }
        })
      ))}
  });


  useEffect(() => {
    async function highlightFlake() {
      if (flakeOutput && flakeOutput.length > 0) {
        const highlighter = await shiki.createHighlighter({
          themes: ['dark-plus'],
          langs: ['nix']
        });
        const highlightedFlake = highlighter.codeToHtml(
          flakeOutput[0],
          { lang: 'nix', theme: 'dark-plus' }
        );
        setHighlightedFlake(highlightedFlake);
      }
    }
    highlightFlake();
  }, [flakeOutput]);


  const handleCopyFlake = async () => {
    if (flakeOutput && flakeOutput.length > 0) {
      await navigator.clipboard.writeText(flakeOutput[0]);
      setFlakeCopied(true);
      setTimeout(() => setFlakeCopied(false), 2000);
    }
  };

  return (
    <div className="flex h-screen bg-neutral-900">
      <div className="flex-1 flex flex-col h-full">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {isLoading && (
            <div className="flex justify-center p-4">
              <Spinner animation="border" className="text-gray-400" />
            </div>
          )}
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="mb-4">
                <Image src="/odin.svg" alt="Product Logo" width={220} height={220}  />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Welcome to Valhalla</h2>
              <p className="text-gray-400 text-center">
                Generate any code with any dependecy and view the output in real-time.<br/> Powered by Odin - our code execution engine.
              </p>
            </div>
          )}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.role === 'user'
                    ? 'bg-neutral-700 text-white rounded-br-none'
                    : 'bg-neutral-700 text-white rounded-bl-none'
                }`}
              >
                {<Markdown className={"overflow-x-auto"}>{message.content}</Markdown>}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-neutral-900 p-4 border-t border-neutral-800">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto relative">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
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

      <div className="w-[40%] border-l border-neutral-800 flex flex-col">
        <div className="bg-neutral-800 border-b border-neutral-700">
          <div className="flex">
            <button
              onClick={() => setActiveTab('output')}
              className={`px-4 py-2 text-white font-medium transition-colors ${
                activeTab === 'output' 
                  ? 'bg-neutral-700 border-b-2 border-slate-500' 
                  : 'hover:bg-neutral-700'
              }`}
            >
              Output
            </button>
            <button
              onClick={() => setActiveTab('flake')}
              className={`px-4 py-2 text-white font-medium transition-colors ${
                activeTab === 'flake' 
                  ? 'bg-neutral-700 border-b-2 border-slate-500' 
                  : 'hover:bg-neutral-700'
              }`}
            >
              flake.nix
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-scroll">
          {activeTab === 'output' ? (
            <Terminal output={terminalOutput} tabName="" />
          ) : (
            <div className="p-4 bg-[#1e1e1e] text-white font-mono text-sm h-full overflow-auto relative">
              { terminalOutput && flakeOutput && (
                <button
                  onClick={handleCopyFlake}
                  className="absolute top-2 right-2 p-2 bg-neutral-700 hover:bg-neutral-600 
                            rounded-md text-white transition-colors duration-200"
                >
                  {flakeCopied ? <Check size={16} /> : <Copy size={16} />}
                </button>
              )}
              <div dangerouslySetInnerHTML={{ __html: highlightedFlake }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}