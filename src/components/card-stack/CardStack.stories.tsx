import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { configureStore } from '@reduxjs/toolkit';
import { CardStack } from './CardStack';
import { createCardStackSlice, QuestionCardStackState } from '../../app/store/card-stack';
import { Provider } from 'react-redux';

// mocked state
const MockedState: QuestionCardStackState = {
    cards: {},
    scores: {},
    stack: []
};

const FullMockedState: QuestionCardStackState = Array.from({length: 10}, (_, i) => ({
    id: `question-${i}`,
    question: `# Question ${i}\n\nAuto-generated mock question ${i}`,
    answers: {
        correct: {
            id: `answer-correct-${i}`,
            markdown: `Correct Answer ${i}`
        },
        wrong: Object.fromEntries(Array.from({length: 5}, (_,j) => ([`answer-wrong-${i}-${j}`, `Wrong Answer ${i} ${j}`])))
    }
})).reduce((state, {id, ...card}) => {
    state.cards[id] = card;
    state.scores[id] = {failures: 0, successSpeed: 0};
    state.stack = state.stack.concat([id]);
    return state;
}, Object.assign({}, MockedState));

const MockStore = ({ state, children }: {state: QuestionCardStackState, children: any}) => {
    const slice = createCardStackSlice(state);
    const store = configureStore({
        reducer: {
            cardStack: slice.reducer
        },
    });

    return (<Provider store={store}>{children}</Provider>);
}

export default {
    title: 'Composites/CardStack',
    component: CardStack,
    excludeStories: /.*MockedState$/
} as ComponentMeta<typeof CardStack>;

const Template: ComponentStory<typeof CardStack> = (args) => <CardStack/>;

export const Default = Template.bind({});
Default.decorators = [
    (story) => <MockStore state={MockedState}>{story()}</MockStore>,
];

export const Full = Template.bind({});
Full.decorators = [
    (story) => <MockStore state={FullMockedState}>{story()}</MockStore>,
];