import { createSlice } from "@reduxjs/toolkit";
import { Scores as CardStackScores } from './card-stack';

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

export interface Card {
    question: string,
    answers: Answers
}
export interface Score {
    score: number;
    updated: boolean;
}
export interface CardSessionState {
    cards: {
        [id: string]: Card
    },
    scores: {
        [id: string]: Score
    }
}

const initialState: CardSessionState = {
    cards: {},
    scores: {}
}

const calculateScore = (old: number, failures: number, speed: number) => {
    // fail=0 && speed <= 1 -> *(1+1+1+3) -> *6
    // fail=0 && speed <= 3 -> *(1+1+1) -> *3
    // fail=0 && speed > 3 -> *(1+1) -> *2
    // fail>0 -> *(1+(0.4 / fail)
    const noFailFast = +(!failures && speed <= 1);
    const noFailNorm = +(!failures && speed <= 3);
    const noFailSlow = +(!failures && speed > 3);
    const factor = 1 + (noFailFast * 3) + noFailNorm + noFailSlow + (failures ? 0 : .4 / failures);
    return old * factor;
};

export const createCardSessionSlice = (initialState: CardSessionState) => {
    return createSlice({
        name: 'cardSession',
        initialState,
        reducers: {
            updateScore: (state, action) => {
                const {changes}: {changes: CardStackScores} = action.payload;
    
                Object.entries(changes).forEach(([id, change]) => {
                    state.scores[id] = {
                        updated: true,
                        score: calculateScore(state.scores[id].score, change.failures, change.successSpeed)
                    };
                });
            },
            populate: (state, action) => {
                const {cards} = action.payload as {cards: (Card & {'id': string, 'score': number})[]};

                state.cards = Object.fromEntries(cards.map(({id, score, ...card}) => [id, card]));
                state.scores = Object.fromEntries(cards.map(({id, score}) => [id, {score, updated: false}]));
            }
        }
    });
};

const CardSessionSlice = createCardSessionSlice(initialState);

export const {updateScore,  populate} = CardSessionSlice.actions;

export default CardSessionSlice.reducer;