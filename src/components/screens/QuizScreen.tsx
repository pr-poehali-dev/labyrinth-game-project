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
    <div className="w-full h-full flex items-center justify-center p-4 animate-fade-in">
      <Card className="max-w-3xl w-full bg-white/95 backdrop-blur-sm shadow-2xl border-4 border-pink-400 p-8 md:p-12 animate-scale-in">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600" style={{ fontFamily: 'Fredoka, sans-serif' }}>
              🧠 ВИКТОРИНА 🧠
            </h1>
            <p className="text-xl text-gray-700" style={{ fontFamily: 'Rubik, sans-serif' }}>
              Уровень {level} / 3
            </p>
          </div>

          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6 md:p-8 border-4 border-yellow-400">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8" style={{ fontFamily: 'Rubik, sans-serif' }}>
              {quiz.question}
            </h2>

            <div className="grid gap-4">
              {quiz.answers.map((answer, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={answered}
                  size="lg"
                  className={`text-xl md:text-2xl py-8 px-6 font-bold rounded-xl transition-all ${
                    !answered
                      ? 'bg-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white text-gray-800 border-4 border-gray-300 hover:border-purple-400 hover:scale-105'
                      : selected === index
                      ? index === quiz.correct
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white border-4 border-green-600 scale-105'
                        : 'bg-gradient-to-r from-red-500 to-pink-600 text-white border-4 border-red-600 scale-95'
                      : 'bg-gray-200 text-gray-500 border-4 border-gray-300'
                  }`}
                  style={{ fontFamily: 'Rubik, sans-serif' }}
                >
                  {answered && index === quiz.correct && '✅ '}
                  {answered && selected === index && index !== quiz.correct && '❌ '}
                  {answer}
                </Button>
              ))}
            </div>
          </div>

          {answered && (
            <div className="text-center animate-fade-in">
              <p className={`text-3xl font-black ${selected === quiz.correct ? 'text-green-600' : 'text-red-600'}`} style={{ fontFamily: 'Fredoka, sans-serif' }}>
                {selected === quiz.correct ? '🎉 ПРАВИЛЬНО! 🎉' : '😢 НЕПРАВИЛЬНО! Начинаем сначала...'}
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default QuizScreen;
