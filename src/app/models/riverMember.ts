export class RiverMember {
    public name: string;
    public age: number;
    public team: string;
    public quantity: number;

    constructor(name: string, age: number, team: string) {
        this.name = name;
        this.age = age;
        this.team = team;
        this.quantity = 0;
    }
}