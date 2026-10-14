import { useState } from 'react'
import { Link } from 'react-router-dom'

/*
  Dubai Campus & Executive Trading Hub Showcase:
  Displays iconic, famous Dubai skyline visuals, Business Bay campus highlights,
  and interactive campus previews.
*/

const CAMPUSES = [
  {
    id: 'india',
    title: 'India Trading & Technology Lab',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=85',
    hours: 'Mon – Sat, 10:00 – 19:00 IST',
    perks: [
      'Physical classroom trading floor',
      'Indian Equity & Global Forex masterclasses',
      'Dedicated mentor workstations',
      'Peer trading circles & group review sessions',
    ],
  },
  {
    id: 'dubai',
    title: 'Dubai Business Bay Campus',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=85',
    hours: 'Sat – Thu, 10:00 – 19:00 GST',
    perks: [
      'In-person multi-monitor trading terminals',
      'Live market session execution with lead mentors',
      'Small cohorts capped at 15 traders',
      'Student trading lounge & peer networking',
    ],
  },
  {
    id: 'online',
    title: 'Live Interactive Online Cohort',
    image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1200&q=85',
    hours: 'Evening & Weekend Batches (GST / IST)',
    perks: [
      'Live interactive screen-sharing & chart markups',
      'Ask questions directly to mentors in real time',
      '24/7 session recordings in your student portal',
      'Weekly 1-on-1 mentor trade reviews',
    ],
  },
]

export default function DubaiCampusShowcase({ activeId = 'india', onSelect }) {
  const [localId, setLocalId] = useState('india')
  const currentId = activeId || localId
  const handleSelect = (id) => {
    setLocalId(id)
    if (onSelect) onSelect(id)
  }

  const activeCampus = CAMPUSES.find((c) => c.id === currentId) || CAMPUSES[0]

  return (
    <div className="relative">
      {/* Main Crisp Showcase Card */}
      <div className="relative rounded-2xl border border-signal/30 bg-[#101016]/95 shadow-2xl backdrop-blur-xl overflow-hidden">
        
        {/* Campus Segmented Switcher */}
        <div className="border-b border-white/10 bg-black/60 p-2 sm:p-2.5">
          <div className="grid grid-cols-3 gap-1.5 w-full">
            {CAMPUSES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => handleSelect(c.id)}
                className={`rounded-lg py-2 px-1 sm:px-2 text-center text-xs font-bold transition-all ${
                  currentId === c.id
                    ? 'bg-signal text-black font-extrabold'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {c.id === 'dubai' && 'Dubai Campus'}
                {c.id === 'online' && 'Live Online'}
                {c.id === 'india' && 'India Lab'}
              </button>
            ))}
          </div>
        </div>

        {/* High-Definition Photographic Showcase Window */}
        <div className="relative h-52 sm:h-60 w-full overflow-hidden">
          <img
            src={activeCampus.image}
            alt={activeCampus.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
            loading="eager"
          />
          {/* Subtle Contrast Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#101016] via-[#101016]/30 to-black/40" />

          {/* Bottom Title on Image */}
          <div className="absolute bottom-3 left-4 right-4">
            <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white leading-tight drop-shadow-md min-h-[2.8rem] sm:min-h-[3.2rem] flex items-center">
              {activeCampus.title}
            </h3>
          </div>
        </div>

        {/* Structured Campus Features List */}
        <div className="p-4 sm:p-5 space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs text-white/85">
            {activeCampus.perks.map((perk) => (
              <p key={perk} className="border-l border-white/15 pl-3 leading-snug">{perk}</p>
            ))}
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between border-t border-white/10 pt-3.5 text-xs">
            <span className="text-white/60 font-medium">{activeCampus.hours}</span>
            <Link to="/contact" className="font-bold text-signal hover:underline">
              Schedule a campus visit
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
