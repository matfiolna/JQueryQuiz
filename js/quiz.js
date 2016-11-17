$(function() {
	$MainQuiz();
});
(function($) {

	$MainQuiz = function() {
		var quizContainer = $('#container');
		var quizTitle = 'Skálmöld';
		var NumberNextQuest, numCorrect, numIncorrect, totalQuestions;
		var incorrectAnswers, questions;

		
		
		function reset() {
			NumberNextQuest = 0;
			totalQuestions = questions.length;
			incorrectAnswers = [];
			numCorrect = 0;
			numIncorrect = 0;
		}

		
		
		/* Búum til title á Quiz */
		function createTitle() {
			var titleEl = $('<div id="title"></div>');
			titleEl.text(quizTitle);
			quizContainer.prepend(titleEl);
		}
			/* fjöldi spurninga og svara */

		function createNumQuestionsDiv() {
			var QuestionsString = '<b>Fjöldi spurninga</b> ' + (NumberNextQuest + 1) + '/' + totalQuestions;
			var QuestionsDiv = $('<div id="fjoldi"></div>');
			QuestionsDiv.html(QuestionsString);
			quizContainer.append(QuestionsDiv);
		}

		function showQuestionText(text) {
			var tmpTitle = $('<h2 id="question"></h2>');
			tmpTitle.text(text);

			quizContainer.append(tmpTitle);
		}
		
		
		function clearQuestion() {
			quizContainer.text("");
			quizContainer.css({'width': '75%', 'display': 'block', 'margin': '0 auto'});
			createTitle();
			processbar();
		}

		
		
		//processpbar
		function processbar() {
			var processbarDiv = $('<div id="progressbar"></div>');
			quizContainer.append(processbarDiv);
			$('#progressbar').progressbar({
				value: NumberNextQuest / totalQuestions * 100
			});
		}


		function showAnswers(answers, correctAnswer) {
			//each
			$.each(answers, function(i, val) {
				var tmpAnswers = answers[i];
				var answer = $('<div class="answer"></div>').text(tmpAnswers).button().css({'box-sizing': 'border-box', 'width': '100%'});

				//.on
				answer.on('click', function() {
					if ($(this).text() == correctAnswer) {
						numCorrect++;
						displayNextQuestion();
					} else {
						if (!$(this).hasClass('clicked')) {
							$(this).addClass('clicked');

							$(this).animate({
								color: "red"
							}, 500);

							addIncorrectAnswer(tmpAnswers);
						}
					}
				});

				answer.on('mouseenter', function() {
					$(this).css('cursor', 'pointer');
				});

				quizContainer.append(answer);
			});
		}

		function showQuestion() {
			var tmpQ = questions[NumberNextQuest].q;
			var tmpAnswers = questions[NumberNextQuest].answers;
			var tmpCorrectAnswer = questions[NumberNextQuest].correctAnswer;

			tmpAnswers = shuffleArray(tmpAnswers);

			showQuestionText(tmpQ);
			showAnswers(tmpAnswers, tmpCorrectAnswer);
		}

		
		function EndOfTheQuiz() {


			var tryAgain = $('<div></div>').html('Spila aftur').button().width('100%').css({'box-sizing': 'border-box', 'display': 'block','margin':'0.2em auto'}).on('click', function() {
				startNewGame();
			});

			quizContainer.append(tryAgain);
			

		}


		function displayNextQuestion() {
			if (NumberNextQuest === 0)
				questions = shuffleArray(questions);

			clearQuestion();

			if (NumberNextQuest < totalQuestions) {
				createNumQuestionsDiv();
				showQuestion();

				NumberNextQuest++;
			} else {
				EndOfTheQuiz();
			}
		}

		//random
		function getRandomNumber(min, max) {
		return Math.floor((Math.random() * max) + min);
			}


		var shuffleArray = function(arr) {
		var arrayLength = arr.length;
		var usedIndices = []; 
		var newArr = [];

	
		for (var i = 0; i < arrayLength; i++) {
			var randomIndex = getRandomNumber(0, arrayLength);

			while (usedIndices.indexOf(randomIndex) >= 0) {
			
				randomIndex = getRandomNumber(0, arrayLength);
			}

			usedIndices[i] = randomIndex;
			newArr[i] = arr[randomIndex]; 
			}

			return newArr; 
		};
		function Question(q, answers, correctAnswer) {
			this.q = q;
			this.answers = answers;
			this.correctAnswer = correctAnswer;
		}

		function addIncorrectAnswer(answerContent) {
			incorrectAnswers[incorrectAnswers.length] = [$('#question-text').text,
															answerContent,
															questions[NumberNextQuest - 1].correctAnswer];
		}

		function createQuestions() {
			var tmpQuestions = [];

			tmpQuestions = [
						new Question('Hvaða ár var hljómsveitin stofnuð?', ['2008', '2009', '2010', '2011'], '2009'),
						new Question('Hvað heitir fyrsta plata hljómsveitarinnar?', ['Baldur', 'Með Vættum', 'Vögguvísur Yggdrasils'], 'Baldur'),
						new Question('Hvað eru margir gítarleikarar í hljómsveitinni?', ['1', '2', '3', '4'], '3'),
						new Question('Hvað heitir trommuleikarinn?', ['Baldur', 'Jón Geir', 'Björgvin', 'Gunnar'], 'Jón Geir'),
						];

			return tmpQuestions;
		}
		function startNewGame() {
			clearQuestion();
			reset();
			displayNextQuestion();
		}
		
		//LAGA ÞETTA!!!
		questions = createQuestions();
		startNewGame();
	 
	};
})(jQuery);