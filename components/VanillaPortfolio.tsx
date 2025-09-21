'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import '../app/globals.css'
import styles from './VanillaPortfolio.module.css'
import { Play, X, Mail, Phone, Calendar, MessageCircle } from 'lucide-react'
import HeroCanvas from './HeroCanvas'

interface Video {
  id: number
  title: string
  category: string
  thumbnail: string
  duration: string
  youtubeId?: string
}

interface PortfolioData {
  name: string
  title: string
  tagline: string
  videos: Video[]
  tools: string[]
  clients: string[]
  stats: { label: string; value: string }[]
}

const VanillaPortfolio: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<string>('hero')
  const [isReelOpen, setIsReelOpen] = useState<boolean>(false)
  const [activeYoutubeId, setActiveYoutubeId] = useState<string | null>(null)

  const portfolioData: PortfolioData = {
    name: 'Adesada Opeyemi',
    title: 'Cinematic Video Editor',
    tagline: 'Cinematic editing and camera craft that elevates brands, films, and music.',
  videos: [
    { id: 1, title: 'LOVE LIVES HERE - JBLAZE 2025 FULL NIGERIAN MOVIE', category: 'Feature / Film', thumbnail: 'https://i.ytimg.com/vi/7SWCTZsKogg/hqdefault.jpg', duration: 'TBD', youtubeId: '7SWCTZsKogg' },
    { id: 2, title: 'GIDI LIFE 2025 FULL NIGERIAN MOVIE', category: 'Feature / Film', thumbnail: 'https://i.ytimg.com/vi/txQ6wHRLJyk/hqdefault.jpg', duration: 'TBD', youtubeId: 'txQ6wHRLJyk' },
    { id: 3, title: 'GHETTO GIRL - FULL LATEST NIGERIAN MOVIE 2024', category: 'Feature / Film', thumbnail: 'https://i.ytimg.com/vi/yL72XX3Fnu8/hq720.jpg', duration: 'TBD', youtubeId: 'yL72XX3Fnu8' },
    { id: 4, title: 'Belinda (Series) Episode 1 - Nollywood Movie', category: 'Series / Episodic', thumbnail: 'https://img.youtube.com/vi/gJj7w274V_4/maxresdefault.jpg', duration: 'TBD', youtubeId: 'gJj7w274V_4' },
    { id: 5, title: 'THE WAITER ', category: 'BTS / Promo', thumbnail: 'https://img.youtube.com/vi/t8UI1G5FQjU/maxresdefault.jpg', duration: 'TBD', youtubeId: 't8UI1G5FQjU' },
    { id: 6, title: 'Tending Realities with Mayor Sexy - [Valentine Special]', category: 'Talk / Feature', thumbnail: 'https://img.youtube.com/vi/dJeGzHMqFjA/maxresdefault.jpg', duration: 'TBD', youtubeId: 'dJeGzHMqFjA' },
    { id: 7, title: 'Real Warri Pikin on Glass House with AY', category: 'Interview', thumbnail: 'https://img.youtube.com/vi/tcFY6uw6y6g/maxresdefault.jpg', duration: 'TBD', youtubeId: 'tcFY6uw6y6g' },
    { id: 8, title: 'Glass House with Frank Edoho', category: 'Interview / TV', thumbnail: 'https://img.youtube.com/vi/OJ400LqLXzI/maxresdefault.jpg', duration: 'TBD', youtubeId: 'OJ400LqLXzI' },
    { id: 9, title: 'IF YOU WERE MINE - KENETH NWADIKE, CHINENYE ULAEGBU, FELIX OMORODION, CHIOMA NWOSU.', category: 'Feature / Film', thumbnail: 'https://img.youtube.com/vi/j367bq7Ee68/maxresdefault.jpg', duration: 'TBD', youtubeId: 'j367bq7Ee68' },
    { id: 10, title: 'LOVE ABOVE ALL THINGS - ERONINI OSINACHI, MICHEAL DAPPA, PAMELA OKOYE, QUEEN ENEBECHI, AFES MIKE.', category: 'Feature / Film', thumbnail: 'https://img.youtube.com/vi/9DAZ2D-dA0U/maxresdefault.jpg', duration: 'TBD', youtubeId: '9DAZ2D-dA0U' },
    { id: 11, title: 'LOVE AT ALL COST -JOHN EKANEM, CHRISTIAN OCHIAGHA, STEFANIA BASSEY, CHARLES UKPONG, EMMANUELLA OLOWU', category: 'Feature / Film', thumbnail: 'https://img.youtube.com/vi/dXtl8PfFpGM/maxresdefault.jpg', duration: 'TBD', youtubeId: 'dXtl8PfFpGM' },
    { id: 12, title: 'LOVING SOMEONE LIKE YOU - DORIS IFEKA, FELIX OMORODION, CHISOM UMENNADI, AJEBANTY DAVID', category: 'Feature / Film', thumbnail: 'https://img.youtube.com/vi/Or4cTsE6fNY/maxresdefault.jpg', duration: 'TBD', youtubeId: 'Or4cTsE6fNY' },
  ],
    tools: [
      'Adobe Premiere Pro',
      'DaVinci Resolve',
      'Adobe After Effects',
      'Adobe Photoshop',
      'Adobe Audition',
      'Professional Camera Operation (on-set)',
      'On-set Color & Exposure Workflow',
    ],
    clients: [
      'Mega Creations',
      'Femi Bright',
      'Ay Comedian',
      'Startimes',
      'J Blaze',
      'Pamela Okoye',
      'Stanford Films',
    ],
    stats: [
      { label: 'Projects Completed', value: '70+' },
      { label: 'Years Experience', value: '8' },
      { label: 'Clients Served', value: '25+' },
    ],
  }

  const services = [
    { title: 'Cinematography & Camera Operation', desc: 'On-set camera direction, framing, lighting collaboration and camera operation for narrative and commercial productions.' },
    { title: 'Commercial Editing', desc: 'High-impact ad cuts and branded content with concise storytelling, optimized for TV and social platforms.' },
    { title: 'Narrative & Short Film Editing', desc: 'Story-driven editing with attention to performance, rhythm, and pacing for festival-ready output.' },
    { title: 'Documentary Post-Production', desc: 'Interview structuring, archival integration and b-roll weaving to create clear narrative arcs.' },
    { title: 'Music Video Editing & Finishing', desc: 'Beat-synced cuts, stylised transitions and performance grading for music content.' },
    { title: 'Color Grading & Delivery', desc: 'Technical color pass, LUT application, and deliverables export for broadcast, web and cinema.' },
  ]

  const processSteps = [
    { step: '01', title: 'Brief & Discovery', body: 'Kickoff call or brief: define goals, moodboard, references, deliverables and timeline. We use WhatsApp/Email for quick briefs and Google Drive/WeTransfer for files.' },
    { step: '02', title: 'On-Set Collaboration / Assembly', body: 'If I’m on set I handle camera notes and selects. Otherwise I assemble selects, sync audio and build an offline edit for structure.' },
    { step: '03', title: 'Creative Edit', body: 'Develop story through cuts, pacing, temp sound design and rough color direction. We iterate until narrative clarity is achieved.' },
    { step: '04', title: 'Feedback & Revision', body: 'Two clear revision rounds included. Client feedback is collected through time-stamped notes (Frame.io, WhatsApp or email).' },
    { step: '05', title: 'Finish & Deliver', body: 'Final conform, color grade, audio mix pass, QC, and delivery (ProRes/H.264 masters + social formats). I provide download links and delivery specs.' },
  ]

  const testimonials = [
    { quote: 'Opeyemi delivered a tight commercial edit for our Lagos launch. Turnaround was quick and the visuals hit our brief exactly.', name: 'Tosin A' },
    { quote: 'Worked with Adesada on a short doc. He brought patience and craft — the final cut screened well at local festivals.', name: 'Ngozi M.' },
    { quote: 'Reliable, detail-oriented and great on-set. He helped shape our brand video and made post painless.', name: 'Kola R.' },
  ]

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const openYouTubeVideo = (youtubeId?: string) => {
    if (!youtubeId) return
    window.open(`https://www.youtube.com/watch?v=${youtubeId}`, '_blank', 'noopener,noreferrer')
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) setCurrentSection(entry.target.id)
        })
      },
      { root: null, rootMargin: '-20% 0px -20% 0px', threshold: 0.5 }
    )

    setTimeout(() => {
      document.querySelectorAll('section[id]').forEach((s) => observer.observe(s))
    }, 100)

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsReelOpen(false)
        setActiveYoutubeId(null)
      }
    }
    window.addEventListener('keydown', onKey)

    return () => {
      observer.disconnect()
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <div className={styles.site}>
      <nav className={styles.nav}>
        <div className={`${styles.container} ${styles.navRow}`}>
          <div className={styles.brand}>
            <span>{portfolioData.name}</span>
            {/* <span className={styles.brandSub}>— {portfolioData.title}</span> */}
          </div>
          <div className={styles.navLinks}>
            <button className={`${styles.navLink} ${currentSection === 'reel' ? styles.activeNavLink : ''}`} onClick={() => scrollToSection('reel')}>Reel</button>
            <button className={`${styles.navLink} ${currentSection === 'work' ? styles.activeNavLink : ''}`} onClick={() => scrollToSection('work')}>Work</button>
            <button className={`${styles.navLink} ${currentSection === 'services' ? styles.activeNavLink : ''}`} onClick={() => scrollToSection('services')}>Services</button>
            <button className={`${styles.navLink} ${currentSection === 'tools' ? styles.activeNavLink : ''}`} onClick={() => scrollToSection('tools')}>Tools</button>
            <button className={`${styles.navLink} ${currentSection === 'process' ? styles.activeNavLink : ''}`} onClick={() => scrollToSection('process')}>Process</button>
            <button className={`${styles.navLink} ${currentSection === 'testimonials' ? styles.activeNavLink : ''}`} onClick={() => scrollToSection('testimonials')}>Testimonials</button>
            <button className={`${styles.navLink} ${currentSection === 'about' ? styles.activeNavLink : ''}`} onClick={() => scrollToSection('about')}>About</button>
            <button className={`${styles.navLink} ${currentSection === 'contact' ? styles.activeNavLink : ''}`} onClick={() => scrollToSection('contact')}>Contact</button>
            <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => scrollToSection('contact')}>REQUEST QUOTE</button>
          </div>
          <button className={`${styles.btn} ${styles.btnPrimary} ${styles.navMobileCta}`} onClick={() => scrollToSection('contact')}>REQUEST QUOTE</button>
        </div>
      </nav>

      <main className={styles.main}>
        <section id="hero" className={`${styles.section}`}>
          <div className={`${styles.container} ${styles.hero}`}>
            <div className={styles.heroGrid}>
              <div>
                <h1 className={styles.heroTitle}>Editing That Moves Audiences</h1>
                <div className={styles.heroSubtitle}>{portfolioData.title}</div>
                <p className={styles.heroText}>{portfolioData.tagline}</p>
                <div className={styles.heroCtas}>
                  <button
                    className={`${styles.btn} ${styles.btnPrimary}`}
                    onClick={() => { setActiveYoutubeId(portfolioData.videos[0]?.youtubeId || null); setIsReelOpen(true) }}
                  >
                    WATCH REEL
                  </button>
                  <button className={`${styles.btn} ${styles.btnOutline}`} onClick={() => scrollToSection('work')}>VIEW WORK</button>
                </div>
              </div>
              <div className={styles.heroCanvasBox}>
                <HeroCanvas className={styles.heroImage} />
              </div>
            </div>
          </div>
        </section>

        <section className={styles.stats}>
          <div className={`${styles.container} ${styles.statsGrid}`}>
            {portfolioData.stats.map((s) => (
              <div key={s.label} className={styles.stat}>
                <div className={styles.statValue}>{s.value}</div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="reel" className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>Featured Reel</h2>
              <button
                className={`${styles.navLink}`}
                onClick={() => { setActiveYoutubeId(portfolioData.videos[0]?.youtubeId || null); setIsReelOpen(true) }}
              >
                Play Reel
              </button>
            </div>

            <div
              className={styles.reelCard}
              onClick={() => { setActiveYoutubeId(portfolioData.videos[0]?.youtubeId || null); setIsReelOpen(true) }}
            >
              <Image
                src={`https://img.youtube.com/vi/${portfolioData.videos[7]?.youtubeId}/maxresdefault.jpg`}
                alt="Featured reel thumbnail"
                fill
                style={{ objectFit: 'cover' }}
                sizes="100vw"
              />
              <div className={styles.reelPlay}>
                <div className={styles.reelPlayCircle}>
                  <Play className={styles.iconMd} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="work" className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle} style={{ textAlign: 'center', marginBottom: 24 }}>Selected Work</h2>
            <div className={styles.workGrid}>
              {portfolioData.videos.map((v) => (
                <div key={v.id} className={styles.workCard} onClick={() => openYouTubeVideo(v.youtubeId)}>
                  <Image src={v.thumbnail} alt={v.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw" style={{ objectFit: 'cover' }} />
                  <div className={styles.workOverlay}>
                    <div className={styles.reelPlayCircle}><Play className={styles.iconMd} /></div>
                  </div>
                  <div className={styles.workMeta}>
                    <div className={styles.chips}>
                      <span className={styles.chip}>{v.category}</span>
                      <span className={styles.chip}>{v.duration}</span>
                    </div>
                    <div className={styles.workTitle}>{v.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle} style={{ textAlign: 'center', marginBottom: 18 }}>Services</h2>
            <div className={styles.cardsGrid}>
              {services.map((s) => (
                <div key={s.title} className={styles.card}>
                  <div className={styles.cardTitle}>{s.title}</div>
                  <div className={styles.cardText}>{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="tools" className={styles.section}>
          <div className={styles.container}>
            <div className={styles.arsenalGrid}>
              <div className={styles.arsenalLeft}>
                <h2 className={styles.sectionTitle} style={{ marginBottom: 12 }}>Creative Arsenal</h2>
                <p className={styles.toolsInfo}>Mastery across industry-leading tools and modern post-production workflow to bring your vision to life with precision.</p>
                <div className={styles.toolsGrid}>
                  {portfolioData.tools.map((t) => (
                    <div key={t} className={styles.toolItem}><div className={styles.toolText}>{t}</div></div>
                  ))}
                </div>
              </div>
              <div className={styles.arsenalRight}>
                <div className={styles.capGrid}>
                  <div className={styles.capCard}>
                    <div className={styles.capTitle}>Edit Mastery</div>
                    <ul className={styles.capList}>
                      <li className={styles.capItem}>Commercial & Branded</li>
                      <li className={styles.capItem}>Narrative & Documentary</li>
                      <li className={styles.capItem}>Music & Performance</li>
                    </ul>
                  </div>
                  <div className={styles.capCard}>
                    <div className={styles.capTitle}>Motion / GFX</div>
                    <ul className={styles.capList}>
                      <li className={styles.capItem}>Lower Thirds & Supers</li>
                      <li className={styles.capItem}>Logo & Title Treatments</li>
                      <li className={styles.capItem}>Clean Transitions</li>
                    </ul>
                  </div>
                  <div className={styles.capCard}>
                    <div className={styles.capTitle}>Color & Finish</div>
                    <ul className={styles.capList}>
                      <li className={styles.capItem}>Look Development</li>
                      <li className={styles.capItem}>Delivery-Ready Masters</li>
                      <li className={styles.capItem}>QC & Conform</li>
                    </ul>
                  </div>
                  <div className={styles.capCard}>
                    <div className={styles.capTitle}>Sound & Delivery</div>
                    <ul className={styles.capList}>
                      <li className={styles.capItem}>Mix Integration</li>
                      <li className={styles.capItem}>Stems & Multiversioning</li>
                      <li className={styles.capItem}>Broadcast / Social Specs</li>
                    </ul>
                  </div>
                  <div className={styles.capCard}>
                    <div className={styles.capTitle}>Workflow</div>
                    <ul className={styles.capList}>
                      <li className={styles.capItem}>Proxy / Remote</li>
                      <li className={styles.capItem}>Asset Management</li>
                      <li className={styles.capItem}>Version Control</li>
                    </ul>
                  </div>
                  <div className={styles.capCard}>
                    <div className={styles.capTitle}>Collaboration</div>
                    <ul className={styles.capList}>
                      <li className={styles.capItem}>Clear Feedback Cycles</li>
                      <li className={styles.capItem}>Timely Turnarounds</li>
                      <li className={styles.capItem}>Secure Sharing</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="process" className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle} style={{ textAlign: 'center', marginBottom: 18 }}>Process</h2>
            <div className={styles.processGrid}>
              {processSteps.map((p) => (
                <div key={p.step} className={styles.processItem}>
                  <div className={styles.processStep}>{p.step}</div>
                  <div className={styles.processTitle}>{p.title}</div>
                  <div className={styles.processText}>{p.body}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle} style={{ textAlign: 'center', marginBottom: 18 }}>Testimonials</h2>
            <div className={styles.testimonialsGrid}>
              {testimonials.map((t, i) => (
                <div key={i} className={styles.testimonial}>
                  <div className={styles.testimonialQuote}>{t.quote}</div>
                  <div className={styles.testimonialName}>{t.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle} style={{ textAlign: 'center', marginBottom: 18 }}>About the Craft</h2>
            <p className={styles.toolsInfo} style={{ margin: '0 auto', maxWidth: 800 }}>
              Every frame tells a story. Every cut shapes emotion. With over 8 years of experience in cinematic storytelling, I transform raw footage
              into compelling narratives that resonate with audiences across Nigeria and beyond.
            </p>
            <p className={styles.toolsInfo} style={{ margin: '12px auto 0', maxWidth: 800 }}>
              From intimate documentaries to high-energy commercials, my approach combines technical precision with creative intuition to deliver visual experiences that captivate and inspire.
            </p>
          </div>
        </section>

        <section id="contact" className={styles.contact}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle} style={{ textAlign: 'center', marginBottom: 18 }}>Let&apos;s Create Something Extraordinary</h2>
            <p className={styles.toolsInfo} style={{ textAlign: 'center' }}>
              Ready to bring your vision to life? Let&apos;s discuss how we can craft a visual story that resonates with your audience.
            </p>
            <div className={styles.ctas}>
              <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => { setActiveYoutubeId(portfolioData.videos[0]?.youtubeId || null); setIsReelOpen(true) }}>WATCH REEL</button>
              <button className={`${styles.btn} ${styles.btnOutline}`} onClick={() => scrollToSection('work')}>VIEW WORK</button>
            </div>

            <div className={styles.contactTiles}>
              <div className={styles.contactTile}>
                <Mail className={styles.iconSm} />
                <div>
                  <div className={styles.tileLabel}>Email</div>
                  <a href="mailto:hello@brasemiu@gmail.com" className={styles.tileLink}>brasemiu@gmail.com</a>
                </div>
              </div>
              <div className={styles.contactTile}>
                <Phone className={styles.iconSm} />
                <div>
                  <div className={styles.tileLabel}>Phone</div>
                  <a href="tel:+2347066358799" className={styles.tileLink}>+234-706-635-8799</a>
                </div>
              </div>
              <div className={styles.contactTile}>
                <Calendar className={styles.iconSm} />
                <div>
                  <div className={styles.tileLabel}>Availability</div>
                  <div className={styles.tileValue}>Booking new projects this month</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {isReelOpen && (
        <div className={styles.overlay} onClick={() => { setIsReelOpen(false); setActiveYoutubeId(null) }} role="dialog" aria-modal="true">
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} aria-label="Close" onClick={() => { setIsReelOpen(false); setActiveYoutubeId(null) }}>
              <X className={styles.iconSm} />
            </button>
            {activeYoutubeId && (
              <iframe
                className="iframe"
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${activeYoutubeId}?autoplay=1&rel=0`}
                title="Showreel"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            )}
          </div>
        </div>
      )}

      <footer className={styles.footer}>
        <div className={`${styles.container} ${styles.footerRow}`}>
          <div style={{ color: 'var(--muted)' }}>&copy; 2025 {portfolioData.name}. All rights reserved.</div>
          <div className={styles.footerLinks}>
            <a href="https://m.facebook.com/brasemiu" target='_blank' className={styles.footerLink} aria-label="Facebook">Facebook</a>
            <a href="https://www.instagram.com/brasemiu" target='_blank' className={styles.footerLink} aria-label="Instagram">Instagram</a>
          </div>
        </div>
      </footer>
      <a
        href="https://wa.me/2347066358799"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.whatsappFab}
        aria-label="WhatsApp"
      >
        <MessageCircle className={styles.iconMd} />
      </a>
    </div>
  )
}

export default VanillaPortfolio
