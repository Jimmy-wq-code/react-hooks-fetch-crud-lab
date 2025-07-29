import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionItem from "./QuestionItem";
import QuestionList from "./QuestionList";

function App() {
	const [page, setPage] = useState("List");
	const [questions, setQuestions] = useState([]);

	useEffect(() => {
		fetch("http://localhost:4000/questions")
			.then((res) => res.json())
			.then((questions) => setQuestions(questions));
	}, []);

	function onNewQuestion(question) {
		setQuestions([...questions, question]);
	}

	function onDeleteQuestion(deletedQuestion) {
		const updatedQuestions = questions.filter((question) => question.id !== deletedQuestion.id);
		setQuestions(updatedQuestions);
	}

	function onChangeAnswer(updatedQuestion) {
		const updatedQuestions = questions.map((question) => {
			if (updatedQuestion.id === question.id) {
				return updatedQuestion;
			} else {
				return question;
			}
		});

		setQuestions(updatedQuestions);
	}

	return (
		<main>
			<AdminNavBar onChangePage={setPage} />
			{page === "Form" ? <QuestionForm onNewQuestion={onNewQuestion} /> : <QuestionList questions={questions} onDeleteQuestion={onDeleteQuestion} onChangeAnswer={onChangeAnswer}/>}
		</main>
	);
}

export default App;