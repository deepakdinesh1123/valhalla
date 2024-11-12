'use client';

import { useChat } from 'ai/react';
import { Spinner } from 'react-bootstrap';


export default function Page() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop, error, reload } =
    useChat({
      keepLastMessageOnError: true,
    });

  return (
    <>
      {messages.map(message => (
        <div key={message.id}>
          {message.role === 'user' ? 'User: ' : 'AI: '}
          {message.content}
        </div>
      ))}

      {error && (
        <>
          <div>An error occurred.</div>
          <button type="button" onClick={() => reload()}>
            Retry
          </button>
        </>
      )}

      {isLoading && (
        <div>
          <Spinner />
          <button type="button" onClick={() => stop()}>
            Stop
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          name="prompt"
          value={input}
          onChange={handleInputChange}
          disabled={isLoading}
          className='bg-neutral-800 text-white '

        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}