import { useState, useCallback, useMemo } from 'react';
import WelcomeScreen from '@/components/WelcomeScreen';
import QuestionCard from '@/components/QuestionCard';
import FinalQuestion from '@/components/FinalQuestion';
import ResultsDashboard from '@/components/ResultsDashboard';
import { categories, type Answer } from '@/data/questions';

type Phase = 'welcome' | 'questions' | 'final' | 'results';

const allQuestions = categories.flatMap((cat) =>
  cat.questions.map((q) => ({ ...q, categoryId: cat.id, categoryName: cat.name, categoryEmoji: cat.emoji }))
);

const Index = () => {
  const [phase, setPhase] = useState<Phase>('welcome');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [finalAnswer, setFinalAnswer] = useState('');

  const currentQ = allQuestions[currentIndex];
  const category = useMemo(
    () => currentQ ? categories.find((c) => c.id === currentQ.categoryId) : undefined,
    [currentQ]
  );
  const questionIndexInCategory = useMemo(
    () => category ? category.questions.findIndex((q) => q.id === currentQ?.id) : 0,
    [category, currentQ]
  );

  const handleAnswer = useCallback((answer: Answer) => {
    setAnswers((prev) => {
      const filtered = prev.filter((a) => a.questionId !== answer.questionId);
      return [...filtered, answer];
    });
    if (currentIndex < allQuestions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setPhase('final');
    }
  }, [currentIndex]);

  const handleBack = useCallback(() => {
    if (phase === 'final') {
      setPhase('questions');
      setCurrentIndex(allQuestions.length - 1);
    } else if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  }, [phase, currentIndex]);

  const handleFinalSubmit = useCallback((text: string) => {
    setFinalAnswer(text);
    setPhase('results');
  }, []);

  const handleRestart = useCallback(() => {
    setPhase('welcome');
    setCurrentIndex(0);
    setAnswers([]);
    setFinalAnswer('');
  }, []);

  if (phase === 'welcome') return <WelcomeScreen onStart={() => setPhase('questions')} />;

  if (phase === 'questions' && currentQ && category) {
    return (
      <QuestionCard
        question={currentQ}
        categoryName={currentQ.categoryName}
        categoryEmoji={currentQ.categoryEmoji}
        questionIndex={questionIndexInCategory}
        totalQuestions={category.questions.length}
        globalIndex={currentIndex}
        globalTotal={allQuestions.length}
        existingAnswer={answers.find((a) => a.questionId === currentQ.id)}
        onAnswer={handleAnswer}
        onBack={handleBack}
        isFirst={currentIndex === 0}
      />
    );
  }

  if (phase === 'final') {
    return (
      <FinalQuestion
        existingAnswer={finalAnswer}
        onSubmit={handleFinalSubmit}
        onBack={handleBack}
      />
    );
  }

  return (
    <ResultsDashboard
      answers={answers}
      finalAnswer={finalAnswer}
      onRestart={handleRestart}
    />
  );
};

export default Index;
