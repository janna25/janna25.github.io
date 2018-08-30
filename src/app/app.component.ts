import { QUESTIONS } from './questions';
import { Component } from '@angular/core';

declare var $: any;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	question: any;
	clicked: boolean;


	private QUESTIONS: any[];
	private readonly wrongAnswerClass: string = 'wrong-answer';
	private readonly rightAnswerClass: string = 'correct-answer';

	points: number = 0;

	constructor() {
		this.QUESTIONS = Object.assign([], QUESTIONS);
	}

	ngOnInit(): void {
		this.question = this.nextQuestion();
	}

	selectResponse(answer: any, block: HTMLElement): void {
		this.question.shown = true;
		this.clicked = true;
		const correctAnswer: boolean = answer.option == this.question.rightResponse;

		answer.right = correctAnswer;

		if (correctAnswer) {
			this.onSelectRightResponse(block);
		} else {
			this.onSelectWrongResponse(block);
		}


	}


	private onSelectRightResponse(block: HTMLElement): void {
		setTimeout(() => {
			$(block).toggleClass(this.rightAnswerClass);
			setTimeout(() => {
				$(block).toggleClass(this.rightAnswerClass);
				setTimeout(() => {
					$(block).toggleClass(this.rightAnswerClass);
					setTimeout(() => {
						$(block).toggleClass(this.rightAnswerClass);
						setTimeout(() => {
							$(block).toggleClass(this.rightAnswerClass);
							this.points += 10;

							if (this.points < 60) {
								$('.correct-modal').modal('show');
							} else {
								$('.complete-modal').modal('show');
							}
						}, 100);
					}, 100);
				}, 100);
			}, 100);
		}, 100);
	}

	private onSelectWrongResponse(block: HTMLElement): void {
		setTimeout(() => {
			$(block).toggleClass(this.wrongAnswerClass);
			setTimeout(() => {
				$(block).toggleClass(this.wrongAnswerClass);
				setTimeout(() => {
					$(block).toggleClass(this.wrongAnswerClass);
					setTimeout(() => {
						$(block).toggleClass(this.wrongAnswerClass);
						setTimeout(() => {
							$(block).toggleClass(this.wrongAnswerClass);
							$('.wrong-modal').modal('show');
						}, 100);
					}, 100);
				}, 100);
			}, 100);
		}, 100);

	}


	onAccept() {
		this.question = this.nextQuestion() || {};
	}


	private nextQuestion(): any {
		return this.QUESTIONS.find((q: any) => !q.shown);
	}


	resetAll(): void {
		location.reload();
	}
}
