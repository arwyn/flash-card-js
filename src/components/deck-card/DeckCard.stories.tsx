import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { DeckCard } from './DeckCard';

export default {
    title: 'Components/DeckCard',
    component: DeckCard
} as ComponentMeta<typeof DeckCard>;

const Template: ComponentStory<typeof DeckCard> = (args) => <DeckCard {...args} />;

export const BasicCard = Template.bind({});
BasicCard.args = {
    title: 'This is a Basic Deck',
    summary: 'Some summary for this deck. No formatting allowed.',
    cards: 0,
    latest: Date.now(),
    oldest: Date.now() - 10000
};


export const CardWithCategories = Template.bind({});
CardWithCategories.args = {
    title: 'This is a Basic Deck',
    summary: 'Some summary for this deck. No formatting allowed.',
    categories: [
        {id: 'cat1', text: 'Category 1 - as'},
        {id: 'cat2', text: 'Category 2'},
        {id: 'cat3', text: 'Category 3 - xxx'},
        {id: 'cat4', text: 'Category 4'},
        {id: 'cat5', text: 'Category 5 asasddasdas'},
        {id: 'cat6', text: 'Category 6 aa'}
    ],
    cards: 0,
    latest: Date.now(),
    oldest: Date.now() - 10000
};