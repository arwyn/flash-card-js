import React from 'react';
import { ArticleOutlined } from '@mui/icons-material';
import { QuestionCard } from '../question-card/QuestionCard';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { incrementFailure, markSuccessAndRemove, moveCardToBottomOfStack, Scores } from '../../app/store/card-stack';
import { shallowEqual } from 'react-redux';

export interface CardStackProps {
    onComplete?: (scores: Scores) => void;
    successPause?: number;
};

/**
 * Question Card Stack
 */
export const CardStack = ({successPause = 1000, onComplete = () => {}}: CardStackProps) => {
    const top = useAppSelector((state) => {
        const entry = Object.entries(state.cardStack.cards).find(([key,]) => key === state.cardStack.stack[0]);
        return {
            id: entry ? entry[0] : '',
            card: entry ? entry[1] : undefined
        };
    }, shallowEqual);

    const scores = useAppSelector((state) => {
        return state.cardStack.scores;
    });

    const [errorCount, setErrorCount] = useState(0);
    const [startTime, setStartTime] = useState(Date.now());

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
        }, successPause);
    }

    if (!top.card && Object.keys(scores).length > 0) {
        onComplete(scores);
    }

    return top.card ? (<QuestionCard 
            id={top.id} 
            onCorrectAnswer={onCorrectAnswer} 
            onWrongAnswer={onWrongAnswer} 
            question={top.card.question} 
            answers={top.card.answers}/>)
        : (<ArticleOutlined/>);
};