
import React, { useState } from 'react';
import { ChevronUp } from 'lucide-react';

interface EditorSectionProps {
  title: string;
  children: React.ReactNode;
}

const EditorSection: React.FC<EditorSectionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border border-slate-200 rounded-lg">
      <button
        className="w-full flex justify-between items-center p-3 bg-slate-50 rounded-t-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="font-semibold text-slate-700">{title}</h2>
        <ChevronUp
          className={`w-5 h-5 text-slate-500 transition-transform duration-200 ${
            isOpen ? 'rotate-0' : 'rotate-180'
          }`}
        />
      </button>
      {isOpen && <div className="p-4 space-y-4">{children}</div>}
    </div>
  );
};

export default EditorSection;
