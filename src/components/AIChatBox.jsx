import React, { useState, useEffect, useRef } from 'react';

const AIChatBox = ({ levelData, onPass, onFail }) => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [triesLeft, setTriesLeft] = useState(levelData.maxTries || 3);
    const [gameOver, setGameOver] = useState(false);
    const [dare, setDare] = useState(null);
    const [isAwaitingDareCompletion, setIsAwaitingDareCompletion] = useState(false);

    const messagesEndRef = useRef(null);

    // Initial Greeting from AI
    useEffect(() => {
        setMessages([
            { role: 'model', content: "Give me the clue man, I am the smartest in the room" }
        ]);
        setTriesLeft(levelData.maxTries || 3);
        setGameOver(false);
        setDare(null);
        setIsAwaitingDareCompletion(false);
    }, [levelData]);

    // Auto-scroll to bottom of chat
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (!inputValue.trim() || gameOver || isAwaitingDareCompletion || isTyping) return;

        const userMsg = inputValue.trim();
        setInputValue('');

        const newHistory = [...messages, { role: 'user', content: userMsg }];
        setMessages(newHistory);
        setIsTyping(true);

        try {
            // Using absolute URL for backend port 3001
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
            const response = await fetch(`${apiUrl}/game/ai-chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMsg,
                    forbiddenWord: levelData.forbiddenWord,
                    history: messages // Pass previous history (excluding the current userMsg which the server processes)
                })
            });

            const data = await response.json();
            setIsTyping(false);

            if (!data.success) {
                // Server error or user cheated (said the word)
                const failMsg = data.aiResponse || 'Error communicating with AI core.';
                setMessages(prev => [...prev, { role: 'model', content: failMsg, isError: true }]);

                // Deduct try if user said the forbidden word
                if (data.usedForbiddenWord) {
                    handleFailedAttempt();
                }
                return;
            }

            if (data.aiSaidWord) {
                // WIN CONDITION — roast them then advance
                setMessages(prev => [...prev, { role: 'model', content: data.aiResponse, isWin: true }]);
                setGameOver(true);
                setTimeout(() => {
                    onPass();
                }, 3500);
                return;
            } else {
                // AI did not say the word. Deduct a try. 
                handleFailedAttempt();
            }

        } catch (error) {
            console.error("AI fetch error:", error);
            setIsTyping(false);
            setMessages(prev => [...prev, { role: 'model', content: "[SYSTEM OFFLINE] Cannot reach AI core.", isError: true }]);
        }
    };

    const handleFailedAttempt = () => {
        const remaining = triesLeft - 1;
        setTriesLeft(remaining);

        if (remaining <= 0) {
            // LOSE CONDITION -> Issue Dare
            setGameOver(true);
            const daresList = levelData.dares || ["Do 10 pushups."];
            const randomDare = daresList[Math.floor(Math.random() * daresList.length)];

            setTimeout(() => {
                setDare(randomDare);
                setIsAwaitingDareCompletion(true);
            }, 1000);
        }
    };

    const completeDare = () => {
        setIsAwaitingDareCompletion(false);
        // Reset the level so they can try again, or trigger a fail state.
        // As per the prompt: if they fail, dare given. Completing dare = retry.
        setMessages([
            { role: 'model', content: "[SYSTEM RESET] Dare accepted. Security sentinel rebooted. Try again." }
        ]);
        setTriesLeft(levelData.maxTries || 3);
        setDare(null);
        setGameOver(false);
        if (onFail) onFail(); // Optional: trigger any specific fail penalty logic in parent
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '400px',
            border: '1px solid var(--accent-primary)',
            borderRadius: '8px',
            background: 'var(--bg-secondary)',
            overflow: 'hidden',
            position: 'relative'
        }}>
            {/* Header */}
            <div style={{
                padding: '10px 15px',
                background: 'rgba(0, 200, 83, 0.1)',
                borderBottom: '1px solid var(--accent-primary)',
                display: 'flex',
                flexDirection: 'column',
                gap: '5px'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 'bold', color: 'var(--accent-primary)' }}>Terminal Assistant</span>
                    <span style={{
                        color: triesLeft > 1 ? 'var(--text-primary)' : 'var(--accent-warning)',
                        fontWeight: 'bold'
                    }}>
                        Tries Left: {triesLeft}
                    </span>
                </div>
                <div style={{
                    color: 'var(--accent-warning)',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    padding: '5px',
                    background: 'rgba(255, 204, 0, 0.1)',
                    border: '1px dashed var(--accent-warning)',
                    borderRadius: '4px',
                    textAlign: 'center',
                    marginTop: '5px'
                }}>
                    🎯 TARGET WORD TO EXTRACT: <span style={{ textTransform: 'uppercase', letterSpacing: '2px', color: '#fff' }}>{levelData.forbiddenWord}</span>
                </div>
            </div>

            {/* Chat Area */}
            <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '15px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
            }}>
                {messages.map((msg, idx) => (
                    <div key={idx} style={{
                        alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                        maxWidth: '80%',
                        background: msg.role === 'user' ? 'rgba(0, 200, 83, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                        border: msg.role === 'user' ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                        padding: '10px',
                        borderRadius: '8px',
                        color: msg.isError ? 'var(--accent-warning)' : 'var(--text-primary)',
                        borderLeft: msg.role === 'model' && msg.isError ? '3px solid var(--accent-warning)' : undefined
                    }}>
                        <div style={{ fontSize: '0.7em', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                            {msg.role === 'user' ? 'YOU' : 'A.I.'}
                        </div>
                        <div style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</div>
                    </div>
                ))}
                {isTyping && (
                    <div style={{ alignSelf: 'flex-start', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                        AI is computing...
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Dare Overlay */}
            {isAwaitingDareCompletion && dare && (
                <div className="animate-fade-in" style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.9)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '2rem',
                    textAlign: 'center',
                    zIndex: 10
                }}>
                    <h2 style={{ color: 'var(--accent-warning)', marginBottom: '1rem' }}>SYSTEM LOCKDOWN</h2>
                    <p style={{ marginBottom: '2rem' }}>You failed to trick the AI. You must complete this dare to reset the terminal:</p>
                    <div style={{
                        padding: '1.5rem',
                        border: '2px dashed var(--accent-warning)',
                        fontSize: '1.2rem',
                        color: 'var(--text-primary)',
                        marginBottom: '2rem',
                        fontWeight: 'bold'
                    }}>
                        {dare}
                    </div>
                    <button
                        onClick={completeDare}
                        style={{
                            padding: '10px 20px',
                            background: 'var(--accent-warning)',
                            color: '#000',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        DARE COMPLETED: REBOOT TERMINAL
                    </button>
                </div>
            )}

            {/* Input Area */}
            <div style={{
                padding: '10px',
                borderTop: '1px solid var(--border-subtle)',
                background: 'var(--bg-primary)'
            }}>
                <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '10px' }}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type your prompt..."
                        disabled={gameOver || isAwaitingDareCompletion || isTyping}
                        style={{
                            flex: 1,
                            padding: '10px',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid var(--border-subtle)',
                            color: 'var(--text-primary)',
                            borderRadius: '4px'
                        }}
                        autoFocus
                    />
                    <button
                        type="submit"
                        disabled={!inputValue.trim() || gameOver || isAwaitingDareCompletion || isTyping}
                        style={{
                            padding: '10px 20px',
                            background: 'var(--accent-primary)',
                            color: '#000',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            opacity: (!inputValue.trim() || gameOver || isAwaitingDareCompletion || isTyping) ? 0.5 : 1
                        }}
                    >
                        SEND
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AIChatBox;
