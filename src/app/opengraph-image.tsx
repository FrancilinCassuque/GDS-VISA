import { ImageResponse } from 'next/og'

// Image metadata
export const alt = 'home Page'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// Image generation
export default async function Image() {

  return new ImageResponse(
    (
      <div style={{
        margin: '3rem auto',
        maxWidth: '100%',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        position: 'relative',
        zIndex: 10,
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '48rem',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: 'rgba(0, 119, 182, 0.2)',
            backdropFilter: 'blur(4px)',
            paddingLeft: '1rem',
            paddingRight: '1rem',
            paddingTop: '0.5rem',
            paddingBottom: '0.5rem',
            borderRadius: '9999px',
            marginBottom: '1rem'
          }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                width: '1.25rem',
                height: '1.25rem',
                color: '#00b4d8'
              }}>
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
              <path d="M2 12h20"></path>
            </svg>
            <span style={{
              fontSize: '0.875rem',
              lineHeight: '1.25rem',
              fontWeight: 500
            }}>Consultoria de Vistos Internacionais</span>
          </div>
          <h1 style={{
            fontSize: '2.25rem',
            lineHeight: '2.5rem',
            fontWeight: 700,
            marginBottom: '1.5rem'
          }}>Realize seu sonho de morar no exterior</h1>
          <p style={{
            fontSize: '1.125rem',
            lineHeight: '1.75rem',
            marginBottom: '2rem',
            opacity: 0.9
          }}>A Gota D' Sol oferece consultoria especializada para obtenção de vistos em diversos países, com atendimento personalizado e alta taxa de aprovação.</p>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            justifyContent: 'center'
          }}>
            <a
              href="/service"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                backgroundColor: '#0077b6',
                color: 'white',
                paddingLeft: '1.5rem',
                paddingRight: '1.5rem',
                paddingTop: '0.75rem',
                paddingBottom: '0.75rem',
                borderRadius: '0.5rem',
                fontWeight: 500,
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.backgroundColor = 'rgba(0, 119, 182, 0.9)';
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.backgroundColor = '#0077b6';
              }}
            >
              Conheça nossos serviços
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  width: '1.25rem',
                  height: '1.25rem'
                }}>
                <path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path>
              </svg>
            </a>
            <a
              href="/contato"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(4px)',
                color: 'white',
                paddingLeft: '1.5rem',
                paddingRight: '1.5rem',
                paddingTop: '0.75rem',
                paddingBottom: '0.75rem',
                borderRadius: '0.5rem',
                fontWeight: 500,
                transition: 'background-color 0.2s',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              Fale conosco
            </a>
          </div>
        </div>
        <div style={{
          marginTop: '4rem',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1.5rem'
        }}>
          {[
            "Alta taxa de aprovação",
            "Atendimento personalizado",
            "Consultores especializados"
          ].map((text, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(4px)',
                paddingLeft: '1rem',
                paddingRight: '1rem',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem',
                borderRadius: '0.5rem'
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  width: '1.25rem',
                  height: '1.25rem',
                  color: '#00b4d8'
                }}>
                <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path>
                <path d="m9 12 2 2 4-4"></path>
              </svg>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
    }
  )
}