export class ProgramPoint {
  public shortName: string;
  public description: string;
  public material: string[];
  public attachments: string[];
  public links: string[];
  public people: string[];
  public _id: string;

  constructor() {
    this._id = "";
    this.shortName = "Neuer Programmpunkt";
    this.attachments = [];
    this.links = [];
    this.material = [];
    this.people = [];
  }

  copy(programPoint: ProgramPoint): void {
    this.shortName = programPoint.shortName;
    this._id = programPoint._id;
    this.attachments = programPoint.attachments;
    this.description = programPoint.description;
    for (let i = 0; i < programPoint.material.length; i++) {
      const el = programPoint.material[i];
      this.material.push(el);
    }
    for (let i = 0; i < programPoint.people.length; i++) {
      const el = programPoint.people[i];
      this.people.push(el);
    }
  }
}
