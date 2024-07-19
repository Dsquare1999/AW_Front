'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from '@xterm/addon-fit';
import 'xterm/css/xterm.css';

const TerminalComponent: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const [term, setTerm] = useState<Terminal | null>(null);
  const [input, setInput] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const prompt = '> ';

  useEffect(() => {
    const terminal = new Terminal({
      fontFamily: 'Menlo, Monaco, monospace',
      theme: {
        background: '#001e4821',
        foreground: '#f0f0f0',
      },
    });
    setTerm(terminal);
    return () => {
      if (terminal) {
        terminal.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (term) {
      if (terminalRef.current) {
        const fitAddon = new FitAddon();
        term.loadAddon(fitAddon);
        term.open(terminalRef.current);
        fitAddon.fit();

        const asciiArt = `
     o      ooooo         ooooooo8    ooooooo  oooo     oooo  o   ooooo  oooo      ooooooooooo ooooooooooo oooooooooo  oooo     oooo ooooo oooo   oooo     o      ooooo       
    888      888        o888    88  o888   888o 88   88  88  888    888  88        88  888  88  888    88   888    888  8888o   888   888   8888o  88     888      888        
   8  88     888        888    oooo 888     888  88 888 88  8  88     888              888      888ooo8     888oooo88   88 888o8 88   888   88 888o88    8  88     888        
  8oooo88    888      o 888o    88  888o   o888   888 888  8oooo88    888              888      888    oo   888  88o    88  888  88   888   88   8888   8oooo88    888      o 
o88o  o888o o888ooooo88  888ooo888    88ooo88      8   8 o88o  o888o o888o            o888o    o888ooo8888 o888o  88o8 o88o  8  o88o o888o o88o    88 o88o  o888o o888ooooo88 
`;
        asciiArt.split('\n').forEach(line => term.writeln(line));
        term.write(prompt);
      }
    }
  }, [term]);

  useEffect(() => {
    if (term) {
      const handleInput = (data: string) => {
        if (data === '\r') {
          term.write('\r\n');
          executeCommand(input);
          setHistory([...history, input]);
          setHistoryIndex(history.length + 1);
          setInput('');
          term.write(prompt);
        } else if (data.charCodeAt(0) === 127) {
          const cursorX = term.buffer.active.cursorX;
          if (cursorX > prompt.length) {
            term.write('\b \b');
            setInput(input.slice(0, -1));
          }
        } else if (data.charCodeAt(0) === 27) {
          const seq = data.substring(1);
          if (seq === '[A') { // Up arrow
            if (historyIndex > 0) {
              const newIndex = historyIndex - 1;
              setHistoryIndex(newIndex);
              setInput(history[newIndex]);
              term.write(`\r${prompt}${history[newIndex]}\x1b[K`);
            }
          } else if (seq === '[B') { // Down arrow
            if (historyIndex < history.length - 1) {
              const newIndex = historyIndex + 1;
              setHistoryIndex(newIndex);
              setInput(history[newIndex]);
              term.write(`\r${prompt}${history[newIndex]}\x1b[K`);
            } else {
              setHistoryIndex(history.length);
              setInput('');
              term.write(`\r${prompt}\x1b[K`);
            }
          }
        } else {
          term.write(data);
          setInput(input + data);
        }
      };

      const executeCommand = (command: string) => {
        switch (command.trim()) {
          case 'help':
            term.writeln('Available commands: help, clear');
            break;
          case 'clear':
            term.clear();
            break;
          default:
            term.writeln(`Command not found: ${command}`);
        }
      };

      const disposable = term.onData(handleInput);

      return () => {
        disposable.dispose();
      };
    }
  }, [term, input, history, historyIndex]);

  return <div ref={terminalRef} style={{ height: '100%', width: '100%' }} />;
};

export default TerminalComponent;
