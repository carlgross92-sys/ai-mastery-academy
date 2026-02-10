'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

interface VoiceReaderProps {
  text: string
  onSectionComplete?: () => void
  onToggleAutoPlay?: () => void
  sectionLabel?: string
  autoPlayNext?: boolean
}

export default function VoiceReader({ text, onSectionComplete, onToggleAutoPlay, sectionLabel, autoPlayNext = false }: VoiceReaderProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [speed, setSpeed] = useState(1.0)
  const [useElevenLabs, setUseElevenLabs] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioBlobUrlRef = useRef<string | null>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const autoPlayRef = useRef(autoPlayNext)
  const onSectionCompleteRef = useRef(onSectionComplete)

  // Keep refs in sync with latest props
  useEffect(() => { autoPlayRef.current = autoPlayNext }, [autoPlayNext])
  useEffect(() => { onSectionCompleteRef.current = onSectionComplete }, [onSectionComplete])

  // Cleanup on unmount or text change
  useEffect(() => {
    return () => {
      stopAudio()
      if (audioBlobUrlRef.current) {
        URL.revokeObjectURL(audioBlobUrlRef.current)
      }
    }
  }, [text])

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      audioRef.current = null
    }
    if (audioBlobUrlRef.current) {
      URL.revokeObjectURL(audioBlobUrlRef.current)
      audioBlobUrlRef.current = null
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
    }
    // Also stop any browser speech
    window.speechSynthesis?.cancel()
    setIsPlaying(false)
    setIsPaused(false)
    setProgress(0)
    setCurrentTime(0)
    setDuration(0)
  }, [])

  const playWithElevenLabs = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Failed to generate speech')
      }

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      audioBlobUrlRef.current = url

      const audio = new Audio(url)
      audio.playbackRate = speed
      audioRef.current = audio

      audio.addEventListener('loadedmetadata', () => {
        setDuration(audio.duration)
      })

      audio.addEventListener('ended', () => {
        setIsPlaying(false)
        setIsPaused(false)
        setProgress(100)
        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)
        if (onSectionCompleteRef.current && autoPlayRef.current) {
          setTimeout(() => onSectionCompleteRef.current?.(), 500)
        }
      })

      audio.addEventListener('error', () => {
        setError('Audio playback failed')
        setIsPlaying(false)
        setIsLoading(false)
      })

      await audio.play()
      setIsPlaying(true)
      setIsLoading(false)

      // Track progress
      progressIntervalRef.current = setInterval(() => {
        if (audio.duration > 0) {
          setProgress((audio.currentTime / audio.duration) * 100)
          setCurrentTime(audio.currentTime)
          setDuration(audio.duration)
        }
      }, 100)
    } catch (err: any) {
      console.error('ElevenLabs TTS error:', err)

      // Fallback to browser speech if ElevenLabs fails
      if (err.message?.includes('API key') || err.message?.includes('not configured')) {
        setUseElevenLabs(false)
        setIsLoading(false)
        playWithBrowser()
        return
      }

      setError(err.message || 'Voice generation failed. Try browser voice.')
      setIsLoading(false)
    }
  }

  const playWithBrowser = () => {
    const cleanText = text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
    const utterance = new SpeechSynthesisUtterance(cleanText)

    const voices = window.speechSynthesis.getVoices()
    const preferredVoice = voices.find(
      v => v.name.includes('Samantha') || v.name.includes('Karen') || v.name.includes('Zira') || v.name.includes('Female')
    ) || voices.find(v => v.lang.startsWith('en'))
    if (preferredVoice) utterance.voice = preferredVoice

    utterance.rate = speed
    utterance.pitch = 1.0

    utterance.onend = () => {
      setIsPlaying(false)
      setIsPaused(false)
      setProgress(100)
      if (onSectionComplete && autoPlayNext) {
        setTimeout(() => onSectionComplete(), 500)
      }
    }

    window.speechSynthesis.speak(utterance)
    setIsPlaying(true)
  }

  const handlePlay = () => {
    if (isPaused && audioRef.current) {
      audioRef.current.play()
      setIsPaused(false)
      setIsPlaying(true)
      progressIntervalRef.current = setInterval(() => {
        const audio = audioRef.current
        if (audio && audio.duration > 0) {
          setProgress((audio.currentTime / audio.duration) * 100)
          setCurrentTime(audio.currentTime)
        }
      }, 100)
      return
    }
    if (isPaused && !audioRef.current) {
      window.speechSynthesis.resume()
      setIsPaused(false)
      setIsPlaying(true)
      return
    }

    stopAudio()

    if (useElevenLabs) {
      playWithElevenLabs()
    } else {
      playWithBrowser()
    }
  }

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)
    } else {
      window.speechSynthesis.pause()
    }
    setIsPaused(true)
    setIsPlaying(false)
  }

  const handleStop = () => {
    stopAudio()
  }

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed)
    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed
    }
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const pct = x / rect.width
    audioRef.current.currentTime = pct * duration
    setProgress(pct * 100)
    setCurrentTime(pct * duration)
  }

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60)
    const s = Math.floor(sec % 60)
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  return (
    <div className="mb-8 rounded-xl bg-slate-900/60 border border-slate-800 overflow-hidden">
      {/* Main controls */}
      <div className="p-4">
        <div className="flex items-center gap-3">
          {/* Play/Pause button */}
          {isLoading ? (
            <button
              disabled
              className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0"
            >
              <svg className="animate-spin w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </button>
          ) : !isPlaying && !isPaused ? (
            <button
              onClick={handlePlay}
              className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 flex items-center justify-center flex-shrink-0 transition shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
            >
              <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </button>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                onClick={isPlaying ? handlePause : handlePlay}
                className="w-11 h-11 rounded-xl bg-blue-600 hover:bg-blue-700 flex items-center justify-center flex-shrink-0 transition"
              >
                {isPlaying ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75A.75.75 0 007.25 3h-1.5zM12.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                )}
              </button>
              <button
                onClick={handleStop}
                className="w-11 h-11 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center flex-shrink-0 transition"
                title="Stop"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5.25 3A2.25 2.25 0 003 5.25v9.5A2.25 2.25 0 005.25 17h9.5A2.25 2.25 0 0017 14.75v-9.5A2.25 2.25 0 0014.75 3h-9.5z" />
                </svg>
              </button>
            </div>
          )}

          {/* Info and controls */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-200">
                  {isLoading ? 'Generating voice...' : isPlaying ? 'Playing' : isPaused ? 'Paused' : 'Listen to this section'}
                </span>
                {sectionLabel && !isPlaying && !isPaused && !isLoading && (
                  <span className="text-xs text-slate-600 hidden sm:inline">| {sectionLabel}</span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {/* Speed control */}
                <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800/80 border border-slate-700/50">
                  {[0.75, 1, 1.25, 1.5].map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSpeedChange(s)}
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition ${
                        speed === s
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {s}x
                    </button>
                  ))}
                </div>

                {/* Voice indicator */}
                <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-600">
                  <div className={`w-1.5 h-1.5 rounded-full ${useElevenLabs ? 'bg-green-500' : 'bg-yellow-500'}`} />
                  {useElevenLabs ? 'AI Voice' : 'Browser'}
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div
              className="group h-1.5 bg-slate-800 rounded-full cursor-pointer relative"
              onClick={handleSeek}
            >
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-150 relative"
                style={{ width: `${progress}%` }}
              >
                {(isPlaying || isPaused) && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </div>
            </div>

            {/* Time display */}
            {(isPlaying || isPaused) && duration > 0 && (
              <div className="flex justify-between mt-1">
                <span className="text-[10px] text-slate-600">{formatTime(currentTime)}</span>
                <span className="text-[10px] text-slate-600">{formatTime(duration)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Visualizer when playing */}
        {isPlaying && (
          <div className="flex items-center justify-center gap-0.5 mt-3 h-5">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="w-0.5 bg-gradient-to-t from-blue-500 to-purple-500 rounded-full"
                style={{
                  height: `${4 + Math.random() * 16}px`,
                  animation: `pulse ${0.3 + Math.random() * 0.5}s ease-in-out ${i * 0.05}s infinite alternate`,
                }}
              />
            ))}
          </div>
        )}

        {/* Auto-play next section toggle */}
        {onSectionComplete && onToggleAutoPlay && (
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-800/50">
            <span className="text-xs text-slate-500">Auto-play next section when done</span>
            <button
              onClick={onToggleAutoPlay}
              className={`rounded-full transition-colors relative ${
                autoPlayNext ? 'bg-blue-500' : 'bg-slate-700'
              }`}
              style={{ width: '36px', height: '20px' }}
            >
              <div
                className={`absolute rounded-full bg-white transition-transform shadow-sm`}
                style={{
                  height: '16px',
                  width: '16px',
                  top: '2px',
                  left: autoPlayNext ? '18px' : '2px',
                  transition: 'left 0.2s ease',
                }}
              />
            </button>
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <div className="px-4 pb-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400">
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
            <button
              onClick={() => { setError(null); setUseElevenLabs(false) }}
              className="ml-auto text-red-300 hover:text-white transition text-[10px] underline"
            >
              Use browser voice
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
