import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { configureStore } from '@reduxjs/toolkit';
import { CardSessionProgress } from './CardSessionProgress';
import { createCardSessionSlice, CardSessionState } from '../../app/store/card-session';
import { Provider } from 'react-redux';

// mocked state
const EmptyMockedState: CardSessionState = {
    cards: {},
    scores: {}
};

const NewSessionMockedState: CardSessionState = Array.from({length: 30}, (_, i) => ({
    id: `question-${i}`,
    question: `# Question ${i}\n\nAuto-generated mock question ${i}`,
    answers: {
        correct: {
            id: `answer-correct-${i}`,
            markdown: `Correct Answer ${i}`
        },
        wrong: Object.fromEntries(Array.from({length: 5}, (_,j) => ([`answer-wrong-${i}-${j}`, `Wrong Answer ${i} ${j}`])))
    }
})).reduce((state: CardSessionState, {id, ...card}) => {
    state.cards[id] = card;
    state.scores[id] = {score: 0, updated: false};
    return state;
}, {cards: {}, scores:{}});

const ModifiedSessionMockedState: CardSessionState = Object.assign({}, NewSessionMockedState, {
    scores: Object.fromEntries(Object.keys(NewSessionMockedState.scores).map((id, i) => ([id, {updated: i % 3 === 0, score: i % 2 * i * .3 }])))
});

const MockStore = ({ state, children }: {state: CardSessionState, children: any}) => {
    const slice = createCardSessionSlice(state);
    const store = configureStore({
        reducer: {
            cardSession: slice.reducer
        },
    });

    return (<Provider store={store}>{children}</Provider>);
}

export default {
    title: 'StoreBacked/CardSessionProgress',
    component: CardSessionProgress,
    excludeStories: /.*MockedState$/
} as ComponentMeta<typeof CardSessionProgress>;

const Template: ComponentStory<typeof CardSessionProgress> = (args) => <CardSessionProgress/>;

export const Default = Template.bind({});
Default.decorators = [
    (story) => <MockStore state={EmptyMockedState}>{story()}</MockStore>,
];

export const NewStackProgress = Template.bind({});
NewStackProgress.decorators = [
    (story) => <MockStore state={NewSessionMockedState}>{story()}</MockStore>,
];

export const PartialStackProgress = Template.bind({});
PartialStackProgress.decorators = [
    (story) => <MockStore state={ModifiedSessionMockedState}>{story()}</MockStore>,
];