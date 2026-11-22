// DOM Elements
const navbar = document.getElementById('navbar');
const themeToggle = document.getElementById('theme-toggle');
const scrollTopBtn = document.getElementById('scroll-top');
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const quizContainer = document.getElementById('quiz-container');
const resultDiv = document.getElementById('result');
const questionDiv = document.getElementById('question');
const optionsDiv = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const retakeBtn = document.getElementById('retake-btn');
const suggestedCareer = document.getElementById('suggested-career');
const careerDescription = document.getElementById('career-description');
const quizProgress = document.getElementById('quiz-progress');
const currentQuestionNum = document.getElementById('current-question-num');
const totalQuestionsSpan = document.getElementById('total-questions');
const viewRoadmapBtn = document.getElementById('view-roadmap-btn');
const quizFeedback = document.getElementById('quiz-feedback');

// Quiz Data - 10 Questions with 4 Options and Correct Answer
const quizQuestions = [
    {
        question: "What interests you most?",
        options: [
            { text: "Building and fixing computers", value: "tech", correct: true },
            { text: "Painting and drawing", value: "creative" },
            { text: "Helping sick people", value: "people" },
            { text: "Making money and investments", value: "business" }
        ]
    },
    {
        question: "Which subject did you enjoy most in school?",
        options: [
            { text: "Art and Design", value: "creative" },
            { text: "Biology/Science", value: "people" },
            { text: "Mathematics", value: "tech", correct: true },
            { text: "Economics/Commerce", value: "business" }
        ]
    },
    {
        question: "What type of work environment do you prefer?",
        options: [
            { text: "Creative studio", value: "creative" },
            { text: "Office with computers", value: "tech", correct: true },
            { text: "Hospital or clinic", value: "people" },
            { text: "Corporate office", value: "business" }
        ]
    },
    {
        question: "How do you like to solve problems?",
        options: [
            { text: "Using logic and coding", value: "tech", correct: true },
            { text: "Thinking creatively", value: "creative" },
            { text: "Empathizing with others", value: "people" },
            { text: "Strategic planning", value: "business" }
        ]
    },
    {
        question: "What skill would you like to develop?",
        options: [
            { text: "Visual design", value: "creative" },
            { text: "Communication skills", value: "people" },
            { text: "Leadership abilities", value: "business" },
            { text: "Programming and coding", value: "tech", correct: true }
        ]
    },
    {
        question: "What matters most to you in a career?",
        options: [
            { text: "Self-expression", value: "creative" },
            { text: "Making a difference", value: "people" },
            { text: "Innovation and technology", value: "tech", correct: true },
            { text: "Growth and earnings", value: "business" }
        ]
    },
    {
        question: "How do you prefer to work?",
        options: [
            { text: "Freely creating designs", value: "creative" },
            { text: "Directly with clients/patients", value: "people" },
            { text: "Leading teams", value: "business" },
            { text: "Independently on technical tasks", value: "tech", correct: true }
        ]
    },
    {
        question: "What type of problems do you enjoy?",
        options: [
            { text: "Technical challenges", value: "tech", correct: true },
            { text: "Aesthetic challenges", value: "creative" },
            { text: "Human challenges", value: "people" },
            { text: "Competitive challenges", value: "business" }
        ]
    },
    {
        question: "What would you like to create?",
        options: [
            { text: "Art and visuals", value: "creative" },
            { text: "Apps and software", value: "tech", correct: true },
            { text: "Health solutions", value: "people" },
            { text: "Business solutions", value: "business" }
        ]
    },
    {
        question: "Where would you like to make an impact?",
        options: [
            { text: "Technology industry", value: "tech", correct: true },
            { text: "Media and entertainment", value: "creative" },
            { text: "Healthcare sector", value: "people" },
            { text: "Economy and commerce", value: "business" }
        ]
    }
];

// Career descriptions
const careerDescriptions = {
    "Engineering": "You should explore Engineering careers! Engineers design, build, and innovate solutions to real-world problems. Consider fields like Software Engineering, Mechanical Engineering, Civil Engineering, or Computer Science.",
    "Medical": "You should explore Medical careers! Healthcare professionals help people live healthier lives. Consider becoming a Doctor, Nurse, Pharmacist, or pursuing other healthcare roles.",
    "IT": "You should explore IT careers! IT professionals work with technology, cybersecurity, and software development. Consider roles like Software Developer, Data Analyst, Cybersecurity Expert, or IT Consultant.",
    "Design": "You should explore Design careers! Designers create visual experiences and user interfaces. Consider UX/UI Design, Graphic Design, Product Design, or Creative Direction.",
    "Government Jobs": "You should explore Government careers! Public servants work in administration, law enforcement, and policy. Consider roles in civil service, administration, or public policy.",
    "Business": "You should explore Business careers! Business professionals manage operations, finance, and entrepreneurship. Consider roles in Management, Finance, Marketing, or start your own business."
};

// Career to file mapping
const careerToFile = {
    "Engineering": "engineering.html",
    "Medical": "medical.html",
    "IT": "it.html",
    "Design": "design.html",
    "Government Jobs": "government.html",
    "Business": "business.html"
};

// Quiz state
let currentQuestion = 0;
let scores = {
    tech: 0,
    creative: 0,
    people: 0,
    business: 0,
    government: 0,
    science: 0
};
let selectedValue = null;
let suggestedCareerResult = "";
let answered = false;

// Initialize quiz
function initQuiz() {
    currentQuestion = 0;
    scores = { tech: 0, creative: 0, people: 0, business: 0, government: 0, science: 0 };
    selectedValue = null;
    answered = false;
    totalQuestionsSpan.textContent = quizQuestions.length;
    loadQuestion();
}

