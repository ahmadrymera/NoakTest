const readline = require('readline'); // Import the readline module for reading input from the terminal

// Define the Doctor class with a constructor that takes average consultation time
class Doctor {
    constructor(avgConsultationTime) {
        this.avgConsultationTime = avgConsultationTime;
    }
}

// Function to calculate waiting time based on the list of doctors and patient's position in the queue
function calculateWaitingTime(doctors, patientPosition) {
    // Sort doctors by their average consultation time in ascending order
    doctors.sort((a, b) => a.avgConsultationTime - b.avgConsultationTime);
    
    let totalWaitingTime = 0; // Initialize total waiting time
    let patientQueue = 0; // Initialize patient queue position
    
    // Allocate patients to doctors in a round-robin manner until the patient's position is reached
    while (patientQueue < patientPosition) {
        for (let i = 0; i < doctors.length && patientQueue < patientPosition; i++) {
            totalWaitingTime += doctors[i].avgConsultationTime; // Add doctor's consultation time to total waiting time
            patientQueue++; // Increment the patient queue position
        }
    }
    
    return totalWaitingTime; // Return the total waiting time
}

// Create an interface for reading input from the terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to ask a question and return a promise with the answer
function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

// Function to convert total waiting time from minutes to "H hour dan M minute" format
function convertToHM(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} hour and ${remainingMinutes} minute`;
}

// Main function to run the program
async function main() {
    // Ask the user for the number of doctors
    const numberOfDoctors = parseInt(await askQuestion("Enter the number of doctors: "));
    
    let doctors = []; // Initialize an empty array to store doctor objects
    
    // Loop to get the average consultation time for each doctor
    for (let i = 0; i < numberOfDoctors; i++) {
        const avgConsultationTime = parseFloat(await askQuestion(`Enter the average consultation time for Doctor ${i + 1} (in minutes): `));
        doctors.push(new Doctor(avgConsultationTime)); // Create a new doctor object and add it to the array
    }

    // Ask the user for their position in the queue
    const patientPosition = parseInt(await askQuestion("Enter your position in the queue: "));
    
    // Calculate the waiting time based on the doctors and patient position
    const waitingTimeInMinutes = calculateWaitingTime(doctors, patientPosition);
    
    // Convert waiting time to "H hour dan M minute" format
    const waitingTimeFormatted = convertToHM(waitingTimeInMinutes);

    // Output the estimated waiting time
    console.log(`You have to wait approximately ${waitingTimeFormatted}.`);
    
    rl.close(); // Close the readline interface
}

main(); // Run the main function