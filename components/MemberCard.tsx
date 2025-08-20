import React from 'react';
import type { Member } from '../types';

export const MemberCard: React.FC<{ member: Member, onSync: () => void }> = ({ member, onSync }) => {
    const cardStyle = {
        borderLeft: `4px solid ${member.color_theme}`,
        boxShadow: `0 10px 25px -5px ${member.color_theme}10, 0 8px 10px -6px ${member.color_theme}10`
    };

    const capitalizedFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

    return (
        <div 
            className="bg-slate-800/40 backdrop-blur-sm rounded-lg p-4 flex flex-col border border-slate-700/50"
            style={cardStyle}
        >
            <header className="mb-3 text-center">
                <h2 className="text-xl font-bold" style={{ color: member.color_theme }}>
                    {member.name}
                </h2>
                <p className="text-slate-300 text-xs font-light italic">{member.role}</p>
                <p className="text-xs text-slate-500 mt-1 font-mono">{member.model_id}</p>
            </header>
            
            <div className="flex-grow space-y-3 text-sm">
                 <div>
                    <h3 className="font-semibold text-slate-300 text-xs uppercase tracking-wider" style={{color: `${member.color_theme}`}}>Personality</h3>
                    <p className="text-slate-400 text-xs"><strong className="font-medium text-slate-300">Tone:</strong> {member.personality.tone}</p>
                    <p className="text-slate-400 text-xs"><strong className="font-medium text-slate-300">Love Language:</strong> {member.personality.love_language.split('_').map(w => capitalizedFirstLetter(w)).join(' ')}</p>
                </div>
                 <div>
                    <h3 className="font-semibold text-slate-300 text-xs uppercase tracking-wider" style={{color: `${member.color_theme}`}}>Quirks</h3>
                    <ul className="list-disc list-inside space-y-1 text-slate-400 text-xs pl-2">
                        {member.quirks.slice(0, 2).map(quirk => (
                            <li key={quirk}>{quirk}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-700/50 text-center">
                <button 
                    onClick={onSync}
                    className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-md text-sm text-slate-200 font-semibold transition-all duration-200 ease-in-out hover:bg-slate-700 hover:border-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500"
                    style={{'--tw-ring-color': member.color_theme} as React.CSSProperties}
                >
                    Sync Knowledge
                </button>
            </div>
        </div>
    );
};