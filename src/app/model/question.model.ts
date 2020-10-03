import { Option } from './options.model';
export class Question {
  slnumber: number;
  question: string;
  options: Option[] = new Array();
  timegiven: number;
  answer: string;


  constructor(obj?: any) {
    this.slnumber = obj && obj.slnumber;
    this.question = obj && obj.question || 'error';
    this.answer = obj && obj.correct_answer || 'error';
    let j = 0;
    obj.incorrect_answers.forEach(op => {
      const option: Option = {slnumber: j, content: op, selected: 0};
      this.options.push(option);
      j++;
    });
    const rand = Math.floor(Math.random() * (obj.incorrect_answers.length - 0 + 1) + 0);
    console.log(rand);
    const bkpOption = {...this.options[rand]};
    this.options[rand] = {slnumber: j, content: this.answer, selected: 0};
    this.options.push(bkpOption);
    this.timegiven = 10;
  }

}


