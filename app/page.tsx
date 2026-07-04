'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bot,
  Clapperboard,
  FileText,
  Megaphone,
  PenTool,
  Sparkles,
  Target,
  Video
} from 'lucide-react';
import { CustomBundleButton } from './components/CustomBundleButton';

const process = [
  ['01', 'Business Discovery', 'We unpack goals, offer, ICP, conversion gaps, and the brand voice that should lead the system.'],
  ['02', 'Strategy', 'A content and positioning plan built around sharp hooks, repeatable themes, and offer clarity.'],
  ['03', 'Script Writing', 'Psychology-backed scripts focused on retention, authority, and action.'],
  ['04', 'Pre-Production', 'Shot lists, references, assets, and timelines prepared before production starts.'],
  ['05', 'Production', 'High-end capture direction using practical lighting, clean frames, and energetic pacing.'],
  ['06', 'Post Production', 'Editing, sound design, color, motion graphics, and fast platform-ready exports.'],
  ['07', 'Publishing', 'SEO optimization, thumbnails, captions, scheduling, and reach-focused rollout.'],
  ['08', 'Growth Analysis', 'Performance audits that make each month smarter than the last.']
];

const services = [
  { title: 'Video Editing', text: 'Retention-focused editing that makes every scroll-stopping idea easier to understand.', icon: Video },
  { title: 'Content Strategy', text: 'Custom roadmaps for founders who need authority without content chaos.', icon: Target },
  { title: 'AI Production', text: 'AI-assisted scripts, ideation, research, and campaign systems with human taste.', icon: Bot },
  { title: 'Social Management', text: 'Full-scale calendar, publishing, and platform care across your active channels.', icon: Megaphone },
  { title: 'Brand Content', text: 'Conversion-minded content designed to sell products and services directly.', icon: FileText },
  { title: 'Custom Bundle', text: 'A tailored solution for unique growth goals. Starts with a strategy call.', icon: Sparkles, custom: true }
];

const work = [
  { title: 'Family Friend', src: '/selected-work/Family friend_Out.mp4' },
  { title: 'Final Out Tiles', src: '/selected-work/Final Out Tiles.mp4' },
  { title: 'NanoTiles', src: '/selected-work/NanoTiles-.mp4' }
];

export default function Home() {
  return (
    <main className="home-page">
      <section className="hero-band">
        <div className="container hero-grid">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="hero-copy">
            <span className="eyebrow">Content ROI Agency</span>
            <h1 style={{ fontSize: 'clamp(2.1rem, 3.8vw, 3.1rem)', lineHeight: 1.12, maxWidth: 700 }}>
              We don't just edit videos.
              <br />
              We build <span style={{ background: 'linear-gradient(135deg, #ff3b30 0%, #ff8a00 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>content</span> that grows
              <br />
              your <span style={{ background: 'linear-gradient(135deg, #ff3b30 0%, #ff8a00 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>business</span>.
            </h1>
            <p>
              From strategy to publishing and growth analysis, we handle the full lifecycle of high-performance business content.
            </p>
            <div className="hero-actions">
              <Link href="/book-call" className="btn btn-primary">Book Free Strategy Call</Link>
              <Link href="/selected-work" className="btn btn-secondary">View Our Work</Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.5 }} className="myth-panel tilt-card">
            <div className="myth-visual">
              <Clapperboard size={34} />
              <strong>The "80% Gap" in Modern Video Strategy</strong>
              <span>Most creators edit. We engineer business impact.</span>
            </div>
            <div className="myth-stack">
              <div className="mini-alert">
                <small>Common business myth</small>
                <b>"Just make it look cool."</b>
                <span>Editing is 100% of value. No strategy, hooks, conversion logic.</span>
              </div>
              <div className="mini-alert active">
                <small>The Elevar approach</small>
                <b>Strategy to ROI</b>
                <span>Editing is only 20%. The other 80% is distribution and conversion.</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="process" className="section process-band">
        <div className="container">
          <div className="section-heading centered">
            <h2>Our 8-Step System</h2>
            <p>A meticulous workflow designed to remove the guesswork from content production.</p>
          </div>
          <div className="process-grid">
            {process.map(([num, title, text]) => (
              <article className="process-card tilt-card" key={num}>
                <span>{num}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="section">
        <div className="container">
          <div className="section-heading">
            <h2>Full-Stack Solutions</h2>
          </div>
          <div className="service-grid">
            {services.map((service) => {
              const Icon = service.icon;
              const card = (
                <article className={`service-card tilt-card ${service.custom ? 'featured' : ''}`}>
                  <Icon size={22} />
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  {service.custom && <span className="quote-pill">Get Custom Quote</span>}
                </article>
              );
              return service.custom ? <CustomBundleButton key={service.title} className="plain-action">{card}</CustomBundleButton> : <div key={service.title}>{card}</div>;
            })}
          </div>
        </div>
      </section>

      <section id="portfolio" className="section work-band">
        <div className="container">
          <div className="section-heading row">
            <div>
              <h2>Selected Work</h2>
              <p>Strategic content engines we have built.</p>
            </div>
            <Link href="/selected-work" className="btn btn-secondary compact">All Projects</Link>
          </div>
          <div className="work-preview-grid">
            {work.map((item) => (
              <Link href="/selected-work" className="work-preview tilt-card" key={item.title}>
                <video src={item.src} muted autoPlay loop playsInline preload="metadata" />
                <span>{item.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="section founder-section">
        <div className="container">
          <div className="founder-card">
            <div className="founder-photo">
              <Image src="/founder.jpeg" alt="Karthikeyan K, Founder and CEO" fill sizes="(max-width: 900px) 100vw, 420px" />
              <div>
                <strong>Karthikeyan K</strong>
                <span>Founder & CEO</span>
              </div>
            </div>
            <div className="founder-copy">
              <span className="eyebrow">Behind the vision</span>
              <h2>Why I Started Elevar</h2>
              <p>
                Elevar Studio was built to bridge the gap between creative artistry and business logic. We do not just make things look pretty; we make them perform.
              </p>
              <p>
                My vision is to help founders break scale with premium strategy, cinematic storytelling, and efficient content systems.
              </p>
              <div className="stat-row">
                <div><b>2+</b><span>Brands scaled</span></div>
                <div><b>35K+</b><span>Total views</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section testimonial-band">
        <div className="container">
          <div className="section-heading centered"><h2>What Our Partners Say</h2></div>
          <div className="testimonial-card tilt-card">
            <p>"The best editing agency we've worked with. They actually understand retention and distribution, which is rare in this industry."</p>
            <div><BadgeCheck size={18} /><span>Krishna Kumar, JSR Paints</span></div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-inner">
          <BarChart3 size={34} />
          <h2>Ready To Turn Your Content <span>Into Customers?</span></h2>
          <p>Stop guessing. Start growing. Book your free strategy call today and let us map out your content growth engine.</p>
          <Link href="/book-call" className="btn btn-primary">Book Your Free Strategy Call Today <ArrowRight size={16} /></Link>
        </div>
      </section>
    </main>
  );
}
