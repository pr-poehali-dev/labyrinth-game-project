import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface GameScreenProps {
  level: number;
  onLevelComplete: (coins: number) => void;
  onTrapHit: () => void;
}

type CellType = 'empty' | 'wall' | 'coin' | 'trap' | 'player' | 'exit';

const LEVELS = [
  {
    grid: [
      ['player', 'coin', 'wall', 'coin', 'exit'],
      ['wall', 'coin', 'wall', 'coin', 'wall'],
      ['coin', 'coin', 'trap', 'coin', 'coin'],
      ['wall', 'coin', 'wall', 'wall', 'wall'],
      ['coin', 'coin', 'coin', 'trap', 'coin'],
    ],
    coins: 12,
  },
  {
    grid: [
      ['player', 'coin', 'coin', 'wall', 'coin', 'coin'],
      ['wall', 'trap', 'coin', 'wall', 'coin', 'wall'],
      ['coin', 'wall', 'coin', 'coin', 'coin', 'coin'],
      ['coin', 'coin', 'wall', 'trap', 'wall', 'coin'],
      ['wall', 'coin', 'coin', 'coin', 'coin', 'coin'],
      ['coin', 'wall', 'coin', 'wall', 'coin', 'exit'],
    ],
    coins: 18,
  },
  {
    grid: [
      ['player', 'coin', 'wall', 'coin', 'coin', 'wall', 'coin'],
      ['coin', 'coin', 'wall', 'trap', 'coin', 'wall', 'coin'],
      ['wall', 'coin', 'coin', 'wall', 'coin', 'coin', 'coin'],
      ['coin', 'trap', 'coin', 'coin', 'wall', 'trap', 'wall'],
      ['coin', 'wall', 'coin', 'coin', 'coin', 'coin', 'coin'],
      ['coin', 'coin', 'wall', 'coin', 'wall', 'coin', 'coin'],
      ['wall', 'coin', 'coin', 'coin', 'coin', 'wall', 'exit'],
    ],
    coins: 24,
  },
];

const GameScreen = ({ level, onLevelComplete, onTrapHit }: GameScreenProps) => {
  const levelData = LEVELS[level - 1];
  const [grid, setGrid] = useState<CellType[][]>(JSON.parse(JSON.stringify(levelData.grid)));
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
  const [collectedCoins, setCollectedCoins] = useState(0);

  useEffect(() => {
    const newGrid = JSON.parse(JSON.stringify(levelData.grid));
    setGrid(newGrid);
    setPlayerPos({ x: 0, y: 0 });
    setCollectedCoins(0);
  }, [level]);

  const movePlayer = (dx: number, dy: number) => {
    const newX = playerPos.x + dx;
    const newY = playerPos.y + dy;

    if (newY < 0 || newY >= grid.length || newX < 0 || newX >= grid[0].length) return;

    const targetCell = grid[newY][newX];
    
    if (targetCell === 'wall') return;

    const newGrid = [...grid];
    newGrid[playerPos.y][playerPos.x] = 'empty';

    if (targetCell === 'trap') {
      onTrapHit();
      return;
    }

    if (targetCell === 'coin') {
      setCollectedCoins(prev => prev + 1);
    }

    if (targetCell === 'exit') {
      if (collectedCoins + (targetCell === 'coin' ? 1 : 0) >= levelData.coins) {
        onLevelComplete(collectedCoins + (targetCell === 'coin' ? 1 : 0));
        return;
      }
    }

    newGrid[newY][newX] = 'player';
    setGrid(newGrid);
    setPlayerPos({ x: newX, y: newY });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      switch (e.key) {
        case 'ArrowUp': movePlayer(0, -1); break;
        case 'ArrowDown': movePlayer(0, 1); break;
        case 'ArrowLeft': movePlayer(-1, 0); break;
        case 'ArrowRight': movePlayer(1, 0); break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playerPos, grid, collectedCoins]);

  const getCellEmoji = (cell: CellType) => {
    switch (cell) {
      case 'player': return '🦸';
      case 'coin': return '🪙';
      case 'wall': return '🧱';
      case 'trap': return '💣';
      case 'exit': return '🚪';
      default: return '';
    }
  };

  const cellSize = Math.min(60, Math.floor(Math.min(window.innerWidth, window.innerHeight) * 0.7 / Math.max(grid.length, grid[0].length)));

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 animate-fade-in">
      <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-4 border-orange-400 p-6 md:p-8">
        <div className="space-y-6">
          <div className="flex justify-between items-center gap-8">
            <div className="text-center">
              <p className="text-lg text-gray-600" style={{ fontFamily: 'Rubik, sans-serif' }}>Уровень</p>
              <p className="text-4xl font-black text-purple-600" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                {level} / 3
              </p>
            </div>
            <div className="text-center">
              <p className="text-lg text-gray-600" style={{ fontFamily: 'Rubik, sans-serif' }}>Монетки</p>
              <p className="text-4xl font-black text-orange-600" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                🪙 {collectedCoins} / {levelData.coins}
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-200 to-green-200 p-4 rounded-xl border-4 border-blue-400 inline-block">
            <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${grid[0].length}, ${cellSize}px)` }}>
              {grid.map((row, y) =>
                row.map((cell, x) => (
                  <div
                    key={`${x}-${y}`}
                    className={`flex items-center justify-center text-3xl transition-all ${
                      cell === 'coin' ? 'animate-pulse' : ''
                    } ${cell === 'trap' ? 'animate-bounce' : ''}`}
                    style={{
                      width: cellSize,
                      height: cellSize,
                      backgroundColor:
                        cell === 'wall' ? '#8B4513' :
                        cell === 'exit' ? '#FFD700' :
                        'transparent',
                      borderRadius: cell === 'wall' ? '4px' : '8px',
                    }}
                  >
                    {getCellEmoji(cell)}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
            <div></div>
            <Button
              onClick={() => movePlayer(0, -1)}
              size="lg"
              className="bg-blue-500 hover:bg-blue-600 text-white border-2 border-blue-700"
            >
              <Icon name="ArrowUp" size={24} />
            </Button>
            <div></div>
            <Button
              onClick={() => movePlayer(-1, 0)}
              size="lg"
              className="bg-blue-500 hover:bg-blue-600 text-white border-2 border-blue-700"
            >
              <Icon name="ArrowLeft" size={24} />
            </Button>
            <div className="flex items-center justify-center text-sm text-gray-600">
              Стрелки
            </div>
            <Button
              onClick={() => movePlayer(1, 0)}
              size="lg"
              className="bg-blue-500 hover:bg-blue-600 text-white border-2 border-blue-700"
            >
              <Icon name="ArrowRight" size={24} />
            </Button>
            <div></div>
            <Button
              onClick={() => movePlayer(0, 1)}
              size="lg"
              className="bg-blue-500 hover:bg-blue-600 text-white border-2 border-blue-700"
            >
              <Icon name="ArrowDown" size={24} />
            </Button>
            <div></div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GameScreen;
