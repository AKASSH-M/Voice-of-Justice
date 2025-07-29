import { useState, useRef, useEffect } from 'react';
import Loader from './Loader';
import SendButton from './SendButton';
import './bot.css'; 

const apiUrl = 'http://localhost:5000/api/chatbot/getResponse';

function Bot() {
  const [message, setMessage] = useState([
    { bot: true, text: 'Hello, how can I help you?' },
  ]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [response, setResponse] = useState('');

  const inputRef = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (message.length > 1) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [message]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedInput = userInput.trim();
    
    if (trimmedInput === '') {
      setError('Please enter a message');
      return;
    }

    setError('');
    setLoading(true);
    setMessage((prev) => [...prev, { bot: false, text: trimmedInput }]);

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput: trimmedInput }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        setResponse(data.reply);
        setMessage((prev) => [...prev, { bot: true, text: data.reply }]);
      })
      .then(scrollToBottom)
      .catch((err) => {
        setError('Failed to fetch response. Please try again later.');
        console.error('Error fetching response:', err);
      })
      .finally(() => {
        scrollToBottom();
        setLoading(false);
      });

    setUserInput('');
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
    setError('');
  };

  return (
    <>
      <div className="chat-window">
        {message.map((item, index) => (
          <div key={index} className={item.bot ? 'bot' : 'user'}>
            <p>{item.text}</p>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="input-area">
        <form onSubmit={handleSubmit}>
          <textarea
            type="text"
            ref={inputRef}
            value={userInput}
            onChange={handleInputChange}
            placeholder="Type your message..."
            disabled={loading}
            aria-label="Chat message input"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <button type="submit" disabled={loading}>
            {loading ? <Loader /> : <SendButton />}
          </button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </>
  );
}

export default Bot;
