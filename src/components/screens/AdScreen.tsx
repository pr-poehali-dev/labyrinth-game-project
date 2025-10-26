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
      className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{ 
        background: `linear-gradient(135deg, ${AD_CONFIG.backgroundColor} 0%, rgba(255,255,255,0.3) 50%, ${AD_CONFIG.backgroundColor} 100%)`
      }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <div 
          className={`transition-all duration-1000 ${
            stage >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          } ${
            stage >= 2 ? 'scale-125 -translate-y-8' : ''
          }`}
          style={{
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.2))',
          }}
        >
          <div 
            className="relative w-64 h-64 md:w-96 md:h-96 flex items-center justify-center"
            style={{
              animation: stage >= 1 && stage < 2 ? 'pulse 2s ease-in-out infinite' : 'none',
            }}
          >
            <div className="text-9xl">🍋</div>
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)',
                animation: 'glow 2s ease-in-out infinite',
              }}
            />
          </div>
        </div>

        <div 
          className={`absolute bottom-20 md:bottom-32 transition-all duration-700 ${
            stage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h1 
            className="text-6xl md:text-8xl font-black tracking-wider"
            style={{ 
              fontFamily: 'Fredoka, sans-serif',
              color: AD_CONFIG.textColor,
              textShadow: '0 4px 20px rgba(255,255,255,0.5)',
              letterSpacing: '0.1em'
            }}
          >
            НОВИНКА
          </h1>
        </div>
      </div>

      <style>{`
        @keyframes glow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
};

export default AdScreen;
