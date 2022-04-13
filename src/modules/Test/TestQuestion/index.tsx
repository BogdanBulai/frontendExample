import React, { useEffect, useState } from 'react';
import { Question } from '../types/question';
import interpolate from 'color-interpolate';
import { baseCorrectColorBottom, baseCorrectColorTop, baseWrongColorBottom, baseWrongColorTop, correctColorSwitch, wrongColorSwitch, wrongColorBorder, correctColorBorder } from 'modules/Test/constants/colors';
import AnswerPair from './components/AnswerPair';

interface TestQuestionInterface {
    question: Question,
}

const TestQuestion = ({ question }: TestQuestionInterface) => {
    const [topColor, setTopColor] = useState(baseWrongColorTop);
    const [bottomColor, setBottomColor] = useState(baseWrongColorBottom);
    const [switchColor, setSwitchColor] = useState(wrongColorSwitch);
    const [borderColor, setBorderColor] = useState(wrongColorBorder);
    const [correctAnswers, setCorrectAnswers] = useState<number>(0);
    const [isAnswerWrappedArray, setIsAnswerWrappedArray] = useState<number[]>([]);
    const bottomColorMap = interpolate([baseWrongColorBottom, baseCorrectColorBottom]);
    const topColorMap = interpolate([baseWrongColorTop, baseCorrectColorTop]);
    const switchColorMap = interpolate([wrongColorSwitch, correctColorSwitch]);
    const borderColorMap = interpolate([wrongColorBorder, correctColorBorder]);

    useEffect(() => {
        const correctness = correctAnswers/question.answers.length;
        setTopColor(topColorMap(correctness));
        setBottomColor(bottomColorMap(correctness));
        setSwitchColor(switchColorMap(correctness));
        setBorderColor(borderColorMap(correctness));
    }, [correctAnswers]);
    
    const incrementCorrectAnswers = () => {
        setCorrectAnswers(prevCount => prevCount + 1);
    };
    
    const decrementCorrectAnswers = () => {
        setCorrectAnswers(prevCount => prevCount - 1);
    };

    return (
        <div
            style={{
                background: `linear-gradient(to bottom, ${topColor}, ${bottomColor})`
            }}
            className="question__container"
        >
            <div className="question">
                <h1 className="question__title">
                    {question.title}
                </h1>
                <div className="question__answer-container">
                    {
                        question.answers.map((answerPair, index) => {
                            const isQuestionWrapped = isAnswerWrappedArray.includes(index);
                            return <div
                                key={index}
                                className={`question__answer-pair ${isQuestionWrapped ? 'wrapped' : ''}`}
                            >
                                <AnswerPair
                                    answerPair={answerPair}
                                    switchColor={switchColor}
                                    borderColor={borderColor}
                                    correctness={correctAnswers/question.answers.length}
                                    answerLabelColor={bottomColor}
                                    isAnswerWrappedArray={isAnswerWrappedArray}
                                    answerIndex={index}
                                    setIsAnswerWrappedArray={setIsAnswerWrappedArray}
                                    incrementCorrectAnswers={incrementCorrectAnswers}
                                    decrementCorrectAnswers={decrementCorrectAnswers}
                                />
                            </div>
                        })
                    }
                </div>
                <h2 className="question__answer-message">The answer is {correctAnswers === question.answers.length ? 'correct!' : 'incorrect'}</h2>
            </div>
        </div>
    )
};

export default TestQuestion;