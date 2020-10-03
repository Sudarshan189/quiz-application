export class Option {

  slnumber: number;
  content: string;
  selected: number;

  constructor(slnumber: number, content: string, selected: number) {
      this.slnumber = slnumber;
      this.content = content;
      this.selected = 0;
  }
}
