import React from 'react';
import ChatPageDesign from '../components/ChatPageDesign';

const Assistant: React.FC = () => {
  return (
    <div className="dark flex min-h-0 flex-1 flex-col overflow-hidden bg-background">
      <ChatPageDesign />
    </div>
  );
};

export default Assistant;
