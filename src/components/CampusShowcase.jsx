import { useState } from 'react'
import { Link } from 'react-router-dom'

const LOCATIONS = [
  {
    id: 'offline',
    title: 'Offline',
    image: '/campus/offline-classroom-session.jpg',
    hours: 'Mon – Sat, 10:00 – 19:00 IST / GST',
    perks: [
      'In-person multi-monitor terminal desks',
      'Live market session execution with lead mentors',
      'Small cohorts capped at 15 traders',
      'Student lounge & peer networking',
    ],
  },
  {
    id: 'online',
    title: 'Online',
    image: '/campus/online-study-student.jpg',
    hours: 'Evening & Weekend Batches (GST / IST)',
    perks: [
      'Live interactive screen-sharing & chart markups',
      'Ask questions directly to mentors in real time',
      'Dedicated study resources & curriculum in student portal',
      'Weekly 1-on-1 mentor assignment reviews',
    ],
  },
]

export default function CampusShowcase({ activeId = 'offline', onSelect }) {
  const [localId, setLocalId] = useState('offline')
  const currentId = activeId || localId
  const handleSelect = (id) => {
    setLocalId(id)
    if (onSelect) onSelect(id)
  }

  const activeLocation = LOCATIONS.find((c) => c.id === currentId) || LOCATIONS[0]

  return (
    <div className="relative group/showcase">
      {/* Radiant Halo Ambient Glow */}
      <div
        className="absolute -inset-2 rounded-[2rem] bg-gradient-to-tr from-signal/45 via-white/20 to-signal/45 opacity-80 blur-2xl transition-all duration-700 -z-10 group-hover/showcase:opacity-100 group-hover/showcase:blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -inset-0.5 rounded-2xl bg-gradient-to-b from-signal/50 via-white/20 to-signal/30 opacity-75 blur-sm -z-10"
        aria-hidden="true"
      />

      <div className="relative rounded-2xl border border-white/25 bg-[#101016]/95 backdrop-blur-xl overflow-hidden shadow-[0_0_50px_rgba(216,221,227,0.22)]">

        {/* Location Segmented Switcher */}
        <div className="border-b border-white/10 bg-black/60 p-2 sm:p-2.5">
          <div className="grid grid-cols-2 gap-1.5 w-full">
            {LOCATIONS.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => handleSelect(c.id)}
                className={`rounded-lg py-2 px-1 sm:px-2 text-center text-xs font-bold transition-all ${
                  currentId === c.id
                    ? 'bg-signal text-black font-extrabold shadow-sm'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {c.title}
              </button>
            ))}
          </div>
        </div>

        {/* High-Definition Photographic Showcase Window */}
        <div className="relative h-52 sm:h-60 w-full overflow-hidden">
          <img
            key={activeLocation.id}
            src={activeLocation.image}
            alt={activeLocation.title}
            className="photo-fade h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
            loading="eager"
          />
          {/* Subtle Contrast Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#101016] via-[#101016]/30 to-black/40" />

          {/* Bottom Title on Image */}
          <div className="absolute bottom-3 left-4 right-4">
            <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white leading-tight drop-shadow-md min-h-[2.8rem] sm:min-h-[3.2rem] flex items-center">
              {activeLocation.title}
            </h3>
          </div>
        </div>

        {/* Structured Features List */}
        <div className="p-4 sm:p-5 space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs text-white/85">
            {activeLocation.perks.map((perk) => (
              <p key={perk} className="border-l border-white/15 pl-3 leading-snug">{perk}</p>
            ))}
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between border-t border-white/10 pt-3.5 text-xs">
            <span className="text-white/60 font-medium">{activeLocation.hours}</span>
            <Link to="/contact" className="font-bold text-signal hover:underline">
              Schedule a visit
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
