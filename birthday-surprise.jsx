import React, { useState, useEffect, useRef, memo } from 'react';
import { Heart, Sparkles, ArrowRight, ArrowLeft, Star } from 'lucide-react';

const IMAGES = [
  '/images/img1.jpg',
  '/images/img2.jpg',
  '/images/img3.jpg',
  '/images/img4.jpg',
  '/images/img5.jpg'
];

// ── Detect mobile once ──
const IS_MOBILE = typeof window !== 'undefined' && window.innerWidth < 768;

// ── Pre-compute random values ONCE at module load ──
// Mobile gets far fewer elements
const PARTICLE_COUNT  = IS_MOBILE ? 8  : 25;
const HEART_COUNT     = IS_MOBILE ? 6  : 15;
const STAR_COUNT      = IS_MOBILE ? 6  : 15;
const SPARKLE_COUNT   = IS_MOBILE ? 0  : 20; // skip on mobile entirely
const BURST_COUNT     = IS_MOBILE ? 40 : 80;

const PARTICLES = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top:  `${Math.random() * 100}%`,
  delay:    `${Math.random() * 5}s`,
  duration: `${4 + Math.random() * 8}s`,
  size: `${4 + Math.random() * 6}px`,
}));

const FALL_HEARTS = Array.from({ length: HEART_COUNT }, (_, i) => ({
  id: i,
  left:     `${Math.random() * 100}%`,
  delay:    `${Math.random() * 10}s`,
  duration: `${7 + Math.random() * 5}s`,
  size:     Math.random() * 14 + 8,
  color:    ['#ff6b9d','#c44569','#ff1493','#ff69b4','#ffc0cb'][Math.floor(Math.random() * 5)],
}));

const STARS_DATA = Array.from({ length: STAR_COUNT }, (_, i) => ({
  id: i,
  left:     `${Math.random() * 100}%`,
  top:      `${Math.random() * 100}%`,
  delay:    `${Math.random() * 3}s`,
  duration: `${2 + Math.random() * 3}s`,
  size:     Math.random() * 8 + 5,
}));

const SPARKLES_DATA = Array.from({ length: SPARKLE_COUNT }, (_, i) => ({
  id: i,
  left:  `${Math.random() * 100}%`,
  top:   `${Math.random() * 100}%`,
  delay: `${Math.random() * 4}s`,
}));

// ── Decorative components — outside main component, memo-wrapped ──
// will-change: transform forces GPU compositing on mobile

const FloatingParticles = memo(() => (
  <div className="floating-particles">
    {PARTICLES.map(p => (
      <div key={p.id} className="particle" style={{
        left: p.left, top: p.top,
        animationDelay: p.delay, animationDuration: p.duration,
        width: p.size, height: p.size,
        willChange: 'transform, opacity',
      }} />
    ))}
  </div>
));

const FallingHearts = memo(() => (
  <div className="falling-hearts">
    {FALL_HEARTS.map(h => (
      <Heart key={h.id} className="falling-heart" size={h.size} fill="currentColor"
        style={{
          left: h.left, animationDelay: h.delay, animationDuration: h.duration,
          color: h.color, willChange: 'transform, opacity',
        }} />
    ))}
  </div>
));

const FloatingStars = memo(() => (
  <div className="floating-stars">
    {STARS_DATA.map(s => (
      <Star key={s.id} className="floating-star" size={s.size} fill="currentColor"
        style={{
          left: s.left, top: s.top,
          animationDelay: s.delay, animationDuration: s.duration,
          willChange: 'transform, opacity',
        }} />
    ))}
  </div>
));

const MagicalSparkles = memo(() => (
  <div className="magical-sparkles">
    {SPARKLES_DATA.map(s => (
      <div key={s.id} className="sparkle"
        style={{ left: s.left, top: s.top, animationDelay: s.delay, willChange: 'transform, opacity' }} />
    ))}
  </div>
));

