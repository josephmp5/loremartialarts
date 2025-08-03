"use client";
import { useState, useEffect } from 'react';

export default function Home() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 5000);

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
      overflowX: 'hidden'
    }}>
      <style dangerouslySetInnerHTML={{
        __html: `
          @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;600;700&display=swap');
          
          @keyframes introFadeIn {
            0% { opacity: 0; transform: scale(0.8) rotate(-2deg); }
            100% { opacity: 1; transform: scale(1) rotate(0deg); }
          }

          @keyframes introFadeOut {
            0% { opacity: 1; pointer-events: auto; }
            99% { opacity: 0; pointer-events: auto; }
            100% { opacity: 0; pointer-events: none; visibility: hidden; }
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
        animation: 'introFadeOut 1s ease-in-out 4s forwards',
        pointerEvents: 'none'
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
            padding: 'clamp(30px, 8vw, 80px) clamp(20px, 6vw, 50px)',
            borderRadius: 'clamp(15px, 4vw, 30px)',
            border: '4px solid rgba(139, 69, 19, 0.4)',
            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.6), inset 0 2px 0 rgba(255, 255, 255, 0.1)',
            position: 'relative',
            backdropFilter: 'blur(15px)',
            maxWidth: '400px',
            width: '90%',
            margin: '0 auto'
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
                width: '100%',
                maxWidth: '200px',
                marginBottom: '30px',
                animation: 'logoFloat 4s ease-in-out infinite',
                mixBlendMode: 'overlay',
                opacity: 0.9,
                filter: 'drop-shadow(0 15px 30px rgba(255, 215, 0, 0.3))'
              }}
            />
            <h1 style={{
              fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
              fontWeight: 'bold',
              marginBottom: '20px',
              color: '#ffd700',
              textShadow: '4px 4px 8px rgba(0,0,0,0.9), 0 0 30px rgba(255, 215, 0, 0.3)',
              fontFamily: 'Noto Serif JP, serif',
              letterSpacing: '2px'
            }}>LORE BJJ</h1>
            <p style={{
              fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
              color: '#fcd34d',
              fontFamily: 'Crimson Text, serif',
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              letterSpacing: '1px'
            }}>Outdoor Nomad Free Team</p>
          </div>
        </div>

      {/* Main Content */}
      <div style={{
        animation: 'fadeIn 1s ease-in-out 5s both'
      }}>
          {/* Hero Section - Full Screen */}
          <section style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: 'url(/background.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            padding: '0 clamp(20px, 5vw, 40px)',
            position: 'relative'
          }}>
            {/* Paper texture overlay */}
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
              maxWidth: '1200px',
              animation: 'fadeInUp 1.2s ease-out',
              position: 'relative',
              zIndex: 1
            }}>
              <h1 style={{
                fontSize: 'clamp(3rem, 12vw, 6rem)',
                fontWeight: 'bold',
                marginBottom: '35px',
                color: '#2c1810',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                fontFamily: 'Noto Serif JP, serif',
                animation: 'slideInDown 1.5s ease-out',
                letterSpacing: 'clamp(1px, 0.5vw, 3px)'
              }}>LORE BJJ</h1>
              <p style={{
                fontSize: 'clamp(1.5rem, 6vw, 2.5rem)',
                color: '#5d4037',
                marginBottom: '50px',
                fontFamily: 'Crimson Text, serif',
                animation: 'slideInUp 1.5s ease-out 0.3s both',
                textShadow: '1px 1px 2px rgba(0,0,0,0.4)',
                letterSpacing: '1px'
              }}>Outdoor Nomad Free Team</p>
              <p style={{
                fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
                color: '#3e2723',
                maxWidth: '900px',
                margin: '0 auto 60px',
                lineHeight: '1.9',
                fontFamily: 'Crimson Text, serif',
                animation: 'fadeIn 2s ease-out 0.6s both',
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                padding: '0 20px'
              }}>
                Experience the freedom of outdoor BJJ training. Join our nomadic team as we train in nature&apos;s gym - 
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
                  backgroundColor: '#f5f5dc',
                  color: '#2c1810',
                  padding: 'clamp(15px, 3vw, 20px) clamp(25px, 6vw, 40px)',
                  fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
                  textDecoration: 'none',
                  borderRadius: '0',
                  fontWeight: '700',
                  fontFamily: 'Crimson Text, serif',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  border: '2px solid #8b4513',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: 'none',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                }}
                onMouseEnter={(e) => {
                  const link = e.target as HTMLElement;
                  link.style.transform = 'translateY(-3px)';
                  link.style.backgroundColor = '#e8e8d0';
                }}
                onMouseLeave={(e) => {
                  const link = e.target as HTMLElement;
                  link.style.transform = 'translateY(0)';
                  link.style.backgroundColor = '#f5f5dc';
                }}
                >
                  Discover Our Team
                </a>
                <a href="#locations" style={{
                  backgroundColor: 'transparent',
                  color: '#2c1810',
                  padding: 'clamp(15px, 3vw, 20px) clamp(25px, 6vw, 40px)',
                  fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
                  textDecoration: 'none',
                  borderRadius: '0',
                  fontWeight: '700',
                  fontFamily: 'Crimson Text, serif',
                  border: '2px solid #8b4513',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: 'none',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                }}
                onMouseEnter={(e) => {
                  const link = e.target as HTMLElement;
                  link.style.transform = 'translateY(-3px)';
                  link.style.backgroundColor = '#f5f5dc';
                }}
                onMouseLeave={(e) => {
                  const link = e.target as HTMLElement;
                  link.style.transform = 'translateY(0)';
                  link.style.backgroundColor = 'transparent';
                }}
                >
                  Training Locations
                </a>
              </div>
            </div>
          </section>

          {/* About Our Team Section - Vintage Paper Style */}
          <section id="about" style={{
            padding: 'clamp(60px, 12vw, 140px) clamp(20px, 5vw, 40px)',
            backgroundImage: 'url(/background.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            position: 'relative'
          }}>
            {/* Paper texture overlay */}
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
            
            <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
              <div style={{
                textAlign: 'center',
                marginBottom: '100px',
                animation: 'fadeInUp 1.2s ease-out'
              }}>
                <h2 style={{
                  fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                  fontWeight: 'bold',
                  marginBottom: '40px',
                  color: '#2c1810',
                  fontFamily: 'Noto Serif JP, serif',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  animation: 'slideInDown 1.5s ease-out',
                  letterSpacing: 'clamp(1px, 0.3vw, 2px)'
                }}>About Our Team</h2>
                <p style={{
                  fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
                  color: '#5d4037',
                  maxWidth: '900px',
                  margin: '0 auto',
                  fontFamily: 'Crimson Text, serif',
                  lineHeight: '1.9',
                  animation: 'slideInUp 1.5s ease-out 0.3s both',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.4)',
                  letterSpacing: '1px',
                  padding: '0 20px'
                }}>
                  We are not a traditional gym. We are Antalya&apos;s premier nomadic BJJ family that trains in nature&apos;s embrace.
                </p>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 'clamp(30px, 6vw, 60px)',
                marginTop: '80px'
              }}>
                {/* Philosophy Card - Modern Premium Style */}
                <div style={{
                  padding: '50px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  borderRadius: '25px',
                  animation: 'scaleIn 1.2s ease-out 0.2s both',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'translateY(-10px) scale(1.03)';
                  card.style.boxShadow = '0 30px 60px rgba(102, 126, 234, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'translateY(0) scale(1)';
                  card.style.boxShadow = '0 20px 40px rgba(102, 126, 234, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                }}
                >
                  <div style={{
                    fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                    marginBottom: '30px',
                    textAlign: 'center',
                    animation: 'softPulse 3s ease-in-out infinite'
                  }}>🌿</div>
                  <h3 style={{
                    fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
                    fontWeight: 'bold',
                    marginBottom: '25px',
                    color: 'white',
                    fontFamily: 'Noto Serif JP, serif',
                    textAlign: 'center',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    letterSpacing: '1px'
                  }}>Our Philosophy</h3>
                  <p style={{
                    fontSize: '1.2rem',
                    color: 'rgba(255, 255, 255, 0.9)',
                    lineHeight: '1.9',
                    fontFamily: 'Crimson Text, serif',
                    textAlign: 'center',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                  }}>
                                    We believe in the freedom of outdoor BJJ training in Antalya. No walls, no restrictions, just pure BJJ in nature&apos;s embrace.
                Our nomadic lifestyle connects us with the ancient warrior traditions while exploring Antalya&apos;s beautiful landscapes.
                  </p>
                </div>

                {/* Training Style Card - Modern Premium Style */}
                <div style={{
                  padding: '50px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  borderRadius: '25px',
                  animation: 'scaleIn 1.2s ease-out 0.4s both',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'translateY(-10px) scale(1.03)';
                  card.style.boxShadow = '0 30px 60px rgba(102, 126, 234, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'translateY(0) scale(1)';
                  card.style.boxShadow = '0 20px 40px rgba(102, 126, 234, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                }}
                >
                  <div style={{
                    fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                    marginBottom: '30px',
                    textAlign: 'center',
                    animation: 'softPulse 3s ease-in-out infinite 1s'
                  }}>🥋</div>
                  <h3 style={{
                    fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
                    fontWeight: 'bold',
                    marginBottom: '25px',
                    color: 'white',
                    fontFamily: 'Noto Serif JP, serif',
                    textAlign: 'center',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    letterSpacing: '1px'
                  }}>Antalya BJJ Training</h3>
                  <p style={{
                    fontSize: '1.2rem',
                    color: 'rgba(255, 255, 255, 0.9)',
                    lineHeight: '1.9',
                    fontFamily: 'Crimson Text, serif',
                    textAlign: 'center',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                  }}>
                                    Our BJJ training in Antalya adapts to nature&apos;s conditions. From soft grass to sandy beaches,
                we learn to flow with any surface, making us more versatile and adaptable fighters in Antalya&apos;s diverse outdoor environments.
                  </p>
                </div>

                {/* Community Card - Modern Premium Style */}
                <div style={{
                  padding: '50px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  borderRadius: '25px',
                  animation: 'scaleIn 1.2s ease-out 0.6s both',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'translateY(-10px) scale(1.03)';
                  card.style.boxShadow = '0 30px 60px rgba(102, 126, 234, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'translateY(0) scale(1)';
                  card.style.boxShadow = '0 20px 40px rgba(102, 126, 234, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                }}
                >
                  <div style={{
                    fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                    marginBottom: '30px',
                    textAlign: 'center',
                    animation: 'softPulse 3s ease-in-out infinite 2s'
                  }}>🤝</div>
                  <h3 style={{
                    fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
                    fontWeight: 'bold',
                    marginBottom: '25px',
                    color: 'white',
                    fontFamily: 'Noto Serif JP, serif',
                    textAlign: 'center',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    letterSpacing: '1px'
                  }}>Antalya BJJ Community</h3>
                  <p style={{
                    fontSize: '1.2rem',
                    color: 'rgba(255, 255, 255, 0.9)',
                    lineHeight: '1.9',
                    fontFamily: 'Crimson Text, serif',
                    textAlign: 'center',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                  }}>
                    We welcome all levels to our Antalya BJJ community, from beginners to advanced practitioners. 
                    Our team supports each other&apos;s growth in a free, outdoor environment across Antalya&apos;s beautiful training locations.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Training Images Gallery Section - Vintage Paper Style */}
          <section style={{
            padding: 'clamp(60px, 12vw, 140px) clamp(20px, 5vw, 40px)',
            backgroundImage: 'url(/background.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            position: 'relative'
          }}>
            {/* Paper texture overlay */}
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
            
            <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
              <div style={{
                textAlign: 'center',
                marginBottom: '100px',
                animation: 'fadeInUp 1.2s ease-out'
              }}>
                <h2 style={{
                  fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                  fontWeight: 'bold',
                  marginBottom: '40px',
                  color: '#2c1810',
                  fontFamily: 'Noto Serif JP, serif',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  animation: 'slideInDown 1.5s ease-out',
                  letterSpacing: 'clamp(1px, 0.3vw, 2px)'
                }}>Training Moments</h2>
                <p style={{
                  fontSize: '1.8rem',
                  color: '#5d4037',
                  maxWidth: '900px',
                  margin: '0 auto',
                  fontFamily: 'Crimson Text, serif',
                  lineHeight: '1.9',
                  animation: 'slideInUp 1.5s ease-out 0.3s both',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.4)',
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
                {/* Training Image 1 - Modern Premium Style */}
                <div style={{
                  borderRadius: '25px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3)',
                  animation: 'scaleIn 1.2s ease-out 0.2s both',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  border: 'none',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'translateY(-10px) scale(1.03)';
                  card.style.boxShadow = '0 30px 60px rgba(102, 126, 234, 0.4)';
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'translateY(0) scale(1)';
                  card.style.boxShadow = '0 20px 40px rgba(102, 126, 234, 0.3)';
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
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    padding: '25px',
                    color: 'white'
                  }}>
                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      marginBottom: '10px',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                    }}>Outdoor Training</h3>
                    <p style={{
                      fontSize: '1rem',
                      opacity: 0.9,
                      textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                    }}>BJJ techniques in nature&apos;s embrace</p>
                  </div>
                </div>

                {/* Training Image 2 - Modern Premium Style */}
                <div style={{
                  borderRadius: '25px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3)',
                  animation: 'scaleIn 1.2s ease-out 0.4s both',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  border: 'none',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'translateY(-10px) scale(1.03)';
                  card.style.boxShadow = '0 30px 60px rgba(102, 126, 234, 0.4)';
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'translateY(0) scale(1)';
                  card.style.boxShadow = '0 20px 40px rgba(102, 126, 234, 0.3)';
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
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    padding: '25px',
                    color: 'white'
                  }}>
                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      marginBottom: '10px',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                    }}>Team Training</h3>
                    <p style={{
                      fontSize: '1rem',
                      opacity: 0.9,
                      textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                    }}>Building strength together in Antalya</p>
                  </div>
                </div>

                {/* Training Image 3 - Modern Premium Style */}
                <div style={{
                  borderRadius: '25px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3)',
                  animation: 'scaleIn 1.2s ease-out 0.6s both',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  border: 'none',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'translateY(-10px) scale(1.03)';
                  card.style.boxShadow = '0 30px 60px rgba(102, 126, 234, 0.4)';
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'translateY(0) scale(1)';
                  card.style.boxShadow = '0 20px 40px rgba(102, 126, 234, 0.3)';
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
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    padding: '25px',
                    color: 'white'
                  }}>
                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      marginBottom: '10px',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                    }}>Beach Training</h3>
                    <p style={{
                      fontSize: '1rem',
                      opacity: 0.9,
                      textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                    }}>Training by the Mediterranean Sea</p>
                  </div>
                </div>

                {/* Training Image 4 - Modern Premium Style */}
                <div style={{
                  borderRadius: '25px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3)',
                  animation: 'scaleIn 1.2s ease-out 0.8s both',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  border: 'none',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'translateY(-10px) scale(1.03)';
                  card.style.boxShadow = '0 30px 60px rgba(102, 126, 234, 0.4)';
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'translateY(0) scale(1)';
                  card.style.boxShadow = '0 20px 40px rgba(102, 126, 234, 0.3)';
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
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    padding: '25px',
                    color: 'white'
                  }}>
                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      marginBottom: '10px',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                    }}>Technique Focus</h3>
                    <p style={{
                      fontSize: '1rem',
                      opacity: 0.9,
                      textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                    }}>Perfecting BJJ techniques outdoors</p>
                  </div>
                </div>

                {/* Training Image 5 - Modern Premium Style */}
                <div style={{
                  borderRadius: '25px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3)',
                  animation: 'scaleIn 1.2s ease-out 1.0s both',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  border: 'none',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'translateY(-10px) scale(1.03)';
                  card.style.boxShadow = '0 30px 60px rgba(102, 126, 234, 0.4)';
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'translateY(0) scale(1)';
                  card.style.boxShadow = '0 20px 40px rgba(102, 126, 234, 0.3)';
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
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    padding: '25px',
                    color: 'white'
                  }}>
                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      marginBottom: '10px',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                    }}>Park Sessions</h3>
                    <p style={{
                      fontSize: '1rem',
                      opacity: 0.9,
                      textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                    }}>Training in Antalya&apos;s beautiful parks</p>
                  </div>
                </div>

                {/* Training Image 6 - Modern Premium Style */}
                <div style={{
                  borderRadius: '25px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3)',
                  animation: 'scaleIn 1.2s ease-out 1.2s both',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  border: 'none',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'translateY(-10px) scale(1.03)';
                  card.style.boxShadow = '0 30px 60px rgba(102, 126, 234, 0.4)';
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'translateY(0) scale(1)';
                  card.style.boxShadow = '0 20px 40px rgba(102, 126, 234, 0.3)';
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
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    padding: '25px',
                    color: 'white'
                  }}>
                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      marginBottom: '10px',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                    }}>Community Spirit</h3>
                    <p style={{
                      fontSize: '1rem',
                      opacity: 0.9,
                      textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                    }}>Building bonds through BJJ</p>
                  </div>
                </div>
              </div>

              {/* Follow Us Button */}
              <div style={{
                textAlign: 'center',
                marginTop: '80px',
                animation: 'fadeIn 1.5s ease-out 1.5s both'
              }}>
                <a href="https://www.instagram.com/loremartialarts/" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   style={{
                     background: 'linear-gradient(135deg, #8b4513 0%, #a0522d 50%, #8b4513 100%)',
                     backgroundSize: '200% 200%',
                     color: '#f5f5dc',
                     padding: '20px 50px',
                     fontSize: '1.4rem',
                     textDecoration: 'none',
                     borderRadius: '15px',
                     fontWeight: '700',
                     fontFamily: 'Crimson Text, serif',
                     display: 'inline-block',
                     transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                     boxShadow: '0 12px 30px rgba(139, 69, 19, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                     border: '3px solid #8b4513',
                     position: 'relative',
                     overflow: 'hidden',
                     textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                   }}
                   onMouseEnter={(e) => {
                     const link = e.target as HTMLElement;
                     link.style.transform = 'translateY(-8px) scale(1.05)';
                     link.style.backgroundPosition = '100% 100%';
                     link.style.boxShadow = '0 20px 40px rgba(139, 69, 19, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
                   }}
                   onMouseLeave={(e) => {
                     const link = e.target as HTMLElement;
                     link.style.transform = 'translateY(0) scale(1)';
                     link.style.backgroundPosition = '0% 0%';
                     link.style.boxShadow = '0 12px 30px rgba(139, 69, 19, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                   }}
                   >
                  Follow Us on Instagram
                </a>
              </div>
            </div>
          </section>

          {/* Training Locations Section - Vintage Paper Style */}
          <section id="locations" style={{
            padding: 'clamp(60px, 12vw, 140px) clamp(20px, 5vw, 40px)',
            backgroundImage: 'url(/background.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            position: 'relative'
          }}>
            {/* Paper texture overlay */}
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
            
            <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
              <div style={{
                textAlign: 'center',
                marginBottom: '100px',
                animation: 'fadeInUp 1.2s ease-out'
              }}>
                <h2 style={{
                  fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                  fontWeight: 'bold',
                  marginBottom: '40px',
                  color: '#2c1810',
                  fontFamily: 'Noto Serif JP, serif',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  animation: 'slideInDown 1.5s ease-out',
                  letterSpacing: 'clamp(1px, 0.3vw, 2px)'
                }}>Training Locations</h2>
                <p style={{
                  fontSize: '1.8rem',
                  color: '#5d4037',
                  maxWidth: '900px',
                  margin: '0 auto',
                  fontFamily: 'Crimson Text, serif',
                  lineHeight: '1.9',
                  animation: 'slideInUp 1.5s ease-out 0.3s both',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.4)',
                  letterSpacing: '1px'
                }}>
                  Discover our outdoor training spots across Antalya&apos;s beautiful landscapes
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
                    background: '#f5f5dc',
                    border: '2px solid #8b4513',
                    borderRadius: '0',
                    padding: '50px',
                    animation: `scaleIn 1.2s ease-out ${0.2 + index * 0.2}s both`,
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: 'none',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    const card = e.currentTarget as HTMLElement;
                    card.style.transform = 'translateY(-5px)';
                    card.style.backgroundColor = '#e8e8d0';
                  }}
                  onMouseLeave={(e) => {
                    const card = e.currentTarget as HTMLElement;
                    card.style.transform = 'translateY(0)';
                    card.style.backgroundColor = '#f5f5dc';
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
                          fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
                          fontWeight: 'bold',
                          color: '#2c1810',
                          fontFamily: 'Noto Serif JP, serif',
                          marginBottom: '10px',
                          textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                          letterSpacing: '1px'
                        }}>{location.name}</h3>
                        <p style={{
                          fontSize: '1.3rem',
                          color: '#5d4037',
                          fontFamily: 'Crimson Text, serif',
                          textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                        }}>{location.address}</p>
                      </div>
                    </div>
                    
                    <div style={{
                      marginBottom: '30px'
                    }}>
                      <h4 style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: '#2c1810',
                        marginBottom: '15px',
                        fontFamily: 'Noto Serif JP, serif',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                      }}>Training Schedule</h4>
                      <p style={{
                        fontSize: '1.2rem',
                        color: '#3e2723',
                        fontFamily: 'Crimson Text, serif',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                      }}>{location.time}</p>
                    </div>

                    <div style={{
                      marginBottom: '30px'
                    }}>
                      <h4 style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: '#2c1810',
                        marginBottom: '15px',
                        fontFamily: 'Noto Serif JP, serif',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                      }}>Features</h4>
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '10px'
                      }}>
                        {location.features.map((feature, featureIndex) => (
                          <span key={featureIndex} style={{
                            backgroundColor: 'rgba(139, 69, 19, 0.2)',
                            color: '#2c1810',
                            padding: '8px 16px',
                            borderRadius: '0',
                            fontSize: '1rem',
                            fontFamily: 'Crimson Text, serif',
                            border: '1px solid #8b4513',
                            textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                          }}>
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div style={{
                      borderRadius: '0',
                      overflow: 'hidden',
                      boxShadow: 'none',
                      animation: 'mapReveal 1.5s ease-out 0.5s both',
                      border: '2px solid #8b4513'
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

          {/* Social Media Section - Vintage Paper Style */}
          <section style={{
            padding: 'clamp(60px, 12vw, 140px) clamp(20px, 5vw, 40px)',
            backgroundImage: 'url(/background.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            position: 'relative'
          }}>
            {/* Paper texture overlay */}
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
            
            <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
              <div style={{
                textAlign: 'center',
                marginBottom: '100px',
                animation: 'fadeInUp 1.2s ease-out'
              }}>
                <h2 style={{
                  fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                  fontWeight: 'bold',
                  marginBottom: '40px',
                  color: '#2c1810',
                  fontFamily: 'Noto Serif JP, serif',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  animation: 'slideInDown 1.5s ease-out',
                  letterSpacing: 'clamp(1px, 0.3vw, 2px)'
                }}>Follow Our Journey</h2>
                <p style={{
                  fontSize: '1.8rem',
                  color: '#5d4037',
                  maxWidth: '900px',
                  margin: '0 auto',
                  fontFamily: 'Crimson Text, serif',
                  lineHeight: '1.9',
                  animation: 'slideInUp 1.5s ease-out 0.3s both',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.4)',
                  letterSpacing: '1px'
                }}>
                  Stay connected with our outdoor BJJ adventures
                </p>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '80px'
              }}>
                {/* YouTube Section - Modern Premium Style */}
                <div style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  borderRadius: '25px',
                  padding: '60px',
                  animation: 'scaleIn 1.2s ease-out 0.2s both',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 25px 50px rgba(102, 126, 234, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  position: 'relative',
                  overflow: 'hidden',
                  width: '100%',
                  maxWidth: '800px'
                }}
                onMouseEnter={(e) => {
                  const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'translateY(-15px) scale(1.03)';
                  card.style.boxShadow = '0 35px 70px rgba(102, 126, 234, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'translateY(0) scale(1)';
                  card.style.boxShadow = '0 25px 50px rgba(102, 126, 234, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                }}
                >
                  <div style={{
                    textAlign: 'center',
                    marginBottom: '40px'
                  }}>
                    <h3 style={{
                      fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
                      fontWeight: 'bold',
                      color: 'white',
                      fontFamily: 'Noto Serif JP, serif',
                      marginBottom: '15px',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                      letterSpacing: '1px'
                    }}>YouTube Channel</h3>
                    <p style={{
                      fontSize: '1.3rem',
                      color: 'rgba(255, 255, 255, 0.9)',
                      fontFamily: 'Crimson Text, serif',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                      letterSpacing: '1px',
                      marginBottom: '20px'
                    }}>Latest Vlog</p>
                    <p style={{
                      fontSize: '1.1rem',
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontFamily: 'Crimson Text, serif',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                      maxWidth: '600px',
                      margin: '0 auto',
                      lineHeight: '1.6'
                    }}>
                      Join us on our latest outdoor BJJ adventure! Watch as we train in Antalya&apos;s beautiful landscapes, 
                      share techniques, and build our nomadic community. Experience the freedom of outdoor martial arts.
                    </p>
                  </div>

                  <div style={{
                    position: 'relative',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    marginBottom: '40px',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                    animation: 'mapReveal 1.5s ease-out 0.5s both',
                    border: '3px solid rgba(255, 255, 255, 0.2)'
                  }}>
                    <img 
                      src="https://img.youtube.com/vi/PoCnx58dYZk/maxresdefault.jpg" 
                      alt="YouTube Video Thumbnail" 
                      style={{
                        width: '100%',
                        height: '350px',
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
                         background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                         backgroundSize: '200% 200%',
                         color: 'white',
                         padding: '20px 45px',
                         fontSize: '1.4rem',
                         textDecoration: 'none',
                         borderRadius: '15px',
                         fontWeight: '700',
                         fontFamily: 'Crimson Text, serif',
                         display: 'inline-block',
                         transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                         boxShadow: '0 15px 35px rgba(102, 126, 234, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                         border: 'none',
                         position: 'relative',
                         overflow: 'hidden',
                         textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                       }}
                       onMouseEnter={(e) => {
                         const link = e.target as HTMLElement;
                         link.style.transform = 'translateY(-8px) scale(1.05)';
                         link.style.backgroundPosition = '100% 100%';
                         link.style.boxShadow = '0 25px 50px rgba(102, 126, 234, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
                       }}
                       onMouseLeave={(e) => {
                         const link = e.target as HTMLElement;
                         link.style.transform = 'translateY(0) scale(1)';
                         link.style.backgroundPosition = '0% 0%';
                         link.style.boxShadow = '0 15px 35px rgba(102, 126, 234, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                       }}
                       >
                      Watch Latest Vlog
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact & Footer - Vintage Paper Style */}
          <section style={{
            padding: '80px 40px',
            backgroundImage: 'url(/background.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            textAlign: 'center',
            position: 'relative'
          }}>
            {/* Paper texture overlay */}
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
            
            <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
              <h2 style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                marginBottom: '30px',
                color: '#2c1810',
                fontFamily: 'Noto Serif JP, serif',
                animation: 'fadeInUp 1s ease-out',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
              }}>Join Our Nomadic Journey</h2>
              <p style={{
                fontSize: '1.3rem',
                color: '#3e2723',
                marginBottom: '40px',
                fontFamily: 'Crimson Text, serif',
                lineHeight: '1.8',
                animation: 'fadeIn 1.5s ease-out 0.3s both',
                textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
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
                  backgroundColor: '#f5f5dc',
                  color: '#2c1810',
                  padding: '15px 30px',
                  fontSize: '1.2rem',
                  textDecoration: 'none',
                  borderRadius: '0',
                  fontWeight: '600',
                  fontFamily: 'Crimson Text, serif',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: 'none',
                  border: '2px solid #8b4513',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                }}
                onMouseEnter={(e) => {
                  const link = e.target as HTMLElement;
                  link.style.transform = 'translateY(-3px)';
                  link.style.backgroundColor = '#e8e8d0';
                }}
                onMouseLeave={(e) => {
                  const link = e.target as HTMLElement;
                  link.style.transform = 'translateY(0)';
                  link.style.backgroundColor = '#f5f5dc';
                }}
                >
                  Contact Us
                </a>
                <a href="#locations" style={{
                  backgroundColor: 'transparent',
                  color: '#2c1810',
                  padding: '15px 30px',
                  fontSize: '1.2rem',
                  textDecoration: 'none',
                  borderRadius: '0',
                  fontWeight: '600',
                  fontFamily: 'Crimson Text, serif',
                  border: '2px solid #8b4513',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: 'none',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                }}
                onMouseEnter={(e) => {
                  const link = e.target as HTMLElement;
                  link.style.transform = 'translateY(-3px)';
                  link.style.backgroundColor = '#f5f5dc';
                }}
                onMouseLeave={(e) => {
                  const link = e.target as HTMLElement;
                  link.style.transform = 'translateY(0)';
                  link.style.backgroundColor = 'transparent';
                }}
                >
                  View Locations
                </a>
              </div>
            </div>
          </section>
        </div>
    </div>
  );
}
