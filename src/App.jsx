import { useEffect, useRef, useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  ChevronRight,
  Clock3,
  Headphones,
  Instagram,
  MapPin,
  MessageCircle,
  RefreshCcw,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Star,
  Users,
  X,
} from 'lucide-react'

const STORE = {
  instagram: 'https://www.instagram.com/goldphone.cg/',
  whatsapp: '5583999063617',
  whatsappMessage: 'Olá! Vim pelo site da Gold Phone e gostaria de saber quais aparelhos estão disponíveis.',
  address: 'Av. Pres. Getúlio Vargas, 575 • 15º andar • Sala 1511 • Centro, Campina Grande - PB',
  maps: 'https://www.google.com/maps/search/?api=1&query=Gold+Phone+Campina+Grande+PB',
}

const products = [
  {
    eyebrow: 'PRO EXPERIENCE',
    name: 'iPhone 17 Pro',
    copy: 'Design Pro, câmeras avançadas e performance para quem quer o máximo.',
    image: 'https://www.apple.com/newsroom/images/2025/09/apple-unveils-iphone-17-pro-and-iphone-17-pro-max/article/Apple-iPhone-17-Pro-color-lineup-250909_inline.jpg.large_2x.jpg',
    tone: 'orange',
  },
  {
    eyebrow: 'ESSENCIAL',
    name: 'iPhone 17',
    copy: 'A experiência iPhone com tela fluida, câmeras versáteis e visual sofisticado.',
    image: '/assets/iphone-17-transparent.png',
    imageWidth: 1674,
    imageHeight: 940,
    tone: 'blue',
  },
  {
    eyebrow: 'ULTRAFINO',
    name: 'iPhone Air',
    copy: 'Leve, elegante e fino. Um iPhone feito para chamar atenção até de perfil.',
    image: '/assets/iphone-air-transparent.png',
    imageWidth: 1484,
    imageHeight: 1060,
    tone: 'gold',
  },
]

const categories = [
  { icon: Smartphone, title: 'iPhones', text: 'Modelos selecionados, novos e seminovos.' },
  { icon: Headphones, title: 'Áudio', text: 'JBL e opções para levar sua música com você.' },
  { icon: ShoppingBag, title: 'Acessórios', text: 'Proteção, energia e estilo para o seu aparelho.' },
  { icon: RefreshCcw, title: 'Troca', text: 'Use seu aparelho atual para facilitar o próximo upgrade.' },
]

const reviews = [
  { name: 'Experiência Gold', text: 'Atendimento próximo, compra segura e cuidado em cada detalhe.' },
  { name: 'Seu próximo upgrade', text: 'Uma experiência de compra pensada para ser simples, rápida e premium.' },
  { name: 'Presença local', text: 'Atendimento em Campina Grande com espaço físico no coração da cidade.' },
]

function whatsappUrl(message = STORE.whatsappMessage) {
  return `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(message)}`
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setOpen(false)

  return (
    <nav className={`gold-nav ${scrolled ? 'is-scrolled' : ''}`} aria-label="Navegação principal">
      <div className="container-fluid gold-container nav-inner">
        <a className="brand-mark" href="#inicio" onClick={close} aria-label="Gold Phone - início">
          <img src="/assets/goldphone-logo.png" alt="Gold Phone" width="54" height="54" />
          <span className="brand-copy">
            <strong>GOLD PHONE</strong>
            <small>Campina Grande</small>
          </span>
        </a>

        <div id="gold-nav-links" className={`nav-links ${open ? 'open' : ''}`}>
          <a href="#aparelhos" onClick={close}>Aparelhos</a>
          <a href="#experiencia" onClick={close}>Experiência Gold</a>
          <a href="#troca" onClick={close}>Troca</a>
          <a href="#loja" onClick={close}>Loja</a>
          <a href={STORE.instagram} target="_blank" rel="noreferrer" onClick={close}>Instagram</a>
          <a className="nav-cta" href={whatsappUrl()} target="_blank" rel="noreferrer" onClick={close}>
            Falar com a Gold <ArrowRight size={16} />
          </a>
        </div>

        <button className="menu-button" type="button" onClick={() => setOpen((v) => !v)} aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-controls="gold-nav-links" aria-expanded={open}>
          {open ? <X size={24} /> : <span className="menu-lines"><i /><i /></span>}
        </button>
      </div>
    </nav>
  )
}

