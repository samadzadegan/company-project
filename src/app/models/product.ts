import { IProduct } from './interfaces';

export class Product implements IProduct {

    public constructor() { }

    public id: string;
    public title: string;
    public idCompany: string;
    public createDate?: Date;
    public status: boolean;

}
