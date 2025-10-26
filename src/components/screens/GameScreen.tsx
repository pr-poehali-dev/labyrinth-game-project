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
    <div className="w-full h-full flex flex-col items-center justify-center p-4 animate-fade-in pixel-font" style={{
      backgroundColor: '#1a1a2e',
      backgroundImage: `
        repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 2px, transparent 2px, transparent 4px),
        repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 2px, transparent 2px, transparent 4px)
      `,
      backgroundSize: '8px 8px'
    }}>
      <Card className="retro-shadow" style={{
        backgroundColor: '#0f3460',
        border: '6px solid #16213e',
        borderRadius: 0,
        padding: '1.5rem'
      }}>
        <div className="space-y-6">
          <div className="flex justify-between items-center gap-8 mb-4">
            <div className="text-center retro-shadow" style={{
              backgroundColor: '#16213e',
              border: '3px solid #0f3460',
              padding: '0.75rem'
            }}>
              <p className="text-xs pixel-font" style={{ color: '#00d9ff', lineHeight: '1.8' }}>LVL</p>
              <p className="text-2xl font-bold pixel-font" style={{ color: '#e94560', lineHeight: '1.8' }}>
                {level}/3
              </p>
            </div>
            <div className="text-center retro-shadow" style={{
              backgroundColor: '#16213e',
              border: '3px solid #0f3460',
              padding: '0.75rem'
            }}>
              <p className="text-xs pixel-font" style={{ color: '#00d9ff', lineHeight: '1.8' }}>COINS</p>
              <p className="text-2xl font-bold pixel-font" style={{ color: '#ffd700', lineHeight: '1.8' }}>
                {collectedCoins}/{levelData.coins}
              </p>
            </div>
          </div>

          <div className="retro-shadow" style={{
            backgroundColor: '#0a2463',
            border: '4px solid #000000',
            padding: '1rem',
            borderRadius: 0
          }}>
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
                        cell === 'wall' ? '#1e3a8a' :
                        cell === 'exit' ? '#047857' :
                        cell === 'empty' ? '#1e293b' :
                        'transparent',
                      border: cell === 'wall' ? '2px solid #000' : cell === 'exit' ? '2px solid #065f46' : '1px solid #334155',
                      borderRadius: 0,
                      imageRendering: 'pixelated'
                    }}
                  >
                    {getCellEmoji(cell)}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
            <div></div>
            <Button
              onClick={() => movePlayer(0, -1)}
              size="lg"
              className="retro-shadow pixel-font"
              style={{
                backgroundColor: '#e94560',
                border: '3px solid #c93a50',
                borderRadius: 0,
                color: '#fff'
              }}
            >
              <Icon name="ArrowUp" size={20} />
            </Button>
            <div></div>
            <Button
              onClick={() => movePlayer(-1, 0)}
              size="lg"
              className="retro-shadow pixel-font"
              style={{
                backgroundColor: '#e94560',
                border: '3px solid #c93a50',
                borderRadius: 0,
                color: '#fff'
              }}
            >
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <div className="flex items-center justify-center text-xs pixel-font" style={{ color: '#00d9ff', lineHeight: '1.8' }}>
              USE<br/>KEYS
            </div>
            <Button
              onClick={() => movePlayer(1, 0)}
              size="lg"
              className="retro-shadow pixel-font"
              style={{
                backgroundColor: '#e94560',
                border: '3px solid #c93a50',
                borderRadius: 0,
                color: '#fff'
              }}
            >
              <Icon name="ArrowRight" size={20} />
            </Button>
            <div></div>
            <Button
              onClick={() => movePlayer(0, 1)}
              size="lg"
              className="retro-shadow pixel-font"
              style={{
                backgroundColor: '#e94560',
                border: '3px solid #c93a50',
                borderRadius: 0,
                color: '#fff'
              }}
            >
              <Icon name="ArrowDown" size={20} />
            </Button>
            <div></div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GameScreen;