import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface FinalScreenProps {
  totalCoins: number;
  onPlayAgain: () => void;
}

const FinalScreen = ({ totalCoins, onPlayAgain }: FinalScreenProps) => {
  return (
    <div className="w-full h-full flex items-center justify-center p-4 animate-fade-in pixel-font" style={{
      backgroundColor: '#1a1a2e',
      backgroundImage: `
        repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 2px, transparent 2px, transparent 4px),
        repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 2px, transparent 2px, transparent 4px)
      `,
      backgroundSize: '8px 8px'
    }}>
      <Card className="max-w-2xl w-full retro-shadow animate-scale-in" style={{
        backgroundColor: '#0f3460',
        border: '6px solid #16213e',
        borderRadius: 0,
        padding: '2rem'
      }}>
        <div className="text-center space-y-8">
          <div className="animate-bounce mb-6">
            <h1 className="text-4xl md:text-6xl font-bold retro-text-shadow pixel-font" style={{ 
              color: '#ffd700',
              lineHeight: '1.8'
            }}>
              VICTORY!
            </h1>
          </div>

          <div className="space-y-3">
            <p className="text-lg md:text-2xl font-bold pixel-font" style={{ 
              color: '#00d9ff',
              lineHeight: '1.8'
            }}>
              YOU WIN!
            </p>
            <p className="text-xs md:text-sm pixel-font" style={{ 
              color: '#ffffff',
              lineHeight: '1.8'
            }}>
              ALL LEVELS<br/>COMPLETED!
            </p>
          </div>

          <div className="retro-shadow" style={{
            backgroundColor: '#16213e',
            border: '4px solid #0f3460',
            padding: '1.5rem',
            borderRadius: 0
          }}>
            <p className="text-sm md:text-base font-bold pixel-font mb-3" style={{ 
              color: '#ffd700',
              lineHeight: '1.8'
            }}>
              TOTAL COINS:
            </p>
            <p className="text-5xl md:text-6xl font-bold animate-pulse pixel-font" style={{ 
              color: '#ffd700',
              lineHeight: '1.8'
            }}>
              {totalCoins}
            </p>
          </div>

          <div className="flex gap-2 justify-center">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                className="w-3 h-3 bg-yellow-400 animate-bounce"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  border: '2px solid #000'
                }}
              />
            ))}
          </div>

          <Button
            onClick={onPlayAgain}
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
            PLAY AGAIN
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default FinalScreen;