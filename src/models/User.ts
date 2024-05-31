export interface User{
    id: number;
    username: string;
    email: string;
    fullName: string;
    phoneNumber: string;
    dayOfBirth: Date;
    avatarUrl: string;
    gender: string;
    role: string;
    stripeCustomerId: string;
    setupIntentId: string;
}