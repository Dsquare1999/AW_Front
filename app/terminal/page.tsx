// pages/terminal.tsx
import React from 'react';
import dynamic from 'next/dynamic';

const TerminalComponent = dynamic(() => import('@/components/TerminalComponent'), { ssr: false });

const TerminalPage: React.FC = () => {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <TerminalComponent />
    </div>
  );
};

export default TerminalPage;