// Load question
function loadQuestion() {
    const q = quizQuestions[currentQuestion];
    questionDiv.textContent = q.question;
    currentQuestionNum.textContent = currentQuestion + 1;
    
    // Update progress bar
    const progressPercent = ((currentQuestion) / quizQuestions.length) * 100;
    quizProgress.style.width = progressPercent + "%";
    
    // Clear and populate options
    optionsDiv.innerHTML = "";
    optionsDiv.classList.remove('disabled');
    q.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option';
        btn.textContent = opt.text;
        btn.dataset.value = opt.value;
        if (opt.correct) {
            btn.dataset.correct = "true";
        }
        btn.addEventListener('click', selectOption);
        optionsDiv.appendChild(btn);
    });
    
    nextBtn.classList.remove('hidden');
    selectedValue = null;
    answered = false;
    
    // Hide feedback
    quizFeedback.classList.remove('show', 'correct', 'wrong');
}

// Select option
function selectOption(e) {
    if (answered) return;
    
    answered = true;
    const selectedBtn = e.target;
    selectedValue = selectedBtn.dataset.value;
    
    // Disable all options after selection
    optionsDiv.classList.add('disabled');
    
    // Find the correct answer
    const correctBtn = document.querySelector('.option[data-correct="true"]');
    
    // Show correct/wrong feedback
    if (selectedBtn.dataset.correct === "true") {
        // User selected correct answer
        selectedBtn.classList.add('correct');
        quizFeedback.textContent = "✓ Correct! Great job!";
        quizFeedback.classList.add('show', 'correct');
        scores[selectedValue]++;
    } else {
        // User selected wrong answer
        selectedBtn.classList.add('wrong');
        correctBtn.classList.add('correct');
        quizFeedback.textContent = "✗ Wrong! The correct answer is highlighted.";
        quizFeedback.classList.add('show', 'wrong');
        // Add score for the correct answer
        if (correctBtn) {
            scores[correctBtn.dataset.value]++;
        }
    }
    
    // Show next button
    nextBtn.classList.remove('hidden');
}

// Next question
nextBtn.addEventListener('click', () => {
    if (selectedValue) {
        currentQuestion++;
        
        if (currentQuestion < quizQuestions.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }
});

// Add explicit listener for retake button
if (retakeBtn) {
    retakeBtn.addEventListener('click', resetQuiz);
}

// Show result
function showResult() {
    // Calculate scores for each career category
    const careerScores = {
        "Engineering": scores.tech + scores.science,
        "Medical": scores.people + scores.science,
        "IT": scores.tech,
        "Design": scores.creative,
        "Government Jobs": scores.government + scores.people,
        "Business": scores.business
    };
    
    // Find the highest scoring career
    let maxScore = 0;
    let resultCareer = "Business"; // Default
    
    for (const [career, score] of Object.entries(careerScores)) {
        if (score > maxScore) {
            maxScore = score;
            resultCareer = career;
        }
    }
    
    suggestedCareerResult = resultCareer;
    
    // Show result in place (resultDiv removed)
    const quizButtons = document.querySelector('.quiz-buttons');
    if (quizButtons) {
        quizButtons.style.display = 'none';
    }
    
    questionDiv.innerHTML = `<h3>Your Suggested Career: ${resultCareer}</h3>`;
    optionsDiv.innerHTML = `<p>${careerDescriptions[resultCareer]}</p><br><button onclick="resetQuiz()" style="width: 100%; padding: 12px; background: #4CAF50; color: white; border: none; border-radius: 8px; font-size: 16px; cursor: pointer;">🔄 Retake Quiz</button>`;
    
    // Update progress bar to 100%
    quizProgress.style.width = "100%";
}

// Reset quiz
function resetQuiz() {
    const quizButtons = document.querySelector('.quiz-buttons');
    if (quizButtons) quizButtons.classList.remove('hidden');
    initQuiz();
}

// View career roadmap (now retake quiz)\nfunction viewCareerRoadmap() {\n    resetQuiz();\n}

// Theme Toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// Smooth Scrolling for Navbar
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

function scrollToSection(id) {
    const target = document.getElementById(id);
    target.scrollIntoView({ behavior: 'smooth' });
}

// Scroll Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(section => observer.observe(section));

// Scroll-to-Top Button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.remove('hidden');
    } else {
        scrollTopBtn.classList.add('hidden');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Initialize quiz on page load
document.addEventListener('DOMContentLoaded', initQuiz);

// Contact Form Handling
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        
        // Reset error states
        [nameInput, emailInput, messageInput].forEach(input => {
            input.classList.remove('error');
        });
        
        // Validate inputs
        let isValid = true;
        
        if (!nameInput.value.trim()) {
            nameInput.classList.add('error');
            isValid = false;
        }
        
        if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
            emailInput.classList.add('error');
            isValid = false;
        }
        
        if (!messageInput.value.trim()) {
            messageInput.classList.add('error');
            isValid = false;
        }
        
        if (!isValid) {
            return;
        }
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.classList.add('btn-loading');
        submitBtn.textContent = 'Sending...';
        
        // Simulate form submission (replace with actual API call if needed)
        setTimeout(() => {
            // Hide form and show success message
            contactForm.style.display = 'none';
            
            if (formSuccess) {
                formSuccess.classList.remove('hidden');
            }
            
            // Reset form for next submission
            contactForm.reset();
            
            // Reset button state (in case form is shown again)
            submitBtn.disabled = false;
            submitBtn.classList.remove('btn-loading');
            submitBtn.textContent = 'Send Message';
        }, 1500);
    });
    
    // Remove error class on input
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('error');
        });
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

