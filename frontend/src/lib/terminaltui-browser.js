// Browser-safe version of terminaltui functions
// This allows using the same API as the library without Node.js dependencies

export const themes = {
  cyberpunk: {
    accent: '#ff2a6d',
    accentDim: '#b91d4f',
    text: '#05d9e8',
    muted: '#0abdc6',
    subtle: '#01579b',
    success: '#05d9e8',
    warning: '#d1f7ff',
    error: '#ff2a6d',
    border: '#01579b',
    bg: '#01012b'
  }
  // Add other themes if needed...
};

export const card = (config) => ({ type: 'card', ...config });
export const table = (headers, rows) => ({ type: 'table', headers, rows });
export const columns = (panels) => ({ type: 'columns', panels });
export const rows = (panels) => ({ type: 'rows', panels });
export const text = (content) => ({ type: 'text', content, style: 'plain' });
export const divider = (style, label) => ({ type: 'divider', style, label });
export const spacer = (lines) => ({ type: 'spacer', lines: lines ?? 1 });
export const badge = (text, color) => ({ type: 'badge', text, color });
export const progressBar = (label, value, max) => ({ type: 'progressBar', label, value, max: max ?? 100 });
export const tabs = (items) => ({ type: 'tabs', items });
export const hero = (config) => ({ type: 'hero', ...config });
export const section = (title, content) => ({ type: 'section', title, content });
export const list = (items, style) => ({ type: 'list', items, style });
export const sparkline = (data) => {
  const chars = " ▂▃▄▅▆▇█";
  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const range = max - min || 1;
  const content = data.map((v) => chars[Math.round((v - min) / range * (chars.length - 1))]).join("");
  return { type: "text", content, style: "plain" };
};