function PhoneScene() {
  const sceneRef = useRef(null)
  const frameRef = useRef(0)

  const onMove = (event) => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return
    const rect = sceneRef.current?.getBoundingClientRect()
    if (!rect) return
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(() => {
      sceneRef.current?.style.setProperty('--rotate-x', `${py * -4}deg`)
      sceneRef.current?.style.setProperty('--rotate-y', `${px * 5}deg`)
    })
  }

  const reset = () => {
    cancelAnimationFrame(frameRef.current)
    sceneRef.current?.style.setProperty('--rotate-x', '0deg')
    sceneRef.current?.style.setProperty('--rotate-y', '0deg')
  }

  useEffect(() => () => cancelAnimationFrame(frameRef.current), [])

  return (
    <div
      className="hero-visual hero-visual-premium"
      ref={sceneRef}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      <div className="hero-premium-ambient" aria-hidden="true" />

      <div className="hero-premium-stage">
        <picture className="hero-premium-picture">
          <source media="(max-width: 600px)" srcSet="/assets/goldphone-hero-premium-mobile.png" />
          <img
            className="hero-premium-art"
            src="/assets/goldphone-hero-premium.png"
            alt="Gold Phone Experience com iPhone dourado e smartphone frontal"
            width="1448"
            height="1086"
            fetchpriority="high"
            draggable="false"
          />
        </picture>
        <div className="hero-premium-reflection" aria-hidden="true" />
      </div>
    </div>
  )
}

function Hero() {
  return (
    <header id="inicio" className="hero-section">
      <div className="hero-noise" />
      <div className="hero-wordmark">GOLD</div>
      <div className="container-fluid gold-container hero-grid">
        <div className="hero-copy">
          <div className="eyebrow"><span /> TECNOLOGIA COM PRESENÇA</div>
          <h1>Seu próximo celular merece uma experiência <em>Gold.</em></h1>
          <p>
            iPhones, acessórios e tecnologia com atendimento próximo em Campina Grande. Entre,
            escolha seu próximo upgrade e fale direto com a nossa equipe.
          </p>
          <div className="hero-actions">
            <a className="gold-button" href="#aparelhos">
              Ver aparelhos <ArrowRight size={18} />
            </a>
            <a className="ghost-button" href={whatsappUrl()} target="_blank" rel="noreferrer">
              <MessageCircle size={18} /> WhatsApp
            </a>
          </div>
          <div className="hero-proof">
            <div><strong>5.0</strong><span><Star size={14} fill="currentColor" /> avaliação no Google</span></div>
            <i />
            <div><strong>Gold</strong><span>atendimento personalizado</span></div>
          </div>
        </div>
        <PhoneScene />
      </div>
      <a className="scroll-hint" href="#aparelhos" aria-label="Rolar para aparelhos"><ArrowDown size={18} /></a>
    </header>
  )
}

function Marquee() {
  const text = 'IPHONES  •  ACESSÓRIOS  •  JBL  •  TROCA  •  EXPERIÊNCIA GOLD  •  CAMPINA GRANDE  •  '
  return (
    <div className="gold-marquee" aria-hidden="true">
      <div>{text}{text}{text}</div>
    </div>
  )
}

