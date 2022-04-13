import React, { useState } from 'react';
import testQuestions from 'modules/Test/mockups/testQuestions';
import TestQuestion from './TestQuestion';
import { Question } from './types/question';

const Test = () => {
    return (
        <>
        {
            testQuestions.map((question: Question) => {
                return <TestQuestion key={question.id} question={question}/>
            })
        }
        </>
    )
};

export default Test;