import { ICompany } from './interfaces';

export class Company implements ICompany {

    public constructor() { }

    public id: string;
    public name: string;
    public telephone?: string;
    public type: string;

}
