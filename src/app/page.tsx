'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

// Letter text for typing animation - personalized for Diksha
const letterText = `Dear Diksha,

I know I hurt you. And that thought alone breaks me.

I never wanted to be the reason for your sadness. You are the most beautiful part of my life. I replay everything in my mind — wishing I had done better… wishing I had spoken softer… wishing I had loved you louder.

I am truly, deeply sorry. Not just in words… but in my heart.

Please don't let this mistake erase everything we are.

I love you more than my pride, more than my ego, more than my mistakes. ❤️`

// Gallery slides data - with real photos!
const slidesData = [
  { caption: "The way you lean on me... I never want to lose that comfort.", image: "/photo1.jpeg" },
  { caption: "Even when we're apart, my hand is always reaching for yours.", image: "/photo2.jpeg" },
  { caption: "You look breathtaking in every moment. I am so lucky to have you.", image: "/photo3.jpeg" },
  { caption: "Every walk, every talk — I cherish it all.", image: "/photo4.jpeg" },
  { caption: "Holding you is where I feel most at home.", image: "/photo5.jpeg" },
  { caption: "The simple moments with you are my favorite parts of life.", image: "/photo6.jpeg" },
]

// Flip cards data - reasons to come back
const flipCardsData = [
  { icon: "🧸", reason: "Reason 01", message: "Because your smile fixes my worst days." },
  { icon: "💔", reason: "Reason 02", message: "Because life feels empty without you." },
  { icon: "🏠", reason: "Reason 03", message: "Because loving you feels like home." },
  { icon: "💕", reason: "Reason 04", message: "Because I promise to love you better." },
]

// Poems data - Maithili poems for Diksha
const poemsData = [
  {
    title: "क्षमा माँगब",
    subtitle: "Asking Forgiveness",
    lines: [
      "जउँ हमरा सँ कोनो गलती भेलै छल",
      "दुख देलै छल तँ हमरा दिल के",
      "तँ हमरा आँखि सँ आँसू बहावब",
      "क्षमा माँगब, मन सँ मन तक कहब",
      "",
      "प्रेम के आगि मे जलल छी हम",
      "तोर बिना जी नहि पाओब",
      "एकटा क्षमा देब तँ हमरा",
      "फेर सँ जीवन के रंग भर देब",
    ],
  },
  {
    title: "प्रेम आ क्षमा",
    subtitle: "Love and Forgiveness",
    lines: [
      "तोर आँखि मे दुख देखल जउँ",
      "हमरा सीना फाटि जाइ छै",
      "क्षमा करब हमरा ओ सजनी",
      "प्रेम के नदी मे हम बहि जाइ छी",
      "",
      "तोर मुस्कान फेर आइ जाए",
      "हमरा जीवनी के फेर रंग लाए",
      "क्षमा के एकटा शब्द सँ",
      "हमरा प्रेम के फेर जीवित कर देब",
    ],
  },
  {
    title: "छोट संगीत",
    subtitle: "Short Song-like",
    lines: [
      "क्षमा कर देब ना सजनी",
      "हमरा गलती के बोझ उतार देब",
      "प्रेम के फूल फेर खिलाब",
      "तोर मन मे हमरा जगह देब",
      "",
      "क्षमा कर देब ना रानी",
      "हमरा आँसू पोछि देब",
      "तोर कंधा पे सिर रखब",
      "फेर सँ जीवन के सपना देखब",
    ],
  },
  {
    title: "अंतिम प्रार्थना",
    subtitle: "Final Prayer",
    lines: [
      "जउँ हमरा सँ कोनो दुख भेल",
      "तोर मन मे काँटा चुभल",
      "तँ क्षमा कर देब हमरा",
      "प्रेम के आगि मे हम जलल छी",
      "",
      "एकटा मौका देब हमरा",
      "फेर सँ प्रेम के गीत गाब",
      "तोर बिना अधूरा छी हम",
      "तोर सँ पूर्ण होइब हम",
    ],
  },
]

// Particle class for floating hearts
class Particle {
  canvas: HTMLCanvasElement
  x: number
  y: number
  size: number
  speed: number
  drift: number
  opacity: number
  char: string
  wobble: number
  wobbleSpeed: number
  isPetal: boolean
  rotation: number
  rotSpeed: number

