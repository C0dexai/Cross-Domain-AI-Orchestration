import React from 'react';
import type { HandoverState } from '../types';

/**
 * A simple, regex-based syntax highlighter for JSON strings.
 * It's not a full parser but is effective for coloring keys, strings, numbers, etc.
 */
const syntaxHighlight = (jsonString: string) => {
    // Basic HTML entity escaping
    jsonString = jsonString.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return jsonString.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
        let cls = 'text-green-300'; // Default to number color
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'text-purple-300'; // Key color
            } else {
                cls = 'text-amber-300'; // String color
            }
        } else if (/true|false/.test(match)) {
            cls = 'text-sky-400'; // Boolean color
        } else if (/null/.test(match)) {
            cls = 'text-slate-500'; // Null color
        }
        return `<span class="${cls}">${match}</span>`;
    });
};

export const HandoverPanel: React.FC<{ handoverState: HandoverState | null }> = ({ handoverState }) => {
    if (!handoverState) {
        return null;
    }

    const formattedJson = JSON.stringify(handoverState, null, 2);
    const highlightedJson = syntaxHighlight(formattedJson);

    return (
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-lg p-4 flex flex-col h-full border border-slate-700/50 shadow-lg">
            <header className="text-center mb-4">
                <h2 className="text-xl font-bold text-slate-300">Handover Context</h2>
                <p className="text-xs text-slate-500 font-mono">handover.json</p>
                <div className="w-full bg-slate-700 h-px mt-2"></div>
            </header>

            <div className="flex-grow overflow-y-auto pr-2 bg-black/30 rounded-md p-3 text-xs font-mono min-h-[320px] lg:min-h-0">
                <pre><code dangerouslySetInnerHTML={{ __html: highlightedJson }} /></pre>
            </div>
        </div>
    );
};
