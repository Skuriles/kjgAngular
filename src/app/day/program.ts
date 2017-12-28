export class ProgramPoint {
  public shortName: string;
  public description: string;
  public material: string[];
  public attachments: string[];
  public people: string[];
  public _id: string;

  constructor() {
    this._id = "";
    this.shortName = "Neuer Programmpunkt";
    this.attachments = [];
    this.material = [];
    this.people = [];
  }

  copy(programPoint: ProgramPoint): void {
    this.shortName = programPoint.shortName;
    this._id = programPoint._id;
    this.attachments = programPoint.attachments;
    this.description = programPoint.description;
    this.material = programPoint.material;
    this.people = programPoint.people;
  }
}