  constructor(canvas: HTMLCanvasElement, init = false) {
    this.canvas = canvas
    this.x = Math.random() * canvas.width
    this.y = init ? Math.random() * canvas.height : canvas.height + 20
    this.size = Math.random() * 14 + 8
    this.speed = Math.random() * 0.5 + 0.2
    this.drift = (Math.random() - 0.5) * 0.4
    this.opacity = Math.random() * 0.5 + 0.15
    this.char = ['💗', '💕', '🌸', '✨', '💖', '🌷'][Math.floor(Math.random() * 6)]
    this.wobble = Math.random() * Math.PI * 2
    this.wobbleSpeed = Math.random() * 0.02 + 0.005
    this.isPetal = Math.random() < 0.15
    this.rotation = Math.random() * Math.PI * 2
    this.rotSpeed = (Math.random() - 0.5) * 0.03
  }

  reset() {
    this.x = Math.random() * this.canvas.width
    this.y = this.canvas.height + 20
    this.size = Math.random() * 14 + 8
    this.speed = Math.random() * 0.5 + 0.2
    this.drift = (Math.random() - 0.5) * 0.4
    this.opacity = Math.random() * 0.5 + 0.15
    this.char = ['💗', '💕', '🌸', '✨', '💖', '🌷'][Math.floor(Math.random() * 6)]
    this.wobble = Math.random() * Math.PI * 2
    this.wobbleSpeed = Math.random() * 0.02 + 0.005
    this.isPetal = Math.random() < 0.15
    this.rotation = Math.random() * Math.PI * 2
    this.rotSpeed = (Math.random() - 0.5) * 0.03
  }

  update() {
    this.y -= this.speed
    this.wobble += this.wobbleSpeed
    this.x += this.drift + Math.sin(this.wobble) * 0.4
    this.rotation += this.rotSpeed
    if (this.y < -30) this.reset()
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save()
    ctx.globalAlpha = this.opacity
    ctx.translate(this.x, this.y)
    if (this.isPetal) {
      ctx.rotate(this.rotation)
      ctx.fillStyle = 'rgba(255,150,180,0.6)'
      ctx.beginPath()
      ctx.ellipse(0, 0, this.size * 0.5, this.size, 0, 0, Math.PI * 2)
      ctx.fill()
    } else {
      ctx.font = `${this.size}px serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(this.char, 0, 0)
    }
    ctx.restore()
  }
}

// Confetti piece class
class ConfettiPiece {
  canvas: HTMLCanvasElement
  x: number
  y: number
  r: number
  color: string
  char: string
  isHeart: boolean
  tiltAngle: number
  tiltSpeed: number
  vy: number
  vx: number

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height - canvas.height
    this.r = Math.random() * 10 + 5
    this.color = ['#FFB7C5', '#FF8FAB', '#FFCCD5', '#FFD6E0', '#FFC2D1', '#FF85A1', '#FFCBA4'][Math.floor(Math.random() * 7)]
    this.char = ['💗', '💕', '💖', '✨', '🌸'][Math.floor(Math.random() * 5)]
    this.isHeart = Math.random() < 0.6
    this.tiltAngle = 0
    this.tiltSpeed = Math.random() * 0.1 + 0.05
    this.vy = Math.random() * 3 + 2
    this.vx = (Math.random() - 0.5) * 4
  }

  update() {
    this.tiltAngle += this.tiltSpeed
    this.y += this.vy
    this.x += this.vx + Math.sin(this.tiltAngle) * 1.5
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save()
    ctx.globalAlpha = 0.85
    ctx.translate(this.x, this.y)
    if (this.isHeart) {
      ctx.font = `${this.r * 2}px serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(this.char, 0, 0)
    } else {
      ctx.rotate(this.tiltAngle)
      ctx.fillStyle = this.color
      ctx.beginPath()
      ctx.ellipse(0, 0, this.r * 0.5, this.r, 0, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.restore()
  }
}

export default function Home() {
  // State
  const [entryVisible, setEntryVisible] = useState(true)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [typedText, setTypedText] = useState('')
  const [typingStarted, setTypingStarted] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [showConfetti, setShowConfetti] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [showDimOverlay, setShowDimOverlay] = useState(false)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())

  // Refs
  const particleCanvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const particleAnimRef = useRef<number>(0)
  
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null)
  const confettiPiecesRef = useRef<ConfettiPiece[]>([])
  const confettiAnimRef = useRef<number>(0)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const typingIndexRef = useRef(0)
  const [typingComplete, setTypingComplete] = useState(false)

