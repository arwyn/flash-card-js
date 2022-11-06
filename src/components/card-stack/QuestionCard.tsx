import React from 'react';
import { } from '@mui/material';
import { QuestionCard } from '../question-card/QuestionCard';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Card, incrementFailure, markSuccessAndRemove, moveCardToBottomOfStack } from '../../app/store/card-stack';

/**
 * Question Card Stack
 */
export const CardStack = () => {
    const {topQuestionId, topCard} = useAppSelector((state) => {
        const [topQuestionId, topCard] = Object.entries(state.cardStack.cards).find(([key,]) => key === state.cardStack.stack[0]) as [string, Card];
        return {topQuestionId, topCard};
    })

    const [errorCount, setErrorCount] = useState(0);
    const [startTime, setStartTime] = useState(Date.now());

    const dispatch = useAppDispatch();

    const onWrongAnswer = (questionId?: string) => {
        if (!errorCount) {
            dispatch(incrementFailure({questionId: questionId ? questionId : topQuestionId}));
        }
        setErrorCount(errorCount + 1);
    }

    const onCorrectAnswer = (questionId?: string) => {
        const eclipsedTime = Date.now() - startTime;
        setTimeout(() => {
            if (errorCount) {
                setErrorCount(0);
                dispatch(moveCardToBottomOfStack({questionId: questionId ? questionId : topQuestionId}));
            }
            else {
                dispatch(markSuccessAndRemove({eclipsedTime, questionId: questionId ? questionId : topQuestionId}));
                setStartTime(Date.now());
            }
        }, 1000);
    }

    return (<QuestionCard 
        id={topQuestionId} 
        onCorrectAnswer={onCorrectAnswer} 
        onWrongAnswer={onWrongAnswer} 
        question={topCard.questionText} 
        correctAnswer={topCard.correctAnswer.answerText} 
        incorrectAnswers={topCard.wrongAnswers.map(({answerText}) => answerText)}/>);
};