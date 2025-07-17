'use client';

import { useChat } from '@ai-sdk/react';
import Header from '@/components/header';


export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <div className='bg-white h-screen'>
        <Header></Header>
        <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
            {messages.map(message => (
                <div key={message.id} className="whitespace-pre-wrap text-gray-900">
                {message.role === 'user' ? 'User: ' : 'AI: '}
                {message.parts.map((part, i) => {
                    switch (part.type) {
                    case 'text':
                        return <div key={`${message.id}-${i}`}>{part.text}</div>;
                    }
                })}
                </div>
            ))}

            <form onSubmit={handleSubmit}>
                <input
                className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 text-gray-900 rounded shadow-xl"
                value={input}
                placeholder="Say something..."
                onChange={handleInputChange}
                />
            </form>
        </div>
    </div>
  );
}