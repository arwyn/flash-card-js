import { createSlice } from "@reduxjs/toolkit";


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
    failures: number,
    successSpeed: number
}
export interface QuestionCardStackState {
    cards: {
        [id: string]: Card
    },
    scores: {
        [id: string]: Score
    },
    stack: string[]
}

const initialState: QuestionCardStackState = {
    cards: {},
    scores: {},
    stack: []
}

export const createCardStackSlice = (initialState: QuestionCardStackState) => {
    return createSlice({
        name: 'cardStack',
        initialState,
        reducers: {
            incrementFailure: (state, action) => {
                const {questionId} = action.payload;
    
                state.scores[questionId].failures++;
            },
            moveCardToBottomOfStack: (state, action) => {
                const {questionId} = action.payload;
    
                state.stack = state.stack.filter((id) => id !== questionId).concat([questionId]);
            },
            markSuccessAndRemove: (state, action) => {
                const {questionId, eclipsedTime} = action.payload;
    
                state.scores[questionId].successSpeed = eclipsedTime;
                state.stack = state.stack.filter((id) => id !== questionId);
            },
            populate: (state, action) => {
                const {cards} = action.payload as {cards: (Card & {'id': string})[]};
    
                state.cards = cards.reduce((curr: {[id: string]: Card}, {id, ...card}) => { curr[id] = card; return curr; }, {});
                state.scores = cards.reduce((curr: {[id: string]: Score}, {id}) => { curr[id] = {failures: 0, successSpeed: 0}; return curr; }, {});
                state.stack = cards.map(({id}) => id);
            }
        }
    });
};

const CardStackSlice = createCardStackSlice(initialState);

export const {incrementFailure, moveCardToBottomOfStack, markSuccessAndRemove, populate} = CardStackSlice.actions;

export default CardStackSlice.reducer;