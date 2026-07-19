const quizData = [
    { q: "What is the primary goal of a phishing attack?", a: ["To install antivirus", "To steal sensitive information", "To speed up your PC", "To backup data"], correct: 1, explanation: "Phishing aims to steal credentials, data, or money." },
    { q: "What is 'Spear Phishing'?", a: ["Mass emails to everyone", "Attacking web servers", "Targeted attacks on specific individuals", "Physical security breaches"], correct: 2, explanation: "Spear phishing targets specific people using researched information." },
    { q: "Which URL is most likely fake?", a: ["https://www.paypal.com", "http://login-paypal-secure.com", "https://account.paypal.com", "https://paypal.com/login"], correct: 1, explanation: "Fake URLs often use hyphens and lack official domain structures, plus it uses http instead of https." },
    { q: "What is 'Whaling'?", a: ["Phishing via SMS", "Targeting high-level executives", "Stealing credit cards", "Cloning websites"], correct: 1, explanation: "Whaling targets 'big phish' like CEOs." },
    { q: "What does MFA stand for?", a: ["Multi-File Access", "Multi-Factor Authentication", "Master Firewall Application", "Main Folder Authorization"], correct: 1, explanation: "MFA requires multiple forms of verification to log in." },
    { q: "What emotion do social engineers exploit most?", a: ["Joy", "Boredom", "Urgency/Fear", "Sadness"], correct: 2, explanation: "Urgency forces victims to act quickly without thinking." },
    { q: "What is 'Smishing'?", a: ["Phishing over SMS", "Phishing over voice calls", "Spam emails", "Malware downloads"], correct: 0, explanation: "Smishing = SMS + Phishing." },
    { q: "What is 'Vishing'?", a: ["Video phishing", "Voice phishing (phone calls)", "Virtual phishing", "Visa phishing"], correct: 1, explanation: "Vishing uses phone calls to deceive victims." },
    { q: "How can you check a link safely in an email?", a: ["Click it quickly", "Hover over it without clicking", "Forward it", "Reply to sender"], correct: 1, explanation: "Hovering reveals the actual destination URL." },
    { q: "Business Email Compromise (BEC) usually involves:", a: ["Fake CEO emailing HR/Finance", "Malware in a PDF", "A fake Facebook login", "Ransomware"], correct: 0, explanation: "BEC often involves spoofing executives to request wire transfers." },
    { q: "A padlock in the browser address bar means:", a: ["The site is 100% safe", "The connection is encrypted", "The site is government approved", "No viruses exist here"], correct: 1, explanation: "It only means encryption (HTTPS). Phishing sites can use HTTPS too!" },
    { q: "Clone Phishing is when:", a: ["A legitimate email is copied and the link replaced with a malicious one", "Your hard drive is cloned", "Two hackers attack at once", "A website is copied exactly"], correct: 0, explanation: "Attackers intercept a real email and resend a cloned version with a bad link." },
    { q: "Which of these is a red flag in an email?", a: ["Generic greetings (Dear Customer)", "Perfect grammar", "Digital signatures", "Standard company footer"], correct: 0, explanation: "Legitimate companies usually address you by name." },
    { q: "What should you do if you click a phishing link?", a: ["Nothing", "Disconnect from network and report it", "Forward to a friend", "Turn off the monitor"], correct: 1, explanation: "Disconnecting prevents malware spread; reporting helps IT secure accounts." },
    { q: "What is the best defense against phishing?", a: ["Antivirus", "Firewalls", "Security Awareness Training", "VPNs"], correct: 2, explanation: "Human awareness is the final and best line of defense against social engineering." }
];

let currentQuestion = 0;
let score = 0;
let randomizedQuiz = [];

const quizContainer = document.getElementById('quiz-container');
const resultsContainer = document.getElementById('results-container');

function initQuiz() {
    if(!quizContainer) return;
    randomizedQuiz = [...quizData].sort(() => Math.random() - 0.5);
    currentQuestion = 0;
    score = 0;
    resultsContainer.classList.add('d-none');
    quizContainer.classList.remove('d-none');
    loadQuestion();
}

function loadQuestion() {
    const qData = randomizedQuiz[currentQuestion];
    quizContainer.innerHTML = `
        <h3 class="cyber-text">Question ${currentQuestion + 1} / 15</h3>
        <p style="font-size:1.2rem; margin:1rem 0;">${qData.q}</p>
        <div class="options-grid">
            ${qData.a.map((opt, index) => `
                <button class="btn-cyber opt-btn" onclick="checkAnswer(${index})">${opt}</button>
            `).join('')}
        </div>
        <div id="explanation-box" class="glass-card" style="display:none; margin-top:1rem; border-color:var(--primary-neon);"></div>
    `;
}

function checkAnswer(selectedIndex) {
    const qData = randomizedQuiz[currentQuestion];
    const btns = document.querySelectorAll('.opt-btn');
    btns.forEach(b => b.disabled = true);
    
    const expBox = document.getElementById('explanation-box');
    expBox.style.display = 'block';

    if(selectedIndex === qData.correct) {
        score++;
        btns[selectedIndex].style.background = 'var(--secondary-neon)';
        btns[selectedIndex].style.color = '#000';
        expBox.innerHTML = `<span style="color:var(--secondary-neon)">Correct!</span> ${qData.explanation}`;
    } else {
        btns[selectedIndex].style.background = 'var(--danger)';
        btns[selectedIndex].style.color = '#fff';
        btns[qData.correct].style.border = '2px solid var(--secondary-neon)';
        expBox.innerHTML = `<span style="color:var(--danger)">Incorrect.</span> ${qData.explanation}`;
    }

    setTimeout(() => {
        currentQuestion++;
        if(currentQuestion < randomizedQuiz.length) loadQuestion();
        else showResults();
    }, 4000); // 4 seconds to read explanation
}

function showResults() {
    quizContainer.classList.add('d-none');
    resultsContainer.classList.remove('d-none');
    const percentage = Math.round((score / randomizedQuiz.length) * 100);
    
    document.getElementById('score-display').innerText = `${score} / 15`;
    document.getElementById('percentage-display').innerText = `${percentage}%`;

    const data = ProgressTracker.getData();
    data.quizScore = percentage;
    ProgressTracker.saveData(data);

    const passMessage = document.getElementById('pass-message');
    if(percentage >= 80) {
        passMessage.innerHTML = `<p style="color:var(--secondary-neon)">Passed! You can now claim your certificate.</p>
        <a href="certificate.html" class="btn-success btn-cyber">Get Certificate</a>`;
    } else {
        passMessage.innerHTML = `<p style="color:var(--danger)">You need 80% to pass. Please review the modules and try again.</p>
        <button class="btn-cyber" onclick="initQuiz()">Retry Quiz</button>`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if(document.getElementById('quiz-container')) initQuiz();
});