import React, { useState } from 'react';
import { ArrowLeft, MoreVertical, Plus, Camera, Mic, Send, CheckCheck } from 'lucide-react';
import { CHAT_MESSAGES_INITIAL } from '../../data/mockData';

export function CoachChatScreen({ onBack }) {
  const [messages, setMessages] = useState(CHAT_MESSAGES_INITIAL);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const newMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: text,
      time: 'JUST NOW',
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');

    // Simulated coach response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'coach',
          text: 'Locked in. Keep that intensity high and hit your macros right after this session.',
          time: 'JUST NOW',
        },
      ]);
    }, 1200);
  };

  return (
    <div className="relative min-h-[100dvh] w-full bg-[#0d0f12] text-white flex flex-col justify-between select-none">
      {/* Top Coach Header Bar */}
      <div className="sticky top-0 z-20 bg-[#121518]/95 backdrop-blur border-b border-[#22272d] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="relative">
            <img
              src="/ron-chains.jpg"
              alt="Coach Ron"
              className="w-10 h-10 rounded-lg object-cover border border-[#00E676]"
            />
            <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#00E676] rounded-full border-2 border-[#121518]" />
          </div>

          <div className="flex flex-col">
            <span className="font-bold text-[15px] text-white leading-tight">
              Coach Ron
            </span>
            <span className="text-[#00E676] text-[11px] font-semibold tracking-wider uppercase flex items-center gap-1">
              ONLINE
            </span>
          </div>
        </div>

        <button className="text-gray-400 hover:text-white p-1">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Thread */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {/* Timestamp */}
        <div className="text-center my-1">
          <span className="bg-[#181d22] text-gray-400 text-[10.5px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            TODAY, 06:00 AM
          </span>
        </div>

        {messages.map((msg) => {
          const isUser = msg.sender === 'user';

          if (msg.type === 'image') {
            return (
              <div key={msg.id} className="flex flex-col items-end gap-1 my-1">
                <div className="rounded-xl overflow-hidden border-2 border-[#00E676] bg-[#161a1e] max-w-[240px] shadow-lg">
                  <img
                    src="/gym-bg.jpg"
                    alt="Workout set"
                    className="w-full h-48 object-cover filter contrast-125 grayscale"
                  />
                  <div className="bg-[#00E676] px-3 py-1.5 text-black font-headline font-bold text-[12px] tracking-wide">
                    {msg.caption}
                  </div>
                </div>
                <span className="text-[10px] text-gray-500">{msg.time}</span>
              </div>
            );
          }

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[82%] ${
                isUser ? 'self-end' : 'self-start'
              }`}
            >
              <div
                className={`p-3.5 rounded-2xl text-[13.5px] leading-relaxed ${
                  isUser
                    ? 'bg-[#00E676] text-black font-medium rounded-tr-none shadow-[0_2px_12px_rgba(0,230,118,0.2)]'
                    : 'bg-[#181d22] text-gray-200 rounded-tl-none border border-[#252c34]'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-gray-500 mt-1 px-1 flex items-center gap-1">
                {msg.time}
                {isUser && <CheckCheck className="w-3 h-3 text-[#00E676]" />}
              </span>
            </div>
          );
        })}
      </div>

      {/* Quick Replies & Input Bar */}
      <div className="sticky bottom-0 bg-[#0d0f12] border-t border-[#1d2228] p-3 flex flex-col gap-2.5">
        {/* Quick Suggestion Chips */}
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1">
          <button
            onClick={() => handleSendMessage('READY FOR TODAY!')}
            className="px-3 py-1.5 rounded-full bg-[#181d22] hover:bg-[#222830] border border-[#2a313a] text-gray-200 text-[11px] font-headline font-bold tracking-wider uppercase whitespace-nowrap transition-colors"
          >
            READY FOR TODAY!
          </button>
          <button
            onClick={() => handleSendMessage('NEED A MODIFICATION')}
            className="px-3 py-1.5 rounded-full bg-[#181d22] hover:bg-[#222830] border border-[#2a313a] text-gray-200 text-[11px] font-headline font-bold tracking-wider uppercase whitespace-nowrap transition-colors"
          >
            NEED A MODIFICATION
          </button>
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <button
            type="button"
            className="w-9 h-9 rounded-full bg-[#181d22] text-gray-400 hover:text-white flex items-center justify-center flex-shrink-0"
          >
            <Plus className="w-4 h-4" />
          </button>

          <button
            type="button"
            className="w-9 h-9 rounded-full bg-[#181d22] text-gray-400 hover:text-white flex items-center justify-center flex-shrink-0"
          >
            <Camera className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Message Coach..."
            className="flex-1 bg-[#161a1e] border border-[#272d34] rounded-full px-4 py-2.5 text-white text-[13.5px] placeholder-gray-500 focus:outline-none focus:border-[#00E676] transition-colors"
          />

          <button
            type="submit"
            className="w-9 h-9 rounded-full bg-[#00E676] hover:bg-[#00C853] text-black flex items-center justify-center flex-shrink-0 transition-colors shadow-[0_2px_10px_rgba(0,230,118,0.3)]"
          >
            {inputText.trim() ? <Send className="w-4 h-4 fill-black" /> : <Mic className="w-4 h-4" />}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CoachChatScreen;
