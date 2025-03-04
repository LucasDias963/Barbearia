// Firebase Configuration
const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_AUTH_DOMAIN",
    databaseURL: "SUA_DATABASE_URL",
    projectId: "SEU_PROJECT_ID",
    storageBucket: "SEU_STORAGE_BUCKET",
    messagingSenderId: "SEU_MESSAGING_SENDER_ID",
    appId: "SEU_APP_ID"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Function to load available times
function loadAvailableTimes(date) {
    const timeSelect = document.getElementById('time');
    timeSelect.innerHTML = ''; // Clear previous options
    const times = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
    database.ref('appointments/' + date).once('value', (snapshot) => {
        const bookedTimes = snapshot.val() || [];
        times.forEach((time) => {
            if (!bookedTimes.includes(time)) {
                const option = document.createElement('option');
                option.value = time;
                option.textContent = time;
                timeSelect.appendChild(option);
            }
        });
    });
}

// Event listener for date change
document.getElementById('date').addEventListener('change', (event) => {
    loadAvailableTimes(event.target.value);
});

// Function to submit form
function submitForm() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    if (name && phone && date && time) {
        database.ref('appointments/' + date).push(time);
        alert('Agendamento realizado com sucesso!');
        document.getElementById('bookingForm').reset();
    } else {
        alert('Por favor, preencha todos os campos.');
    }
    return false; // Prevent form submission
}
