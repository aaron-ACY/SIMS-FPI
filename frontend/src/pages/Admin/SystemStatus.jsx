import React, { useState, useEffect, useMemo } from 'react';
import { 
  card, table, sparkline, columns, rows, themes, 
  text, divider, spacer, badge, progressBar, tabs,
  hero, section, list
} from '../../lib/terminaltui-browser';

// Terminal Renderer Component
// This component interprets the "ContentBlock" objects from terminaltui
// and renders them as modern, high-fidelity web components.
const TerminalRenderer = ({ block, theme }) => {
  if (Array.isArray(block)) {
    return block.map((b, i) => <TerminalRenderer key={i} block={b} theme={theme} />);
  }

  const style = {
    color: theme.text,
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
  };

  switch (block.type) {
    case 'section':
      return (
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-sm font-black uppercase tracking-[0.3em]" style={{ color: theme.accent }}>
              {block.title}
            </h2>
            <div className="flex-1 h-px opacity-20" style={{ background: `linear-gradient(90deg, ${theme.accent}, transparent)` }} />
          </div>
          <div className="space-y-4">
            {block.content.map((b, i) => <TerminalRenderer key={i} block={b} theme={theme} />)}
          </div>
        </div>
      );

    case 'card':
      return (
        <div className="relative border p-4 mb-4 bg-black/40 backdrop-blur-sm group hover:border-accent transition-colors" 
             style={{ borderColor: `${theme.border}44`, borderRadius: '2px' }}>
          <div className="absolute -top-3 left-4 bg-[#01012b] px-2 py-0.5 border" style={{ borderColor: `${theme.border}44` }}>
             <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: theme.accent }}>
               {block.title}
             </span>
          </div>
          {block.subtitle && (
            <div className="text-[10px] opacity-50 mb-2 uppercase tracking-tighter" style={{ color: theme.text }}>
              {block.subtitle}
            </div>
          )}
          {block.body && <div className="text-xs leading-relaxed" style={{ color: theme.text }}>{block.body}</div>}
          {block.tags && (
            <div className="flex gap-2 mt-4">
              {block.tags.map((tag, i) => (
                <span key={i} className="text-[8px] font-black px-1.5 py-0.5 border" 
                      style={{ borderColor: `${theme.accent}44`, color: theme.accent }}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      );

    case 'table':
      return (
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b" style={{ borderColor: `${theme.border}44` }}>
                {block.headers.map((h, i) => (
                  <th key={i} className="py-2 px-4 text-[10px] font-black uppercase tracking-widest" style={{ color: theme.muted }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="border-b hover:bg-white/5 transition-colors" style={{ borderColor: `${theme.border}22` }}>
                  {row.map((cell, j) => (
                    <td key={j} className="py-3 px-4 text-xs font-bold" style={{ color: j === 0 ? theme.accent : theme.text }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case 'progressBar':
      const percent = (block.value / (block.max || 100)) * 100;
      return (
        <div className="mb-4">
          <div className="flex justify-between text-[10px] font-black mb-1.5 uppercase tracking-widest">
            <span style={{ color: theme.muted }}>{block.label}</span>
            <span style={{ color: theme.accent }}>{Math.round(percent)}%</span>
          </div>
          <div className="h-2 bg-black/60 border overflow-hidden" style={{ borderColor: `${theme.border}44` }}>
            <div className="h-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(255,42,109,0.3)]" 
                 style={{ width: `${percent}%`, backgroundColor: theme.accent }} />
          </div>
        </div>
      );

    case 'text':
      return <div className="text-xs mb-2 whitespace-pre-wrap leading-loose" style={{ color: theme.text }}>{block.content}</div>;

    case 'divider':
      return (
        <div className="my-6 flex items-center gap-4 opacity-30">
          {block.label && <span className="text-[10px] font-black uppercase tracking-[0.5em]">{block.label}</span>}
          <div className="flex-1 h-px bg-current" />
        </div>
      );

    case 'columns':
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {block.panels.map((panel, i) => (
            <div key={i} className="flex flex-col h-full">
               <TerminalRenderer block={panel.content} theme={theme} />
            </div>
          ))}
        </div>
      );

    case 'tabs':
      const [localTab, setLocalTab] = useState(0);
      return (
        <div className="mb-8">
          <div className="flex gap-1 mb-6 border-b" style={{ borderColor: `${theme.border}44` }}>
            {block.items.map((item, i) => (
              <button
                key={i}
                onClick={() => setLocalTab(i)}
                className={`px-6 py-2 text-[10px] font-black tracking-widest transition-all ${
                  localTab === i ? 'border-b-2 bg-white/5' : 'opacity-40 hover:opacity-100'
                }`}
                style={{ borderColor: localTab === i ? theme.accent : 'transparent', color: localTab === i ? theme.accent : theme.text }}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="animate-fade-in">
             <TerminalRenderer block={block.items[localTab].content} theme={theme} />
          </div>
        </div>
      );

    case 'hero':
      return (
        <div className="mb-12 py-12 px-8 border-l-4" style={{ borderColor: theme.accent, backgroundColor: `${theme.accent}08` }}>
          <h1 className="text-4xl font-black mb-4 tracking-tighter uppercase italic" style={{ color: theme.accent, textShadow: `0 0 20px ${theme.accent}44` }}>
            {block.title}
          </h1>
          {block.subtitle && (
            <p className="text-sm font-bold opacity-60 tracking-[0.2em] uppercase" style={{ color: theme.text }}>
              {block.subtitle}
            </p>
          )}
          {block.cta && (
            <button className="mt-8 px-6 py-2 text-[10px] font-black uppercase tracking-widest border transition-all hover:bg-current hover:text-black"
                    style={{ borderColor: theme.accent, color: theme.accent }}>
              {block.cta.label}
            </button>
          )}
        </div>
      );

    case 'spacer':
      return <div style={{ height: `${(block.lines || 1) * 1.5}rem` }} />;

    case 'badge':
      return (
        <span className="inline-block px-2 py-0.5 text-[9px] font-black uppercase tracking-wider mr-2 mb-2 border"
              style={{ borderColor: block.color || theme.accent, color: block.color || theme.accent, backgroundColor: `${block.color || theme.accent}11` }}>
          {block.text}
        </span>
      );

    case 'list':
       return (
         <div className="space-y-2 mb-6">
           {block.items.map((item, i) => (
             <div key={i} className="flex gap-3 text-xs items-center">
               <span style={{ color: theme.accent }}>{block.style === 'arrow' ? '❯' : '•'}</span>
               <span style={{ color: theme.text }}>{item}</span>
             </div>
           ))}
         </div>
       );

    default:
      return <div className="text-[10px] text-red-500 opacity-50 underline decoration-dotted mb-4">[RE-INDEXING BLOCK: {block.type}]</div>;
  }
};

const SystemStatus = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [sysStats, setSysStats] = useState({ cpu: 18, mem: 42, net: 1.2, latency: 12 });
  const theme = themes.cyberpunk;

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
      setSysStats(prev => ({
        cpu: Math.floor(15 + Math.random() * 10),
        mem: (42 + Math.random() * 2).toFixed(1),
        net: (1.0 + Math.random() * 0.5).toFixed(2),
        latency: Math.floor(10 + Math.random() * 8)
      }));
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  // Define the TUI content using terminaltui components
  const content = useMemo(() => {
    return [
      hero({
        title: "SIMS_OS MONITORING",
        subtitle: `Uptime: 142:32:04 | Node: ADMIN_MASTER_01 | ${time}`,
      }),
      divider("label", "CORE_METRICS"),
      columns([
        {
          content: [
            card({
              title: "RESOURCE_ALLOCATION",
              body: "Critical system resources monitoring. All nodes reporting stable status.",
              tags: ["DOCKER", "K8S", "REDIS"]
            }),
            progressBar("CPU_LOAD", sysStats.cpu),
            progressBar("MEMORY_USAGE", sysStats.mem),
            progressBar("NETWORK_THROUGHPUT", sysStats.net * 50, 100),
          ]
        },
        {
          content: [
            section("SYSTEM_LOGS", [
              text(`[${time}] :: AUTH_NODE_LINKED :: SUCCESS`),
              text(`[${time}] :: DB_RECONCILE :: 1424 RECORDS SYNCED`),
              text(`[${time}] :: WSS_HEARTBEAT :: L:${sysStats.latency}ms`),
              text(`[${time}] :: CACHE_FLUSH :: OK`),
              badge("STABLE", theme.success),
              badge("ENCRYPTED", theme.accent),
            ])
          ]
        }
      ]),
      tabs([
        {
          label: "DATABASE",
          content: [
            table(
              ["Table", "Status", "Load", "Latency"],
              [
                ["Students", "ONLINE", "LOW", "2.1ms"],
                ["Lecturers", "ONLINE", "MED", "4.5ms"],
                ["Classes", "ONLINE", "LOW", "1.8ms"],
                ["Departments", "SYNCING", "HIGH", "12.4ms"]
              ]
            )
          ]
        },
        {
          label: "NETWORK",
          content: [
            list([
              "IP_V4: 192.168.1.102 (PRIMARY)",
              "GATEWAY: 10.0.0.1",
              "DNS_RESOLVER: 8.8.8.8",
              "SSL: ACTIVE (TLS 1.3)",
              "REGION: ASIA_SOUTHEAST_1"
            ], "arrow")
          ]
        }
      ]),
      divider("label", "TERMINAL_READY"),
      text("_ Awaiting user command...")
    ];
  }, [time, sysStats, theme]);

  return (
    <div className="min-h-screen p-8 relative overflow-hidden" style={{ backgroundColor: theme.bg }}>
      {/* Scanline / CRT Effect */}
      <div className="pointer-events-none absolute inset-0 z-50 opacity-[0.03]" 
           style={{ background: 'linear-gradient(rgba(18,16,16,0) 50%,rgba(0,0,0,0.25) 50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))', backgroundSize: '100% 2px, 3px 100%' }} />
      
      {/* CRT Vignette */}
      <div className="pointer-events-none absolute inset-0 z-40 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]" />

      {/* Main Container */}
      <div className="max-w-6xl mx-auto relative z-10">
        <TerminalRenderer block={content} theme={theme} />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        ::selection {
          background: ${theme.accent};
          color: ${theme.bg};
        }
        ::-webkit-scrollbar {
          width: 4px;
        }
        ::-webkit-scrollbar-track {
          background: ${theme.bg};
        }
        ::-webkit-scrollbar-thumb {
          background: ${theme.border}44;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: ${theme.accent}66;
        }
      `}} />
    </div>
  );
};

export default SystemStatus;
