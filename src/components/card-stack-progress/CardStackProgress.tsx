import { LinearProgress, Box, Typography } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../../app/hooks';

interface CardStackProgressProps {
}

/**
 * Display Progress of CardStack
 */
export const CardStackProgress = ({
    ...prop
}: CardStackProgressProps) => {
    const { completed, started } = useAppSelector((state) => {
        const completedCount = Object.values(state.cardStack.scores).filter(({successSpeed}) => successSpeed > 0).length;
        const startedCount = Object.values(state.cardStack.scores).map(({failures, successSpeed}) => failures + successSpeed).filter(sum => sum > 0).length;
        const size = Object.keys(state.cardStack.scores).length;
        return {
            completed: size ? completedCount / size * 100 : 100,
            started: size ? startedCount / size * 100 : 100
        }
    });
    
    return (<Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress variant="buffer" value={completed} valueBuffer={started} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
            <Typography variant="caption" color="primary.contrastText">{`${Math.round(completed)}%`}</Typography>
        </Box>
    </Box>);
};