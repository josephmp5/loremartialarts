"use client";
import { useState, useEffect } from 'react';

export default function Home() {
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
      fontFamily: 'Chakra Petch, Crimson Text, serif',
      overflowX: 'hidden',
      position: 'relative'
    }}>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes logoFadeIn {
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
          
          @keyframes softPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.08); }
          }
          
          @keyframes mapReveal {
            0% { opacity: 0; transform: scale(0.8) rotate(-2deg); }
            100% { opacity: 1; transform: scale(1) rotate(0deg); }
          }

          @keyframes menuFadeIn {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `
      }} />

      {/* Main Content - NO MARGINS/PADDING CAUSING WHITE SPACE */}
      <div style={{
        animation: 'fadeIn 1s ease-in-out both',
        width: '100%',
        margin: 0,
        padding: 0
      }}>
        {/* Hero Section - EXACTLY LIKE THE IMAGE */}
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
            {/* Navigation Tabs Positioned Around Logo */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100%',
              height: '100%',
              pointerEvents: 'none'
            }}>
              {/* Central Logo */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 10,
                pointerEvents: 'auto'
              }}>
                <img 
                  src="/loremartialarts/logo.png" 
                  alt="LORE BJJ Logo" 
                  loading="eager"
                  style={{
                    width: '300px',
                    height: 'auto',
                    display: 'block'
                  }}
                />
              </div>
              {/* Left Side Navigation */}
              <div style={{
                position: 'absolute',
                left: '15%',
                top: '50%',
                transform: 'translateY(-50%)',
                display: 'flex',
                flexDirection: 'row',
                gap: '40px',
                pointerEvents: 'auto'
              }}>
                <button
                  onClick={() => scrollToSection('about')}
                  style={{
                    backgroundColor: 'rgba(220, 38, 38, 0.1)',
                    color: '#dc2626',
                    padding: '15px 30px',
                    fontSize: 'clamp(1rem, 2.8vw, 1.2rem)',
                    border: '2px solid #dc2626',
                    borderRadius: '8px',
                    fontWeight: '700',
                    fontFamily: 'Manga, serif',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    animation: 'fadeIn 1s ease-out 0.5s both',
                    backdropFilter: 'blur(10px)'
                  }}
                  onMouseEnter={(e) => {
                    const btn = e.target as HTMLElement;
                    btn.style.transform = 'scale(1.05)';
                    btn.style.backgroundColor = '#dc2626';
                    btn.style.color = 'white';
                    btn.style.borderColor = '#dc2626';
                  }}
                  onMouseLeave={(e) => {
                    const btn = e.target as HTMLElement;
                    btn.style.transform = 'scale(1)';
                    btn.style.backgroundColor = 'rgba(220, 38, 38, 0.1)';
                    btn.style.color = '#dc2626';
                    btn.style.borderColor = '#dc2626';
                  }}
                >
                  OUR STORY
                </button>
                <button
                  onClick={() => scrollToSection('gallery')}
                  style={{
                    backgroundColor: 'transparent',
                    color: '#dc2626',
                    padding: '12px 24px',
                    fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
                    border: 'none',
                    fontWeight: '700',
                    fontFamily: 'Manga, serif',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    animation: 'fadeIn 1s ease-out 0.7s both'
                  }}
                  onMouseEnter={(e) => {
                    const btn = e.target as HTMLElement;
                    btn.style.transform = 'scale(1.05)';
                    btn.style.backgroundColor = '#dc2626';
                    btn.style.color = 'white';
                    btn.style.borderColor = '#dc2626';
                  }}
                  onMouseLeave={(e) => {
                    const btn = e.target as HTMLElement;
                    btn.style.transform = 'scale(1)';
                    btn.style.backgroundColor = 'rgba(220, 38, 38, 0.1)';
                    btn.style.color = '#dc2626';
                    btn.style.borderColor = '#dc2626';
                  }}
                >
                  GALLERY
                </button>
              </div>

              {/* Right Side Navigation */}
              <div style={{
                position: 'absolute',
                right: '15%',
                top: '50%',
                transform: 'translateY(-50%)',
                display: 'flex',
                flexDirection: 'row',
                gap: '40px',
                pointerEvents: 'auto'
              }}>
                <button
                  onClick={() => scrollToSection('locations')}
                  style={{
                    backgroundColor: 'transparent',
                    color: '#dc2626',
                    padding: '12px 24px',
                    fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
                    border: 'none',
                    fontWeight: '700',
                    fontFamily: 'Manga, serif',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    animation: 'fadeIn 1s ease-out 0.9s both'
                  }}
                  onMouseEnter={(e) => {
                    const btn = e.target as HTMLElement;
                    btn.style.transform = 'scale(1.05)';
                    btn.style.backgroundColor = '#dc2626';
                    btn.style.color = 'white';
                    btn.style.borderColor = '#dc2626';
                  }}
                  onMouseLeave={(e) => {
                    const btn = e.target as HTMLElement;
                    btn.style.transform = 'scale(1)';
                    btn.style.backgroundColor = 'rgba(220, 38, 38, 0.1)';
                    btn.style.color = '#dc2626';
                    btn.style.borderColor = '#dc2626';
                  }}
                >
                  LOCATIONS
                </button>
                <button
                  onClick={() => scrollToSection('youtube')}
                  style={{
                    backgroundColor: 'transparent',
                    color: '#dc2626',
                    padding: '12px 24px',
                    fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
                    border: 'none',
                    fontWeight: '700',
                    fontFamily: 'Manga, serif',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    animation: 'fadeIn 1s ease-out 1.1s both'
                  }}
                  onMouseEnter={(e) => {
                    const btn = e.target as HTMLElement;
                    btn.style.transform = 'scale(1.05)';
                    btn.style.backgroundColor = '#dc2626';
                    btn.style.color = 'white';
                    btn.style.borderColor = '#dc2626';
                  }}
                  onMouseLeave={(e) => {
                    const btn = e.target as HTMLElement;
                    btn.style.transform = 'scale(1)';
                    btn.style.backgroundColor = 'rgba(220, 38, 38, 0.1)';
                    btn.style.color = '#dc2626';
                    btn.style.borderColor = '#dc2626';
                  }}
                >
                  CAMPS
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* About Our Team Section */}
        <section id="about" style={{
          padding: 'clamp(100px, 15vw, 180px) clamp(20px, 5vw, 40px)',
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
                  fontWeight: '700',
                  marginBottom: '40px',
                color: '#f5f5dc',
                  fontFamily: 'Manga, serif',
                textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                  animation: 'slideInDown 1.5s ease-out',
                letterSpacing: 'clamp(1px, 0.3vw, 2px)'
                }}>About Our Team</h2>
                <p style={{
                fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
                color: '#e8e8d0',
                  maxWidth: '900px',
                  margin: '0 auto',
                  fontFamily: 'Manga, serif',
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
              {/* Philosophy Section */}
                <div style={{
                padding: 'clamp(30px, 6vw, 50px)',
                background: 'transparent',
                  animation: 'scaleIn 1.2s ease-out 0.2s both',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative'
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
                    fontWeight: '700',
                    marginBottom: '25px',
                    color: 'white',
                    fontFamily: 'Manga, serif',
                    textAlign: 'center',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                    letterSpacing: '1px'
                  }}>Our Philosophy</h3>
                  <p style={{
                  fontSize: 'clamp(1rem, 3vw, 1.2rem)',
                    color: 'rgba(255, 255, 255, 0.9)',
                    lineHeight: '1.9',
                    fontFamily: 'Manga, serif',
                    textAlign: 'center',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                  }}>
                  We believe in the freedom of outdoor BJJ training in Antalya. No walls, no restrictions, just pure BJJ in nature's embrace.
                  Our nomadic lifestyle connects us with the ancient warrior traditions while exploring Antalya's beautiful landscapes.
                  </p>
                </div>

              {/* Training Style Section */}
                <div style={{
                padding: 'clamp(30px, 6vw, 50px)',
                background: 'transparent',
                  animation: 'scaleIn 1.2s ease-out 0.4s both',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative'
                }}
                >

                  <h3 style={{
                  fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
                    fontWeight: '700',
                    marginBottom: '25px',
                    color: 'white',
                    fontFamily: 'Manga, serif',
                    textAlign: 'center',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                    letterSpacing: '1px'
                  }}>Antalya BJJ Training</h3>
                  <p style={{
                  fontSize: 'clamp(1rem, 3vw, 1.2rem)',
                    color: 'rgba(255, 255, 255, 0.9)',
                    lineHeight: '1.9',
                    fontFamily: 'Manga, serif',
                    textAlign: 'center',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                  }}>
                  Our BJJ training in Antalya adapts to nature's conditions. From soft grass to sandy beaches,
                  we learn to flow with any surface, making us more versatile and adaptable fighters in Antalya's diverse outdoor environments.
                  </p>
                </div>

              {/* Community Section */}
                <div style={{
                padding: 'clamp(30px, 6vw, 50px)',
                background: 'transparent',
                  animation: 'fadeIn 1.2s ease-out 0.6s both',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative'
                }}
                >

                  <h3 style={{
                  fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
                    fontWeight: '700',
                    marginBottom: '25px',
                    color: 'white',
                    fontFamily: 'Manga, serif',
                    textAlign: 'center',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                    letterSpacing: '1px'
                  }}>Antalya BJJ Community</h3>
                  <p style={{
                  fontSize: 'clamp(1rem, 3vw, 1.2rem)',
                    color: 'rgba(255, 255, 255, 0.9)',
                    lineHeight: '1.9',
                    fontFamily: 'Manga, serif',
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

        {/* YouTube Section - Now comes after About Us */}
        <section id="youtube" style={{
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
                fontWeight: '700',
                marginBottom: '40px',
                color: '#f5f5dc',
                fontFamily: 'Manga, serif',
                textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                animation: 'slideInDown 1.5s ease-out',
                letterSpacing: 'clamp(1px, 0.3vw, 2px)'
              }}>Follow Our Journey</h2>
              <p style={{
                fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
                color: '#e8e8d0',
                maxWidth: '900px',
                margin: '0 auto',
                fontFamily: 'Manga, serif',
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
              background: 'transparent',
              padding: 'clamp(40px, 8vw, 60px)',
              animation: 'fadeIn 1.2s ease-out 0.2s both',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              width: '100%',
              maxWidth: '800px'
            }}
              >
                <div style={{
                  textAlign: 'center',
                  marginBottom: '40px'
                }}>
                  <h3 style={{
                    fontSize: 'clamp(2rem, 6vw, 2.5rem)',
                    fontWeight: '700',
                    color: 'white',
                    fontFamily: 'Manga, serif',
                    marginBottom: '15px',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                    letterSpacing: '1px'
                  }}>YouTube Channel</h3>
                  <p style={{
                    fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontFamily: 'Manga, serif',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                    letterSpacing: '1px',
                    marginBottom: '20px'
                  }}>Latest Vlog</p>
                  <p style={{
                    fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontFamily: 'Manga, serif',
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
                    overflow: 'hidden',
                    marginBottom: '40px',
                    animation: 'fadeIn 1.5s ease-out 0.5s both'
                  }}>
                  <img 
                    src="https://img.youtube.com/vi/PoCnx58dYZk/maxresdefault.jpg" 
                    alt="YouTube Video Thumbnail" 
                    loading="lazy"
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
                       backgroundColor: 'rgba(139, 69, 19, 0.9)',
                       color: 'white',
                       padding: 'clamp(15px, 4vw, 20px) clamp(30px, 6vw, 45px)',
                       fontSize: 'clamp(1.2rem, 3vw, 1.4rem)',
                       textDecoration: 'none',
                       fontWeight: '700',
                       fontFamily: 'Manga, serif',
                       display: 'inline-block',
                       transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                       textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                     }}
                     onMouseEnter={(e) => {
                       const link = e.target as HTMLElement;
                       link.style.transform = 'scale(1.05)';
                       link.style.backgroundColor = 'rgba(139, 69, 19, 1)';
                     }}
                     onMouseLeave={(e) => {
                       const link = e.target as HTMLElement;
                       link.style.transform = 'scale(1)';
                       link.style.backgroundColor = 'rgba(139, 69, 19, 0.9)';
                     }}
                     >
                    Watch Latest Vlog
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Training Images Gallery Section */}
        <section id="gallery" style={{
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
                fontWeight: '700',
                marginBottom: '40px',
                color: '#f5f5dc',
                fontFamily: 'Manga, serif',
                textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                animation: 'slideInDown 1.5s ease-out',
                letterSpacing: 'clamp(1px, 0.3vw, 2px)'
              }}>Training Moments</h2>
              <p style={{
                fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
                color: '#e8e8d0',
                maxWidth: '900px',
                margin: '0 auto',
                fontFamily: 'Manga, serif',
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
                  overflow: 'hidden',
                  animation: `fadeIn 1.2s ease-out ${0.2 + index * 0.2}s both`,
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  background: 'transparent',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget as HTMLElement;
                  card.style.transform = 'scale(1)';
                }}
                >
                  <img 
                    src={image.src}
                    alt="LORE BJJ Training Session" 
                    loading="lazy"
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
                      fontWeight: '700',
                      marginBottom: '10px',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                      fontFamily: 'Manga, serif'
                    }}>{image.title}</h3>
                    <p style={{
                      fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                      opacity: 0.9,
                      textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                      fontFamily: 'Manga, serif'
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
                   backgroundColor: 'rgba(139, 69, 19, 0.9)',
                   color: '#f5f5dc',
                   padding: 'clamp(15px, 4vw, 20px) clamp(30px, 8vw, 50px)',
                   fontSize: 'clamp(1.2rem, 3vw, 1.4rem)',
                   textDecoration: 'none',
                   fontWeight: '700',
                   fontFamily: 'Manga, serif',
                   display: 'inline-block',
                   transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                   textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                 }}
                 onMouseEnter={(e) => {
                   const link = e.target as HTMLElement;
                   link.style.transform = 'translateY(-3px) scale(1.05)';
                   link.style.backgroundColor = 'rgba(139, 69, 19, 1)';
                 }}
                 onMouseLeave={(e) => {
                   const link = e.target as HTMLElement;
                   link.style.transform = 'translateY(0) scale(1)';
                   link.style.backgroundColor = 'rgba(139, 69, 19, 0.9)';
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
                  fontWeight: '700',
                  marginBottom: '40px',
                color: '#f5f5dc',
                  fontFamily: 'Manga, serif',
                textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                  animation: 'slideInDown 1.5s ease-out',
                letterSpacing: 'clamp(1px, 0.3vw, 2px)'
                }}>Training Locations</h2>
                <p style={{
                fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
                color: '#e8e8d0',
                  maxWidth: '900px',
                  margin: '0 auto',
                  fontFamily: 'Manga, serif',
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
                  background: 'transparent',
                  padding: 'clamp(30px, 6vw, 50px)',
                    animation: `fadeIn 1.2s ease-out ${0.2 + index * 0.2}s both`,
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    const card = e.currentTarget as HTMLElement;
                    card.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    const card = e.currentTarget as HTMLElement;
                    card.style.transform = 'scale(1)';
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
                          fontWeight: '700',
                          color: '#2c1810',
                          fontFamily: 'Manga, serif',
                          marginBottom: '10px',
                          textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                          letterSpacing: '1px'
                        }}>{location.name}</h3>
                        <p style={{
                        fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
                          color: '#5d4037',
                          fontFamily: 'Manga, serif',
                          textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                        }}>{location.address}</p>
                      </div>
                    </div>
                    
                    <div style={{
                      marginBottom: '30px'
                    }}>
                      <h4 style={{
                      fontSize: 'clamp(1.3rem, 4vw, 1.5rem)',
                        fontWeight: '700',
                        color: '#2c1810',
                        marginBottom: '15px',
                        fontFamily: 'Manga, serif',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                      }}>Training Schedule</h4>
                      <p style={{
                      fontSize: 'clamp(1rem, 3vw, 1.2rem)',
                        color: '#3e2723',
                        fontFamily: 'Manga, serif',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                      }}>{location.time}</p>
                    </div>

                    <div style={{
                      marginBottom: '30px'
                    }}>
                      <h4 style={{
                      fontSize: 'clamp(1.3rem, 4vw, 1.5rem)',
                        fontWeight: '700',
                        color: '#2c1810',
                        marginBottom: '15px',
                        fontFamily: 'Manga, serif',
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
                          fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                            fontFamily: 'Manga, serif',
                            textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                          }}>
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div style={{
                      overflow: 'hidden',
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
                fontWeight: '700',
                marginBottom: '30px',
              color: '#f5f5dc',
                fontFamily: 'Manga, serif',
                animation: 'fadeInUp 1s ease-out',
              textShadow: '2px 2px 4px rgba(0,0,0,0.7)'
              }}>Join Our Nomadic Journey</h2>
              <p style={{
              fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
              color: '#e8e8d0',
                marginBottom: '40px',
                fontFamily: 'Chakra Petch, Crimson Text, serif',
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
                  fontWeight: '600',
                  fontFamily: 'Manga, serif',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                }}
                onMouseEnter={(e) => {
                  const link = e.target as HTMLElement;
                link.style.transform = 'translateY(-3px) scale(1.05)';
                link.style.backgroundColor = 'rgba(245, 245, 220, 1)';
                }}
                onMouseLeave={(e) => {
                  const link = e.target as HTMLElement;
                link.style.transform = 'translateY(0) scale(1)';
                link.style.backgroundColor = 'rgba(245, 245, 220, 0.9)';
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
                  fontWeight: '600',
                  fontFamily: 'Manga, serif',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                }}
                onMouseEnter={(e) => {
                  const link = e.target as HTMLElement;
                link.style.transform = 'translateY(-3px) scale(1.05)';
                link.style.backgroundColor = 'rgba(26, 26, 46, 1)';
                }}
                onMouseLeave={(e) => {
                  const link = e.target as HTMLElement;
                link.style.transform = 'translateY(0) scale(1)';
                link.style.backgroundColor = 'rgba(26, 26, 46, 0.8)';
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