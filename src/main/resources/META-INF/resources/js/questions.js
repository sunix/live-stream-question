const questionListDiv = $('#questionList');

function loadQuestions() {
    fetch("/questions")
        .then(response => response.json())
        .then(questions => {
            questionListDiv.empty();
            for (const question of questions) {
                questionListDiv.append(createQuestionElement(question));
            }
        })
}

function createQuestionElement(question) {
    return $("<li class=\"list-group-item question\">" +
        "    <img src=\"" + question.profileUrl + "\">" +
        "    <div class=\"questionActions\">" +
        "         <a  href='#' onclick='promote(\"" + question.uuid + "\")'><i class=\"far fa-bookmark fa-lg\"></i></a>" +
        "         <a href='#' onclick='removeQuestion(\"" + question.uuid + "\")'><i class=\"fas fa-trash-alt fa-lg\"></i></a>" +
        "    </div>" +
        "    <div class=\"questionUsername\">" + question.userName + "</div>" +
        "    <div class=\"questionText\">" + question.text + "</div>" +
        "</li>")
}

function addQuestion() {
    fetch("/questions", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "userName": $('#questionUsername').val(),
            "text": $('#questionText').val()
        }),
    }).then(_ => loadQuestions());
}

function removeQuestion(questionId) {
    fetch("/questions/" + questionId, {
        method: "DELETE"
    }).then(_ => loadQuestions());
}

function promote(questionId) {

}

function demote() {

}

const addQuestionForm = $('#addQuestionForm');
addQuestionForm.submit(function (event) {
    addQuestion();
    event.preventDefault();
});

loadQuestions();