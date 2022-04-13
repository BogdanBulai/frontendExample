import React, { useEffect, useRef, useState } from 'react';
import { AnswerPair } from 'modules/Test/types/question';
import Switch from './components/Switch';
import interpolate from 'color-interpolate';

interface AnswerPairInterface {
    answerPair: AnswerPair[],
    switchColor: string,
    correctness: number,
    answerLabelColor: string,
    borderColor: string,
    isAnswerWrappedArray: number[],
    answerIndex: number,
    setIsAnswerWrappedArray: React.Dispatch<React.SetStateAction<number[]>>,
    incrementCorrectAnswers: () => void,
    decrementCorrectAnswers: () => void,
}

const AnswerPairComponent = ({ answerPair, switchColor, correctness, answerLabelColor, borderColor, isAnswerWrappedArray, answerIndex, setIsAnswerWrappedArray, incrementCorrectAnswers, decrementCorrectAnswers }: AnswerPairInterface) => {
    const answersRef = useRef<any>(answerPair.map(() => React.createRef()));
    const [selectedAnswer, setSelectedAnswer] = useState<number>(Math.floor(Math.random() * answerPair.length));
    const [switchStyles, setSwitchStyles] = useState<object>({});
    const [answerColor, setAnswerColor] = useState<string>();
    const [isWrapping, setIsWrapping] = useState<boolean>(false);
    const answerColorUpperMap = interpolate([answerLabelColor, 'black']);
    const answerColorMap = interpolate([answerLabelColor, answerColorUpperMap(0.5)]);
    const selectedAnswerRef = useRef<number>(0);
    selectedAnswerRef.current = selectedAnswer;

    useEffect(() => {
        if (answerPair[selectedAnswer].correct) {
            incrementCorrectAnswers();
        }
    },[]);

    useEffect(() => {
        setAnswerColor(answerColorMap(correctness));
    },[correctness]);

    useEffect(() => {
        updateSwitchStyles();
    },[selectedAnswer]);

    useEffect(() => {
        if (isWrapping) {
            addAnswerWrappedArray();
        }
    },[isWrapping]);

    useEffect(() => {
        const handleResize = () => {
            updateSwitchStyles();
            answersWrapCheck();
        }

        window.addEventListener('resize', handleResize);

        answersWrapCheck();

        updateSwitchStyles();

        return function cleanupListener() {
            window.removeEventListener('resize', handleResize)
        };
    },[]);

    const updateSwitchStyles = () => {
        // update switch position and size when window resizes or when answer changes
        const button = answersRef.current[selectedAnswerRef.current].current;
        const switchStyles = {
            width: button.clientWidth + 2,
            height: button.clientHeight + 2,
            left: button.offsetLeft,
            top: button.offsetTop,
        };
        setSwitchStyles(switchStyles);
    }

    const addAnswerWrappedArray = () => {
        // add the wrapping answer to an array for later use
        if (!isAnswerWrappedArray.includes(answerIndex)) {
            const newArray = [...isAnswerWrappedArray];
            newArray.push(answerIndex);
            setIsAnswerWrappedArray(newArray);
        }
    }

    const answersWrapCheck = () => {
        // checks if the answer is flex wrapping
        answersRef.current.map((buttonRef: any, index: number) => {
            if (answersRef.current[index+1]) {
                if (answersRef.current[index].current.offsetTop !== answersRef.current[index+1].current.offsetTop) {
                    setIsWrapping(true);
                }
            }
        })
    }
    
    const onAnswerClick = (index: number) => {
        if (correctness === 1) {
            return;
        }
        if (selectedAnswer !== index) {
            if (answerPair[index].correct) {
                incrementCorrectAnswers();
            } else {
                // doesn't decrement if the user switches from an incorrect answer to another incorrect answer
                if (answerPair[selectedAnswer].correct !== answerPair[index].correct) {
                    decrementCorrectAnswers();
                }
            }
        }
        setSelectedAnswer(index);
    }

    return (
        <>
            <Switch switchStyles={{...switchStyles }} switchColor={switchColor}/>
            {answerPair.map((answer, index) => {
                return <div
                    ref={answersRef.current[index]}
                    key={answer.id}
                    className="question__answer"
                    onClick={() => onAnswerClick(index)}
                    style={{
                        borderColor: `${borderColor}`,
                        color: selectedAnswer === index ? answerColor: 'white'
                    }}
                >
                    {answer.answer}
                </div>
            })}
        </>
    )
};

export default AnswerPairComponent;