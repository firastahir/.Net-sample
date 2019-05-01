import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.less']
})
export class FaqComponent implements OnInit {

  questions: any[];

  constructor() { }

  ngOnInit() {
    this.getQuestions();
  }

  getQuestions() {
    this.questions = [ { question: "How do I register?", answer: "Follow this link." },
                  { question: "How do contact?", answer: "Follow this link...."}
                ];
  }
}
