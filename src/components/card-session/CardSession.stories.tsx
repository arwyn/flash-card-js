import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { configureStore } from '@reduxjs/toolkit';
import { CardSession } from './CardSession';
import { createCardSessionSlice, CardSessionState } from '../../app/store/card-session';
import { Provider } from 'react-redux';
import { createCardStackSlice, QuestionCardStackState } from '../../app/store/card-stack';

interface PartialState {
    cardSession: CardSessionState
    cardStack: QuestionCardStackState
};

// mocked state
const EmptyMockedState: PartialState = {
    cardSession: {
        cards: {},
        scores: {}
    },
    cardStack: {
        cards: {},
        scores: {},
        stack: []
    }
};

const NewSessionMockedState: PartialState = {
    ...EmptyMockedState,
    cardSession: Array.from({length: 30}, (_, i) => ({
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
        state.scores[id] = {score: 0, updated: false};
        return state;
    }, {cards: {}, scores:{}})
};

const ModifiedSessionMockedState: PartialState = {
    ...NewSessionMockedState,
    cardSession: {
        ...NewSessionMockedState.cardSession,
        scores: Object.fromEntries(Object.keys(NewSessionMockedState.cardSession.scores).map((id, i) => ([id, {updated: i % 3 === 0, score: i % 2 * i * .3 }])))
    }    
};

const MockStore = ({ state, children }: {state: {cardSession: CardSessionState, cardStack: QuestionCardStackState}, children: any}) => {
    const cardSessionSlice = createCardSessionSlice(state.cardSession);
    const cardStackSlice = createCardStackSlice(state.cardStack);
    const store = configureStore({
        reducer: {
            cardSession: cardSessionSlice.reducer,
            cardStack: cardStackSlice.reducer
        },
    });

    return (<Provider store={store}>{children}</Provider>);
}

export default {
    title: 'StoreBacked/CardSession',
    component: CardSession,
    excludeStories: /.*MockedState$/
} as ComponentMeta<typeof CardSession>;

const Template: ComponentStory<typeof CardSession> = (args) => <CardSession/>;

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