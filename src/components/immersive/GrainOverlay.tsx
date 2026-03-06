'use client';

export default function GrainOverlay() {
  return (
    <>
      <style>{`
        @keyframes grain-shift {
          0%  { transform: translate(0,0) }
          10% { transform: translate(-3%,-2%) }
          20% { transform: translate(2%,3%) }
          30% { transform: translate(-2%,4%) }
          40% { transform: translate(4%,-1%) }
          50% { transform: translate(-3%,3%) }
          60% { transform: translate(3%,-3%) }
          70% { transform: translate(-4%,2%) }
          80% { transform: translate(2%,-2%) }
          90% { transform: translate(-1%,4%) }
          100%{ transform: translate(1%,-1%) }
        }
        .grain-overlay {
          position: fixed;
          top: -50%; left: -50%;
          width: 200%; height: 200%;
          z-index: 998;
          pointer-events: none;
          opacity: 0.038;
          animation: grain-shift 0.78s steps(1) infinite;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 180px 180px;
        }
      `}</style>
      <div className="grain-overlay" />
    </>
  );
}
