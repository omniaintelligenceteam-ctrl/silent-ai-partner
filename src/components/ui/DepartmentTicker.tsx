'use client'

const tickerItems = [
  'Every call answered',
  'Jobs booked on the call',
  'Leads chased in minutes',
  'Reviews requested automatically',
  'Your day briefed by 7 AM',
  'Invoices chased for you',
  'Pipeline you can see',
  'Content that goes out weekly',
  'Crews routed',
  'Cash flow flagged early',
]

export function DepartmentTicker() {
  const loopItems = [...tickerItems, ...tickerItems]

  return (
    <div className="w-full overflow-hidden bg-slate-900/40">
      <div
        className="flex w-max whitespace-nowrap py-3"
        style={{ animation: 'scroll 30s linear infinite' }}
      >
        {loopItems.map((item, index) => (
          <div key={`${item}-${index}`} className="inline-flex items-center shrink-0">
            <span className="mx-2 inline-flex items-center rounded-full border border-slate-700/50 bg-slate-800/50 px-3 py-1 text-slate-400 text-sm font-mono tracking-wide">
              {item}
            </span>
            <span className="text-teal-400 text-sm font-mono tracking-wide">·</span>
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  )
}
