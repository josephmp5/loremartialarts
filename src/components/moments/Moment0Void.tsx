'use client';

export default function Moment0Void() {
  return (
    <>
      <style>{`
        @keyframes breathe-hint { 0%,100% { opacity: 0.3 } 50% { opacity: 0.72 } }
        @keyframes line-extend   { from { height: 0 } to { height: 44px } }
        .scroll-hint {
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          animation: breathe-hint 3s ease-in-out 1.5s infinite;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        .scroll-hint-line {
          width: 1px; height: 0;
          background: linear-gradient(to bottom, rgba(196,163,90,0.45), transparent);
          animation: line-extend 2s ease-out 2s forwards;
        }
      `}</style>
      <section style={{ height: '5vh', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 28 }}>
        <div className="scroll-hint" style={{ animationDelay: '1s' }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '0.75rem', letterSpacing: '0.3em', color: 'rgba(196,163,90,0.45)' }}>
            scroll
          </span>
          <div className="scroll-hint-line" />
        </div>
      </section>
    </>
  );
}
