export interface Voucher { 
    id: number;
    code: string;
    discountAmount: number;
    voucherImageUrl: string;
    voucherName: string;
    minOrder: number;
}