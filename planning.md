# Planning

Flash card program.

React / AWS Application

## Goals

- React / Redux App
- Use Storybook for components
- UI hould use Component driven development
- Backend will use AWS
- Backend should use free-tier where possible
- Backend env should target a serverless infrastructure
- Initial Cards should be targetted towards passing Eiken.

## Nomeclature

| Name | Description |
| --- | --- |
| Card | A question with a correct answer and multiple possible wrong answers |
| CardDeck | An ordered collection of cards which are being attempted this session. Cards are ordered by score. |
| CardStack | An ordered collection of cards which are currently being attempted, the stack will be attempted in order. |
| CardCollection | A general collection of cards. |

## General Flow of App

You will select cards from the collection of all cards to form a Deck.

When you begin a session with a deck, it will keep track of how many cards you have completed - the scores being updated when a card stack is complete.

A stack will be generated from the 7 lowest scoring + 3 random cards in the deck. When the stack is complete, the scores will be updated.

Once all cards have been completed at least once, the desck session will be marked as complete.

## Milestones

### Milestone 1

CardStack and related UI Components should function in storybook.

### Milestone 2

CardDeck and related UI Components should function in storybook.

### Milestone 3

UI for selecting cards should function in storybook.

### Milestone 4

Basic AWS Infra should be deployable

### Milestone 5

Login with google should function

### Milestone 6

Cards should be read from server

### Milestone 7

Scores should be updatable

