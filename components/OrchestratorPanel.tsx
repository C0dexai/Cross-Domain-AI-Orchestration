import React from 'react';
import type { LogEntry } from '../types';
import { Spinner } from './Spinner';

interface OrchestratorPanelProps {
  logs: LogEntry[];
  isLoading: boolean;
  onAction: (description: string) => void;
}

const LogPrefix: React.FC<{ type: LogEntry['type'], color?: string }> = ({ type, color }) => {
    const baseStyle = 'font-bold mr-2';
    switch (type) {
        case 'ACTION':
            return <span className="text-cyan-400 font-mono">{`[ACTION]`}</span>;
        case 'SUPERVISOR':
            return <span className="text-purple-400 font-mono">{`[SUPERVISOR]`}</span>;
        case 'SYSTEM':
             return <span className="text-amber-400 font-mono">{`[SYSTEM]`}</span>;
        default:
            return null;
    }
}

export const OrchestratorPanel: React.FC<OrchestratorPanelProps> = ({ logs, isLoading, onAction }) => {
  return (
    <div className="bg-slate-800/40 backdrop-blur-sm rounded-lg p-4 flex flex-col h-full border border-slate-700/50 shadow-lg">
      <header className="text-center mb-4">
        <h2 className="text-xl font-bold text-slate-300">Orchestration Status</h2>
        <div className="w-full bg-slate-700 h-px mt-2"></div>
      </header>

      <div className="flex-grow flex flex-col-reverse overflow-y-auto pr-2 space-y-2 space-y-reverse min-h-[320px] lg:min-h-0">
        {/* We map and reverse in css, so new logs appear at the top but are added to the end of the scroll */}
        {logs.map((log) => (
             <div key={log.id} className="text-sm text-slate-300 p-2 rounded-md bg-black/20 animate-fade-in border-l-2" style={{borderColor: log.color || 'transparent'}}>
                <p>
                    <LogPrefix type={log.type} />
                    <span>{log.message}</span>
                </p>
             </div>
        ))}
        {logs.length === 0 && <p className="text-center text-slate-500">No events logged.</p>}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-700/50 space-y-3">
          <div className="flex items-center justify-center h-6">
              {isLoading && (
                  <div className="flex items-center text-sm text-purple-400">
                      <Spinner />
                      <span className="ml-2">Supervisor is thinking...</span>
                  </div>
              )}
          </div>
        <button 
            onClick={() => onAction("Full cross-domain knowledge sync initiated by operator.")}
            disabled={isLoading}
            className="w-full px-4 py-2 bg-indigo-600/50 border border-indigo-500 rounded-md text-sm text-slate-100 font-semibold transition-all duration-200 ease-in-out hover:bg-indigo-600/70 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Sync All Domains
        </button>
        <button 
            onClick={() => onAction("Core protocol upgrade requested by operator.")}
            disabled={isLoading}
            className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-md text-sm text-slate-200 font-semibold transition-all duration-200 ease-in-out hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Upgrade Protocol
        </button>
      </div>
    </div>
  );
};