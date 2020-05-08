// **************************************************

// **************************************************
export interface ICompany {

    id: string;
    name: string;
    telephone?: string;
    type: string;

}
// **************************************************

// **************************************************
export interface IProduct {

    id: string;
    title: string;
    idCompany: string;
    createDate?: Date;
    status: boolean;

}
