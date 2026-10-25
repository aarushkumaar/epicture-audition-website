import React, { useState } from 'react';
import { sound } from '../utils/sound';

export const InterrogationScene: React.FC = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<number>(2); // Default to "FOR EPICTURE, YES"

  const options = [
    { text: '"YES, VERY. (I\'m humble though)"', tag: 'TYPICAL' },
    { text: '"I DON\'T KNOW. I\'M STILL FIGURING IT OUT."', tag: 'SAFE' },
    { text: '"FOR EPICTURE, YES."', tag: 'CORRECT ANSWER' },
  ];

  return (
    <section 
      id="scene-04" 
      className="relative min-h-[110vh] bg-darknavy text-white flex flex-col justify-center items-center py-24 px-6 sm:px-12 md:px-20 text-center border-b border-white/10"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <div className="font-mono text-xs uppercase tracking-[0.25em] text-butter mb-6">
          SESSION 04 // ROOM 302 // INTERROGATION LOG
        </div>

        <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.92] mb-6">
          WHO ARE YOU?
        </h2>

        <p className="font-sans text-lg sm:text-2xl text-white/70 max-w-2xl font-light mb-16">
          Beyond your name, your college roll number, and your designation.
        </p>

        <div className="font-mono text-xs uppercase tracking-[0.2em] text-white/50 mb-6">
          "Acha? So are you actually talented?"
        </div>

        {/* Responses */}
        <div className="w-full max-w-xl space-y-4">
          {options.map((opt, idx) => {
            const isChosen = selectedAnswer === idx;
            return (
              <button
                key={idx}
                onClick={() => {
                  sound.tick();
                  setSelectedAnswer(idx);
                }}
                className={`w-full flex items-center justify-between p-4 sm:p-5 rounded-md border text-left font-mono text-xs sm:text-sm tracking-wider transition-all cursor-pointer ${
                  isChosen
                    ? 'bg-cobalt border-white text-white shadow-[0_10px_30px_rgba(22,66,226,0.5)] scale-[1.02]'
                    : 'bg-white/5 border-white/15 text-white/50 hover:bg-white/10 hover:text-white/80'
                }`}
              >
                <span>{opt.text}</span>
                <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                  isChosen ? 'bg-butter text-charcoal' : 'bg-white/10 text-white/60'
                }`}>
                  {opt.tag}
                </span>
              </button>
            );
          })}
        </div>

        {/* The Verdict */}
        <div className="mt-12 flex flex-col items-center">
          <div className="font-serif text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
            GOOD ANSWER.
          </div>
          <div className="font-hand text-2xl sm:text-3xl text-butter">
            We made a note in the margin.
          </div>
        </div>
      </div>
    </section>
  );
};
