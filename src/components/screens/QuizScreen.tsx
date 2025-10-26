import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface QuizScreenProps {
  level: number;
  onCorrect: () => void;
  onWrong: () => void;
}

const QUIZZES = [
  {
    question: 'Сколько планет в Солнечной системе?',
    answers: ['7 планет', '8 планет', '9 планет', '10 планет'],
    correct: 1,
  },
  {
    question: 'Какой цвет получится, если смешать красный и синий?',
    answers: ['Зелёный', 'Оранжевый', 'Фиолетовый', 'Коричневый'],
    correct: 2,
  },
  {
    question: 'Сколько дней в високосном году?',
    answers: ['365 дней', '366 дней', '364 дня', '367 дней'],
    correct: 1,
  },
];

const QuizScreen = ({ level, onCorrect, onWrong }: QuizScreenProps) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  
  const quiz = QUIZZES[level - 1];

  const handleAnswer = (index: number) => {
    if (answered) return;
    
    setSelected(index);
    setAnswered(true);

    setTimeout(() => {
      if (index === quiz.correct) {
        onCorrect();
      } else {
        onWrong();
      }
    }, 1500);
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-4 animate-fade-in pixel-font" style={{
      backgroundColor: '#1a1a2e',
      backgroundImage: `
        repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 2px, transparent 2px, transparent 4px),
        repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 2px, transparent 2px, transparent 4px)
      `,
      backgroundSize: '8px 8px'
    }}>
      <Card className="max-w-3xl w-full retro-shadow animate-scale-in" style={{
        backgroundColor: '#0f3460',
        border: '6px solid #16213e',
        borderRadius: 0,
        padding: '2rem'
      }}>
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-2xl md:text-4xl font-bold retro-text-shadow pixel-font" style={{ 
              color: '#00d9ff',
              lineHeight: '1.8'
            }}>
              QUIZ TIME
            </h1>
            <p className="text-sm md:text-base pixel-font" style={{ 
              color: '#ffd700',
              lineHeight: '1.8'
            }}>
              LEVEL {level}/3
            </p>
          </div>

          <div className="retro-shadow" style={{
            backgroundColor: '#16213e',
            border: '4px solid #0f3460',
            padding: '1.5rem',
            borderRadius: 0
          }}>
            <h2 className="text-sm md:text-base font-bold text-center mb-6 pixel-font" style={{ 
              color: '#ffffff',
              lineHeight: '1.8'
            }}>
              {quiz.question}
            </h2>

            <div className="grid gap-3">
              {quiz.answers.map((answer, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={answered}
                  size="lg"
                  className={`text-xs md:text-sm py-6 px-4 font-bold retro-shadow transition-all pixel-font`}
                  style={{
                    backgroundColor: !answered
                      ? '#e94560'
                      : selected === index
                      ? index === quiz.correct
                        ? '#10b981'
                        : '#ef4444'
                      : '#6b7280',
                    color: '#ffffff',
                    border: !answered
                      ? '3px solid #c93a50'
                      : selected === index
                      ? index === quiz.correct
                        ? '3px solid #059669'
                        : '3px solid #dc2626'
                      : '3px solid #4b5563',
                    borderRadius: 0,
                    lineHeight: '1.6',
                    transform: answered && selected === index && index === quiz.correct ? 'scale(1.05)' : answered && selected === index ? 'scale(0.95)' : 'scale(1)'
                  }}
                >
                  {answered && index === quiz.correct && '> '}
                  {answered && selected === index && index !== quiz.correct && 'X '}
                  {answer}
                </Button>
              ))}
            </div>
          </div>

          {answered && (
            <div className="text-center animate-fade-in retro-shadow" style={{
              backgroundColor: selected === quiz.correct ? '#10b981' : '#ef4444',
              border: '4px solid #000',
              padding: '1rem',
              borderRadius: 0
            }}>
              <p className="text-sm md:text-base font-bold pixel-font" style={{ 
                color: '#ffffff',
                lineHeight: '1.8'
              }}>
                {selected === quiz.correct ? 'CORRECT!' : 'WRONG! TRY AGAIN...'}
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default QuizScreen;