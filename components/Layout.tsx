import React from 'react';
import { Scroll, Sparkles, BookOpen, ArrowRight } from 'lucide-react';
import { NameSuggestion, SourceText } from '../types';

// --- Header Component ---
export const Header: React.FC = () => (
  <header className="w-full py-8 text-center relative overflow-hidden">
    <div className="absolute inset-0 ornament-pattern z-0 pointer-events-none"></div>
    <div className="relative z-10 flex flex-col items-center justify-center">
      <div className="flex items-center gap-3 mb-2 text-saffron-600">
        <Scroll className="w-8 h-8" />
        <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-wide text-maroon-900">
          Dharma<span className="text-saffron-600">Namer</span>
        </h1>
        <Scroll className="w-8 h-8 transform scale-x-[-1]" />
      </div>
      <p className="text-stone-600 font-sans text-lg mt-2 max-w-md mx-auto">
        Timeless branding inspired by the Mahabharata, Ramayana, and Gita.
      </p>
    </div>
    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-6"></div>
  </header>
);

// --- Input Form Component ---
interface InputFormProps {
  description: string;
  source: SourceText;
  isGenerating: boolean;
  onDescriptionChange: (val: string) => void;
  onSourceChange: (val: SourceText) => void;
  onSubmit: () => void;
}

export const InputForm: React.FC<InputFormProps> = ({
  description,
  source,
  isGenerating,
  onDescriptionChange,
  onSourceChange,
  onSubmit
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-stone-100 relative overflow-hidden">
      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-saffron-100 rounded-bl-full -mr-8 -mt-8 opacity-50"></div>
      
      <div className="space-y-6 relative z-10">
        <div>
          <label className="block text-maroon-900 font-serif font-semibold mb-2 text-lg">
            What is your app about?
          </label>
          <textarea
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="e.g., A meditation app that helps people find focus through sound..."
            className="w-full h-32 p-4 rounded-xl border border-stone-200 focus:border-saffron-500 focus:ring-2 focus:ring-saffron-200 outline-none transition-all resize-none text-stone-700 font-sans"
          />
        </div>

        <div>
          <label className="block text-maroon-900 font-serif font-semibold mb-3 text-lg">
            Select Inspiration Source
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Object.values(SourceText).map((s) => (
              <button
                key={s}
                onClick={() => onSourceChange(s)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 border ${
                  source === s
                    ? 'bg-saffron-50 border-saffron-500 text-saffron-700 shadow-sm'
                    : 'bg-stone-50 border-transparent text-stone-500 hover:bg-stone-100 hover:text-stone-700'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onSubmit}
          disabled={!description.trim() || isGenerating}
          className={`w-full py-4 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] ${
            !description.trim() || isGenerating
              ? 'bg-stone-300 cursor-not-allowed'
              : 'bg-gradient-to-r from-saffron-600 to-maroon-800 hover:from-saffron-500 hover:to-maroon-700'
          }`}
        >
          {isGenerating ? (
            <>
              <Sparkles className="animate-spin w-5 h-5" />
              Consulting the Sages...
            </>
          ) : (
            <>
              <BookOpen className="w-5 h-5" />
              Discover Names
            </>
          )}
        </button>
      </div>
    </div>
  );
};

// --- Name Card Component ---
interface NameCardProps {
  suggestion: NameSuggestion;
  index: number;
}

export const NameCard: React.FC<NameCardProps> = ({ suggestion, index }) => {
  return (
    <div 
      className="bg-white rounded-xl shadow-md border border-stone-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="h-2 bg-gradient-to-r from-saffron-500 to-gold-500"></div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-serif font-bold text-maroon-900 group-hover:text-saffron-600 transition-colors">
              {suggestion.englishName}
            </h3>
            <p className="text-3xl font-hindi text-stone-400 mt-1 opacity-60">
              {suggestion.sanskritName}
            </p>
          </div>
          <div className="bg-orange-50 text-orange-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {suggestion.origin.split(' ')[0]}
          </div>
        </div>
        
        <div className="space-y-3">
          <div>
            <span className="text-xs uppercase text-stone-400 font-bold tracking-widest">Meaning</span>
            <p className="text-stone-700 font-medium italic">"{suggestion.meaning}"</p>
          </div>
          
          <div>
            <span className="text-xs uppercase text-stone-400 font-bold tracking-widest">Why it fits</span>
            <p className="text-stone-600 text-sm leading-relaxed mt-1">{suggestion.rationale}</p>
          </div>
          
          <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
             <div className="flex flex-wrap gap-2">
                {suggestion.tags.map((tag, i) => (
                  <span key={i} className="text-xs text-stone-500 bg-stone-100 px-2 py-1 rounded">
                    #{tag}
                  </span>
                ))}
             </div>
             <div className="text-xs text-stone-400 flex items-center gap-1">
                {suggestion.origin}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Empty State / Loading State ---
export const LoadingState: React.FC = () => (
  <div className="w-full flex flex-col items-center justify-center py-20 animate-pulse">
    <div className="relative w-24 h-24 mb-6">
       <div className="absolute inset-0 border-4 border-stone-200 rounded-full"></div>
       <div className="absolute inset-0 border-4 border-t-saffron-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
       <div className="absolute inset-0 flex items-center justify-center text-3xl">🕉️</div>
    </div>
    <p className="text-maroon-900 font-serif text-xl">Contemplating ancient verses...</p>
    <p className="text-stone-500 mt-2">Connecting context to culture.</p>
  </div>
);
