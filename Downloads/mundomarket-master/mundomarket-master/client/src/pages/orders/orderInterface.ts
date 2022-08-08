import { IUser } from '../admin/interfaceUsers'
import {ICartProduct} from '../../components/cart/cartInterface'

export interface IOrder {

    _id?        : string;
    user?       : IUser | string;
    cart        : ICartProduct[];
    address     : string;
    isPaid      : boolean;
    paymentId?  : string;
    total       : number;
    // paymentResult?: string;
    //numberOfItems: number;
    //
    //paidAt? : string;
}