// ── Main component ──
const BirthdaySurprise = () => {
  const [showMusicPrompt, setShowMusicPrompt] = useState(true);
  const [currentPage, setCurrentPage]         = useState(0);
  const [typewriterText, setTypewriterText]   = useState('');
  const [heartBurst, setHeartBurst]           = useState(false);
  const [burstHearts, setBurstHearts]         = useState([]);
  const [showContent, setShowContent]         = useState(false);
  const audioRef = useRef(null);

  const messages = [
    "From the first moment I saw you, everything changed. You became the reason my heart beats a little faster, even though you might never know...",
    "Every time I see you smile, the world feels brighter. Your laugh is the most beautiful sound I've ever heard. Loving you from afar has been my sweetest secret.",
    "I know you may never feel the same way, and that's okay. Just being in the same world as you, breathing the same air, is a blessing I never knew I needed.",
    "Today marks another year of your beautiful existence. 20 years of you making this world better just by being in it. Happy Birthday, my silent wish.",
    "Maybe in another universe, we're together. But in this one, I'm grateful just to know you. You deserve every happiness the universe can offer.",
  ];

  const calculateLifetime = () => {
    const birthDate = new Date('2006-03-17T00:00:00');
    const now  = new Date();
    const diff = now - birthDate;
    const years   = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    const days    = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return { years, days, hours, minutes, seconds };
  };

  const [lifetime, setLifetime] = useState(calculateLifetime());

  useEffect(() => {
    const timer = setInterval(() => setLifetime(calculateLifetime()), 1000);
    return () => clearInterval(timer);
  }, []);

  const forcePlayMusic = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.6;
      audio.play()
        .then(() => setShowMusicPrompt(false))
        .catch(err => console.log('Need user interaction:', err));
    }
  };

  useEffect(() => {
    const timer = setTimeout(forcePlayMusic, 300);
    return () => clearTimeout(timer);
  }, []);

  // Typewriter — slightly slower on mobile to reduce re-render pressure
  const TYPEWRITER_SPEED = IS_MOBILE ? 55 : 40;
  useEffect(() => {
    if (currentPage > 0 && currentPage <= 5) {
      const message = messages[currentPage - 1];
      if (message && typewriterText.length < message.length) {
        const timeout = setTimeout(() => {
          setTypewriterText(message.slice(0, typewriterText.length + 1));
        }, TYPEWRITER_SPEED);
        return () => clearTimeout(timeout);
      }
    }
  }, [currentPage, typewriterText]);

  // Page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setTypewriterText('');
    setShowContent(false);
    const timeout = setTimeout(() => setShowContent(true), 400);
    return () => clearTimeout(timeout);
  }, [currentPage]);

  const handleHeartClick = () => {
    setHeartBurst(true);
    const hearts = Array.from({ length: BURST_COUNT }, (_, i) => ({
      id:       i,
      x:        Math.random() * 100,
      y:        Math.random() * 100,
      delay:    Math.random() * 0.8,
      duration: 1.5 + Math.random() * 2.5,
      size:     14 + Math.random() * 14,
      color:    ['#ff6b9d','#c44569','#ff1493','#ff69b4'][Math.floor(Math.random() * 4)],
    }));
    setBurstHearts(hearts);
  };

  const nextPage = () => { if (currentPage < 6) { setCurrentPage(p => p + 1); setHeartBurst(false); } };
  const prevPage = () => { if (currentPage > 0) { setCurrentPage(p => p - 1); setHeartBurst(false); } };

  // Single persistent audio — never unmounts
  const alwaysMountedAudio = (
    <audio ref={audioRef} loop preload="auto" style={{ display: 'none' }}>
      <source src="/love.mp3" type="audio/mpeg" />
    </audio>
  );

  // ── Glass card style — NO backdrop-filter on mobile (very expensive) ──
  const glassStyle = IS_MOBILE ? {
    background: 'rgba(30, 10, 40, 0.85)',
    border: '1px solid rgba(255,182,193,0.3)',
  } : {};

  // ── Music Prompt ──
  if (showMusicPrompt) {
    return (
      <div className="music-prompt-overlay" onClick={forcePlayMusic}>
        {alwaysMountedAudio}
        <FloatingParticles />
        <FallingHearts />
        <div className="music-prompt-content">
          <div className="music-icon-wrapper">
            <Heart size={IS_MOBILE ? 70 : 100} className="music-heart-icon" fill="currentColor" />
            <div className="music-pulse-ring"></div>
          </div>
          <h2 className="music-prompt-title">Tap Anywhere to Begin 💖</h2>
          <div className="tap-indicator">✨ Click to Start ✨</div>
        </div>
      </div>
    );
  }

  // ── Page 0: Landing ──
  if (currentPage === 0) {
    return (
      <div className="page-container">
        {alwaysMountedAudio}
        <FloatingParticles />
        <FallingHearts />
        <FloatingStars />
        {!IS_MOBILE && <MagicalSparkles />}
        <div className="gradient-overlay"></div>
        <div className="radial-glow"></div>
        <div className="landing-content">
          <div className="heart-icon-wrapper">
            <div className="heart-ring"></div>
            <Heart className="main-heart" fill="currentColor" />
            <div className="heart-pulse"></div>
          </div>
          <h1 className="main-title">
            For Someone<br />
            <span className="title-highlight">Truly Extraordinary</span>
          </h1>
          <div className="glass-card lifetime-card" style={glassStyle}>
            <div className="lifetime-numbers">
              <div className="number-block"><span className="number">{lifetime.years}</span><span className="label">Years</span></div>
              <div className="number-block"><span className="number">{lifetime.days}</span><span className="label">Days</span></div>
              <div className="number-block"><span className="number">{lifetime.hours}</span><span className="label">Hours</span></div>
              <div className="number-block"><span className="number">{lifetime.minutes}</span><span className="label">Min</span></div>
              <div className="number-block"><span className="number">{lifetime.seconds}</span><span className="label">Sec</span></div>
            </div>
            <p className="lifetime-subtitle">of pure magic in this world ✨</p>
          </div>
          <button onClick={nextPage} className="start-button">
            <div className="button-shine"></div>
            <span className="button-content">
              <Sparkles />
              Begin Your Journey
              <Heart fill="currentColor" />
            </span>
          </button>
          <p className="subtitle-text">"A love letter written in code and dreams..."</p>
        </div>
      </div>
    );
  }

  // ── Pages 1–5: Image + Message ──
  if (currentPage >= 1 && currentPage <= 5) {
    const imageIndex = currentPage - 1;
    return (
      <div className="page-container">
        {alwaysMountedAudio}
        <FloatingParticles />
        <FallingHearts />
        <FloatingStars />
        {!IS_MOBILE && <MagicalSparkles />}
        <div className="gradient-overlay"></div>
        <div className="radial-glow"></div>

        <div className="nav-buttons">
          {currentPage > 1 && (
            <button onClick={prevPage} className="nav-btn nav-prev glass-card" style={glassStyle}>
              <ArrowLeft size={20} /><span>Previous</span>
            </button>
          )}
          <button onClick={nextPage} className="nav-btn nav-next glass-card" style={glassStyle}>
            <span>{currentPage === 5 ? 'Grand Finale' : 'Continue'}</span>
            <ArrowRight size={20} />
            <div className="button-glow"></div>
          </button>
        </div>

        <div className={`message-content ${showContent ? 'visible' : ''}`}>
          <div className="container-center">
            <div className="image-showcase">
              <div className="image-frame">
                <div className="frame-glow"></div>
                <div className="image-wrapper">
                  <img
                    src={IMAGES[imageIndex]}
                    alt={`Memory ${imageIndex + 1}`}
                    className="showcase-image"
                    loading="eager"
                  />
                  <div className="image-overlay"></div>
                </div>
                <div className="corner-ornament corner-tl"></div>
                <div className="corner-ornament corner-tr"></div>
                <div className="corner-ornament corner-bl"></div>
                <div className="corner-ornament corner-br"></div>
              </div>
            </div>

            <div className="message-section">
              <div className="message-header">
                <Sparkles className="header-sparkle" />
                <h2 className="message-title">
                  {currentPage === 1 && "The First Sight"}
                  {currentPage === 2 && "Every Smile"}
                  {currentPage === 3 && "Unspoken Feelings"}
                  {currentPage === 4 && "Your Special Day"}
                  {currentPage === 5 && "Forever Grateful"}
                </h2>
              </div>
              <div className="glass-card message-card" style={glassStyle}>
                <div className="card-decoration"></div>
                <p className="message-text">
                  {typewriterText}
                  <span className="cursor-blink">|</span>
                </p>
                <div className="message-hearts">
                  {[...Array(5)].map((_, i) => (
                    <Heart key={i} size={16} fill="currentColor" className="message-heart"
                      style={{ animationDelay: `${i * 0.2}s` }} />
                  ))}
                </div>
              </div>
            </div>

            <div className="page-indicators">
              {[1, 2, 3, 4, 5].map(page => (
                <div key={page}
                  className={`indicator ${page === currentPage ? 'active' : ''} ${page < currentPage ? 'completed' : ''}`}>
                  {page < currentPage && <Heart size={10} fill="currentColor" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Page 6: Grand Finale ──
  return (
    <div className="page-container final-page-container">
      {alwaysMountedAudio}
      <FloatingParticles />
      <FallingHearts />
      <FloatingStars />
      {!IS_MOBILE && <MagicalSparkles />}
      <div className="gradient-overlay"></div>
      <div className="radial-glow finale-glow"></div>

      <button onClick={prevPage} className="back-button glass-card" style={glassStyle}>
        <ArrowLeft size={20} /><span>Back</span>
      </button>

      <div className="final-content-wrapper">
        <div className="final-content">
          <div className="final-header">
            <h2 className="final-title">
              Happy Birthday<br />
              <span className="final-highlight">My Beautiful Dream</span>
            </h2>
          </div>

          {/* Enlarged photo grid */}
          <div style={{ width: '100%', padding: '0 8px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: IS_MOBILE ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
              gap: '12px',
              width: '100%',
              maxWidth: '720px',
              margin: '0 auto',
            }}>
              {IMAGES.map((img, idx) => (
                <div key={idx} style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 24px rgba(255,105,180,0.35)',
                  border: '2px solid rgba(255,182,193,0.5)',
                  position: 'relative',
                  height: IS_MOBILE ? '140px' : '200px',
                }}>
                  <img
                    src={img}
                    alt={`Memory ${idx + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    loading="eager"
                  />
                  <div style={{
                    position: 'absolute', bottom: '6px', right: '8px',
                    background: 'rgba(255,105,180,0.8)', color: '#fff',
                    borderRadius: '50%', width: '22px', height: '22px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '11px', fontWeight: 'bold',
                  }}>{idx + 1}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="final-message-compact">
            <p className="final-message-text-compact">
              "Even if my love remains a secret... I'm forever grateful that our paths crossed. Happy Birthday to the one who holds my heart. 💕"
            </p>
          </div>

          {/* Heart burst */}
          <div className="heart-burst-container-compact">
            <button onClick={handleHeartClick} disabled={heartBurst} className="burst-button-compact">
              <Heart className={`burst-heart-compact ${heartBurst ? 'bursted' : ''}`} fill="currentColor" />
              {!heartBurst && <div className="heart-glow-compact"></div>}
            </button>

            {heartBurst && burstHearts.map(heart => (
              <Heart
                key={heart.id}
                size={heart.size}
                className="burst-particle"
                fill="currentColor"
                style={{
                  '--burst-x': `${(heart.x - 50) * 8}px`,
                  '--burst-y': `${(heart.y - 50) * 8}px`,
                  animationDelay: `${heart.delay}s`,
                  animationDuration: `${heart.duration}s`,
                  color: heart.color,
                  willChange: 'transform, opacity',
                }}
              />
            ))}

            {/* Always in DOM — fades in-place, zero layout shift */}
            <div style={{
              marginTop: '14px',
              height: '56px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              opacity: heartBurst ? 1 : 0,
              transform: heartBurst ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.95)',
              transition: 'opacity 0.5s ease, transform 0.5s ease',
              pointerEvents: 'none',
            }}>
              <p className="final-admiration-compact" style={{ margin: 0 }}>Forever in awe of you! ✨</p>
              <p className="final-signature-compact" style={{ margin: 0 }}>- From someone who loves you deeply</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BirthdaySurprise;