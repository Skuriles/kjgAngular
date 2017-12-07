import { Drink } from "../drinks/drink";
import { Role } from "./role";

export class User {  

    public name: string;
    public password: string;
    public email: string;
    public role: string;
    public _id: string;
    public drinks: Drink[];

    constructor() {
        this.name = "";
        this.password = "";
        this.email = "";
        this._id = "";
        this.role = "";
    }
}