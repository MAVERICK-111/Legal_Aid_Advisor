import React, { useState } from 'react';

const ChatPage = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (input.trim()) {
      // Add user's message to chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'You', text: input, type: 'user' },
      ]);

      setLoading(true); // Start loading while waiting for AI response

      try {
        const formData = new FormData();
        formData.append('human_input', input);

        // Send request to backend
        const response = await fetch('http://localhost:5000/send_message', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (data.history && data.history.length > 0) {
          const latest = data.history[data.history.length - 1];
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'Lawyer', text: latest.response, type: 'ai' },
          ]);
        } else {
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'Lawyer', text: 'Huh, nothing came back. Weird.', type: 'error' },
          ]);
        }
      } catch (err) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'Error', text: 'Oops, something broke!', type: 'error' },
        ]);
      } finally {
        setLoading(false);
      }

      setInput('');
    }
  };

  return (
    <div className=" mx-auto p-6 bg-[#1f1f1f] text-[#ddd] min-h-screen flex justify-center items-center">
      <div className="chat-wrapper w-full max-w-[80%] h-[85vh] bg-[#2c2c2c] rounded-lg flex flex-col shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center text-[#00c4e6] py-5">AI Lawyer Chat</h1>

        <div id="chat-area" className="flex-grow p-4 overflow-auto space-y-4 h-[60%] flex flex-col">
          {messages.map((message, index) => (
            <div
            key={index}
            className={`message p-3 rounded-lg ${
              message.type === 'user'
                ? 'bg-[#00c4e6] text-white self-end ml-auto'
                : 'bg-[#2c2c2c] text-[#ddd] self-start mr-auto' 
            }`}
          >
            <span className="who font-semibold text-sm opacity-85">{message.sender}:</span> {message.text}
          </div>
          ))}
          {loading && (
            <div className="message loading p-2 rounded-lg text-[#ddd] self-end">
              <span className="who font-semibold text-sm opacity-85">Lawyer:</span> Thinking...
            </div>
          )}
        </div>

        <form id="chat-form" onSubmit={handleSubmit} className="flex space-x-2 p-4 bg-[#252525] border-t border-[#333]">
          <input
            type="text"
            name="human_input"
            id="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            required
            className="flex-1 p-2 border-none rounded-lg bg-[#383838] text-[#ddd] text-sm focus:outline-none focus:ring-2 focus:ring-[#00c4e6]"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#00c4e6] text-[#222] rounded-lg font-semibold hover:bg-[#00a9c7] focus:outline-none focus:ring-2 focus:ring-[#00c4e6]"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