  // Initialize audio on mount
  useEffect(() => {
    // Create audio element with romantic background music
    audioRef.current = new Audio()
    audioRef.current.loop = true
    audioRef.current.volume = 0.7
    
    // 🎵 Emotional background music - loads from local public folder
    // Replace /music.mp3 with your own romantic song if desired
    audioRef.current.src = '/music.mp3'
    
    // Preload the audio
    audioRef.current.preload = 'auto'
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  // Initialize particles
  useEffect(() => {
    const canvas = particleCanvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Create particles
    particlesRef.current = Array.from({ length: 55 }, () => new Particle(canvas, true))

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particlesRef.current.forEach(p => {
        p.update()
        p.draw(ctx)
      })
      particleAnimRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(particleAnimRef.current)
    }
  }, [])

  // Typing animation
  const startTyping = useCallback(() => {
    if (typingStarted) return
    setTypingStarted(true)

    const typeChar = () => {
      if (typingIndexRef.current <= letterText.length) {
        setTypedText(letterText.substring(0, typingIndexRef.current))
        typingIndexRef.current++
        const char = letterText[typingIndexRef.current - 1]
        const delay = char === '\n' ? 200 : /[.,…!?❤️]/.test(char) ? 120 : 28
        setTimeout(typeChar, delay)
        if (typingIndexRef.current > letterText.length) {
          setTypingComplete(true)
        }
      }
    }
    typeChar()
  }, [typingStarted])

  // Open letter handler
  const handleOpenLetter = useCallback(async () => {
    setEntryVisible(false)
    
    // Try to play music with better handling
    if (audioRef.current) {
      try {
        // Reset to beginning and ensure volume is up
        audioRef.current.currentTime = 0
        audioRef.current.volume = 0.7
        
        // Wait for audio to be ready
        if (audioRef.current.readyState < 2) {
          await new Promise<void>((resolve) => {
            if (audioRef.current) {
              audioRef.current.oncanplay = () => resolve()
              audioRef.current.onerror = () => resolve() // Continue even if error
            }
          })
        }
        
        await audioRef.current.play()
        setMusicPlaying(true)
      } catch (e) {
        console.log('Audio autoplay blocked - click music button to play')
      }
    }
    
    setTimeout(startTyping, 1200)
  }, [startTyping])

  // Music toggle
  const toggleMusic = useCallback(async () => {
    if (!audioRef.current) return
    
    try {
      if (musicPlaying) {
        audioRef.current.pause()
        setMusicPlaying(false)
      } else {
        audioRef.current.volume = 0.7
        await audioRef.current.play()
        setMusicPlaying(true)
      }
    } catch (e) {
      console.log('Audio play failed:', e)
    }
  }, [musicPlaying])

  // Gallery navigation
  const goToSlide = useCallback((index: number) => {
    setCurrentSlide((index + slidesData.length) % slidesData.length)
  }, [])

  const changeSlide = useCallback((dir: number) => {
    goToSlide(currentSlide + dir)
  }, [currentSlide, goToSlide])

  // Auto-advance gallery
  useEffect(() => {
    const timer = setInterval(() => changeSlide(1), 5000)
    return () => clearInterval(timer)
  }, [changeSlide])

  // Flip card toggle
  const toggleCard = useCallback((index: number) => {
    setFlippedCards(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }, [])

  // Confetti animation
  const runConfetti = useCallback(() => {
    const canvas = confettiCanvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    confettiPiecesRef.current = Array.from({ length: 120 }, () => new ConfettiPiece(canvas))

    const animate = (): boolean => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      let allDone = true
      
      confettiPiecesRef.current.forEach(p => {
        p.update()
        if (p.y < canvas.height + 20) allDone = false
        p.draw(ctx)
      })

      if (!allDone) {
        confettiAnimRef.current = requestAnimationFrame(animate)
      } else {
        setShowConfetti(false)
        setShowPopup(true)
      }
      return allDone
    }
    animate()
  }, [])

  // Trigger forgiveness
  const triggerForgiveness = useCallback(() => {
    setShowDimOverlay(true)
    setShowConfetti(true)
    
    // Enhanced particles
    particlesRef.current.forEach(p => {
      p.size = Math.random() * 20 + 10
      p.speed = Math.random() * 1.5 + 0.5
    })
    
    setTimeout(runConfetti, 100)
  }, [runConfetti])

  // Close popup
  const closePopup = useCallback(() => {
    setShowPopup(false)
    setShowDimOverlay(false)
  }, [])

  // Intersection observer for scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set(prev).add(entry.target.id))
          }
        })
      },
      { threshold: 0.12 }
    )

    const sections = document.querySelectorAll('.reveal-section')
    sections.forEach(section => observer.observe(section))

    return () => observer.disconnect()
  }, [entryVisible])

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slidesData.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const isVisible = (id: string) => visibleSections.has(id)

  return (
    <>
      {/* Styles */}
      <style jsx global>{`
        :root {
          --blush: #FEEAF1;
          --rose-gold: #F4C2D7;
          --deep-rose: #E8889F;
          --soft-pink: #F9D0E0;
          --white-glass: rgba(255, 255, 255, 0.45);
          --border-glass: rgba(255, 255, 255, 0.7);
          --text-dark: #5a2a3a;
          --text-mid: #8b4a5c;
          --text-light: #c4809a;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
          background: linear-gradient(135deg, var(--blush) 0%, var(--rose-gold) 50%, #f9d0e4 100%);
          background-attachment: fixed;
          min-height: 100vh;
          color: var(--text-dark);
          overflow-x: hidden;
        }

        /* Breathing gradient */
        .breathing-bg {
          position: fixed;
          inset: 0;
          background: radial-gradient(ellipse at 20% 50%, rgba(255, 182, 205, 0.4) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 20%, rgba(255, 192, 203, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 60% 80%, rgba(244, 194, 215, 0.4) 0%, transparent 55%);
          animation: breathe 8s ease-in-out infinite alternate;
          pointer-events: none;
          z-index: 0;
        }

        @keyframes breathe {
          0% { opacity: 0.6; transform: scale(1); }
          100% { opacity: 1; transform: scale(1.05); }
        }

        .glass {
          background: var(--white-glass);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1.5px solid var(--border-glass);
          border-radius: 24px;
          box-shadow: 0 8px 32px rgba(180, 80, 120, 0.12), 0 2px 8px rgba(255, 255, 255, 0.5) inset;
        }

        .reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes entryPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }

        @keyframes btnFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        @keyframes heartbeatAura {
          0%, 100% { transform: scale(0.9); opacity: 0.6; }
          14% { transform: scale(1.3); opacity: 1; }
          28% { transform: scale(1.0); opacity: 0.7; }
          42% { transform: scale(1.2); opacity: 0.9; }
          70% { transform: scale(0.9); opacity: 0.6; }
        }

        @keyframes bearGlow {
          0% { transform: scale(0.9); opacity: 0.6; }
          100% { transform: scale(1.1); opacity: 1; }
        }

        @keyframes bearFloat {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-18px) rotate(2deg); }
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        @keyframes tearFall {
          0% { opacity: 0; transform: translateY(0) scaleY(1); }
          20% { opacity: 0.9; }
          80% { opacity: 0.6; }
          100% { opacity: 0; transform: translateY(50px) scaleY(1.4); }
        }

        @keyframes pulsePlea {
          0%, 100% { box-shadow: 0 8px 30px rgba(212, 96, 124, 0.4); }
          50% { box-shadow: 0 8px 50px rgba(212, 96, 124, 0.7), 0 0 0 10px rgba(212, 96, 124, 0.1); }
        }

        @keyframes popIn {
          from { transform: scale(0.6); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        @keyframes hugBounce {
          0%, 100% { transform: scale(1) translateY(0); }
          50% { transform: scale(1.05) translateY(-8px); }
        }
      `}</style>

      {/* Particle Canvas */}
      <canvas
        ref={particleCanvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Breathing Background */}
      <div className="breathing-bg" />

      {/* Entry Overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(254, 234, 241, 0.97) 0%, rgba(244, 194, 215, 0.97) 100%)',
          display: entryVisible ? 'flex' : 'none',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}
      >
        <div style={{ fontSize: '64px', animation: 'entryPulse 1.5s ease-in-out infinite', marginBottom: '24px', filter: 'drop-shadow(0 0 20px rgba(255, 100, 150, 0.5))' }}>
          💌
        </div>
        <h1 style={{ fontFamily: '"Dancing Script", cursive', fontSize: 'clamp(2rem, 6vw, 3.5rem)', color: 'var(--text-dark)', textAlign: 'center', marginBottom: '12px', padding: '0 20px' }}>
          A letter from the heart…
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-mid)', marginBottom: '40px', letterSpacing: '0.05em' }}>
          tap to open
        </p>
        <button
          onClick={handleOpenLetter}
          style={{
            padding: '18px 48px',
            fontFamily: '"Dancing Script", cursive',
            fontSize: '1.4rem',
            color: 'white',
            background: 'linear-gradient(135deg, #e8889f, #d4607c)',
            border: 'none',
            borderRadius: '60px',
            cursor: 'pointer',
            boxShadow: '0 8px 30px rgba(212, 96, 124, 0.4), 0 2px 8px rgba(255, 255, 255, 0.3) inset',
            animation: 'btnFloat 3s ease-in-out infinite',
            letterSpacing: '0.03em',
          }}
        >
          Open the Letter 💗
        </button>
      </div>

      {/* Music Control */}
      {!entryVisible && (
        <div style={{ 
          position: 'fixed', 
          top: '20px', 
          right: '20px', 
          zIndex: 9999, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: '8px',
          pointerEvents: 'auto',
        }}>
          <button
            onClick={toggleMusic}
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '26px',
              cursor: 'pointer',
              border: '3px solid rgba(255, 255, 255, 0.8)',
              background: 'linear-gradient(135deg, rgba(255, 200, 220, 0.9), rgba(255, 182, 203, 0.9))',
              boxShadow: musicPlaying ? '0 4px 20px rgba(212, 96, 124, 0.4)' : '0 0 25px rgba(212, 96, 124, 0.6)',
              animation: musicPlaying ? 'none' : 'pulsePlea 2s ease-in-out infinite',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            title={musicPlaying ? 'Pause Music' : 'Play Music'}
          >
            {musicPlaying ? '🎵' : '🔈'}
          </button>
          {!musicPlaying && (
            <span style={{ 
              fontSize: '12px', 
              color: '#5a2a3a', 
              fontFamily: 'Montserrat, sans-serif', 
              background: 'rgba(255,255,255,0.95)', 
              padding: '6px 12px', 
              borderRadius: '12px',
              fontWeight: 500,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}>
              Click for music
            </span>
          )}
        </div>
      )}

      {/* Confetti Overlay */}
      {showConfetti && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 2000, pointerEvents: 'none' }}>
          <canvas ref={confettiCanvasRef} style={{ width: '100%', height: '100%', pointerEvents: 'none' }} />
        </div>
      )}

      {/* Dim Overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(60, 10, 30, 0.6)',
          zIndex: 1900,
          opacity: showDimOverlay ? 1 : 0,
          pointerEvents: showDimOverlay ? 'all' : 'none',
          transition: 'opacity 0.5s',
        }}
      />

      {/* Thank You Popup */}
      {showPopup && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 3000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(80, 20, 40, 0.5)',
            backdropFilter: 'blur(4px)',
          }}
        >
          <div
            className="glass"
            style={{
              maxWidth: '460px',
              width: '90%',
              padding: '48px 40px',
              textAlign: 'center',
              animation: 'popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <div style={{ fontSize: '56px', marginBottom: '16px' }}>🥹💗</div>
            <h2 style={{ fontFamily: '"Dancing Script", cursive', fontSize: '2rem', color: 'var(--deep-rose)', marginBottom: '20px' }}>
              Thank You, Diksha…
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-mid)', lineHeight: 1.9, fontWeight: 400, marginBottom: '28px' }}>
              Thank you for believing in us again.<br />
              I promise to do better.<br />
              I promise to love you better.<br />
              I love you, Diksha. 💗
            </p>
            <button
              onClick={closePopup}
              style={{
                padding: '14px 36px',
                fontFamily: '"Dancing Script", cursive',
                fontSize: '1.2rem',
                color: 'white',
                background: 'linear-gradient(135deg, #e8889f, #d4607c)',
                border: 'none',
                borderRadius: '60px',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(212, 96, 124, 0.35)',
              }}
            >
              I love you too 💕
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main style={{ position: 'relative', zIndex: 2, display: entryVisible ? 'none' : 'block' }}>
        
        {/* HERO SECTION */}
        <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
          <div style={{ maxWidth: '900px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px', flexWrap: 'wrap' }}>
            
            {/* Teddy Bear Image */}
            <div style={{ flex: '0 0 auto', width: 'clamp(200px, 35vw, 320px)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <div style={{ position: 'absolute', width: '120%', height: '120%', background: 'radial-gradient(circle, rgba(255, 130, 160, 0.4) 0%, transparent 70%)', borderRadius: '50%', animation: 'bearGlow 3s ease-in-out infinite alternate' }} />
              <div style={{ animation: 'bearFloat 4s ease-in-out infinite', position: 'relative', zIndex: 1 }}>
                <img 
                  src="/teddy1.jpg" 
                  alt="Teddy asking for forgiveness"
                  style={{ 
                    width: '100%', 
                    maxWidth: '300px',
                    borderRadius: '24px',
                    boxShadow: '0 12px 40px rgba(180, 80, 120, 0.3)',
                  }}
                />
              </div>
            </div>

            {/* Text */}
            <div className={`reveal ${isVisible('hero') ? 'visible' : ''}`} id="hero" style={{ flex: 1, minWidth: '260px', textAlign: 'left' }}>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <div style={{ position: 'absolute', inset: '-20px', background: 'radial-gradient(ellipse, rgba(255, 100, 150, 0.2) 0%, transparent 70%)', animation: 'heartbeatAura 1.2s ease-in-out infinite', borderRadius: '50%', zIndex: -1 }} />
                <h1 style={{ fontFamily: '"Dancing Script", cursive', fontSize: 'clamp(2.2rem, 6vw, 4rem)', color: 'var(--text-dark)', lineHeight: 1.2, marginBottom: '20px' }}>
                  I'm Sorry…<br />More Than Words<br />Can Say.
                </h1>
              </div>
              <p style={{ fontSize: 'clamp(0.85rem, 2.5vw, 1rem)', color: 'var(--text-mid)', fontWeight: 300, lineHeight: 1.8, maxWidth: '420px', marginTop: '20px' }}>
                If I could turn back time, I would undo the moment I hurt you.
              </p>
              <div style={{ marginTop: '28px', fontSize: '1.8rem', letterSpacing: '0.15em', opacity: 0.6 }}>💗 🧸 💗</div>
            </div>
          </div>
        </section>

        {/* LETTER SECTION */}
        <section id="letter" className={`reveal-section reveal ${isVisible('letter') ? 'visible' : ''}`} style={{ padding: '60px 20px' }}>
          <div className="glass" style={{ maxWidth: '700px', margin: '0 auto', padding: '48px 52px' }}>
            <h2 style={{ fontFamily: '"Dancing Script", cursive', fontSize: '2.2rem', color: 'var(--deep-rose)', marginBottom: '32px', textAlign: 'center' }}>
              ✉️ From My Heart to Yours
            </h2>
            <div style={{ fontSize: '1rem', lineHeight: 2, color: 'var(--text-dark)', fontWeight: 400, minHeight: '280px', whiteSpace: 'pre-wrap' }}>
              {typedText}
              {typingStarted && !typingComplete && (
                <span style={{ display: 'inline-block', width: '2px', height: '1.1em', background: 'var(--deep-rose)', marginLeft: '2px', verticalAlign: 'text-bottom', animation: 'blink 0.8s step-end infinite' }} />
              )}
            </div>
          </div>

          {/* Sad Teddy - Please Forgive Me */}
          <div className={`reveal ${isVisible('letter') ? 'visible' : ''}`} style={{ textAlign: 'center', marginTop: '50px', position: 'relative' }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <img 
                src="/teddy3.png" 
                alt="Sad teddy bear asking for forgiveness"
                style={{ 
                  width: '180px',
                  borderRadius: '20px',
                  filter: 'drop-shadow(0 8px 20px rgba(180, 80, 120, 0.25))',
                  animation: 'bearFloat 3s ease-in-out infinite',
                }}
              />
              <div style={{ 
                position: 'absolute', 
                bottom: '-10px', 
                left: '50%', 
                transform: 'translateX(-50%)',
                background: 'linear-gradient(135deg, #e8889f, #d4607c)',
                padding: '8px 20px',
                borderRadius: '20px',
                whiteSpace: 'nowrap',
              }}>
                <span style={{ fontFamily: '"Dancing Script", cursive', color: 'white', fontSize: '1.1rem' }}>Please forgive me… 🥺</span>
              </div>
            </div>
          </div>
        </section>

        {/* GALLERY SECTION */}
        <section id="gallery" className={`reveal-section reveal ${isVisible('gallery') ? 'visible' : ''}`} style={{ padding: '60px 20px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: '"Dancing Script", cursive', fontSize: 'clamp(1.8rem, 5vw, 3rem)', color: 'var(--text-dark)', marginBottom: '12px' }}>
            📸 Moments I Never Want to Lose
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-mid)', marginBottom: '40px', letterSpacing: '0.05em' }}>
            Every picture tells the story of why I fight for us.
          </p>

          <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
            <div className="glass" style={{ overflow: 'hidden', borderRadius: '20px', padding: '24px' }}>
              {slidesData.map((slide, index) => (
                <div key={index} style={{ display: currentSlide === index ? 'flex' : 'none', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '100%', height: '380px', borderRadius: '16px', overflow: 'hidden', position: 'relative', boxShadow: '0 8px 24px rgba(180, 80, 120, 0.15)' }}>
                    <img 
                      src={slide.image} 
                      alt={`Memory ${index + 1}`}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        borderRadius: '16px',
                      }}
                    />
                    <div style={{ 
                      position: 'absolute', 
                      bottom: 0, 
                      left: 0, 
                      right: 0, 
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.6))',
                      padding: '40px 20px 20px',
                      borderRadius: '0 0 16px 16px'
                    }}>
                      <p style={{ color: 'white', fontFamily: '"Dancing Script", cursive', fontSize: '1.1rem', textAlign: 'center', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                        {slide.caption}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginTop: '24px' }}>
              <button onClick={() => changeSlide(-1)} className="glass" style={{ width: '48px', height: '48px', borderRadius: '50%', border: 'none', fontSize: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                💗
              </button>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                {slidesData.map((_, index) => (
                  <div
                    key={index}
                    onClick={() => goToSlide(index)}
                    style={{
                      width: currentSlide === index ? '10px' : '8px',
                      height: currentSlide === index ? '10px' : '8px',
                      borderRadius: '50%',
                      background: currentSlide === index ? 'var(--deep-rose)' : 'var(--rose-gold)',
                      border: '1.5px solid var(--deep-rose)',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      transform: currentSlide === index ? 'scale(1.3)' : 'scale(1)',
                    }}
                  />
                ))}
              </div>
              <button onClick={() => changeSlide(1)} className="glass" style={{ width: '48px', height: '48px', borderRadius: '50%', border: 'none', fontSize: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                💗
              </button>
            </div>
          </div>
        </section>

        {/* FLIP CARDS SECTION */}
        <section id="reasons" className={`reveal-section reveal ${isVisible('reasons') ? 'visible' : ''}`} style={{ padding: '60px 20px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: '"Dancing Script", cursive', fontSize: 'clamp(1.8rem, 5vw, 3rem)', color: 'var(--text-dark)', marginBottom: '12px' }}>
            💖 Why You Mean Everything
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-mid)', marginBottom: '40px', letterSpacing: '0.05em' }}>
            click or tap each card to reveal
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', maxWidth: '900px', margin: '0 auto' }}>
            {flipCardsData.map((card, index) => (
              <div
                key={index}
                onClick={() => toggleCard(index)}
                style={{
                  height: '200px',
                  perspective: '1000px',
                  cursor: 'pointer',
                }}
              >
                <div style={{
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: flippedCards.includes(index) ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}>
                  {/* Front */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '20px',
                    backfaceVisibility: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '24px',
                    background: 'var(--white-glass)',
                    backdropFilter: 'blur(12px)',
                    border: '1.5px solid var(--border-glass)',
                    boxShadow: '0 8px 24px rgba(180, 80, 120, 0.12)',
                  }}>
                    <div style={{ fontSize: '36px', marginBottom: '12px' }}>{card.icon}</div>
                    <div style={{ fontFamily: '"Dancing Script", cursive', fontSize: '1.4rem', color: 'var(--text-dark)', marginBottom: '4px' }}>{card.reason}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-light)', letterSpacing: '0.08em' }}>click to reveal</div>
                  </div>
                  {/* Back */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '20px',
                    backfaceVisibility: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '24px',
                    background: 'linear-gradient(135deg, rgba(255, 200, 220, 0.6), rgba(255, 182, 203, 0.5))',
                    transform: 'rotateY(180deg)',
                  }}>
                    <p style={{ fontFamily: '"Dancing Script", cursive', fontSize: '1.2rem', color: 'var(--text-dark)', textAlign: 'center', lineHeight: 1.5 }}>
                      "{card.message}"
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* POEMS SECTION - मैथिली कविता */}
        <section id="poems" className={`reveal-section reveal ${isVisible('poems') ? 'visible' : ''}`} style={{ padding: '60px 20px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: '"Dancing Script", cursive', fontSize: 'clamp(1.8rem, 5vw, 3rem)', color: 'var(--text-dark)', marginBottom: '12px' }}>
            📜 क्षमा के कविता
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-mid)', marginBottom: '40px', letterSpacing: '0.05em' }}>
            Poems from my heart in Maithili - asking for your forgiveness
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', maxWidth: '1100px', margin: '0 auto' }}>
            {poemsData.map((poem, index) => (
              <div
                key={index}
                className="glass"
                style={{
                  padding: '32px 28px',
                  borderRadius: '24px',
                  background: 'linear-gradient(135deg, rgba(255, 234, 241, 0.7), rgba(244, 194, 215, 0.5))',
                  backdropFilter: 'blur(12px)',
                  border: '1.5px solid rgba(255, 150, 180, 0.3)',
                  boxShadow: '0 8px 32px rgba(180, 80, 120, 0.1)',
                  textAlign: 'center',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)'
                  e.currentTarget.style.boxShadow = '0 16px 48px rgba(212, 96, 124, 0.25)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(180, 80, 120, 0.1)'
                }}
              >
                {/* Poem Icon */}
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>
                  {['🙏', '💕', '🎵', '🙏'][index]}
                </div>
                
                {/* Title in Hindi */}
                <h3 style={{ 
                  fontFamily: '"Dancing Script", cursive', 
                  fontSize: '1.8rem', 
                  color: 'var(--deep-rose)', 
                  marginBottom: '4px',
                  fontWeight: 600,
                }}>
                  {poem.title}
                </h3>
                
                {/* Subtitle in English */}
                <p style={{ 
                  fontSize: '0.75rem', 
                  color: 'var(--text-light)', 
                  marginBottom: '20px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}>
                  {poem.subtitle}
                </p>
                
                {/* Poem Lines */}
                <div style={{ 
                  textAlign: 'center',
                  lineHeight: 1.8,
                }}>
                  {poem.lines.map((line, lineIndex) => (
                    <p 
                      key={lineIndex}
                      style={{ 
                        fontSize: '0.95rem',
                        color: line === '' ? 'transparent' : 'var(--text-dark)',
                        marginBottom: line === '' ? '8px' : '2px',
                        fontFamily: '"Noto Sans Devanagari", "Segoe UI", sans-serif',
                        fontWeight: 400,
                      }}
                    >
                      {line || '‎'}
                    </p>
                  ))}
                </div>
                
                {/* Decorative bottom */}
                <div style={{ marginTop: '20px', fontSize: '1.2rem', opacity: 0.5 }}>
                  💗
                </div>
              </div>
            ))}
          </div>
          
          {/* Bottom note */}
          <p style={{ 
            marginTop: '40px', 
            fontSize: '0.85rem', 
            color: 'var(--text-mid)', 
            fontStyle: 'italic',
            fontFamily: '"Dancing Script", cursive',
          }}>
            "Each word is a piece of my heart, asking for your forgiveness, Diksha… 💕"
          </p>
        </section>

        {/* FINAL PLEA SECTION */}
        <section id="plea" className={`reveal-section reveal ${isVisible('plea') ? 'visible' : ''}`} style={{ padding: '80px 20px 120px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: '"Dancing Script", cursive', fontSize: 'clamp(2rem, 6vw, 3.5rem)', color: 'var(--text-dark)', marginBottom: '16px' }}>
            One Last Question…
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-mid)', marginBottom: '48px', fontWeight: 300 }}>
            With all my heart, I ask you this…
          </p>

          <button
            onClick={triggerForgiveness}
            style={{
              padding: '22px 56px',
              fontFamily: '"Dancing Script", cursive',
              fontSize: '1.5rem',
              color: 'white',
              background: 'linear-gradient(135deg, #e8889f, #d4607c, #c94070)',
              border: 'none',
              borderRadius: '80px',
              cursor: 'pointer',
              animation: 'pulsePlea 2s ease-in-out infinite',
              boxShadow: '0 8px 30px rgba(212, 96, 124, 0.45)',
              letterSpacing: '0.02em',
            }}
          >
            Will You Give Me Another Chance? 💗
          </button>

          {/* Teddy Bears Asking to Come Back */}
          <div style={{ marginTop: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ animation: 'bearFloat 3s ease-in-out infinite', animationDelay: '0s' }}>
              <img 
                src="/teddy4.png" 
                alt="Teddy bear"
                style={{ 
                  width: '150px',
                  borderRadius: '20px',
                  filter: 'drop-shadow(0 8px 20px rgba(180, 80, 120, 0.2))',
                }}
              />
            </div>
            <div style={{ animation: 'hugBounce 2.5s ease-in-out infinite' }}>
              <div style={{ 
                background: 'linear-gradient(135deg, rgba(255, 200, 220, 0.8), rgba(255, 182, 203, 0.7))',
                padding: '20px 30px',
                borderRadius: '24px',
                backdropFilter: 'blur(8px)',
              }}>
                <p style={{ fontFamily: '"Dancing Script", cursive', fontSize: '1.4rem', color: '#5a2a3a', textAlign: 'center', margin: 0 }}>
                  Come back to me… 💕
                </p>
              </div>
            </div>
            <div style={{ animation: 'bearFloat 3s ease-in-out infinite', animationDelay: '0.5s' }}>
              <img 
                src="/teddy5.png" 
                alt="Teddy bear"
                style={{ 
                  width: '150px',
                  borderRadius: '20px',
                  filter: 'drop-shadow(0 8px 20px rgba(180, 80, 120, 0.2))',
                }}
              />
            </div>
          </div>

          <p style={{ fontFamily: '"Dancing Script", cursive', fontSize: '1.3rem', color: 'var(--text-light)', marginTop: '30px', opacity: 0.7 }}>
            I love you… always. 💗🧸
          </p>
        </section>
      </main>
    </>
  )
}
