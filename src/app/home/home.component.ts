import { Option } from './../model/options.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TriviadbService } from '../api/opent/triviadb.service';
import { Question } from '../model/question.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{

  quizStatus = false;
  comments: string = null;
  questionAmount = '10';
  dificulty = 'easy';
  catogory = '17';

  question: Question;
  interval;
  timelapsed = 0;
  constructor(private triviaService: TriviadbService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // take this from local storage
    this.quizStatus = false;
    this.route.queryParams.subscribe(params => {
      this.questionAmount = params['questionAmount'];
      this.dificulty = params['dificulty'];
      this.catogory = params['catogory'];
      this.startQuiz();
    }
    );
  }

  ngOnDestroy(): void {
    alert('Quiz has been closed');
  }

  startQuiz(): void {
    console.log('clalled');
    this.triviaService.getQuestionsFromTrivia(this.questionAmount, this.dificulty, this.catogory)
    .then(data => {
      this.triviaService.setQuestionsfromTrivia(data);
      console.log(data);
      this.quizStatus = true;
      this.showQuestion();
    }, error => {
      console.log(error);
      this.quizStatus = false;
    });
  }

  showQuestion(): void {
    this.comments = null;
    clearInterval(this.interval);
    this.question = this.triviaService.getQuestion();
    if (this.question !== null) {
      console.log(this.question);
      this.timelapsed = 0;
      this.startTimer();
    } else {
      this.quizStatus = false;
      return;
    }
  }

  startTimer(): void {
    this.interval = setInterval(() => {
      if (this.question.timegiven === this.timelapsed) {
        this.comments = 'Timeout ';
        this.checkCorrectAnswer(this.question);
        clearInterval(this.interval);
      }
      this.timelapsed++;
    }, 1000);
  }

  onOptionSelection = (selectedOption: Option): void => {
    let result = null;
    this.question.options.forEach(option => {
      if (this.comments === null) {
        if (option.slnumber === selectedOption.slnumber) {
          option.selected = 1;
          this.question.answer = option.content;
          result = this.checkCorrectAnswer(this.question);
          option.selected = result.result ? 2 : 3;
          this.comments = result.answer;
        } else {
          option.selected = 0;
        }
      }
    });
    clearInterval(this.interval);
  }

  checkCorrectAnswer(question: Question): any {
    const result = this.triviaService.validateAnswer(this.question);
    this.question.options.find(x => {
      x.selected = x.content === result.answer ? 2 : x.selected;
     });
    return result;
  }

}
