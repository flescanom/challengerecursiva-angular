export class Member {
    public name: string;
    public age: number; 
    public team: string; 
    public maritalStatus?: string;
    public educationLevel?: string;

    constructor (name: string, age: number, team: string, maritalStatus: string, educationLevel: string) {
        this.name = name;
        this.age = age;
        this.team = team;
        this. maritalStatus = maritalStatus;
        this.educationLevel = educationLevel;
    }
}