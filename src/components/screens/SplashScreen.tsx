import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface SplashScreenProps {
  onStart: () => void;
}

const SplashScreen = ({ onStart }: SplashScreenProps) => {
  return (
    <div className="w-full h-full flex items-center justify-center p-4 animate-fade-in">
      <Card className="max-w-2xl w-full bg-white/95 backdrop-blur-sm shadow-2xl border-4 border-purple-400 p-8 md:p-12 animate-scale-in">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 animate-pulse" style={{ fontFamily: 'Fredoka, sans-serif' }}>
              🌟 ЛАБИРИНТ 🌟
            </h1>
            <p className="text-xl md:text-2xl text-gray-700" style={{ fontFamily: 'Rubik, sans-serif' }}>
              Собирай монетки, избегай ловушек!
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 space-y-4 border-2 border-purple-300">
            <h2 className="text-2xl font-bold text-purple-800" style={{ fontFamily: 'Fredoka, sans-serif' }}>
              📋 Правила игры
            </h2>
            <ul className="text-left space-y-3 text-lg text-gray-700 max-w-md mx-auto" style={{ fontFamily: 'Rubik, sans-serif' }}>
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
            className="text-2xl md:text-3xl px-12 py-8 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-black rounded-full shadow-xl hover:scale-110 transition-transform border-4 border-green-300"
            style={{ fontFamily: 'Fredoka, sans-serif' }}
          >
            🎮 НАЧАТЬ ИГРУ 🎮
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SplashScreen;
