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
    <div className="page-container" style={{
      width: '100%',
      minHeight: '100vh',
      margin: 0,
      padding: 0,
      background: 'transparent',
      color: 'white',
      fontFamily: 'Crimson Text, serif',
      overflowX: 'hidden',
      position: 'relative'
    }}>
      <style dangerouslySetInnerHTML={{
        __html: `
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
          
          @keyframes softPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.08); }
          }
          
          @keyframes mapReveal {
            0% { opacity: 0; transform: scale(0.8) rotate(-2deg); }
            100% { opacity: 1; transform: scale(1) rotate(0deg); }
          }
        `
      }} />

      {/* Intro Screen - FULL COVERAGE */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(26, 26, 46, 0.7)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        animation: 'introFadeOut 1s ease-in-out 4s forwards',
        pointerEvents: 'none'
      }}>
          <div style={{
            textAlign: 'center',
            animation: 'introFadeIn 2.5s ease-out',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
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
          {/* Decorative corners */}
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
            src="/loremartialarts/logo2.jpg" 
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

      {/* Main Content - NO MARGINS/PADDING CAUSING WHITE SPACE */}
      <div style={{
        animation: 'fadeIn 1s ease-in-out 5s both',
        width: '100%',
        margin: 0,
        padding: 0
      }}>
        {/* Hero Section - FULL VIEWPORT */}
          <section style={{
            minHeight: '100vh',
          width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          padding: '0 clamp(20px, 5vw, 40px)',
          position: 'relative',
          margin: 0,
          background: 'transparent'
        }}>
            <div style={{
              textAlign: 'center',
              maxWidth: '1200px',
              animation: 'fadeInUp 1.2s ease-out',
              position: 'relative',
            zIndex: 2,
            width: '100%'
            }}>
              <h1 style={{
              fontSize: 'clamp(3rem, 12vw, 6rem)',
                fontWeight: 'bold',
                marginBottom: '35px',
              color: '#f5f5dc',
              textShadow: '2px 2px 4px rgba(0,0,0,0.7), 0 0 20px rgba(255,215,0,0.3)',
                fontFamily: 'Noto Serif JP, serif',
                animation: 'slideInDown 1.5s ease-out',
              letterSpacing: 'clamp(1px, 0.5vw, 3px)'
              }}>LORE BJJ</h1>
              <p style={{
              fontSize: 'clamp(1.5rem, 6vw, 2.5rem)',
              color: '#fcd34d',
                marginBottom: '50px',
                fontFamily: 'Crimson Text, serif',
                animation: 'slideInUp 1.5s ease-out 0.3s both',
              textShadow: '1px 1px 2px rgba(0,0,0,0.6)',
                letterSpacing: '1px'
              }}>Outdoor Nomad Free Team</p>
              <p style={{
              fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
              color: '#e8e8d0',
                maxWidth: '900px',
                margin: '0 auto 60px',
                lineHeight: '1.9',
                fontFamily: 'Crimson Text, serif',
                animation: 'fadeIn 2s ease-out 0.6s both',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              padding: '0 20px'
              }}>
              Experience the freedom of outdoor BJJ training. Join our nomadic team as we train in nature's gym - 
                from park sessions to beach workouts, embracing the warrior spirit in the open air.
              </p>
              <div style={{
                display: 'flex',
              gap: 'clamp(15px, 4vw, 30px)',
                justifyContent: 'center',
                flexWrap: 'wrap',
                animation: 'fadeIn 2.2s ease-out 0.9s both'
              }}>
                <a href="#about" style={{
                backgroundColor: 'rgba(245, 245, 220, 0.9)',
                  color: '#2c1810',
                padding: 'clamp(15px, 3vw, 20px) clamp(25px, 6vw, 40px)',
                fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
                  textDecoration: 'none',
                borderRadius: '8px',
                  fontWeight: '700',
                  fontFamily: 'Crimson Text, serif',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  border: '2px solid #8b4513',
                  position: 'relative',
                  overflow: 'hidden',
                boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  const link = e.target as HTMLElement;
                link.style.transform = 'translateY(-3px) scale(1.05)';
                link.style.backgroundColor = 'rgba(245, 245, 220, 1)';
                link.style.boxShadow = '0 8px 25px rgba(0,0,0,0.4)';
                }}
                onMouseLeave={(e) => {
                  const link = e.target as HTMLElement;
                link.style.transform = 'translateY(0) scale(1)';
                link.style.backgroundColor = 'rgba(245, 245, 220, 0.9)';
                link.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
                }}
                >
                  Discover Our Team
                </a>
                <a href="#locations" style={{
                backgroundColor: 'rgba(26, 26, 46, 0.8)',
                color: '#f5f5dc',
                padding: 'clamp(15px, 3vw, 20px) clamp(25px, 6vw, 40px)',
                fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
                  textDecoration: 'none',
                borderRadius: '8px',
                  fontWeight: '700',
                  fontFamily: 'Crimson Text, serif',
                  border: '2px solid #8b4513',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  const link = e.target as HTMLElement;
                link.style.transform = 'translateY(-3px) scale(1.05)';
                link.style.backgroundColor = 'rgba(26, 26, 46, 1)';
                link.style.boxShadow = '0 8px 25px rgba(0,0,0,0.4)';
                }}
                onMouseLeave={(e) => {
                  const link = e.target as HTMLElement;
                link.style.transform = 'translateY(0) scale(1)';
                link.style.backgroundColor = 'rgba(26, 26, 46, 0.8)';
                link.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
                }}
                >
                  Training Locations
                </a>
              </div>
            </div>
          </section>

        {/* About Our Team Section */}
          <section id="about" style={{
          padding: 'clamp(60px, 12vw, 140px) clamp(20px, 5vw, 40px)',
          position: 'relative',
          width: '100%',
          margin: 0,
          background: 'rgba(26, 26, 46, 0.3)',
          backdropFilter: 'blur(5px)'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
              <div style={{
                textAlign: 'center',
                marginBottom: '100px',
                animation: 'fadeInUp 1.2s ease-out'
              }}>
                <h2 style={{
                fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                  fontWeight: 'bold',
                  marginBottom: '40px',
                color: '#f5f5dc',
                  fontFamily: 'Noto Serif JP, serif',
                textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                  animation: 'slideInDown 1.5s ease-out',
                letterSpacing: 'clamp(1px, 0.3vw, 2px)'
                }}>About Our Team</h2>
                <p style={{
                fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
                color: '#e8e8d0',
                  maxWidth: '900px',
                  margin: '0 auto',
                  fontFamily: 'Crimson Text, serif',
                  lineHeight: '1.9',
                  animation: 'slideInUp 1.5s ease-out 0.3s both',
                textShadow: '1px 1px 2px rgba(0,0,0,0.6)',
                letterSpacing: '1px',
                padding: '0 20px'
                }}>
                We are not a traditional gym. We are Antalya's premier nomadic BJJ family that trains in nature's embrace.
                </p>
              </div>

              <div style={{
                display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'clamp(30px, 6vw, 60px)',
                marginTop: '80px'
              }}>
              {/* Philosophy Card */}
                <div style={{
                padding: 'clamp(30px, 6vw, 50px)',
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%)',
                  borderRadius: '25px',
                  animation: 'scaleIn 1.2s ease-out 0.2s both',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                  position: 'relative',
                overflow: 'hidden',
                backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'translateY(-10px) scale(1.03)';
                card.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.4)';
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
                }}
                >
                  <div style={{
                  fontSize: 'clamp(3rem, 8vw, 5rem)',
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
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                    letterSpacing: '1px'
                  }}>Our Philosophy</h3>
                  <p style={{
                  fontSize: 'clamp(1rem, 3vw, 1.2rem)',
                    color: 'rgba(255, 255, 255, 0.9)',
                    lineHeight: '1.9',
                    fontFamily: 'Crimson Text, serif',
                    textAlign: 'center',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                  }}>
                  We believe in the freedom of outdoor BJJ training in Antalya. No walls, no restrictions, just pure BJJ in nature's embrace.
                  Our nomadic lifestyle connects us with the ancient warrior traditions while exploring Antalya's beautiful landscapes.
                  </p>
                </div>

              {/* Training Style Card */}
                <div style={{
                padding: 'clamp(30px, 6vw, 50px)',
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%)',
                  borderRadius: '25px',
                  animation: 'scaleIn 1.2s ease-out 0.4s both',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                  position: 'relative',
                overflow: 'hidden',
                backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'translateY(-10px) scale(1.03)';
                card.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.4)';
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
                }}
                >
                  <div style={{
                  fontSize: 'clamp(3rem, 8vw, 5rem)',
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
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                    letterSpacing: '1px'
                  }}>Antalya BJJ Training</h3>
                  <p style={{
                  fontSize: 'clamp(1rem, 3vw, 1.2rem)',
                    color: 'rgba(255, 255, 255, 0.9)',
                    lineHeight: '1.9',
                    fontFamily: 'Crimson Text, serif',
                    textAlign: 'center',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                  }}>
                  Our BJJ training in Antalya adapts to nature's conditions. From soft grass to sandy beaches,
                  we learn to flow with any surface, making us more versatile and adaptable fighters in Antalya's diverse outdoor environments.
                  </p>
                </div>

              {/* Community Card */}
                <div style={{
                padding: 'clamp(30px, 6vw, 50px)',
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%)',
                  borderRadius: '25px',
                  animation: 'scaleIn 1.2s ease-out 0.6s both',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                  position: 'relative',
                overflow: 'hidden',
                backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'translateY(-10px) scale(1.03)';
                card.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.4)';
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
                }}
                >
                  <div style={{
                  fontSize: 'clamp(3rem, 8vw, 5rem)',
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
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                    letterSpacing: '1px'
                  }}>Antalya BJJ Community</h3>
                  <p style={{
                  fontSize: 'clamp(1rem, 3vw, 1.2rem)',
                    color: 'rgba(255, 255, 255, 0.9)',
                    lineHeight: '1.9',
                    fontFamily: 'Crimson Text, serif',
                    textAlign: 'center',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                  }}>
                    We welcome all levels to our Antalya BJJ community, from beginners to advanced practitioners. 
                  Our team supports each other's growth in a free, outdoor environment across Antalya's beautiful training locations.
                  </p>
                </div>
              </div>
            </div>
          </section>

        {/* Training Images Gallery Section */}
          <section style={{
          padding: 'clamp(60px, 12vw, 140px) clamp(20px, 5vw, 40px)',
          position: 'relative',
          width: '100%',
          margin: 0,
          background: 'rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(5px)'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
              <div style={{
                textAlign: 'center',
                marginBottom: '100px',
                animation: 'fadeInUp 1.2s ease-out'
              }}>
                <h2 style={{
                fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                  fontWeight: 'bold',
                  marginBottom: '40px',
                color: '#f5f5dc',
                  fontFamily: 'Noto Serif JP, serif',
                textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                  animation: 'slideInDown 1.5s ease-out',
                letterSpacing: 'clamp(1px, 0.3vw, 2px)'
                }}>Training Moments</h2>
                <p style={{
                fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
                color: '#e8e8d0',
                  maxWidth: '900px',
                  margin: '0 auto',
                  fontFamily: 'Crimson Text, serif',
                  lineHeight: '1.9',
                  animation: 'slideInUp 1.5s ease-out 0.3s both',
                textShadow: '1px 1px 2px rgba(0,0,0,0.6)',
                letterSpacing: '1px',
                padding: '0 20px'
                }}>
                  Capturing the spirit of outdoor BJJ training in Antalya
                </p>
              </div>

              <div style={{
                display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: 'clamp(30px, 6vw, 60px)',
                marginTop: '80px'
              }}>
              {[
                { src: '/loremartialarts/insta1.png', title: 'Outdoor Training', desc: 'BJJ techniques in nature\'s embrace' },
                { src: '/loremartialarts/insta10.jpg', title: 'Team Training', desc: 'Building strength together in Antalya' },
                { src: '/loremartialarts/lore1.png', title: 'Beach Training', desc: 'Training by the Mediterranean Sea' },
                { src: '/loremartialarts/lore2.png', title: 'Technique Focus', desc: 'Perfecting BJJ techniques outdoors' },
                { src: '/loremartialarts/lore3.png', title: 'Park Sessions', desc: 'Training in Antalya\'s beautiful parks' },
                { src: '/loremartialarts/lore4.png', title: 'Community Spirit', desc: 'Building bonds through BJJ' }
              ].map((image, index) => (
                <div key={index} style={{
                  borderRadius: '25px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                  animation: `scaleIn 1.2s ease-out ${0.2 + index * 0.2}s both`,
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%)',
                  position: 'relative',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'translateY(-10px) scale(1.03)';
                  card.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.5)';
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'translateY(0) scale(1)';
                  card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)';
                }}
                >
                  <img 
                    src={image.src}
                    alt="LORE BJJ Training Session" 
                    style={{
                      width: '100%',
                      height: '280px',
                      objectFit: 'cover',
                      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.style.display = 'none';
                      const parent = img.parentElement;
                      if (parent) {
                        parent.style.minHeight = '200px';
                        parent.style.display = 'flex';
                        parent.style.alignItems = 'center';
                        parent.style.justifyContent = 'center';
                        parent.innerHTML = `<div style="color: white; text-align: center; padding: 20px;">
                          <h3>${image.title}</h3>
                          <p style="opacity: 0.8; margin-top: 10px;">${image.desc}</p>
                        </div>`;
                      }
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                    padding: '25px',
                    color: 'white'
                  }}>
                    <h3 style={{
                      fontSize: 'clamp(1.3rem, 4vw, 1.5rem)',
                      fontWeight: 'bold',
                      marginBottom: '10px',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.7)'
                    }}>{image.title}</h3>
                    <p style={{
                      fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                      opacity: 0.9,
                      textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                    }}>{image.desc}</p>
                  </div>
                </div>
              ))}
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
                   background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.9) 0%, rgba(160, 82, 45, 0.9) 50%, rgba(139, 69, 19, 0.9) 100%)',
                     backgroundSize: '200% 200%',
                     color: '#f5f5dc',
                   padding: 'clamp(15px, 4vw, 20px) clamp(30px, 8vw, 50px)',
                   fontSize: 'clamp(1.2rem, 3vw, 1.4rem)',
                     textDecoration: 'none',
                     borderRadius: '15px',
                     fontWeight: '700',
                     fontFamily: 'Crimson Text, serif',
                     display: 'inline-block',
                     transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                   boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4)',
                   border: '3px solid rgba(139, 69, 19, 0.8)',
                     position: 'relative',
                     overflow: 'hidden',
                   textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                   backdropFilter: 'blur(10px)'
                   }}
                   onMouseEnter={(e) => {
                     const link = e.target as HTMLElement;
                     link.style.transform = 'translateY(-8px) scale(1.05)';
                     link.style.backgroundPosition = '100% 100%';
                   link.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.5)';
                   }}
                   onMouseLeave={(e) => {
                     const link = e.target as HTMLElement;
                     link.style.transform = 'translateY(0) scale(1)';
                     link.style.backgroundPosition = '0% 0%';
                   link.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.4)';
                   }}
                   >
                  Follow Us on Instagram
                </a>
              </div>
            </div>
          </section>

        {/* Training Locations Section */}
          <section id="locations" style={{
          padding: 'clamp(60px, 12vw, 140px) clamp(20px, 5vw, 40px)',
          position: 'relative',
          width: '100%',
          margin: 0,
          background: 'rgba(26, 26, 46, 0.3)',
          backdropFilter: 'blur(5px)'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
              <div style={{
                textAlign: 'center',
                marginBottom: '100px',
                animation: 'fadeInUp 1.2s ease-out'
              }}>
                <h2 style={{
                fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                  fontWeight: 'bold',
                  marginBottom: '40px',
                color: '#f5f5dc',
                  fontFamily: 'Noto Serif JP, serif',
                textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                  animation: 'slideInDown 1.5s ease-out',
                letterSpacing: 'clamp(1px, 0.3vw, 2px)'
                }}>Training Locations</h2>
                <p style={{
                fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
                color: '#e8e8d0',
                  maxWidth: '900px',
                  margin: '0 auto',
                  fontFamily: 'Crimson Text, serif',
                  lineHeight: '1.9',
                  animation: 'slideInUp 1.5s ease-out 0.3s both',
                textShadow: '1px 1px 2px rgba(0,0,0,0.6)',
                letterSpacing: '1px',
                padding: '0 20px'
                }}>
                Discover our outdoor training spots across Antalya's beautiful landscapes
                </p>
              </div>

              <div style={{
                display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
              gap: 'clamp(40px, 8vw, 80px)',
                marginTop: '80px'
              }}>
                {locations.map((location, index) => (
                  <div key={index} style={{
                  background: 'rgba(245, 245, 220, 0.95)',
                  border: '2px solid rgba(139, 69, 19, 0.8)',
                  borderRadius: '15px',
                  padding: 'clamp(30px, 6vw, 50px)',
                    animation: `scaleIn 1.2s ease-out ${0.2 + index * 0.2}s both`,
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)',
                    position: 'relative',
                  overflow: 'hidden',
                  backdropFilter: 'blur(10px)'
                  }}
                  onMouseEnter={(e) => {
                    const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'translateY(-8px) scale(1.02)';
                  card.style.backgroundColor = 'rgba(245, 245, 220, 1)';
                  card.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'translateY(0) scale(1)';
                  card.style.backgroundColor = 'rgba(245, 245, 220, 0.95)';
                  card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
                  }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '30px',
                      gap: '20px'
                    }}>
                      <div style={{
                      fontSize: 'clamp(3rem, 8vw, 4rem)',
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
                        fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
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
                      fontSize: 'clamp(1.3rem, 4vw, 1.5rem)',
                        fontWeight: 'bold',
                        color: '#2c1810',
                        marginBottom: '15px',
                        fontFamily: 'Noto Serif JP, serif',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                      }}>Training Schedule</h4>
                      <p style={{
                      fontSize: 'clamp(1rem, 3vw, 1.2rem)',
                        color: '#3e2723',
                        fontFamily: 'Crimson Text, serif',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                      }}>{location.time}</p>
                    </div>

                    <div style={{
                      marginBottom: '30px'
                    }}>
                      <h4 style={{
                      fontSize: 'clamp(1.3rem, 4vw, 1.5rem)',
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
                          borderRadius: '8px',
                          fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                            fontFamily: 'Crimson Text, serif',
                          border: '1px solid rgba(139, 69, 19, 0.5)',
                            textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                          }}>
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div style={{
                    borderRadius: '10px',
                      overflow: 'hidden',
                    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
                      animation: 'mapReveal 1.5s ease-out 0.5s both',
                    border: '2px solid rgba(139, 69, 19, 0.5)'
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

        {/* Social Media Section */}
          <section style={{
          padding: 'clamp(60px, 12vw, 140px) clamp(20px, 5vw, 40px)',
          position: 'relative',
          width: '100%',
          margin: 0,
          background: 'rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(5px)'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
              <div style={{
                textAlign: 'center',
                marginBottom: '100px',
                animation: 'fadeInUp 1.2s ease-out'
              }}>
                <h2 style={{
                fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                  fontWeight: 'bold',
                  marginBottom: '40px',
                color: '#f5f5dc',
                  fontFamily: 'Noto Serif JP, serif',
                textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                  animation: 'slideInDown 1.5s ease-out',
                letterSpacing: 'clamp(1px, 0.3vw, 2px)'
                }}>Follow Our Journey</h2>
                <p style={{
                fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
                color: '#e8e8d0',
                  maxWidth: '900px',
                  margin: '0 auto',
                  fontFamily: 'Crimson Text, serif',
                  lineHeight: '1.9',
                  animation: 'slideInUp 1.5s ease-out 0.3s both',
                textShadow: '1px 1px 2px rgba(0,0,0,0.6)',
                letterSpacing: '1px',
                padding: '0 20px'
                }}>
                  Stay connected with our outdoor BJJ adventures
                </p>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '80px'
              }}>
              {/* YouTube Section */}
                <div style={{
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%)',
                  borderRadius: '25px',
                padding: 'clamp(40px, 8vw, 60px)',
                  animation: 'scaleIn 1.2s ease-out 0.2s both',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)',
                  position: 'relative',
                  overflow: 'hidden',
                  width: '100%',
                maxWidth: '800px',
                backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'translateY(-15px) scale(1.03)';
                card.style.boxShadow = '0 35px 70px rgba(0, 0, 0, 0.5)';
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.4)';
                }}
                >
                  <div style={{
                    textAlign: 'center',
                    marginBottom: '40px'
                  }}>
                    <h3 style={{
                    fontSize: 'clamp(2rem, 6vw, 2.5rem)',
                      fontWeight: 'bold',
                      color: 'white',
                      fontFamily: 'Noto Serif JP, serif',
                      marginBottom: '15px',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                      letterSpacing: '1px'
                    }}>YouTube Channel</h3>
                    <p style={{
                    fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
                      color: 'rgba(255, 255, 255, 0.9)',
                      fontFamily: 'Crimson Text, serif',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                      letterSpacing: '1px',
                      marginBottom: '20px'
                    }}>Latest Vlog</p>
                    <p style={{
                    fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontFamily: 'Crimson Text, serif',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                      maxWidth: '600px',
                      margin: '0 auto',
                      lineHeight: '1.6'
                    }}>
                    Join us on our latest outdoor BJJ adventure! Watch as we train in Antalya's beautiful landscapes, 
                      share techniques, and build our nomadic community. Experience the freedom of outdoor martial arts.
                    </p>
                  </div>

                  <div style={{
                    position: 'relative',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    marginBottom: '40px',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
                    animation: 'mapReveal 1.5s ease-out 0.5s both',
                    border: '3px solid rgba(255, 255, 255, 0.2)'
                  }}>
                    <img 
                      src="https://img.youtube.com/vi/PoCnx58dYZk/maxresdefault.jpg" 
                      alt="YouTube Video Thumbnail" 
                      style={{
                        width: '100%',
                      height: 'clamp(250px, 50vw, 350px)',
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
                       background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%)',
                         backgroundSize: '200% 200%',
                         color: 'white',
                       padding: 'clamp(15px, 4vw, 20px) clamp(30px, 6vw, 45px)',
                       fontSize: 'clamp(1.2rem, 3vw, 1.4rem)',
                         textDecoration: 'none',
                         borderRadius: '15px',
                         fontWeight: '700',
                         fontFamily: 'Crimson Text, serif',
                         display: 'inline-block',
                         transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                       boxShadow: '0 15px 35px rgba(0, 0, 0, 0.4)',
                       border: '2px solid rgba(255, 255, 255, 0.3)',
                         position: 'relative',
                         overflow: 'hidden',
                       textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                       }}
                       onMouseEnter={(e) => {
                         const link = e.target as HTMLElement;
                         link.style.transform = 'translateY(-8px) scale(1.05)';
                         link.style.backgroundPosition = '100% 100%';
                       link.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.5)';
                       }}
                       onMouseLeave={(e) => {
                         const link = e.target as HTMLElement;
                         link.style.transform = 'translateY(0) scale(1)';
                         link.style.backgroundPosition = '0% 0%';
                       link.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.4)';
                       }}
                       >
                      Watch Latest Vlog
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

        {/* Contact & Footer */}
          <section style={{
          padding: 'clamp(60px, 10vw, 80px) clamp(20px, 5vw, 40px)',
            textAlign: 'center',
          position: 'relative',
          width: '100%',
          margin: 0,
          background: 'rgba(26, 26, 46, 0.4)',
          backdropFilter: 'blur(5px)'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
              <h2 style={{
              fontSize: 'clamp(2rem, 6vw, 3rem)',
                fontWeight: 'bold',
                marginBottom: '30px',
              color: '#f5f5dc',
                fontFamily: 'Noto Serif JP, serif',
                animation: 'fadeInUp 1s ease-out',
              textShadow: '2px 2px 4px rgba(0,0,0,0.7)'
              }}>Join Our Nomadic Journey</h2>
              <p style={{
              fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
              color: '#e8e8d0',
                marginBottom: '40px',
                fontFamily: 'Crimson Text, serif',
                lineHeight: '1.8',
                animation: 'fadeIn 1.5s ease-out 0.3s both',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
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
                backgroundColor: 'rgba(245, 245, 220, 0.9)',
                  color: '#2c1810',
                padding: 'clamp(12px, 3vw, 15px) clamp(20px, 5vw, 30px)',
                fontSize: 'clamp(1.1rem, 3vw, 1.2rem)',
                  textDecoration: 'none',
                borderRadius: '8px',
                  fontWeight: '600',
                  fontFamily: 'Crimson Text, serif',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
                border: '2px solid rgba(139, 69, 19, 0.8)',
                textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  const link = e.target as HTMLElement;
                link.style.transform = 'translateY(-3px) scale(1.05)';
                link.style.backgroundColor = 'rgba(245, 245, 220, 1)';
                link.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.4)';
                }}
                onMouseLeave={(e) => {
                  const link = e.target as HTMLElement;
                link.style.transform = 'translateY(0) scale(1)';
                link.style.backgroundColor = 'rgba(245, 245, 220, 0.9)';
                link.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
                }}
                >
                  Contact Us
                </a>
                <a href="#locations" style={{
                backgroundColor: 'rgba(26, 26, 46, 0.8)',
                color: '#f5f5dc',
                padding: 'clamp(12px, 3vw, 15px) clamp(20px, 5vw, 30px)',
                fontSize: 'clamp(1.1rem, 3vw, 1.2rem)',
                  textDecoration: 'none',
                borderRadius: '8px',
                  fontWeight: '600',
                  fontFamily: 'Crimson Text, serif',
                border: '2px solid rgba(139, 69, 19, 0.8)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  const link = e.target as HTMLElement;
                link.style.transform = 'translateY(-3px) scale(1.05)';
                link.style.backgroundColor = 'rgba(26, 26, 46, 1)';
                link.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.4)';
                }}
                onMouseLeave={(e) => {
                  const link = e.target as HTMLElement;
                link.style.transform = 'translateY(0) scale(1)';
                link.style.backgroundColor = 'rgba(26, 26, 46, 0.8)';
                link.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
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