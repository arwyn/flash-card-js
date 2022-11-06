import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { QuestionCard } from './QuestionCard';

export default {
    title: 'Components/QuestionCard',
    component: QuestionCard
} as ComponentMeta<typeof QuestionCard>;

const Template: ComponentStory<typeof QuestionCard> = (args) => <QuestionCard {...args} />;

export const BasicQuestion = Template.bind({});
BasicQuestion.args = {
    question: 'This is a question\n\nWritten in *markdown*',
    answers: {
        correct: {
            id: 'correct-1',
            markdown: '***correct answer***'
        },
        wrong: {
            'wrong-1': 'not me',
            'wrong-2': 'incorrect',
            'wrong-3': '***Nope***'
        }
    }
};
