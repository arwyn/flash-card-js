import React from 'react';
import { Button, Paper, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { populate, clear } from '../../app/store/card-stack';
import { CardStack, CardStackProps } from '../card-stack/CardStack';
import { Box } from '@mui/system';
import { CardStackProgress } from '../card-stack-progress/CardStackProgress';
import { CardSessionProgress } from '../card-session-progress/CardSessionProgress';
import { updateScore } from '../../app/store/card-session';

export interface CardSessionProps extends CardStackProps {
    onComplete?: () => void;
};

/**
 * Question Card Stack
 */
export const CardSession = ( {onComplete = () => {}, ...props}: CardSessionProps) => {
    const stackInProgress = useAppSelector((state) => {
        return state.cardStack.stack.length > 0;
    });

    const currentStackScores = useAppSelector((state) => {
        return state.cardStack.scores;
    })

    const cards = useAppSelector((state) => {
        return Object.entries(state.cardSession.cards)
            .map(([id, card]) => ({id, card, score: state.cardSession.scores[id].score, updated: state.cardSession.scores[id].updated}))
            .sort((a, b) => a.score - b.score);
    });

    const enabled = cards.filter(({updated}) => !updated).length > 0;

    const dispatch = useAppDispatch();

    const newStack = () => {
        dispatch(populate({cards: cards.filter(({updated}) => !updated).slice(0, 10).map(({id, card}) => ({id, ...card}))}));
    }

    if (!stackInProgress && Object.keys(currentStackScores).length > 0) {
        dispatch(updateScore({changes: currentStackScores}));
        dispatch(clear());
    }

    if (cards.length && !enabled) {
        onComplete();
    };

    return !enabled ? (<Box>No session</Box>) : (<Paper elevation={1}>
        <Box sx={{backgroundColor: 'primary.light', width: '100%', display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr:2, ml: 2 }}>
                { stackInProgress ? (<CardStackProgress/>) : <Typography variant="body1" color="primary.contrastText">Please Click Start</Typography> }
            </Box>
            <Box sx={{ minWidth: 50, alignItems: 'center', justifyContent: 'center', pt: .5 }}>
                <CardSessionProgress/>
            </Box>
        </Box>
        <Box sx={{p:2}}>
        { stackInProgress ? (<CardStack {...props}/>) : <Button variant='contained' onClick={newStack}>Start</Button> }
        </Box>
    </Paper>);
};
