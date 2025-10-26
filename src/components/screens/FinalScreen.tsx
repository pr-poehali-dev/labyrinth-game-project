import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface FinalScreenProps {
  totalCoins: number;
  onPlayAgain: () => void;
}

const FinalScreen = ({ totalCoins, onPlayAgain }: FinalScreenProps) => {
  return (
    <div className="w-full h-full flex items-center justify-center p-4 animate-fade-in">
      <Card className="max-w-2xl w-full bg-white/95 backdrop-blur-sm shadow-2xl border-4 border-yellow-400 p-8 md:p-12 animate-scale-in">
        <div className="text-center space-y-8">
          <div className="animate-bounce">
            <h1 className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 mb-4" style={{ fontFamily: 'Fredoka, sans-serif' }}>
              🏆 ПОБЕДА! 🏆
            </h1>
          </div>

          <div className="space-y-4">
            <p className="text-3xl md:text-4xl font-bold text-gray-800" style={{ fontFamily: 'Fredoka, sans-serif' }}>
              Поздравляем!
            </p>
            <p className="text-xl md:text-2xl text-gray-700" style={{ fontFamily: 'Rubik, sans-serif' }}>
              Ты прошёл все уровни лабиринта!
            </p>
          </div>

          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-8 border-4 border-yellow-400">
            <p className="text-2xl md:text-3xl font-bold text-gray-700 mb-4" style={{ fontFamily: 'Rubik, sans-serif' }}>
              Собрано монеток:
            </p>
            <p className="text-6xl md:text-7xl font-black text-orange-600 animate-pulse" style={{ fontFamily: 'Fredoka, sans-serif' }}>
              🪙 {totalCoins}
            </p>
          </div>

          <div className="flex gap-4 justify-center text-6xl animate-bounce">
            <span>🎉</span>
            <span>🎊</span>
            <span>✨</span>
            <span>🌟</span>
          </div>

          <Button
            onClick={onPlayAgain}
            size="lg"
            className="text-2xl md:text-3xl px-12 py-8 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-black rounded-full shadow-xl hover:scale-110 transition-transform border-4 border-purple-300"
            style={{ fontFamily: 'Fredoka, sans-serif' }}
          >
            🔄 ИГРАТЬ СНОВА 🔄
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default FinalScreen;
