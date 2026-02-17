import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const alt = 'Silent AI Partner - Workflow Automation for Contractors'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const logoData = await readFile(join(process.cwd(), 'public', 'logo-bolt.png'))
  const logoSrc = `data:image/png;base64,${logoData.toString('base64')}`

  const interBold = await fetch(
    'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf'
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          background: '#1a1f2e',
          padding: '80px',
          alignItems: 'center',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={250} height={250} alt="" />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '60px',
            gap: '20px',
          }}
        >
          <span
            style={{
              fontSize: 60,
              fontWeight: 700,
              color: 'white',
              letterSpacing: '0.15em',
            }}
          >
            SILENT AI PARTNER
          </span>
          <span
            style={{
              fontSize: 36,
              color: '#f97316',
            }}
          >
            The Workflow Automation Built for Contractors
          </span>
          <span
            style={{
              fontSize: 44,
              fontWeight: 700,
              color: 'white',
              lineHeight: 1.2,
            }}
          >
            Give Your Team 20 Hours Back Every Week
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: interBold,
          weight: 700,
          style: 'normal',
        },
      ],
    }
  )
}
