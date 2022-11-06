import { Box, Typography, CircularProgress } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../../app/hooks';

interface CardSessionProgressProps {
}

/**
 * Display Progress of CardSession
 */
export const CardSessionProgress = ({
    ...prop
}: CardSessionProgressProps) => {
    const updated = useAppSelector((state) => {
        const updatedCount = Object.values(state.cardSession.scores).filter(({updated}) => updated).length;
        const size = Object.keys(state.cardSession.scores).length;
        return size ? updatedCount / size * 100 : 100;
    });
    
    return (<Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress variant="determinate" value={updated} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    variant="caption"
                    component="div"
                    color="text.secondary"
                >{`${Math.round(updated)}%`}</Typography>
            </Box>
    </Box>);
};