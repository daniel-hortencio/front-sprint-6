import { BrandTypes } from './brand';

export type AutoTypes = {
    id: number;
    model: string;
    year: number;
    price: number;
    brand: BrandTypes | undefined;
}