import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

const ROUND_NAMES = { 1: 'SQL', 2: 'Debug', 3: 'Memory', 4: 'Guess' };

const formatTime = (seconds) => {
    if (!seconds || seconds === 0) return '—';
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
};

const MEDALS = {
    1: { emoji: '🥇', color: '#FFD700', glow: 'rgba(255,215,0,0.4)', label: 'WINNER', border: '#FFD700' },
    2: { emoji: '🥈', color: '#C0C0C0', glow: 'rgba(192,192,192,0.3)', label: 'RUNNER-UP', border: '#C0C0C0' },
    3: { emoji: '🥉', color: '#CD7F32', glow: 'rgba(205,127,50,0.3)', label: '3RD PLACE', border: '#CD7F32' },
};

const PodiumCard = ({ team }) => {
    const medal = MEDALS[team.rank];
    const roundName = team.progress > 4 ? 'FINISHED' : (team.displayRound ? ROUND_NAMES[team.displayRound] : '—');
    return (
        <div style={{
            background: `linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(20,20,20,0.9) 100%)`,
            border: `2px solid ${medal.color}`,
            borderRadius: '12px',
            padding: '1.5rem',
            textAlign: 'center',
            boxShadow: `0 0 30px ${medal.glow}, inset 0 0 20px ${medal.glow}`,
            flex: '1',
            minWidth: '200px',
            position: 'relative',
            animation: 'fadeIn 0.5s ease-out',
            transform: team.rank === 1 ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.3s ease'
        }}>
            <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: '#000', padding: '2px 12px', border: `1px solid ${medal.color}`, borderRadius: '20px', fontSize: '0.65rem', color: medal.color, letterSpacing: '2px', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                {medal.label}
            </div>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{medal.emoji}</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.3rem', fontFamily: 'monospace' }}>{team.name}</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: medal.color, textShadow: `0 0 15px ${medal.color}`, fontFamily: 'monospace', marginBottom: '0.75rem' }}>
                {team.score.toLocaleString()} <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>pts</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', fontSize: '0.78rem', color: '#aaa', fontFamily: 'monospace' }}>
                <span>⏱ {formatTime(team.timeTaken)}</span>
                <span>|</span>
                <span style={{ color: team.progress > 4 ? '#00ff41' : medal.color }}>
                    {team.progress > 4 ? '✅ DONE' : `${roundName} · S${team.stage}`}
                </span>
            </div>
        </div>
    );
};

const LeaderboardScreen = ({ onBack }) => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState(null);

    const API_BASE = `${API_BASE_URL}/leaderboard/live`;

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await fetch(`${API_BASE}?t=${Date.now()}`);
                const data = await response.json();
                if (Array.isArray(data)) {
                    setLeaderboard(data);
                    setLastUpdated(new Date());
                }
            } catch (error) {
                console.error('Failed to fetch leaderboard:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
        const interval = setInterval(fetchLeaderboard, 5000); // every 5s
        return () => clearInterval(interval);
    }, []);

    const top3 = leaderboard.slice(0, 3);
    const rest = leaderboard.slice(3);

    return (
        <div style={{ padding: '2rem 1rem', maxWidth: '1000px', margin: '0 auto' }}>
            <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes pulse-live { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
            `}</style>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', color: 'var(--accent-primary)', fontFamily: 'monospace', margin: 0, letterSpacing: '2px' }}>
                        ⚡ LIVE RANKINGS
                    </h1>
                    {lastUpdated && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px', fontSize: '0.75rem', color: '#666', fontFamily: 'monospace' }}>
                            <span style={{ display: 'inline-block', width: '7px', height: '7px', borderRadius: '50%', background: '#00ff41', animation: 'pulse-live 2s infinite' }} />
                            LIVE · {lastUpdated.toLocaleTimeString()}
                        </div>
                    )}
                </div>
                {onBack && (
                    <button onClick={onBack} style={{ background: 'transparent', border: '1px solid #444', color: '#aaa', padding: '0.5rem 1.2rem', cursor: 'pointer', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.85rem' }}>
                        ← BACK
                    </button>
                )}
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>
                    ESTABLISHING UPLINK...
                </div>
            ) : (
                <>
                    {/* Top 3 Podium */}
                    {top3.length > 0 && (
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                            {top3.map(team => <PodiumCard key={team.id} team={team} />)}
                        </div>
                    )}

                    {/* Rest of leaderboard */}
                    {rest.length > 0 && (
                        <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-subtle)', borderRadius: '8px', overflow: 'hidden' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'monospace' }}>
                                <thead>
                                    <tr style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid var(--border-subtle)' }}>
                                        <th style={{ padding: '0.9rem 1rem', textAlign: 'center', color: '#666', fontSize: '0.8rem', width: '60px' }}>#</th>
                                        <th style={{ padding: '0.9rem 1rem', textAlign: 'left', color: '#666', fontSize: '0.8rem' }}>TEAM</th>
                                        <th style={{ padding: '0.9rem 1rem', textAlign: 'center', color: '#666', fontSize: '0.8rem' }}>PROGRESS</th>
                                        <th style={{ padding: '0.9rem 1rem', textAlign: 'center', color: '#666', fontSize: '0.8rem' }}>TIME</th>
                                        <th style={{ padding: '0.9rem 1rem', textAlign: 'right', color: '#666', fontSize: '0.8rem' }}>SCORE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rest.map((team) => {
                                        const roundName = team.progress > 4 ? 'FINISHED' : (team.displayRound ? ROUND_NAMES[team.displayRound] : '—');
                                        return (
                                            <tr key={team.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.2s' }}
                                                onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,255,65,0.04)'}
                                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                                <td style={{ padding: '0.9rem 1rem', textAlign: 'center', color: '#555', fontWeight: 'bold' }}>#{team.rank}</td>
                                                <td style={{ padding: '0.9rem 1rem', color: '#fff', fontWeight: '500' }}>{team.name}</td>
                                                <td style={{ padding: '0.9rem 1rem', textAlign: 'center', color: team.progress > 4 ? '#00ff41' : '#aaa', fontSize: '0.85rem' }}>
                                                    {team.progress > 4 ? '✅ DONE' : `${roundName} · S${team.stage}`}
                                                </td>
                                                <td style={{ padding: '0.9rem 1rem', textAlign: 'center', color: '#777', fontSize: '0.85rem' }}>{formatTime(team.timeTaken)}</td>
                                                <td style={{ padding: '0.9rem 1rem', textAlign: 'right', color: 'var(--accent-primary)', fontWeight: 'bold', fontSize: '1.1rem' }}>{team.score.toLocaleString()}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}

                    <div style={{ marginTop: '1.5rem', fontSize: '0.75rem', color: '#444', textAlign: 'center', fontFamily: 'monospace' }}>
                        * Time shown is total active time (retries excluded) · Auto-refreshes every 5s
                    </div>
                </>
            )}
        </div>
    );
};

export default LeaderboardScreen;
