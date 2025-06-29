export type FeaturedCardsPropsType = {
    id : number,
    onPress : () => void,
    imageUrl : string[],
    result : string
}

export type TravelPlan = {
    id: number;
    userId: number;
    country: string;
    duration: number;
    group_type: string;
    travel_style: string;
    interests: string;
    budget_estimate: string;
    images: string;
    result: string;
    created_at: string;
}