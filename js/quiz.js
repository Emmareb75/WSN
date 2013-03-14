var quizData = [];
var questions = [];
var nextQuestion = 0;
var totalAnswers = 0;
var correctAnswers = 0;
var previousCorrect = false;
var index = 0;
var percent = 0;

$(document).ready(function() {
	$.getJSON('js/questions.json', function(data) {
		$.each(data, function(index, item) {
			var dataItem = {};
            dataItem['answer'] = []
            
            $.each(item, function(attribute, field) {
                
                if(attribute == 'question')
                    dataItem['question'] = field;
                if(attribute == 'answers') {
                    $.each(field, function(ind, answer) {
                       dataItem['answer'].push(answer); 
                    });
                }
                if(attribute == 'correct')
                    dataItem['correct'] = field;
            });

			quizData.push(dataItem);
		});
	});
});

function start() {
	$('#welcome').css('display','none');
	$('#question').css('display','block');
	$('#button-start').css('display','none');
    $('#answer1').css('display','block');
    $('#answer2').css('display','block');
    $('#answer3').css('display','block');
    $('#stats').css('display','block');
    $('#next').css('display','inline');

	totalAnswers = 0;
	correctAnswers = 0;
	nextQuestion = 0;
	previousCorrect = false;

	next();
}

function end() {
	if (previousCorrect == true) {
		correctAnswers++;
	}
	if (totalAnswers != 0) {
		percent = Math.floor(correctAnswers / totalAnswers * 100);
	}
	else {
		percent = 0;
	}

	$('#question').html('You scored ' + correctAnswers + '/' + totalAnswers + '. Your success rate was: ' + percent + '%');
	$('#button-start').css('display','block');
    $('#answer1').css('display','none');
    $('#answer2').css('display','none');
    $('#answer3').css('display','none');
    $('#next').css('display','none');
    $('#stats').css('display','none');
}

function next() {
	if (nextQuestion == quizData.length) {
		end();
		return;
	}

	$('#answer1').removeClass();
	$('#answer2').removeClass();
	$('#answer3').removeClass();

	$('#answer1').addClass('btn');
	$('#answer2').addClass('btn');
	$('#answer3').addClass('btn');

	if (previousCorrect == true) {
		correctAnswers++;
	}
	previousCorrect = false;
	index = nextQuestion++;

	if (totalAnswers != 0) {
		percent = Math.floor(correctAnswers / totalAnswers * 100);
	}
	else {
		percent = 0;
	}

	$('#stats').html('Your score: ' + correctAnswers + '/' + totalAnswers + ' ' + percent + '%');
	$('#question').html('Question ' + (totalAnswers + 1) + ': ' + quizData[index]['question']);
	$('#answer1').html(quizData[index]['answer'][0]);
	$('#answer2').html(quizData[index]['answer'][1]);
	$('#answer3').html(quizData[index]['answer'][2]);

	totalAnswers++;
}

function chceckAnswer(answer, id) {
	$('#answer1').removeClass();
	$('#answer2').removeClass();
	$('#answer3').removeClass();

	$('#answer1').addClass('btn');
	$('#answer2').addClass('btn');
	$('#answer3').addClass('btn');

	if (answer == quizData[index]['correct']) {
		previousCorrect = true;
		$(id).removeClass('btn');
		$(id).addClass('btn-green');
	}
	else {
		$(id).removeClass('btn');
		$(id).addClass('btn-red');
	}
}

function checkAnswer1() {
	chceckAnswer($('#answer1').html(), '#answer1');
}

function checkAnswer2() {
	chceckAnswer($('#answer2').html(), '#answer2');
}

function checkAnswer3() {
	chceckAnswer($('#answer3').html(), '#answer3');
}