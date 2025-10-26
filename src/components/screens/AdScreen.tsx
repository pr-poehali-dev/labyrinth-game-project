import { useEffect, useState } from 'react';

interface AdScreenProps {
  onComplete: () => void;
}

const AD_CONFIG = {
  enabled: true,
  backgroundColor: '#00FA9A',
  imageUrl: '/lemonade.png',
  textColor: '#000000',
  duration: 5000,
};

const AdScreen = ({ onComplete }: AdScreenProps) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (!AD_CONFIG.enabled) {
      onComplete();
      return;
    }

    const timer1 = setTimeout(() => setStage(1), 0);
    const timer2 = setTimeout(() => setStage(2), 3000);
    const timer3 = setTimeout(() => setStage(3), 4000);
    const timer4 = setTimeout(() => onComplete(), AD_CONFIG.duration);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  if (!AD_CONFIG.enabled) return null;

  return (
    <div 
      className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden pixel-font"
      style={{ 
        backgroundColor: AD_CONFIG.backgroundColor,
        backgroundImage: `
          repeating-linear-gradient(0deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 1px, transparent 1px, transparent 2px),
          repeating-linear-gradient(90deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 1px, transparent 1px, transparent 2px)
        `,
        backgroundSize: '4px 4px',
        imageRendering: 'pixelated'
      }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <div 
          className={`transition-all duration-1000 ${
            stage >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          } ${
            stage >= 2 ? 'scale-150 -translate-y-12' : ''
          }`}
        >
          <div 
            className="relative w-48 h-48 md:w-72 md:h-72 flex items-center justify-center"
            style={{
              animation: stage >= 1 && stage < 2 ? 'pixelPulse 1s steps(4) infinite' : 'none',
            }}
          >
            <div 
              className="text-8xl md:text-9xl retro-shadow"
              style={{
                filter: 'contrast(1.2) brightness(1.1)',
                imageRendering: 'pixelated',
              }}
            >
              🍋
            </div>
            
            {stage >= 1 && stage < 2 && (
              <div className="absolute inset-0 flex items-center justify-center">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-yellow-300"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${i * 45}deg) translateY(-80px)`,
                      animation: 'sparkle 0.8s ease-in-out infinite',
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div 
          className={`absolute bottom-16 md:bottom-24 transition-all duration-500 ${
            stage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div 
            className="relative px-8 py-4 retro-shadow"
            style={{
              backgroundColor: '#FFD700',
              border: '4px solid #000000',
            }}
          >
            <h1 
              className="text-3xl md:text-5xl font-bold retro-text-shadow pixel-font"
              style={{ 
                color: AD_CONFIG.textColor,
                letterSpacing: '0.1em',
                lineHeight: '1.8'
              }}
            >
              НОВИНКА
            </h1>
            
            <div className="absolute -top-1 -left-1 w-3 h-3 bg-black"></div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-black"></div>
            <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-black"></div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-black"></div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pixelPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default AdScreen;