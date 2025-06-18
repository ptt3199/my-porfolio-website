import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Phuong Tan Thanh - Full Stack Developer Portfolio'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'system-ui',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: 'bold',
              marginBottom: 20,
            }}
          >
            Phuong Tan Thanh
          </div>
          <div
            style={{
              fontSize: 40,
              opacity: 0.9,
              marginBottom: 10,
            }}
          >
            Full Stack Developer
          </div>
          <div
            style={{
              fontSize: 32,
              opacity: 0.8,
              display: 'flex',
              gap: 20,
            }}
          >
            <span>FastAPI</span>
            <span>•</span>
            <span>PostgreSQL</span>
            <span>•</span>
            <span>DevOps</span>
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            fontSize: 24,
            opacity: 0.7,
          }}
        >
          thanhpt.xyz
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
} 