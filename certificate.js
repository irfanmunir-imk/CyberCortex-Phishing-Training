document.addEventListener('DOMContentLoaded', () => {
    const certName = document.getElementById('cert-name');
    const certDate = document.getElementById('cert-date');
    const certScore = document.getElementById('cert-score');
    const certId = document.getElementById('cert-id');
    const nameInputBox = document.getElementById('name-input-box');

    const data = ProgressTracker.getData();

    if (data.quizScore < 80) {
        document.getElementById('cert-container').innerHTML = `
            <div class="glass-card text-center">
                <h2 style="color:var(--danger)">Access Denied</h2>
                <p>You must score at least 80% on the quiz to unlock your certificate.</p>
                <a href="quiz.html" class="btn-cyber mt-2">Go to Quiz</a>
            </div>
        `;
        return;
    }

    if (data.userName) {
        generateCertUI(data);
    } else {
        nameInputBox.style.display = 'block';
        document.getElementById('save-name-btn').addEventListener('click', () => {
            const name = document.getElementById('user-name-input').value;
            if(name.trim() !== '') {
                data.userName = name;
                ProgressTracker.saveData(data);
                nameInputBox.style.display = 'none';
                generateCertUI(data);
            }
        });
    }

    function generateCertUI(d) {
        document.getElementById('actual-certificate').style.display = 'block';
        certName.innerText = d.userName;
        const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        certDate.innerText = date;
        certScore.innerText = `${d.quizScore}%`;
        certId.innerText = 'PHISH-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    }
});

function printCertificate() {
    window.print();
}