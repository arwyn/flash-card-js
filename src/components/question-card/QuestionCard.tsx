import React from 'react';
import { Button, ButtonProps, Grid } from '@mui/material';
import { LooksOne, LooksTwo, Looks3, Looks4, ThumbUp, ThumbDown } from '@mui/icons-material';
import { Markdown } from '../markdown/Markdown';
import { randomizeList, shuffle } from '../../util/random.util';
import { useState, useEffect, useMemo } from 'react';

export type ButtonAction = (button: any, answerId?: string) => void;

export type AnswerAction = (questionId?: string, nswerId?: string) => void;

export interface Answer {
    /** answer id */
    id: string;
    /** inline markdown of text */
    markdown: string;
}

export interface Answers {
    /** Correct Answer (Inline Markdown) */
    correct: Answer;
    /**
     * Possible Incorrect Answers (Inline Markdown)
     * 
     * Upto 3 elements will be chosen.
     */
    wrong: { [id: string]: string };
}

/**
 * The Question Card Properties
 */
export interface QuestionCardProps {
    /** Question ID */
    id?: string;
    /** Current card score */
    score: number;
    /** Question (Block Markdown) */
    question: string;
    /** Answer marksdown */
    answers: Answers;
    /** Card Start Time */
    startTime: number;
    /** MUI Button Properties */
    button?: ButtonProps;
    /**
     * Event Triggered for correct answer
     */
    onCorrectAnswer?: AnswerAction;
    /**
     * Event Triggered for incorrect answer
     */
    onWrongAnswer?: AnswerAction;
    /**
     *  Icon for correctly selected entry
     *  @default `<ThumbsUp/>`
    */
    correctIcon?: React.ReactNode;
    /**
     *  Icon for incorrectly selected entry
     *  @default `<ThumbsDown/>`
    */
    wrongIcon?: React.ReactNode;
}

/**
 * Question Card
 * 
 * Will display a question and upto 4 possible answer buttons, only 1 of which is correct.
 * 
 * When a button is pressed, the button will change the button icon, the button color, disable the button and call the corresponding event.
 */
export const QuestionCard = ({
    question,
    answers,
    startTime,
    button = {variant: 'contained', fullWidth: true},
    onCorrectAnswer = () => {},
    onWrongAnswer = () => {},
    correctIcon = <ThumbUp/>,
    wrongIcon = <ThumbDown/>,
    ...props
}: QuestionCardProps) => {
    const selectedAnswers = useMemo(() => shuffle([
            { correct: true, text: answers.correct.markdown, id: answers.correct.id }
        ].concat(randomizeList(Object.entries(answers.wrong).map(([id, text]) => ({id, correct: false, text})), 3))),
        [answers]);

    const [disabled, setDisabled] = useState<string[]>([]);

    useEffect(() => {
        setDisabled([]);
    }, [answers, startTime]);

    const icons = [(<LooksOne/>), (<LooksTwo/>), (<Looks3/>), (<Looks4/>)];

    const action = (button: any, answerId: string) => {
        setDisabled((prev) => prev.concat([answerId]));
        if (selectedAnswers.find(({id}) => id === answerId)?.correct as boolean){
            onCorrectAnswer(props.id, answerId);
        }
        else {
            onWrongAnswer(props.id, answerId)
        }
    };    

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Markdown text={question}/>
            </Grid>
            {selectedAnswers.map(({text, correct, id}, i) => {
                const off = disabled.find(item => item === id) !== undefined;
                const icon = off ? (correct ? correctIcon : wrongIcon) : icons[i];
                const color = off ? (correct ? 'success' : 'error') : 'primary';
                return (
                    <Grid item xs={6} key={i}>
                        <Button 
                            {...button}
                            disabled={off}
                            startIcon={icon}
                            color={color}
                            onClick={(button) => action(button, id)}
                            sx={[
                                (theme) => ({
                                    '&:disabled': { 
                                        backgroundColor: theme.palette[color][theme.palette.mode],
                                        color: correct ? theme.palette[color].contrastText : (theme.palette.mode === 'dark' ? '#0009' : '#fff9')
                                    } 
                                })
                            ]}>
                                <Markdown inline text={text}/>
                        </Button>
                    </Grid>
                );
            })}
        </Grid>);
};