function Products() {
  const [active, setActive] = useState(0)
  const current = products[active]
  return (
    <section id="aparelhos" className="products-section section-space">
      <div className="container-fluid gold-container">
        <div className="section-heading d-flex flex-column flex-lg-row justify-content-between align-items-lg-end gap-4">
          <div>
            <div className="eyebrow"><span /> VITRINE GOLD</div>
            <h2>Escolha seu próximo <em>iPhone.</em></h2>
          </div>
          <p>Uma vitrine visual para descobrir o estilo ideal. Consulte modelos, cores, capacidades e disponibilidade com a equipe.</p>
        </div>

        <div className={`product-showcase tone-${current.tone}`}>
          <div className="showcase-copy">
            <span className="showcase-index">0{active + 1}</span>
            <div className="showcase-eyebrow">{current.eyebrow}</div>
            <h3>{current.name}</h3>
            <p>{current.copy}</p>
            <a href={whatsappUrl(`Olá! Vim pelo site e gostaria de consultar disponibilidade do ${current.name}.`)} target="_blank" rel="noreferrer">
              Consultar disponibilidade <ArrowRight size={17} />
            </a>
          </div>

          <div className="showcase-image-wrap">
            <div className="showcase-glow" />
            <img src={current.image} alt={current.name} loading="lazy" width={current.imageWidth ?? 1200} height={current.imageHeight ?? 800} referrerPolicy="no-referrer" />
            <div className="image-caption">Imagem de referência do produto</div>
          </div>

          <div className="product-tabs" role="group" aria-label="Modelos em destaque">
            {products.map((product, index) => (
              <button
                key={product.name}
                className={index === active ? 'active' : ''}
                type="button"
                onClick={() => setActive(index)}
                aria-pressed={index === active}
              >
                <span>0{index + 1}</span>
                {product.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Categories() {
  return (
    <section className="categories-section pb-5">
      <div className="container-fluid gold-container">
        <div className="category-grid">
          {categories.map(({ icon: Icon, title, text }, index) => (
            <article className="category-card" key={title}>
              <span className="category-number">0{index + 1}</span>
              <div className="category-icon"><Icon size={25} /></div>
              <h3>{title}</h3>
              <p>{text}</p>
              <ChevronRight size={20} className="category-arrow" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section id="experiencia" className="experience-section section-space">
      <div className="container-fluid gold-container experience-grid">
        <div className="experience-visual">
          <div className="photo-card photo-main">
            <div className="photo-overlay" />
            <span className="photo-label">GOLD PHONE</span>
            <div className="photo-word">GOLD</div>
          </div>
          <div className="experience-badge">
            <Users size={20} />
            <div><strong>Atendimento humano</strong><small>do primeiro contato ao pós-venda</small></div>
          </div>
        </div>

        <div className="experience-copy">
          <div className="eyebrow dark"><span /> ISSO É GOLD PHONE</div>
          <h2>Mais do que vender tecnologia. <em>Fazer parte do seu upgrade.</em></h2>
          <p>
            A Gold Phone aparece nas redes com rosto, relacionamento e presença. O site segue a mesma ideia:
            uma marca viva, próxima e com personalidade — sem parecer catálogo genérico.
          </p>
          <div className="experience-points">
            <div><ShieldCheck size={22} /><span><strong>Compra segura</strong><small>Orientação para escolher com confiança.</small></span></div>
            <div><MessageCircle size={22} /><span><strong>Atendimento direto</strong><small>Conversa rápida com a equipe pelo WhatsApp.</small></span></div>
            <div><Sparkles size={22} /><span><strong>Experiência Gold</strong><small>Identidade, cuidado e apresentação premium.</small></span></div>
          </div>
          <a className="black-button" href={STORE.instagram} target="_blank" rel="noreferrer">
            <Instagram size={18} /> Conhecer o Instagram
          </a>
        </div>
      </div>
    </section>
  )
}

function TradeIn() {
  return (
    <section id="troca" className="trade-section section-space">
      <div className="trade-orb orb-left" />
      <div className="trade-orb orb-right" />
      <div className="container-fluid gold-container trade-grid">
        <div>
          <div className="eyebrow"><span /> UPGRADE INTELIGENTE</div>
          <h2>Seu usado pode abrir caminho para o <em>próximo.</em></h2>
          <p>Fale com a Gold Phone, envie os dados do seu aparelho e consulte as condições de troca disponíveis.</p>
          <a className="gold-button" href={whatsappUrl('Olá! Vim pelo site da Gold Phone e gostaria de avaliar meu aparelho para troca.')} target="_blank" rel="noreferrer">
            Avaliar meu aparelho <RefreshCcw size={18} />
          </a>
        </div>
        <div className="trade-phones" aria-hidden="true">
          <div className="mini-phone old-phone"><span>SEU</span><strong>USADO</strong></div>
          <div className="trade-arrow"><ArrowRight /></div>
          <div className="mini-phone new-phone"><span>NOVO</span><strong>GOLD</strong></div>
        </div>
      </div>
    </section>
  )
}

function SocialProof() {
  return (
    <section className="proof-section section-space">
      <div className="container-fluid gold-container">
        <div className="section-heading text-center mx-auto proof-heading">
          <div className="eyebrow justify-content-center"><span /> PRESENÇA QUE GERA CONFIANÇA</div>
          <h2>Uma experiência que continua <em>depois da compra.</em></h2>
        </div>
        <div className="review-grid">
          {reviews.map((review, index) => (
            <article key={review.name} className="review-card">
              <div className="review-stars">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}</div>
              <p>“{review.text}”</p>
              <div className="review-person">
                <span>G{index + 1}</span>
                <div><strong>{review.name}</strong><small>Gold Phone • Campina Grande</small></div>
              </div>
            </article>
          ))}
        </div>
        <div className="google-score">
          <strong>5.0</strong>
          <div><span><Star size={17} fill="currentColor" /><Star size={17} fill="currentColor" /><Star size={17} fill="currentColor" /><Star size={17} fill="currentColor" /><Star size={17} fill="currentColor" /></span><small>avaliação pública no Google</small></div>
        </div>
      </div>
    </section>
  )
}

function Location() {
  const hours = [
    ['Segunda a sexta', '08:00 — 18:00'],
    ['Sábado', '08:00 — 13:00'],
  ]

  return (
    <section id="loja" className="location-section section-space">
      <div className="container-fluid gold-container location-grid">
        <div className="location-copy">
          <div className="eyebrow"><span /> VISITE A GOLD</div>
          <h2>Campina Grande tem endereço <em>Gold.</em></h2>
          <p className="location-address"><MapPin size={22} /> {STORE.address}</p>
          <div className="hours-card">
            <Clock3 size={22} />
            <div>
              {hours.map(([day, time]) => <div className="hour-row" key={day}><span>{day}</span><strong>{time}</strong></div>)}
            </div>
          </div>
          <div className="location-actions">
            <a className="gold-button" href={STORE.maps} target="_blank" rel="noreferrer">Abrir no mapa <MapPin size={18} /></a>
            <a className="ghost-button" href={STORE.instagram} target="_blank" rel="noreferrer"><Instagram size={18} /> @goldphone.cg</a>
          </div>
        </div>

        <a className="map-art" href={STORE.maps} target="_blank" rel="noreferrer" aria-label="Abrir localização da Gold Phone no mapa">
          <div className="map-grid-lines" />
          <div className="map-road road-one" />
          <div className="map-road road-two" />
          <div className="map-road road-three" />
          <div className="map-pin"><MapPin size={25} /><span>GOLD PHONE</span></div>
          <div className="map-caption">Centro • Campina Grande</div>
        </a>
      </div>
    </section>
  )
}

function ClosingCTA() {
  return (
    <section className="closing-section">
      <div className="closing-word">GOLD</div>
      <div className="container-fluid gold-container closing-content">
        <img src="/assets/goldphone-logo.png" alt="Gold Phone" width="145" height="145" loading="lazy" />
        <div>
          <span>SEU PRÓXIMO CELULAR</span>
          <h2>pode ser <em>GOLD.</em></h2>
        </div>
        <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="closing-button">
          Falar com a Gold Phone <ArrowRight size={20} />
        </a>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-fluid gold-container footer-grid">
        <div className="footer-brand">
          <img src="/assets/goldphone-logo.png" alt="Gold Phone" width="70" height="70" loading="lazy" />
          <p>Tecnologia, presença e atendimento em Campina Grande.</p>
        </div>
        <div>
          <strong>Navegue</strong>
          <a href="#aparelhos">Aparelhos</a>
          <a href="#experiencia">Experiência Gold</a>
          <a href="#troca">Troca</a>
        </div>
        <div>
          <strong>Contato</strong>
          <a href={STORE.instagram} target="_blank" rel="noreferrer">Instagram</a>
          <a href={whatsappUrl()} target="_blank" rel="noreferrer">WhatsApp</a>
          <a href={STORE.maps} target="_blank" rel="noreferrer">Localização</a>
        </div>
        <div className="footer-note">
          <span>GOLD PHONE © {new Date().getFullYear()}</span>
          <small>Imagens de produtos usadas como referência visual. Consulte disponibilidade com a loja.</small>
        </div>
      </div>
    </footer>
  )
}

function App() {
  const progressRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div className="scroll-progress" ref={progressRef} aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Products />
        <Categories />
        <Experience />
        <TradeIn />
        <SocialProof />
        <Location />
        <ClosingCTA />
      </main>
      <Footer />
      <a className="whatsapp-float" href={whatsappUrl()} target="_blank" rel="noreferrer" aria-label="Falar com a Gold Phone no WhatsApp">
        <MessageCircle size={25} />
        <span>Fale com a Gold</span>
      </a>
    </>
  )
}

export default App
