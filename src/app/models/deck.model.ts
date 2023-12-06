import { Card } from "./card.model";

export interface Deck {
    id: number;
    name: string;
    cards: Card[];
}
