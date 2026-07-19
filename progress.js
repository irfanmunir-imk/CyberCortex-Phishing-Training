// LocalStorage Progress Tracker
const ProgressTracker = {
    init() {
        if (!localStorage.getItem('phishCourseData')) {
            const initialData = {
                modulesCompleted: [],
                quizScore: 0,
                certificateGenerated: false,
                userName: ''
            };
            localStorage.setItem('phishCourseData', JSON.stringify(initialData));
        }
        this.updateUI();
    },

    getData() {
        return JSON.parse(localStorage.getItem('phishCourseData'));
    },

    saveData(data) {
        localStorage.setItem('phishCourseData', JSON.stringify(data));
        this.updateUI();
    },

    markModuleComplete(moduleId) {
        const data = this.getData();
        if (!data.modulesCompleted.includes(moduleId)) {
            data.modulesCompleted.push(moduleId);
            this.saveData(data);
        }
    },

    updateUI() {
        const data = this.getData();
        const totalModules = 8;
        const percentage = Math.round((data.modulesCompleted.length / totalModules) * 100);
        
        const pb = document.getElementById('global-progress-bar');
        const pt = document.getElementById('global-progress-text');
        
        if(pb) pb.style.width = `${percentage}%`;
        if(pt) pt.innerText = `${percentage}% Completed`;
    }
};

document.addEventListener('DOMContentLoaded', () => ProgressTracker.init());