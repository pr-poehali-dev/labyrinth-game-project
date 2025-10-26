import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface SplashScreenProps {
  onStart: () => void;
}

const SplashScreen = ({ onStart }: SplashScreenProps) => {
  return (
    <div className="w-full h-full flex items-center justify-center p-4 animate-fade-in" style={{
      backgroundColor: '#1a1a2e',
      backgroundImage: `
        repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 2px, transparent 2px, transparent 4px),
        repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 2px, transparent 2px, transparent 4px)
      `,
      backgroundSize: '8px 8px'
    }}>
      <Card className="max-w-2xl w-full retro-shadow pixel-font" style={{
        backgroundColor: '#0f3460',
        border: '6px solid #16213e',
        borderRadius: 0,
        padding: '2rem'
      }}>
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold retro-text-shadow pixel-font animate-pulse" style={{ 
              color: '#e94560',
              lineHeight: '1.8'
            }}>
              ЛАБИРИНТ
            </h1>
            <p className="text-sm md:text-base pixel-font" style={{ 
              color: '#ffd700',
              lineHeight: '1.8',
              marginTop: '1rem'
            }}>
              Собирай монетки,<br/>избегай ловушек!
            </p>
          </div>

          <div className="retro-shadow" style={{
            backgroundColor: '#16213e',
            border: '4px solid #0f3460',
            padding: '1.5rem',
            borderRadius: 0
          }}>
            <h2 className="text-lg md:text-xl font-bold pixel-font" style={{ 
              color: '#00d9ff',
              lineHeight: '1.8',
              marginBottom: '1rem'
            }}>
              ПРАВИЛА ИГРЫ
            </h2>
            <ul className="text-left space-y-3 text-xs md:text-sm max-w-md mx-auto pixel-font" style={{
              color: '#ffffff',
              lineHeight: '1.8'
            }}>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🪙</span>
                <span>Собери все монетки на уровне</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">❓</span>
                <span>Ответь правильно на вопрос викторины</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">💣</span>
                <span>Попал в ловушку? Начинаешь с первого уровня!</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🏆</span>
                <span>Пройди 3 уровня и стань победителем!</span>
              </li>
            </ul>
          </div>

          <Button
            onClick={onStart}
            size="lg"
            className="text-base md:text-xl px-8 py-6 retro-shadow hover:scale-105 transition-transform pixel-font"
            style={{ 
              backgroundColor: '#e94560',
              color: '#ffffff',
              border: '4px solid #c93a50',
              borderRadius: 0,
              lineHeight: '1.8'
            }}
          >
            START GAME
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SplashScreen;