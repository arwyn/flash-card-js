import { createSlice } from "@reduxjs/toolkit";

export interface Answer {
    id: string;
    answerText: string;
}
export interface Card {
    questionText: string,
    correctAnswer: Answer,
    wrongAnswers: Answer[]
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

const CardStackSlice = createSlice({
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

export const {incrementFailure, moveCardToBottomOfStack, markSuccessAndRemove, populate} = CardStackSlice.actions;

export default CardStackSlice.reducer;