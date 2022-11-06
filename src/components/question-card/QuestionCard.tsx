import React from 'react';
import { Card, CardProps, CardContent, CardActions, Button, ButtonProps, Grid } from '@mui/material';
import { LooksOne, LooksTwo, Looks3, Looks4 } from '@mui/icons-material';
import { Markdown } from '../markdown/Markdown';
import { randomizeList, shuffle } from '../../util/random.uitl';

interface QuestionCardProps {
    question: string;
    correctAnswer: string;
    incorrectAnswers: string[];
    card?: CardProps,
    button?: ButtonProps
}

/**
 * Display Markdown Text as HTML
 */
export const QuestionCard = ({
    question,
    correctAnswer,
    incorrectAnswers = [],
    card = { variant: 'outlined' },
    button = {variant: 'contained', fullWidth: true},
    ...props
}: QuestionCardProps) => {

    const answers = shuffle([
        { correct: true, text: correctAnswer }
    ].concat(randomizeList(incorrectAnswers.map(text => ({correct: false, text})), 3)));

    const icons = [(<LooksOne/>), (<LooksTwo/>), (<Looks3/>), (<Looks4/>)];

    return (
        <Card {...card}>
            <CardContent>
                <Markdown text={question}/>
            </CardContent>
            <CardActions>
                <Grid container spacing={2}>
                    {answers.map(({text}, i) => (
                        <Grid item xs={6}>
                            <Button {...button} startIcon={icons[i]}><Markdown inline text={text}/></Button>
                        </Grid>
                    ))}
                </Grid>
            </CardActions>
        </Card>);
};