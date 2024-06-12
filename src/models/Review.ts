import { Post } from "./Post";

export interface Review {
    id: number;
    famousPlace: string;
    title: string;
    description: string;
    subDescription: string;
    conclude: string;
    listImage: string[];
    price: number;
    list: Post[];
}