import React from 'react';
import { Button, Paper, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { populate } from '../../app/store/card-stack';
import { CardStack, CardStackProps } from '../card-stack/CardStack';
import { Box } from '@mui/system';
import { CardStackProgress } from '../card-stack-progress/CardStackProgress';
import { CardSessionProgress } from '../card-session-progress/CardSessionProgress';
import { updateScore } from '../../app/store/card-session';

export interface CardSessionProps extends CardStackProps {
};

/**
 * Question Card Stack
 */
export const CardSession = ({...props}: CardSessionProps) => {
    const enabled = useAppSelector((state) => {
        return Object.keys(state.cardSession.cards).length > 0;
    });

    const stackInProgress = useAppSelector((state) => {
        return state.cardStack.stack.length > 0;
    });

    const cards = useAppSelector((state) => {
        return Object.entries(state.cardSession.cards).map(([id, card]) => ({id, card, score: state.cardSession.scores[id].score})).sort((a, b) => b.score - a.score);
    })
    
    const dispatch = useAppDispatch();

    const newStack = () => {
        dispatch(populate({cards: cards.slice(0, 10).map(({id, card}) => ({id, ...card}))}));
    }

    const updateSessionScore = (scores) => {
        dispatch(updateScore({scores}));
    }

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
        { stackInProgress ? (<CardStack onComplete={updateSessionScore}/>) : <Button variant='contained' onClick={newStack}>Start</Button> }
        </Box>
    </Paper>);
};
