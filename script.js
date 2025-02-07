const questions = [
  { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Rome"], answer: "Paris" },
  { question: "Which programming language is used for web development?", options: ["Python", "JavaScript", "Java", "C++"], answer: "JavaScript" },
  { question: "Which cloud service is owned by Amazon?", options: ["Azure", "AWS", "Google Cloud", "IBM Cloud"], answer: "AWS" },
  { question: "What does 'IaaS' stand for?", options: ["Infrastructure as a Service", "Internet as a Service", "Integration as a Service", "Intelligence as a Service"], answer: "Infrastructure as a Service" },
  { question: "Which of these is not a top cloud provider?", options: ["AWS", "Google Cloud", "IBM", "Microsoft Azure"], answer: "IBM" },
  { question: "Which cloud computing model provides virtualized resources?", options: ["IaaS", "PaaS", "SaaS", "DaaS"], answer: "IaaS" },
  { question: "Which cloud provider is known for Azure?", options: ["Amazon", "Google", "Microsoft", "IBM"], answer: "Microsoft" },
  { question: "What is the main benefit of DevOps?", options: ["Faster development cycles", "Lower software costs", "More robust software", "All of the above"], answer: "All of the above" },
  { question: "What is AWS CodePipeline used for?", options: ["Infrastructure as Code", "CI/CD", "Cloud Storage", "Database Management"], answer: "CI/CD" },
  { question: "What does 'ls' do in Linux?", options: ["List files", "Change directory", "Remove files", "Execute program"], answer: "List files" }
];

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];
let timeLeft = 600; // 10 minutes in seconds
let timer;

// Start the timer when the page loads
function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById("time").textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    
    if (timeLeft <= 0) {
      clearInterval(timer);
      showResult();
    }
  }, 1000);
}

function displayQuestion() {
  const question = questions[currentQuestionIndex];
  document.getElementById("question-counter").textContent = `Question ${currentQuestionIndex + 1} / ${questions.length}`;
  document.getElementById("question").textContent = question.question;
  
  const options = document.getElementById("options");
  options.innerHTML = "";
  question.options.forEach(option => {
    const div = document.createElement("div");
    div.textContent = option;
    div.onclick = () => selectAnswer(option);
    options.appendChild(div);
  });
}

function selectAnswer(selectedOption) {
  const question = questions[currentQuestionIndex];
  userAnswers[currentQuestionIndex] = selectedOption;
  
  if (selectedOption === question.answer) {
    score++;
  }
  
  document.querySelectorAll("#options div").forEach(option => option.style.pointerEvents = "none");
  setTimeout(nextQuestion, 500);
}

function nextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    displayQuestion();
  } else {
    clearInterval(timer);
    showResult();
  }
}

function showResult() {
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("result").style.display = "block";
  document.getElementById("score").textContent = `${score} / ${questions.length}`;
  
  const review = document.getElementById("review");
  review.innerHTML = "";

  questions.forEach((question, index) => {
    const resultDiv = document.createElement("div");
    if (userAnswers[index] === question.answer) {
      resultDiv.classList.add("correct");
      resultDiv.textContent = `Q${index + 1}: ${question.question} - ✅ ${userAnswers[index]}`;
    } else {
      resultDiv.classList.add("incorrect");
      resultDiv.textContent = `Q${index + 1}: ${question.question} - ❌ ${userAnswers[index]} (Correct: ${question.answer})`;
    }
    review.appendChild(resultDiv);
  });
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];
  timeLeft = 600;
  document.getElementById("result").style.display = "none";
  document.getElementById("quiz-container").style.display = "block";
  displayQuestion();
  startTimer();
}

startTimer();
displayQuestion();
