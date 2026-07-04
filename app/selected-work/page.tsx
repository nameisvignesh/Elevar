'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowLeft, Volume2, VolumeX } from 'lucide-react';

const videos = [
  { title: 'Family Friend', src: '/selected-work/Family friend_Out.mp4' },
  { title: 'Final Out Tiles', src: '/selected-work/Final Out Tiles.mp4' },
  { title: 'NanoTiles', src: '/selected-work/NanoTiles-.mp4' }
];

export default function SelectedWork() {
  return (
    <main className="selected-hero">
      <section className="container">
        <div className="selected-head">
          <div>
            <span className="eyebrow">Selected Work</span>
            <h1>Motion systems, in motion.</h1>
            <p className="muted">All three supplied videos play inside the project cards with sound off by default.</p>
          </div>
          <Link href="/" className="btn btn-secondary">
            <ArrowLeft size={16} /> Back home
          </Link>
        </div>
        
        <div className="video-card-grid">
          {videos.map((video, index) => (
            <VideoCard key={video.title} video={video} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
}

// Extracted VideoCard component to cleanly handle individual video element refs
function VideoCard({ video, index }: { video: typeof videos[0]; index: number }) {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMuted = () => {
    if (!videoRef.current) return;
    
    const nextMutedState = !isMuted;
    videoRef.current.muted = nextMutedState;
    setIsMuted(nextMutedState);
  };

  return (
    <motion.div
      className="video-card tilt-card"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
    >
      <button 
        className={`btn video-toggle ${isMuted ? 'btn-secondary' : 'btn-primary'}`}
        onClick={toggleMuted} 
        aria-label={isMuted ? `Unmute ${video.title}` : `Mute ${video.title}`}
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
      
      <video 
        ref={videoRef}
        autoPlay
        muted={isMuted}
        loop 
        playsInline 
        preload="auto"
        style={{ width: '100%', height: '100%', display: 'block', backgroundColor: '#000' }}
      >
        <source src={video.src} type="video/mp4" />
      </video>
      <strong className="video-title">{video.title}</strong>
    </motion.div>
  );
}
