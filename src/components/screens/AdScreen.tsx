import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';

interface AdScreenProps {
  onComplete: () => void;
}

const AdScreen = ({ onComplete }: AdScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 3000;
    const interval = 50;
    const increment = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress(prev => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 300);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 animate-fade-in">
      <div className="text-center space-y-8 p-8">
        <div className="animate-scale-in">
          <h1 className="text-6xl md:text-8xl font-black text-white mb-4" style={{ fontFamily: 'Fredoka, sans-serif' }}>
            🎮 ЛАБИРИНТ
          </h1>
          <p className="text-2xl md:text-3xl text-white/90" style={{ fontFamily: 'Rubik, sans-serif' }}>
            Приключения начинаются...
          </p>
        </div>

        <div className="w-80 mx-auto space-y-4">
          <Progress value={progress} className="h-3 bg-white/30" />
          <p className="text-white/80 text-lg">Загрузка {Math.round(progress)}%</p>
        </div>

        <div className="flex gap-6 justify-center text-5xl animate-pulse">
          <span>🪙</span>
          <span>🎯</span>
          <span>💣</span>
          <span>🏆</span>
        </div>
      </div>
    </div>
  );
};

export default AdScreen;
