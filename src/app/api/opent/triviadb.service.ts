import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { Question } from './../../model/question.model';


@Injectable({
  providedIn: 'root'
})
export class TriviadbService {

  private questionsfromTrivia: Question[];
  private currentQuestionNumber = 0;
  private triviaDbLink = 'https://opentdb.com/api.php';

  constructor(private httpClient: HttpClient) { }


  getQuestionsFromTrivia(amount: string, difficulty: string, category: string): Promise<Question[] | any> {
    const params = new HttpParams()
    .set('amount', amount)
    .set('difficulty', difficulty)
    .set('category', category);
    return this.httpClient.get(this.triviaDbLink, {params})
    .toPromise()
    .then(this.handleGetQuestions)
    .catch(this.handleErrorforGetQuestions);
  }

  setQuestionsfromTrivia(questionsfromTrivia: Question[]): void {
    this.questionsfromTrivia =  questionsfromTrivia;
    this.currentQuestionNumber = 0;
  }

  validateAnswer(question: Question): any {
    if (this.questionsfromTrivia[this.currentQuestionNumber - 1].answer === question.answer) {
      return {result: true, answer: question.answer};
    }
    return {result: false, answer: this.questionsfromTrivia[this.currentQuestionNumber - 1].answer};
  }

  getQuestion(): Question {
    if (this.currentQuestionNumber === this.questionsfromTrivia.length) {
      return null;
    } else {
      const q: Question = {...this.questionsfromTrivia[this.currentQuestionNumber]};
      q.answer = '';
      this.currentQuestionNumber++;
      return q;
    }

  }

  handleGetQuestions(resp: any): Question[] {
    const questionsfromTrivia: Question[] = new Array();
    const response = resp.results;
    let i = 1;
    response.forEach(question => {
      question.slnumber = i;
      const t = new Question(question);
      questionsfromTrivia.push(t);
      i++;
    });
    return questionsfromTrivia;
  }

  handleErrorforGetQuestions(error: any): void {
    console.log('Error occured: ' + error);
    return error;
  }
}
