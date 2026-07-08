import { useCallback, useEffect, useRef, useState } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import P3Menu from './P3Menu'
import PageTransition from './PageTransition'
import Socials from './Socials'
import AboutMe from './AboutMe'
import ResumePage from './ResumePage'
import ProjectsPage from './ProjectsPage'
import NotFound from './NotFound'
import AudioControl from './AudioControl'
import './App.css'

const GITHUB_URL = 'https://github.com/Biieru'
const BGM_SRC = '/audio/dorm-after-midnight.mp3'
const STORAGE_VOLUME = 'bgm-volume'
const STORAGE_MUTED = 'bgm-muted'

function readStoredVolume() {
  try {
    const v = parseFloat(localStorage.getItem(STORAGE_VOLUME))
    return Number.isFinite(v) ? Math.max(0, Math.min(1, v)) : 0.25
  } catch {
    return 0.25
  }
}

function readStoredMuted() {
  try {
    return localStorage.getItem(STORAGE_MUTED) === '1'
  } catch {
    return false
  }
}

function AmbientAudio({ audioRef, volume, muted }) {
  const ref = audioRef

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.loop = true
    el.volume = volume
    el.muted = muted

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
      preload="none"
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

function MenuScreen() {
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
      <P3Menu onNavigate={handleNavigate} onActiveChange={setActiveMenuIndex} />
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <MenuScreen />
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
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  const audioRef = useRef(null)
  const [bgmVolume, setBgmVolume] = useState(readStoredVolume)
  const [bgmMuted, setBgmMuted] = useState(readStoredMuted)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_VOLUME, String(bgmVolume))
      localStorage.setItem(STORAGE_MUTED, bgmMuted ? '1' : '0')
    } catch {
      /* armazenamento indisponível (modo privado etc.) */
    }
  }, [bgmVolume, bgmMuted])

  return (
    <>
      <AmbientAudio audioRef={audioRef} volume={bgmVolume} muted={bgmMuted} />
      <AnimatedRoutes />
      <AudioControl
        volume={bgmVolume}
        muted={bgmMuted}
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
