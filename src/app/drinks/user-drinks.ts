export class UserDrinks {
    public userName: string;
    public userid: string;
    public drinks: DrinkCounter[];

    constructor() {
        this.drinks = [];
    }
}

export class DrinkCounter {
    public drinkId: string;
    public drinkName:string;
    public count: number;
}
