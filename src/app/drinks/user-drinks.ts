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
    public drinkName: string;
    public count: number;
}

export class UpdateDrink {
    public userId: string;
    public drinkId: string;
    public add: boolean;

    constructor(userId: string, drinkCounter: DrinkCounter, add: boolean) {
        this.userId = userId;
        this.drinkId = drinkCounter.drinkId;
        this.add = add;
    }
}
