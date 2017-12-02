import { Drink } from "../drinks/drink";

export class User {  

    public name: string;
    public password: string;
    public email: string;
    public _id: string;
    public drinks: Drink[];

    constructor() {
        this.name = "";
        this.password = "";
        this.email = "";
        this._id = "";
    }
}