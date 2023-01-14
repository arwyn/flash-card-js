import React from 'react';
import { ArticleOutlined } from '@mui/icons-material';
import { QuestionCard } from '../question-card/QuestionCard';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { incrementFailure, markSuccessAndRemove, moveCardToBottomOfStack } from '../../app/store/card-stack';
import { shallowEqual } from 'react-redux';

export interface CardStackProps {
    successPause?: number;
};

/**
 * Question Card Stack
 */
export const CardStack = ({successPause = 1000}: CardStackProps) => {
    const top = useAppSelector((state) => {
        const entry = Object.entries(state.cardStack.cards).find(([key,]) => key === state.cardStack.stack[0]);
        return {
            id: entry ? entry[0] : '',
            card: entry ? entry[1] : undefined,
            score: entry ? state.cardStack.scores[entry[0]].failures : 0
        };
    }, shallowEqual);

    const [errorCount, setErrorCount] = useState(0);
    const [startTime, setStartTime] = useState(Date.now());
    const [cardStartTime, setCardStartTime] = useState(Date.now());

    const dispatch = useAppDispatch();

    const onWrongAnswer = (questionId?: string) => {
        if (!errorCount) {
            dispatch(incrementFailure({questionId: questionId ? questionId : top.id}));
        }
        setErrorCount(errorCount + 1);
    }

    const onCorrectAnswer = (questionId?: string) => {
        const eclipsedTime = Date.now() - startTime;
        setTimeout(() => {
            if (errorCount) {
                setErrorCount(0);
                dispatch(moveCardToBottomOfStack({questionId: questionId ? questionId : top.id}));
            }
            else {
                dispatch(markSuccessAndRemove({eclipsedTime, questionId: questionId ? questionId : top.id}));
                setStartTime(Date.now());
            }
            setCardStartTime(Date.now());
        }, successPause);
    }

    return top.card ? (<QuestionCard 
            id={top.id}
            score={top.score}
            startTime={cardStartTime}
            onCorrectAnswer={onCorrectAnswer} 
            onWrongAnswer={onWrongAnswer} 
            question={top.card.question} 
            answers={top.card.answers}/>)
        : (<ArticleOutlined/>);
};