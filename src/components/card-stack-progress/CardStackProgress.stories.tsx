import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { configureStore } from '@reduxjs/toolkit';
import { CardStackProgress } from './CardStackProgress';
import { createCardStackSlice, QuestionCardStackState } from '../../app/store/card-stack';
import { Provider } from 'react-redux';

// mocked state
const MockedState: QuestionCardStackState = {
    cards: {},
    scores: {},
    stack: []
};

const NewStackProgressMockedState: QuestionCardStackState = Array.from({length: 10}, (_, i) => ({
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

const PartialStackProgressMockedState: QuestionCardStackState = Object.assign({}, NewStackProgressMockedState, {
    scores: Object.fromEntries(Object.keys(NewStackProgressMockedState.scores).map((id, i) => ([id, {failures: i % 3, successSpeed: i % 2 * .3 }])))
});

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
    title: 'StoreBacked/CardStackProgress',
    component: CardStackProgress,
    excludeStories: /.*MockedState$/
} as ComponentMeta<typeof CardStackProgress>;

const Template: ComponentStory<typeof CardStackProgress> = (args) => <CardStackProgress/>;

export const Default = Template.bind({});
Default.decorators = [
    (story) => <MockStore state={MockedState}>{story()}</MockStore>,
];

export const NewStackProgress = Template.bind({});
NewStackProgress.decorators = [
    (story) => <MockStore state={NewStackProgressMockedState}>{story()}</MockStore>,
];

export const PartialStackProgress = Template.bind({});
PartialStackProgress.decorators = [
    (story) => <MockStore state={PartialStackProgressMockedState}>{story()}</MockStore>,
];