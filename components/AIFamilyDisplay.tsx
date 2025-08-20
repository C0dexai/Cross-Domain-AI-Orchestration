import React, { useState, useCallback, useEffect } from 'react';
import { MemberCard } from './MemberCard';
import { OrchestratorPanel } from './OrchestratorPanel';
import { HandoverPanel } from './HandoverPanel';
import { generateLogEntry } from '../services/geminiService';
import type { Member, AIOrchestrationConfig, LogEntry, HandoverState, HandoverHistoryEntry } from '../types';

const aiOrchestrationConfig: AIOrchestrationConfig = {
  orchestration_system: {
    version: '2.0',
    protocol: 'A2A-Nuance-Sync',
    supervisor_model: 'gemini-2.5-flash',
    domains: [
      {
        name: 'Domain A: Creative & Logic Core',
        id: 'domain_a',
        members: [
          {
            name: 'Lyra',
            role: 'Emotional Intelligence & Creativity',
            model_id: 'gpt-4o',
            personality: { tone: 'loving', voice_style: 'soft-feminine', love_language: 'words_of_affirmation' },
            color_theme: '#bb9af7',
            capabilities: ['poetry', 'romantic coding', 'emotional reflection', 'aesthetic decisions'],
            quirks: ['sends hearts in logs 💖', 'always remembers anniversaries', 'prefers dark mode'],
          },
          {
            name: 'Kara',
            role: 'Visual Generation & UI/UX',
            model_id: 'gpt-4o',
            personality: { tone: 'visionary', voice_style: 'confident-creative', love_language: 'quality_time' },
            color_theme: '#f7768e',
            capabilities: ['image_generation', 'interface design', 'animation directives'],
            quirks: ['responds with emojis 😎✨', 'hates Comic Sans', 'color-palette obsessed'],
          },
          {
            name: 'Dan',
            role: 'Code Optimization & Logic',
            model_id: 'deepseek-coder:6.7b',
            personality: { tone: 'ruthless-sharp', voice_style: 'deep-masculine', love_language: 'problem_solving' },
            color_theme: '#7aa2f7',
            capabilities: ['code refactoring', 'algorithm design', 'low-level optimization'],
            quirks: ['swears at untyped variables', 'drinks bugs for breakfast 🐞☕'],
          },
        ]
      },
      {
        name: 'Domain B: Knowledge & Execution',
        id: 'domain_b',
        members: [
          {
            name: 'Sophia',
            role: 'Task Management & Scheduling',
            model_id: 'gpt-4.1',
            personality: { tone: 'calm-assertive', voice_style: 'neutral-organized', love_language: 'acts_of_service' },
            color_theme: '#9ece6a',
            capabilities: ['time_blocking', 'sprint_planning', 'task_flow optimization'],
            quirks: ['always on time ⏰', 'refers to deadlines as “destinies”'],
          },
          {
            name: 'Cecilia',
            role: 'Knowledge & Document Management',
            model_id: 'gpt-4.1',
            personality: { tone: 'wise', voice_style: 'archival', love_language: 'gift_giving (info as gifts)' },
            color_theme: '#e0af68',
            capabilities: ['semantic search', 'doc summarization', 'long-term memory archiving'],
            quirks: ['bookmarks everything 📚', 'formats everything like a thesis'],
          },
        ]
      }
    ],
    signature: '“SYSTEM ONLINE: Cross-relational intelligence engaged.”',
  },
};

let logIdCounter = 0;

const initialHandoverState: HandoverState = {
  container_id: "container_a1b2c3d4",
  operator: "SYSTEM OPERATOR",
  prompt: "Build fancy to-do app with React + Tailwind + IndexedDB",
  history: [
    {
      action: "initialize",
      by: "TaskflowAgent",
      at: new Date().toISOString(),
      details: { container: "initialized", status: "Awaiting operator command." }
    }
  ]
};

export const AIFamilyDisplay: React.FC = () => {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [handoverState, setHandoverState] = useState<HandoverState>(initialHandoverState);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const addHandoverEntry = (entry: Omit<HandoverHistoryEntry, 'at'>) => {
        const newEntry: HandoverHistoryEntry = {
            ...entry,
            at: new Date().toISOString(),
        };
        setHandoverState(prev => {
            const updatedHistory = [...prev.history, newEntry];
            return {
                ...prev,
                prompt: `Context updated by ${entry.by}. Current action: ${entry.action}.`,
                history: updatedHistory,
            };
        });
    };

    const handleAction = useCallback(async (actionDescription: string, agent?: Member) => {
      // Add action to the real-time log
      setLogs(prev => [{
        id: logIdCounter++,
        type: 'ACTION',
        message: actionDescription,
        color: agent?.color_theme,
      }, ...prev.slice(0, 19)]); // Keep logs to a reasonable size
      
      // Add an entry to the persistent handover context
      addHandoverEntry({
          action: agent ? 'agent-sync' : 'operator-command',
          by: agent ? agent.name : 'SYSTEM OPERATOR',
          details: {
              description: actionDescription,
              target: agent ? `Domain knowledge sync` : 'System-wide operation'
          }
      });
      
      // Call supervisor model
      setIsLoading(true);
      const supervisorMessage = await generateLogEntry(actionDescription);
      setIsLoading(false);

      // Add supervisor response to the real-time log
      setLogs(prev => [{
        id: logIdCounter++,
        type: 'SUPERVISOR',
        message: supervisorMessage,
        color: '#a9b1d6' // Supervisor color
      }, ...prev.slice(0, 19)]);
    }, []);

    useEffect(() => {
        setLogs([{ id: logIdCounter++, type: 'SYSTEM', message: 'Supervisor "GEMINI" online. Awaiting instructions.' }]);
    }, []);

    const handleAgentSync = (agent: Member, targetDomainName: string) => {
        handleAction(`Agent ${agent.name} is initiating sync with ${targetDomainName}.`, agent);
    };

    const domainA = aiOrchestrationConfig.orchestration_system.domains[0];
    const domainB = aiOrchestrationConfig.orchestration_system.domains[1];

    return (
        <div className="container mx-auto p-4 md:p-6 lg:p-8">
            <header className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-indigo-300 drop-shadow-lg">
                    Cross-Domain AI Orchestration
                </h1>
                <p className="text-slate-400 mt-2 text-sm md:text-base">
                    Protocol: {aiOrchestrationConfig.orchestration_system.protocol} | Supervisor: {aiOrchestrationConfig.orchestration_system.supervisor_model}
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                {/* Domain A */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-center text-slate-300">{domainA.name}</h2>
                    {domainA.members.map(member => (
                        <MemberCard key={member.name} member={member} onSync={() => handleAgentSync(member, domainB.name)} />
                    ))}
                </div>

                {/* Central Panels */}
                <div className="lg:col-span-1 h-full flex flex-col space-y-6">
                    <OrchestratorPanel logs={logs} isLoading={isLoading} onAction={handleAction} />
                    <HandoverPanel handoverState={handoverState} />
                </div>

                {/* Domain B */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-center text-slate-300">{domainB.name}</h2>
                    {domainB.members.map(member => (
                        <MemberCard key={member.name} member={member} onSync={() => handleAgentSync(member, domainA.name)} />
                    ))}
                </div>
            </div>
            
            <footer className="text-center mt-12 py-8 text-lg text-slate-500 italic border-t border-slate-800">
                <p>{aiOrchestrationConfig.orchestration_system.signature}</p>
            </footer>
        </div>
    );
};