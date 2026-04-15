import { useCallback, useEffect, useRef, useState } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import P3Menu from './P3Menu'
import PageTransition from './PageTransition'
import Socials from './Socials'
import AboutMe from './AboutMe'
import ResumePage from './ResumePage'
import ProjectsPage from './ProjectsPage'
import './App.css'

const GITHUB_URL = 'https://github.com/Biieru'
const BGM_SRC = '/audio/dorm-after-midnight.mp3'

function AmbientAudio({ audioRef, volume, muted }) {
  const ref = audioRef

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.loop = true
    el.volume = volume
    el.muted = muted
    el.preload = 'auto'

    const start = () => {
      el.play().catch(() => {})
    }
    start()
    document.addEventListener('pointerdown', start, { once: true })
    document.addEventListener('keydown', start, { once: true })
    window.addEventListener('app-audio-unlock', start)
    return () => {
      document.removeEventListener('pointerdown', start)
      document.removeEventListener('keydown', start)
      window.removeEventListener('app-audio-unlock', start)
    }
  }, [ref, volume, muted])

  return (
    <audio
      ref={ref}
      src={BGM_SRC}
      loop
      preload="auto"
      aria-hidden
      style={{ position: 'absolute', width: 0, height: 0, opacity: 0, pointerEvents: 'none' }}
    />
  )
}

function MenuBackdrop() {
  return (
    <div className="menu-backdrop" aria-hidden>
      <div className="menu-backdrop__grad" />
      <div className="menu-backdrop__grid" />
    </div>
  )
}

function MenuScreen({ bgmVolume, bgmMuted, onToggleMute, onVolumeChange }) {
  const navigate = useNavigate()
  const [activeMenuIndex, setActiveMenuIndex] = useState(0)
  const handleNavigate = useCallback(
    (page) => {
      if (page === 'github') {
        window.open(GITHUB_URL, '_blank', 'noopener,noreferrer')
        return
      }
      navigate(`/${page}`)
    },
    [navigate],
  )
  return (
    <div id="menu-screen">
      <MenuBackdrop />
      <div className={`menu-portrait-shell menu-portrait-shell--menu mounted pose-${activeMenuIndex}`} aria-hidden>
        <img className="menu-portrait menu-portrait--menu" src="/images/menu-portrait.png" alt="" />
      </div>
      <P3Menu
        onNavigate={handleNavigate}
        onActiveChange={setActiveMenuIndex}
        bgmVolume={bgmVolume}
        bgmMuted={bgmMuted}
        onToggleMute={onToggleMute}
        onVolumeChange={onVolumeChange}
      />
    </div>
  )
}

function AnimatedRoutes({ bgmVolume, bgmMuted, onToggleMute, onVolumeChange }) {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <MenuScreen
                bgmVolume={bgmVolume}
                bgmMuted={bgmMuted}
                onToggleMute={onToggleMute}
                onVolumeChange={onVolumeChange}
              />
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition variant="about">
              <AboutMe />
            </PageTransition>
          }
        />
        <Route
          path="/resume"
          element={
            <PageTransition variant="resume">
              <ResumePage />
            </PageTransition>
          }
        />
        <Route
          path="/socials"
          element={
            <PageTransition variant="socials">
              <Socials />
            </PageTransition>
          }
        />
        <Route
          path="/projects"
          element={
            <PageTransition variant="projects">
              <ProjectsPage />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  const audioRef = useRef(null)
  const [bgmVolume, setBgmVolume] = useState(0.25)
  const [bgmMuted, setBgmMuted] = useState(false)

  return (
    <>
      <AmbientAudio audioRef={audioRef} volume={bgmVolume} muted={bgmMuted} />
      <AnimatedRoutes
        bgmVolume={bgmVolume}
        bgmMuted={bgmMuted}
        onToggleMute={() => setBgmMuted((prev) => !prev)}
        onVolumeChange={(nextValue) => {
          const safe = Math.max(0, Math.min(1, nextValue))
          setBgmVolume(safe)
          if (safe > 0 && bgmMuted) setBgmMuted(false)
        }}
      />
    </>
  )
}
