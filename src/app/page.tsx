"use client";
import { useState, useEffect } from 'react';

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [introFading, setIntroFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIntroFading(true);
      setTimeout(() => {
        setShowIntro(false);
        setShowContent(true);
      }, 1000);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const locations = [
    {
      name: "Erdal İnönü Park",
      address: "Konyaaltı, Antalya",
      time: "Every Tuesday & Thursday 20:00",
      features: ["Outdoor training", "Park environment", "Fresh air"],
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3190.5!2d30.6!3d36.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDU0JzAwLjAiTiAzMMKwMzYnMDAuMCJF!5e0!3m2!1str!2str!4v1234567890",
      icon: "🌳"
    },
    {
      name: "Konyaaltı Beach",
      address: "Konyaaltı Sahili, Antalya", 
      time: "Every Saturday 20:00",
      features: ["Beach training", "Sunrise sessions", "Ocean view"],
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3190.5!2d30.6!3d36.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDU0JzAwLjAiTiAzMMKwMzYnMDAuMCJF!5e0!3m2!1str!2str!4v1234567890",
      icon: "🏖️"
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #1a1a2e 75%, #0f0f23 100%)',
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: 'white',
      fontFamily: 'Crimson Text, serif',
      overflow: 'hidden'
    }}>
      <style dangerouslySetInnerHTML={{
        __html: `
          @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;600;700&display=swap');
          
          @keyframes introFadeIn {
            0% { opacity: 0; transform: scale(0.8) rotate(-2deg); }
            100% { opacity: 1; transform: scale(1) rotate(0deg); }
          }
          
          @keyframes logoFloat {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            25% { transform: translateY(-8px) rotate(1deg); }
            50% { transform: translateY(-12px) rotate(0deg); }
            75% { transform: translateY(-8px) rotate(-1deg); }
          }
          
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(40px) scale(0.95); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
          
          @keyframes slideInDown {
            0% { opacity: 0; transform: translateY(-40px) scale(0.95); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
          
          @keyframes slideInUp {
            0% { opacity: 0; transform: translateY(40px) scale(0.95); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
          
          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          
          @keyframes scaleIn {
            0% { opacity: 0; transform: scale(0.85) rotate(-1deg); }
            100% { opacity: 1; transform: scale(1) rotate(0deg); }
          }
          
          @keyframes slideInLeft {
            0% { opacity: 0; transform: translateX(-40px) scale(0.95); }
            100% { opacity: 1; transform: translateX(0) scale(1); }
          }
          
          @keyframes slideInRight {
            0% { opacity: 0; transform: translateX(40px) scale(0.95); }
            100% { opacity: 1; transform: translateX(0) scale(1); }
          }
          
          @keyframes cardHover {
            0% { transform: translateY(0) scale(1) rotate(0deg); }
            100% { transform: translateY(-8px) scale(1.03) rotate(0.5deg); }
          }
          
          @keyframes buttonHover {
            0% { transform: translateY(0) scale(1); }
            100% { transform: translateY(-4px) scale(1.05); }
          }
          
          @keyframes gentleGlow {
            0%, 100% { box-shadow: 0 0 25px rgba(255, 215, 0, 0.2); }
            50% { box-shadow: 0 0 35px rgba(255, 215, 0, 0.4); }
          }
          
          @keyframes softPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.08); }
          }
          
          @keyframes treeSway {
            0%, 100% { transform: rotate(0deg) scale(1); }
            25% { transform: rotate(3deg) scale(1.05); }
            75% { transform: rotate(-3deg) scale(1.05); }
          }
          
          @keyframes waveFlow {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-8px) scale(1.1); }
          }
          
          @keyframes mapReveal {
            0% { opacity: 0; transform: scale(0.8) rotate(-2deg); }
            100% { opacity: 1; transform: scale(1) rotate(0deg); }
          }
          
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.15); }
          }
          
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
        `
      }} />

      {/* Intro Screen */}
      {showIntro && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundImage: 'url(/background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          opacity: introFading ? 0 : 1,
          transition: 'opacity 1s ease-in-out'
        }}>
          {/* Enhanced paper texture overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 20% 80%, rgba(139, 69, 19, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(107, 78, 58, 0.12) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(212, 196, 168, 0.08) 0%, transparent 50%),
              linear-gradient(45deg, rgba(245, 241, 232, 0.1) 0%, rgba(212, 196, 168, 0.05) 100%)
            `,
            pointerEvents: 'none'
          }}></div>
          
          <div style={{
            textAlign: 'center',
            animation: 'introFadeIn 2.5s ease-out',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            padding: '80px 50px',
            borderRadius: '30px',
            border: '4px solid rgba(139, 69, 19, 0.4)',
            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.6), inset 0 2px 0 rgba(255, 255, 255, 0.1)',
            position: 'relative',
            backdropFilter: 'blur(15px)',
            maxWidth: '500px',
            width: '90%'
          }}>
            {/* Enhanced decorative corners */}
            <div style={{
              position: 'absolute',
              top: '15px',
              left: '15px',
              width: '40px',
              height: '40px',
              border: '3px solid #8b4513',
              borderRight: 'none',
              borderBottom: 'none',
              borderRadius: '8px 0 0 0'
            }}></div>
            <div style={{
              position: 'absolute',
              top: '15px',
              right: '15px',
              width: '40px',
              height: '40px',
              border: '3px solid #8b4513',
              borderLeft: 'none',
              borderBottom: 'none',
              borderRadius: '0 8px 0 0'
            }}></div>
            <div style={{
              position: 'absolute',
              bottom: '15px',
              left: '15px',
              width: '40px',
              height: '40px',
              border: '3px solid #8b4513',
              borderRight: 'none',
              borderTop: 'none',
              borderRadius: '0 0 0 8px'
            }}></div>
            <div style={{
              position: 'absolute',
              bottom: '15px',
              right: '15px',
              width: '40px',
              height: '40px',
              border: '3px solid #8b4513',
              borderLeft: 'none',
              borderTop: 'none',
              borderRadius: '0 0 8px 0'
            }}></div>
            
            <img 
              src="/logo.png" 
              alt="LORE BJJ Logo" 
              style={{
                maxWidth: '400px',
                marginBottom: '50px',
                animation: 'logoFloat 4s ease-in-out infinite',
                mixBlendMode: 'overlay',
                opacity: 0.9,
                filter: 'drop-shadow(0 15px 30px rgba(255, 215, 0, 0.3))'
              }}
            />
            <h1 style={{
              fontSize: '4.5rem',
              fontWeight: 'bold',
              marginBottom: '25px',
              color: '#ffd700',
              textShadow: '4px 4px 8px rgba(0,0,0,0.9), 0 0 30px rgba(255, 215, 0, 0.3)',
              fontFamily: 'Noto Serif JP, serif',
              letterSpacing: '2px'
            }}>LORE BJJ</h1>
            <p style={{
              fontSize: '1.8rem',
              color: '#fcd34d',
              fontFamily: 'Crimson Text, serif',
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              letterSpacing: '1px'
            }}>Outdoor Nomad Free Team</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      {showContent && (
        <>
          {/* Hero Section - Full Screen */}
          <section style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #1a1a2e 75%, #0f0f23 100%)',
            padding: '0 40px',
            position: 'relative'
          }}>
            <div style={{
              textAlign: 'center',
              maxWidth: '1200px',
              animation: 'fadeInUp 1.2s ease-out'
            }}>
              <h1 style={{
                fontSize: '6rem',
                fontWeight: 'bold',
                marginBottom: '35px',
                color: '#ffd700',
                textShadow: '4px 4px 8px rgba(0,0,0,0.9), 0 0 40px rgba(255, 215, 0, 0.3)',
                fontFamily: 'Noto Serif JP, serif',
                animation: 'slideInDown 1.5s ease-out',
                letterSpacing: '3px'
              }}>LORE BJJ</h1>
              <p style={{
                fontSize: '2.5rem',
                color: '#fcd34d',
                marginBottom: '50px',
                fontFamily: 'Crimson Text, serif',
                animation: 'slideInUp 1.5s ease-out 0.3s both',
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                letterSpacing: '1px'
              }}>Outdoor Nomad Free Team</p>
              <p style={{
                fontSize: '1.5rem',
                color: '#e5e7eb',
                maxWidth: '900px',
                margin: '0 auto 60px',
                lineHeight: '1.9',
                fontFamily: 'Crimson Text, serif',
                animation: 'fadeIn 2s ease-out 0.6s both',
                textShadow: '1px 1px 2px rgba(0,0,0,0.6)'
              }}>
                Experience the freedom of outdoor BJJ training. Join our nomadic team as we train in nature's gym - 
                from park sessions to beach workouts, embracing the warrior spirit in the open air.
              </p>
              <div style={{
                display: 'flex',
                gap: '30px',
                justifyContent: 'center',
                flexWrap: 'wrap',
                animation: 'fadeIn 2.2s ease-out 0.9s both'
              }}>
                <a href="#about" style={{
                  background: 'linear-gradient(135deg, #ffd700 0%, #fbbf24 50%, #ffd700 100%)',
                  backgroundSize: '200% 200%',
                  color: '#1a1a1a',
                  padding: '20px 40px',
                  fontSize: '1.3rem',
                  textDecoration: 'none',
                  borderRadius: '15px',
                  fontWeight: '700',
                  fontFamily: 'Crimson Text, serif',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 15px 35px rgba(255, 215, 0, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.2)',
                  border: '3px solid rgba(255, 215, 0, 0.3)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  const link = e.target as HTMLElement;
                  link.style.transform = 'translateY(-8px) scale(1.05)';
                  link.style.boxShadow = '0 25px 50px rgba(255, 215, 0, 0.6), inset 0 2px 0 rgba(255, 255, 255, 0.3)';
                  link.style.backgroundPosition = '100% 100%';
                }}
                onMouseLeave={(e) => {
                  const link = e.target as HTMLElement;
                  link.style.transform = 'translateY(0) scale(1)';
                  link.style.boxShadow = '0 15px 35px rgba(255, 215, 0, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.2)';
                  link.style.backgroundPosition = '0% 0%';
                }}
                >
                  Discover Our Team
                </a>
                <a href="#locations" style={{
                  backgroundColor: 'transparent',
                  color: '#ffd700',
                  padding: '20px 40px',
                  fontSize: '1.3rem',
                  textDecoration: 'none',
                  borderRadius: '15px',
                  fontWeight: '700',
                  fontFamily: 'Crimson Text, serif',
                  border: '3px solid #ffd700',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 15px 35px rgba(255, 215, 0, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  const link = e.target as HTMLElement;
                  link.style.transform = 'translateY(-8px) scale(1.05)';
                  link.style.backgroundColor = '#ffd700';
                  link.style.color = '#1a1a1a';
                  link.style.boxShadow = '0 25px 50px rgba(255, 215, 0, 0.6), inset 0 2px 0 rgba(255, 255, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  const link = e.target as HTMLElement;
                  link.style.transform = 'translateY(0) scale(1)';
                  link.style.backgroundColor = 'transparent';
                  link.style.color = '#ffd700';
                  link.style.boxShadow = '0 15px 35px rgba(255, 215, 0, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.1)';
                }}
                >
                  Training Locations
                </a>
              </div>
            </div>
          </section>

          {/* About Our Team Section - Enhanced */}
          <section id="about" style={{
            padding: '140px 40px',
            background: 'linear-gradient(135deg, #1a0f2e 0%, #2d1b4e 25%, #3d2b6e 50%, #2d1b4e 75%, #1a0f2e 100%)',
            position: 'relative'
          }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div style={{
                textAlign: 'center',
                marginBottom: '100px',
                animation: 'fadeInUp 1.2s ease-out'
              }}>
                <h2 style={{
                  fontSize: '5rem',
                  fontWeight: 'bold',
                  marginBottom: '40px',
                  color: '#ffd700',
                  fontFamily: 'Noto Serif JP, serif',
                  textShadow: '4px 4px 8px rgba(0,0,0,0.9), 0 0 40px rgba(255, 215, 0, 0.3)',
                  animation: 'slideInDown 1.5s ease-out',
                  letterSpacing: '2px'
                }}>About Our Team</h2>
                <p style={{
                  fontSize: '1.8rem',
                  color: '#fcd34d',
                  maxWidth: '900px',
                  margin: '0 auto',
                  fontFamily: 'Crimson Text, serif',
                  lineHeight: '1.9',
                  animation: 'slideInUp 1.5s ease-out 0.3s both',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                  letterSpacing: '1px'
                }}>
                  We are not a traditional gym. We are Antalya's premier nomadic BJJ family that trains in nature's embrace.
                </p>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '60px',
                marginTop: '80px'
              }}>
                {/* Philosophy Card - Enhanced */}
                <div style={{
                  padding: '50px',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
                  border: '3px solid rgba(255, 215, 0, 0.4)',
                  borderRadius: '25px',
                  backdropFilter: 'blur(20px)',
                  animation: 'scaleIn 1.2s ease-out 0.2s both',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'translateY(-15px) scale(1.03) rotate(1deg)';
                  card.style.boxShadow = '0 30px 60px rgba(255, 215, 0, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'translateY(0) scale(1) rotate(0deg)';
                  card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.1)';
                }}
                >
                  <div style={{
                    fontSize: '5rem',
                    marginBottom: '30px',
                    textAlign: 'center',
                    animation: 'softPulse 3s ease-in-out infinite'
                  }}>🌿</div>
                  <h3 style={{
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    marginBottom: '25px',
                    color: '#ffd700',
                    fontFamily: 'Noto Serif JP, serif',
                    textAlign: 'center',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                    letterSpacing: '1px'
                  }}>Our Philosophy</h3>
                  <p style={{
                    fontSize: '1.2rem',
                    color: '#e5e7eb',
                    lineHeight: '1.9',
                    fontFamily: 'Crimson Text, serif',
                    textAlign: 'center',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.6)'
                  }}>
                    We believe in the freedom of outdoor BJJ training in Antalya. No walls, no restrictions, just pure BJJ in nature's embrace. 
                    Our nomadic lifestyle connects us with the ancient warrior traditions while exploring Antalya's beautiful landscapes.
                  </p>
                </div>

                {/* Training Style Card - Enhanced */}
                <div style={{
                  padding: '50px',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
                  border: '3px solid rgba(255, 215, 0, 0.4)',
                  borderRadius: '25px',
                  backdropFilter: 'blur(20px)',
                  animation: 'scaleIn 1.2s ease-out 0.4s both',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'translateY(-15px) scale(1.03) rotate(1deg)';
                  card.style.boxShadow = '0 30px 60px rgba(255, 215, 0, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'translateY(0) scale(1) rotate(0deg)';
                  card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.1)';
                }}
                >
                  <div style={{
                    fontSize: '5rem',
                    marginBottom: '30px',
                    textAlign: 'center',
                    animation: 'softPulse 3s ease-in-out infinite 1s'
                  }}>🥋</div>
                  <h3 style={{
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    marginBottom: '25px',
                    color: '#ffd700',
                    fontFamily: 'Noto Serif JP, serif',
                    textAlign: 'center',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                    letterSpacing: '1px'
                  }}>Antalya BJJ Training</h3>
                  <p style={{
                    fontSize: '1.2rem',
                    color: '#e5e7eb',
                    lineHeight: '1.9',
                    fontFamily: 'Crimson Text, serif',
                    textAlign: 'center',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.6)'
                  }}>
                    Our BJJ training in Antalya adapts to nature's conditions. From soft grass to sandy beaches, 
                    we learn to flow with any surface, making us more versatile and adaptable fighters in Antalya's diverse outdoor environments.
                  </p>
                </div>

                {/* Community Card - Enhanced */}
                <div style={{
                  padding: '50px',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
                  border: '3px solid rgba(255, 215, 0, 0.4)',
                  borderRadius: '25px',
                  backdropFilter: 'blur(20px)',
                  animation: 'scaleIn 1.2s ease-out 0.6s both',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'translateY(-15px) scale(1.03) rotate(1deg)';
                  card.style.boxShadow = '0 30px 60px rgba(255, 215, 0, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'translateY(0) scale(1) rotate(0deg)';
                  card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.1)';
                }}
                >
                  <div style={{
                    fontSize: '5rem',
                    marginBottom: '30px',
                    textAlign: 'center',
                    animation: 'softPulse 3s ease-in-out infinite 2s'
                  }}>🤝</div>
                  <h3 style={{
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    marginBottom: '25px',
                    color: '#ffd700',
                    fontFamily: 'Noto Serif JP, serif',
                    textAlign: 'center',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                    letterSpacing: '1px'
                  }}>Antalya BJJ Community</h3>
                  <p style={{
                    fontSize: '1.2rem',
                    color: '#e5e7eb',
                    lineHeight: '1.9',
                    fontFamily: 'Crimson Text, serif',
                    textAlign: 'center',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.6)'
                  }}>
                    We welcome all levels to our Antalya BJJ community, from beginners to advanced practitioners. 
                    Our team supports each other's growth in a free, outdoor environment across Antalya's beautiful training locations.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Training Images Gallery Section - Enhanced */}
          <section style={{
            padding: '140px 40px',
            background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #1a1a2e 75%, #0f0f23 100%)',
            position: 'relative'
          }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div style={{
                textAlign: 'center',
                marginBottom: '100px',
                animation: 'fadeInUp 1.2s ease-out'
              }}>
                <h2 style={{
                  fontSize: '5rem',
                  fontWeight: 'bold',
                  marginBottom: '40px',
                  color: '#ffd700',
                  fontFamily: 'Noto Serif JP, serif',
                  textShadow: '4px 4px 8px rgba(0,0,0,0.9), 0 0 40px rgba(255, 215, 0, 0.3)',
                  animation: 'slideInDown 1.5s ease-out',
                  letterSpacing: '2px'
                }}>Training Moments</h2>
                <p style={{
                  fontSize: '1.8rem',
                  color: '#fcd34d',
                  maxWidth: '900px',
                  margin: '0 auto',
                  fontFamily: 'Crimson Text, serif',
                  lineHeight: '1.9',
                  animation: 'slideInUp 1.5s ease-out 0.3s both',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                  letterSpacing: '1px'
                }}>
                  Capturing the spirit of outdoor BJJ training in Antalya
                </p>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
                gap: '60px',
                marginTop: '80px'
              }}>
                {/* Training Image 1 - Enhanced */}
                <div style={{
                  borderRadius: '25px',
                  overflow: 'hidden',
                  boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
                  animation: 'scaleIn 1.2s ease-out 0.2s both',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  border: '3px solid rgba(255, 215, 0, 0.4)',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
                  backdropFilter: 'blur(20px)',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'translateY(-15px) scale(1.03) rotate(1deg)';
                  card.style.boxShadow = '0 35px 70px rgba(255, 215, 0, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'translateY(0) scale(1) rotate(0deg)';
                  card.style.boxShadow = '0 25px 50px rgba(0,0,0,0.4)';
                }}
                >
                  <img 
                    src="/insta1.png" 
                    alt="LORE BJJ Training Session" 
                    style={{
                      width: '100%',
                      height: '280px',
                      objectFit: 'cover',
                      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  />
                </div>

                {/* Training Image 2 - Enhanced */}
                <div style={{
                  borderRadius: '25px',
                  overflow: 'hidden',
                  boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
                  animation: 'scaleIn 1.2s ease-out 0.4s both',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  border: '3px solid rgba(255, 215, 0, 0.4)',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
                  backdropFilter: 'blur(20px)',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'translateY(-15px) scale(1.03) rotate(1deg)';
                  card.style.boxShadow = '0 35px 70px rgba(255, 215, 0, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'translateY(0) scale(1) rotate(0deg)';
                  card.style.boxShadow = '0 25px 50px rgba(0,0,0,0.4)';
                }}
                >
                  <img 
                    src="/insta10.jpg" 
                    alt="LORE BJJ Training Session" 
                    style={{
                      width: '100%',
                      height: '280px',
                      objectFit: 'cover',
                      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  />
                </div>

                {/* Training Image 3 - Enhanced */}
                <div style={{
                  borderRadius: '25px',
                  overflow: 'hidden',
                  boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
                  animation: 'scaleIn 1.2s ease-out 0.6s both',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  border: '3px solid rgba(255, 215, 0, 0.4)',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
                  backdropFilter: 'blur(20px)',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'translateY(-15px) scale(1.03) rotate(1deg)';
                  card.style.boxShadow = '0 35px 70px rgba(255, 215, 0, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'translateY(0) scale(1) rotate(0deg)';
                  card.style.boxShadow = '0 25px 50px rgba(0,0,0,0.4)';
                }}
                >
                  <img 
                    src="/lore1.png" 
                    alt="LORE BJJ Training Session" 
                    style={{
                      width: '100%',
                      height: '280px',
                      objectFit: 'cover',
                      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  />
                </div>

                {/* Training Image 4 - Enhanced */}
                <div style={{
                  borderRadius: '25px',
                  overflow: 'hidden',
                  boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
                  animation: 'scaleIn 1.2s ease-out 0.8s both',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  border: '3px solid rgba(255, 215, 0, 0.4)',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
                  backdropFilter: 'blur(20px)',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'translateY(-15px) scale(1.03) rotate(1deg)';
                  card.style.boxShadow = '0 35px 70px rgba(255, 215, 0, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'translateY(0) scale(1) rotate(0deg)';
                  card.style.boxShadow = '0 25px 50px rgba(0,0,0,0.4)';
                }}
                >
                  <img 
                    src="/lore2.png" 
                    alt="LORE BJJ Training Session" 
                    style={{
                      width: '100%',
                      height: '280px',
                      objectFit: 'cover',
                      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  />
                </div>

                {/* Training Image 5 - Enhanced */}
                <div style={{
                  borderRadius: '25px',
                  overflow: 'hidden',
                  boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
                  animation: 'scaleIn 1.2s ease-out 1.0s both',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  border: '3px solid rgba(255, 215, 0, 0.4)',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
                  backdropFilter: 'blur(20px)',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'translateY(-15px) scale(1.03) rotate(1deg)';
                  card.style.boxShadow = '0 35px 70px rgba(255, 215, 0, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'translateY(0) scale(1) rotate(0deg)';
                  card.style.boxShadow = '0 25px 50px rgba(0,0,0,0.4)';
                }}
                >
                  <img 
                    src="/lore3.png" 
                    alt="LORE BJJ Training Session" 
                    style={{
                      width: '100%',
                      height: '280px',
                      objectFit: 'cover',
                      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  />
                </div>

                {/* Training Image 6 - Enhanced */}
                <div style={{
                  borderRadius: '25px',
                  overflow: 'hidden',
                  boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
                  animation: 'scaleIn 1.2s ease-out 1.2s both',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  border: '3px solid rgba(255, 215, 0, 0.4)',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
                  backdropFilter: 'blur(20px)',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'translateY(-15px) scale(1.03) rotate(1deg)';
                  card.style.boxShadow = '0 35px 70px rgba(255, 215, 0, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'translateY(0) scale(1) rotate(0deg)';
                  card.style.boxShadow = '0 25px 50px rgba(0,0,0,0.4)';
                }}
                >
                  <img 
                    src="/lore4.png" 
                    alt="LORE BJJ Training Session" 
                    style={{
                      width: '100%',
                      height: '280px',
                      objectFit: 'cover',
                      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Training Locations Section - Enhanced */}
          <section id="locations" style={{
            padding: '140px 40px',
            background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #1a1a2e 75%, #0f0f23 100%)',
            position: 'relative'
          }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div style={{
                textAlign: 'center',
                marginBottom: '100px',
                animation: 'fadeInUp 1.2s ease-out'
              }}>
                <h2 style={{
                  fontSize: '5rem',
                  fontWeight: 'bold',
                  marginBottom: '40px',
                  color: '#ffd700',
                  fontFamily: 'Noto Serif JP, serif',
                  textShadow: '4px 4px 8px rgba(0,0,0,0.9), 0 0 40px rgba(255, 215, 0, 0.3)',
                  animation: 'slideInDown 1.5s ease-out',
                  letterSpacing: '2px'
                }}>Training Locations</h2>
                <p style={{
                  fontSize: '1.8rem',
                  color: '#fcd34d',
                  maxWidth: '900px',
                  margin: '0 auto',
                  fontFamily: 'Crimson Text, serif',
                  lineHeight: '1.9',
                  animation: 'slideInUp 1.5s ease-out 0.3s both',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                  letterSpacing: '1px'
                }}>
                  Discover our outdoor training spots across Antalya's beautiful landscapes
                </p>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
                gap: '80px',
                marginTop: '80px'
              }}>
                {locations.map((location, index) => (
                  <div key={index} style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
                    border: '3px solid rgba(255, 215, 0, 0.4)',
                    borderRadius: '30px',
                    padding: '50px',
                    backdropFilter: 'blur(20px)',
                    animation: `scaleIn 1.2s ease-out ${0.2 + index * 0.2}s both`,
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.1)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    const card = e.currentTarget as HTMLElement;
                    card.style.transform = 'translateY(-15px) scale(1.03) rotate(1deg)';
                    card.style.boxShadow = '0 35px 70px rgba(255, 215, 0, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    const card = e.currentTarget as HTMLElement;
                    card.style.transform = 'translateY(0) scale(1) rotate(0deg)';
                    card.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.1)';
                  }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '30px',
                      gap: '20px'
                    }}>
                      <div style={{
                        fontSize: '4rem',
                        animation: 'softPulse 3s ease-in-out infinite'
                      }}>{location.icon}</div>
                      <div>
                        <h3 style={{
                          fontSize: '2.5rem',
                          fontWeight: 'bold',
                          color: '#ffd700',
                          fontFamily: 'Noto Serif JP, serif',
                          marginBottom: '10px',
                          textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                          letterSpacing: '1px'
                        }}>{location.name}</h3>
                        <p style={{
                          fontSize: '1.3rem',
                          color: '#fcd34d',
                          fontFamily: 'Crimson Text, serif',
                          textShadow: '1px 1px 2px rgba(0,0,0,0.6)'
                        }}>{location.address}</p>
                      </div>
                    </div>
                    
                    <div style={{
                      marginBottom: '30px'
                    }}>
                      <h4 style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: '#ffd700',
                        marginBottom: '15px',
                        fontFamily: 'Noto Serif JP, serif',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
                      }}>Training Schedule</h4>
                      <p style={{
                        fontSize: '1.2rem',
                        color: '#e5e7eb',
                        fontFamily: 'Crimson Text, serif',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.6)'
                      }}>{location.time}</p>
                    </div>

                    <div style={{
                      marginBottom: '30px'
                    }}>
                      <h4 style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: '#ffd700',
                        marginBottom: '15px',
                        fontFamily: 'Noto Serif JP, serif',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
                      }}>Features</h4>
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '10px'
                      }}>
                        {location.features.map((feature, featureIndex) => (
                          <span key={featureIndex} style={{
                            backgroundColor: 'rgba(255, 215, 0, 0.2)',
                            color: '#ffd700',
                            padding: '8px 16px',
                            borderRadius: '20px',
                            fontSize: '1rem',
                            fontFamily: 'Crimson Text, serif',
                            border: '1px solid rgba(255, 215, 0, 0.3)',
                            textShadow: '1px 1px 2px rgba(0,0,0,0.6)'
                          }}>
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div style={{
                      borderRadius: '20px',
                      overflow: 'hidden',
                      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.4)',
                      animation: 'mapReveal 1.5s ease-out 0.5s both'
                    }}>
                      <iframe
                        src={location.mapEmbed}
                        width="100%"
                        height="300"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Social Media Section - Enhanced */}
          <section style={{
            padding: '140px 40px',
            background: 'linear-gradient(135deg, #1a0f2e 0%, #2d1b4e 25%, #3d2b6e 50%, #2d1b4e 75%, #1a0f2e 100%)',
            position: 'relative'
          }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div style={{
                textAlign: 'center',
                marginBottom: '100px',
                animation: 'fadeInUp 1.2s ease-out'
              }}>
                <h2 style={{
                  fontSize: '5rem',
                  fontWeight: 'bold',
                  marginBottom: '40px',
                  color: '#ffd700',
                  fontFamily: 'Noto Serif JP, serif',
                  textShadow: '4px 4px 8px rgba(0,0,0,0.9), 0 0 40px rgba(255, 215, 0, 0.3)',
                  animation: 'slideInDown 1.5s ease-out',
                  letterSpacing: '2px'
                }}>Follow Our Journey</h2>
                <p style={{
                  fontSize: '1.8rem',
                  color: '#fcd34d',
                  maxWidth: '900px',
                  margin: '0 auto',
                  fontFamily: 'Crimson Text, serif',
                  lineHeight: '1.9',
                  animation: 'slideInUp 1.5s ease-out 0.3s both',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                  letterSpacing: '1px'
                }}>
                  Stay connected with our outdoor BJJ adventures
                </p>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
                gap: '80px',
                marginTop: '80px'
              }}>
                {/* YouTube Section - Enhanced */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
                  border: '3px solid rgba(255, 215, 0, 0.4)',
                  borderRadius: '30px',
                  padding: '50px',
                  backdropFilter: 'blur(20px)',
                  animation: 'scaleIn 1.2s ease-out 0.2s both',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.1)',
                  position: 'relative',
                  overflow: 'hidden',
                  width: '300px'
                }}
                onMouseEnter={(e) => {
                  const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'translateY(-15px) scale(1.03) rotate(1deg)';
                  card.style.boxShadow = '0 35px 70px rgba(255, 215, 0, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'translateY(0) scale(1) rotate(0deg)';
                  card.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.1)';
                }}
                >
                  <div style={{
                    textAlign: 'center',
                    marginBottom: '30px'
                  }}>
                    <h3 style={{
                      fontSize: '2rem',
                      fontWeight: 'bold',
                      color: '#ffd700',
                      fontFamily: 'Noto Serif JP, serif',
                      marginBottom: '10px',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                      letterSpacing: '1px'
                    }}>YouTube Channel</h3>
                  </div>

                  <div style={{
                    position: 'relative',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    marginBottom: '30px',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                    animation: 'mapReveal 1.5s ease-out 0.5s both'
                  }}>
                    <img 
                      src="https://img.youtube.com/vi/PoCnx58dYZk/maxresdefault.jpg" 
                      alt="YouTube Video Thumbnail" 
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                    />
                  </div>

                  <div style={{
                    textAlign: 'center'
                  }}>
                    <a href="https://www.youtube.com/watch?v=PoCnx58dYZk&t=1s" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       style={{
                         background: 'linear-gradient(135deg, #ff0000 0%, #cc0000 50%, #ff0000 100%)',
                         backgroundSize: '200% 200%',
                         color: 'white',
                         padding: '12px 25px',
                         fontSize: '1.1rem',
                         textDecoration: 'none',
                         borderRadius: '12px',
                         fontWeight: '700',
                         fontFamily: 'Crimson Text, serif',
                         display: 'inline-block',
                         transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                         boxShadow: '0 15px 35px rgba(255, 0, 0, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.2)',
                         border: '3px solid rgba(255, 0, 0, 0.3)',
                         position: 'relative',
                         overflow: 'hidden'
                       }}
                       onMouseEnter={(e) => {
                         const link = e.target as HTMLElement;
                         link.style.transform = 'translateY(-8px) scale(1.05)';
                         link.style.boxShadow = '0 25px 50px rgba(255, 0, 0, 0.6), inset 0 2px 0 rgba(255, 255, 255, 0.3)';
                         link.style.backgroundPosition = '100% 100%';
                       }}
                       onMouseLeave={(e) => {
                         const link = e.target as HTMLElement;
                         link.style.transform = 'translateY(0) scale(1)';
                         link.style.boxShadow = '0 15px 35px rgba(255, 0, 0, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.2)';
                         link.style.backgroundPosition = '0% 0%';
                       }}
                       >
                      Watch on YouTube
                    </a>
                  </div>
                </div>

                {/* Instagram Section - Enhanced */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
                  border: '3px solid rgba(255, 215, 0, 0.4)',
                  borderRadius: '30px',
                  padding: '50px',
                  backdropFilter: 'blur(20px)',
                  animation: 'scaleIn 1.2s ease-out 0.4s both',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.1)',
                  position: 'relative',
                  overflow: 'hidden',
                  width: '300px'
                }}
                onMouseEnter={(e) => {
                  const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'translateY(-15px) scale(1.03) rotate(1deg)';
                  card.style.boxShadow = '0 35px 70px rgba(255, 215, 0, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'translateY(0) scale(1) rotate(0deg)';
                  card.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.1)';
                }}
                >
                  <div style={{
                    textAlign: 'center',
                    marginBottom: '30px'
                  }}>
                    <h3 style={{
                      fontSize: '2rem',
                      fontWeight: 'bold',
                      color: '#ffd700',
                      fontFamily: 'Noto Serif JP, serif',
                      marginBottom: '10px',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                      letterSpacing: '1px'
                    }}>Instagram</h3>
                  </div>

                  <div style={{
                    textAlign: 'center',
                    marginBottom: '30px'
                  }}>
                    <img 
                      src="/logo2.jpg" 
                      alt="LORE BJJ Instagram" 
                      style={{
                        maxWidth: '150px',
                        borderRadius: '20px',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        animation: 'softPulse 3s ease-in-out infinite'
                      }}
                      onMouseEnter={(e) => {
                        const img = e.target as HTMLElement;
                        img.style.transform = 'scale(1.1) rotate(2deg)';
                        img.style.boxShadow = '0 30px 60px rgba(255, 215, 0, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        const img = e.target as HTMLElement;
                        img.style.transform = 'scale(1) rotate(0deg)';
                        img.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)';
                      }}
                    />
                  </div>

                  <div style={{
                    textAlign: 'center'
                  }}>
                    <a href="https://www.instagram.com/loremartialarts/" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       style={{
                         background: 'linear-gradient(135deg, #e4405f 0%, #c13584 50%, #e4405f 100%)',
                         backgroundSize: '200% 200%',
                         color: 'white',
                         padding: '12px 25px',
                         fontSize: '1.1rem',
                         textDecoration: 'none',
                         borderRadius: '12px',
                         fontWeight: '700',
                         fontFamily: 'Crimson Text, serif',
                         display: 'inline-block',
                         transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                         boxShadow: '0 15px 35px rgba(228, 64, 95, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.2)',
                         border: '3px solid rgba(228, 64, 95, 0.3)',
                         position: 'relative',
                         overflow: 'hidden'
                       }}
                       onMouseEnter={(e) => {
                         const link = e.target as HTMLElement;
                         link.style.transform = 'translateY(-8px) scale(1.05)';
                         link.style.boxShadow = '0 25px 50px rgba(228, 64, 95, 0.6), inset 0 2px 0 rgba(255, 255, 255, 0.3)';
                         link.style.backgroundPosition = '100% 100%';
                       }}
                       onMouseLeave={(e) => {
                         const link = e.target as HTMLElement;
                         link.style.transform = 'translateY(0) scale(1)';
                         link.style.boxShadow = '0 15px 35px rgba(228, 64, 95, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.2)';
                         link.style.backgroundPosition = '0% 0%';
                       }}
                       >
                      Follow on Instagram
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact & Footer */}
          <section style={{
            padding: '80px 40px',
            background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
            textAlign: 'center'
          }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h2 style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                marginBottom: '30px',
                color: '#ffd700',
                fontFamily: 'Noto Serif JP, serif',
                animation: 'fadeInUp 1s ease-out'
              }}>Join Our Nomadic Journey</h2>
              <p style={{
                fontSize: '1.3rem',
                color: '#e5e7eb',
                marginBottom: '40px',
                fontFamily: 'Crimson Text, serif',
                lineHeight: '1.8',
                animation: 'fadeIn 1.5s ease-out 0.3s both'
              }}>
                Ready to experience outdoor BJJ training? Contact us to join our next session.
              </p>
              <div style={{
                display: 'flex',
                gap: '20px',
                justifyContent: 'center',
                flexWrap: 'wrap',
                animation: 'fadeIn 1.8s ease-out 0.6s both'
              }}>
                <a href="mailto:contact@lorebjj.com" style={{
                  backgroundColor: '#ffd700',
                  color: '#1a1a1a',
                  padding: '15px 30px',
                  fontSize: '1.2rem',
                  textDecoration: 'none',
                  borderRadius: '10px',
                  fontWeight: '600',
                  fontFamily: 'Crimson Text, serif',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 10px 25px rgba(255, 215, 0, 0.3)'
                }}
                onMouseEnter={(e) => {
                  const link = e.target as HTMLElement;
                  link.style.transform = 'translateY(-5px) scale(1.05)';
                  link.style.boxShadow = '0 15px 35px rgba(255, 215, 0, 0.4)';
                }}
                onMouseLeave={(e) => {
                  const link = e.target as HTMLElement;
                  link.style.transform = 'translateY(0) scale(1)';
                  link.style.boxShadow = '0 10px 25px rgba(255, 215, 0, 0.3)';
                }}
                >
                  Contact Us
                </a>
                <a href="#locations" style={{
                  backgroundColor: 'transparent',
                  color: '#ffd700',
                  padding: '15px 30px',
                  fontSize: '1.2rem',
                  textDecoration: 'none',
                  borderRadius: '10px',
                  fontWeight: '600',
                  fontFamily: 'Crimson Text, serif',
                  border: '3px solid #ffd700',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 10px 25px rgba(255, 215, 0, 0.2)'
                }}
                onMouseEnter={(e) => {
                  const link = e.target as HTMLElement;
                  link.style.transform = 'translateY(-5px) scale(1.05)';
                  link.style.backgroundColor = '#ffd700';
                  link.style.color = '#1a1a1a';
                  link.style.boxShadow = '0 15px 35px rgba(255, 215, 0, 0.4)';
                }}
                onMouseLeave={(e) => {
                  const link = e.target as HTMLElement;
                  link.style.transform = 'translateY(0) scale(1)';
                  link.style.backgroundColor = 'transparent';
                  link.style.color = '#ffd700';
                  link.style.boxShadow = '0 10px 25px rgba(255, 215, 0, 0.2)';
                }}
                >
                  View Locations
                </a>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
