export const HERO_SCENES = [
  {
    id: 'offline',
    name: 'Offline',
    location: 'In-Person Trading Floors',
    flag: '🏛️',
    image: '/campus/terminal-lab.jpeg',
    tagline: 'Structured Trading Labs • In-Person Terminal Desks',
    session: 'Live Market Session (Active)',
    badge: 'Offline Cohort',
    tz: 'IST / GST',
  },
  {
    id: 'online',
    name: 'Online',
    location: 'Interactive Live Classrooms',
    flag: '🌐',
    image: '/campus/online-teaching-desk.png',
    tagline: 'Interactive Screen Sharing & 1-on-1 Reviews',
    session: '24/7 Global Orderflow',
    badge: 'Live Online Cohort',
    tz: 'Global Timezones',
  },
]

export default function HeroVisualBackground({ activeScene = 'offline' }) {
  const active = HERO_SCENES.find((s) => s.id === activeScene) || HERO_SCENES[0]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none bg-[#07070a]">
      {/* Atmospheric Scenic Background Layers with Smooth Crossfade */}
      {HERO_SCENES.map((scene) => (
        <div
          key={scene.id}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out filter brightness-100 contrast-115 will-change-[opacity] transform-gpu ${
            scene.id === active.id ? 'opacity-42' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url('${scene.image}')` }}
          aria-hidden="true"
        />
      ))}

      {/* Directional Contrast Gradient: Solid obsidian on left for crystal-clear text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#07070a]/95 via-[#07070a]/75 to-[#07070a]/25" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#07070a]/60 via-transparent to-[#09090b]" />

      {/* Subtle Micro-Grid Accent */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(rgba(199,205,214,0.5) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />
    </div>
  )
}
