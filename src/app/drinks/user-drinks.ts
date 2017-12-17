import { User } from '../users/userDto';

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

export class DailyWinners {
    public dailyWinner: DailyWinner;
    public dailyWinnersBlitz: DailyWinner;
    public winnerUserTotal: DailyWinner;
}

export class DailyWinner {
    public user: User;
    public count: number;

    constructor() {
        this.user = new User();
        this.user.name = '';
        this.count = 0;
    }
}
