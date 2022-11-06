import { ComponentStory, ComponentMeta } from '@storybook/react';

import { QuestionCard } from './QuestionCard';

export default {
    title: 'Components/QuestionCard',
    component: QuestionCard
} as ComponentMeta<typeof QuestionCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof QuestionCard> = (args) => <QuestionCard {...args} />;

export const BasicQuestion = Template.bind({});
BasicQuestion.args = {
    question: 'This is a question\n\nWritten in *markdown*',
    correctAnswer: '***correct answer***',
    incorrectAnswers: [
        'not me',
        'incorrect',
        '***Nope***'
    ]
};
