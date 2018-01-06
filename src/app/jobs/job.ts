export class Job {
  public name: string;
  public description: string;
  public persons: string[];  
  public _id: string;

  constructor(){
    this.name = "";
    this.description = "";
    this.persons = [];    
  }
}
