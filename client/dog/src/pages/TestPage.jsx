import React, { useState } from 'react';
import { saveAs } from 'file-saver'; // Для сохранения файла с правилами
import { toast } from 'react-toastify';

export const TestPage = () => {
  const questions = [
    { question: 'Вопрос 1: Вы имеете опыт содержания крупных собак?', answers: ['Да, у меня был(-а) крупная собака', 'Нет, это будет первая крупная собака'] },
    { question: 'Вопрос 2: У вас есть достаточно места для крупной собаки?', answers: ['Да, у меня есть большой двор', 'Нет, у меня небольшая квартира'] },
    { question: 'Вопрос 3: Готовы ли вы к ежедневным длительным прогулкам?', answers: ['Да, я люблю длительные прогулки', 'Нет, у меня нет времени для этого'] },
    { question: 'Вопрос 4: Вы можете позволить себе высококачественный корм?', answers: ['Да, у меня есть финансовая возможность', 'Нет, я ищу более бюджетные варианты'] },
    { question: 'Вопрос 5: У вас есть дети младше 5 лет?', answers: ['Да, у меня есть маленькие дети', 'Нет, у меня нет маленьких детей'] },
    { question: 'Вопрос 6: Вы готовы к регулярной дрессировке собаки?', answers: ['Да, у меня есть время и желание для этого', 'Нет, я не готов заниматься дрессировкой'] },
    { question: 'Вопрос 7: Ваш дом имеет огороженный двор?', answers: ['Да, у меня есть огороженный двор', 'Нет, у меня нет огороженного двора'] },
    { question: 'Вопрос 8: Вы готовы к высокой активности собаки?', answers: ['Да, я готов к высокой активности', 'Нет, я предпочитаю менее активных собак'] },
    { question: 'Вопрос 9: У вас есть другие домашние животные?', answers: ['Да, у меня есть другие животные', 'Нет, у меня нет других животных'] },
    { question: 'Вопрос 10: Вы готовы к возможным повреждениям имущества?', answers: ['Да, я готов к таким рискам', 'Нет, я не хочу повреждений имущества'] },
    { question: 'Вопрос 11: Вы живете в многоквартирном доме?', answers: ['Да, я живу в многоквартирном доме', 'Нет, я живу в частном доме'] },
    { question: 'Вопрос 12: У вас есть аллергия на собак?', answers: ['Да, у меня есть аллергия', 'Нет, у меня нет аллергии'] },
    { question: 'Вопрос 13: Вы часто бываете в разъездах?', answers: ['Да, я часто путешествую', 'Нет, я редко путешествую'] },
    { question: 'Вопрос 14: Вы готовы к регулярной чистке шерсти?', answers: ['Да, я готов к регулярному уходу', 'Нет, я не хочу часто ухаживать за шерстью'] },
    { question: 'Вопрос 15: У вас есть финансовые ресурсы для содержания собаки?', answers: ['Да, я могу себе это позволить', 'Нет, я ищу более бюджетные варианты'] },
  ];

  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [resultText, setResultText] = useState('');
  const [resultGif, setResultGif] = useState('');

  const handleAnswerChange = (questionIndex, answer) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answer;
    setAnswers(newAnswers);
  };

  const calculateResult = () => {
    const positiveAnswers = answers.filter(answer => answer.startsWith('Да')).length;
    return positiveAnswers;
  };

  const handleSubmit = () => {
    if (answers.includes(null)) {
      toast.error('Пожалуйста, ответьте на все вопросы.');
    } else {
      const positiveAnswers = calculateResult();
      setResultText(`Количество ответов, подходящих для содержания собаки: ${positiveAnswers}`);
      setShowResult(true);
      if (positiveAnswers > 10) {
        setResultGif('https://media.tenor.com/lcZBuUwpkUMAAAAd/love-life.gif');
        toast.success('Вы можете завести американскую акиту!');
      } else {
        setResultGif('https://media1.tenor.com/m/rPHvorh1b_AAAAAC/dog-akita.gif');
      }
    }
  };

  const handleDownload = () => {
    saveAs('/path/to/rules.pdf', 'rules.pdf');
    toast.success('Файл с правилами для заведения собаки успешно скачан.');
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6 text-center'>Тест: Можете ли вы завести американскую акиту?</h1>
      {!showResult && (
        <div className='flex justify-center mb-6'>
          <img src='https://media1.tenor.com/m/rPHvorh1b_AAAAAC/dog-akita.gif' alt='Welcome GIF' className='w-1/4' />
        </div>
      )}
      {showResult ? (
        <div className='text-xl text-center'>
          <p>{resultText}</p>
          <div className='bg-white p-4 rounded shadow-md mt-4'>
            <p>Вы готовы к содержанию собаки.</p>
            <p>Чтобы получить файл с советами, нажмите на кнопку ниже.</p>
          </div>
          <div className='flex justify-center mt-6'>
            <img src={resultGif} alt='Result GIF' className='w-1/4' />
          </div>
          {resultText.startsWith('Количество ответов, подходящих для содержания собаки:') && (
            <div className='flex justify-center mt-6'>
              <button onClick={handleDownload} className='bg-customColor1 text-white px-4 py-2 rounded'>
                Скачать файл
              </button>
            </div>
          )}
          <div className='flex justify-center mt-6'>
            <button onClick={() => setShowResult(false)} className='bg-customColor1 text-white px-4 py-2 rounded'>
              Назад
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={(e) => e.preventDefault()}>
          <ul className='space-y-6'>
            {questions.map((q, index) => (
              <li key={index} className='border rounded-md p-4 bg-white text-center'>
                <h2 className='text-xl font-semibold mb-2'>{q.question}</h2>
                {q.answers.map((answer, answerIndex) => (
                  <label key={answerIndex} className='block'>
                    <input
                      type='radio'
                      name={`question-${index}`}
                      value={answer}
                      checked={answers[index] === answer}
                      onChange={() => handleAnswerChange(index, answer)}
                      className='mr-2'
                    />
                    {answer}
                  </label>
                ))}
              </li>
            ))}
          </ul>
          <div className='flex justify-center mt-6'>
            <button onClick={handleSubmit} className='bg-customColor1 text-white px-4 py-2 rounded'>
              Отправить
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default TestPage;
