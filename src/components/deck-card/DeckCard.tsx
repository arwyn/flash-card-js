import React from 'react';
import { Card, CardActionArea, CardContent, CardHeader, CardProps, Chip, Typography } from '@mui/material';
import { Container } from '@mui/system';

/** Action to trigger when category is selected */
export type CategorySelectAction = (categoryId: string) => void;

/** Action to trigger when Deck is selected */
export type DeckSelectAction = () => void;

export interface DeckCategory {
    /** The category ID */
    id: string;
    /** The category text*/
    text: string;
}

/**
 * The Deck Card Properties
 */
export interface DeckCardProps {
    /** Deck Title */
    title: string;
    /** Deck summary */
    summary: string;
    /** Card count */
    cards: number;
    /** Latest updated card date */
    latest: number;
    /** Oldest updated card date */
    oldest: number;
    /** categries */
    categories: DeckCategory[];
    /** Action to trigger when category is selected */
    onCategorySelect: CategorySelectAction;
    /** Action to trigger when Deck is selected */
    onDeckSelect: DeckSelectAction;
    /** True if currently selected */
    selected: boolean;
}



/**
 * Deck Card
 * 
 * Will display the Deck Info as a card.
 */
export const DeckCard = ({
    title,
    cards,
    latest,
    oldest,
    summary = '',
    categories = [],
    onCategorySelect = () => { },
    onDeckSelect = () => { },
    selected = false,
    sx = { maxWidth: 375 },
    ...props
}: DeckCardProps & Omit<CardProps, 'children' | 'ref' | 'onClick'>) => {
    const triggerSelect = () => {
        if (!selected) {
            onDeckSelect();
        }
    }
    return (
        <Card {...props} sx={sx}>
            <CardActionArea onClick={triggerSelect}>
                <CardHeader title={title} />
            </CardActionArea>
            <CardContent>
                <Container sx={{ mx: 0, px: 0, mb: 1 }}>
                    {categories.map(({ id, text }, index) => (<Chip label={text} key={index} sx={{ mr: 1, mb: .5 }} onClick={() => onCategorySelect(id)} />))}
                </Container>
                <CardActionArea onClick={triggerSelect}>
                    <Typography paragraph>{summary}</Typography>
                    <Typography paragraph>Total Cards: {cards}</Typography>
                    <Typography paragraph>Latest Card Updated: {latest}</Typography>
                    <Typography paragraph>Oldest Card Updated: {oldest}</Typography>
                </CardActionArea>
            </CardContent>
        </Card>);
};