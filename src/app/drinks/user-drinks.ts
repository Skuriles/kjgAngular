export class UserDrinks {
    public userName: string;
    public userid: string;
    public drinks: DrinkCounter[];
    public count: number;
}

export class DrinkCounter {
    public drinkId: string;
    public drinkName:string;
    public count: number;
}
