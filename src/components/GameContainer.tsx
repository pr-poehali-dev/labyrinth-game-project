import { useState } from 'react';
import AdScreen from './screens/AdScreen';
import SplashScreen from './screens/SplashScreen';
import GameScreen from './screens/GameScreen';
import QuizScreen from './screens/QuizScreen';
import FinalScreen from './screens/FinalScreen';

type GameState = 'ad' | 'splash' | 'game' | 'quiz' | 'final';

const GameContainer = () => {
  const [gameState, setGameState] = useState<GameState>('ad');
  const [currentLevel, setCurrentLevel] = useState(1);
  const [coins, setCoins] = useState(0);

  const handleAdComplete = () => setGameState('splash');
  
  const handleStartGame = () => {
    setGameState('game');
    setCurrentLevel(1);
    setCoins(0);
  };

  const handleLevelComplete = (collectedCoins: number) => {
    setCoins(prev => prev + collectedCoins);
    setGameState('quiz');
  };

  const handleQuizCorrect = () => {
    if (currentLevel >= 3) {
      setGameState('final');
    } else {
      setCurrentLevel(prev => prev + 1);
      setGameState('game');
    }
  };

  const handleQuizWrong = () => {
    setCurrentLevel(1);
    setCoins(0);
    setGameState('game');
  };

  const handleTrapHit = () => {
    setCurrentLevel(1);
    setCoins(0);
    setGameState('game');
  };

  const handlePlayAgain = () => {
    setCurrentLevel(1);
    setCoins(0);
    setGameState('splash');
  };

  return (
    <div className="w-full h-screen overflow-hidden bg-gradient-to-br from-purple-400 via-pink-300 to-orange-300">
      {gameState === 'ad' && <AdScreen onComplete={handleAdComplete} />}
      {gameState === 'splash' && <SplashScreen onStart={handleStartGame} />}
      {gameState === 'game' && (
        <GameScreen
          level={currentLevel}
          onLevelComplete={handleLevelComplete}
          onTrapHit={handleTrapHit}
        />
      )}
      {gameState === 'quiz' && (
        <QuizScreen
          level={currentLevel}
          onCorrect={handleQuizCorrect}
          onWrong={handleQuizWrong}
        />
      )}
      {gameState === 'final' && (
        <FinalScreen totalCoins={coins} onPlayAgain={handlePlayAgain} />
      )}
    </div>
  );
};

export default GameContainer;
