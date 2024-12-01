function executeOperation() {
    const chance = Math.random(); // Generate a random number between 0 and 1.

    if (chance < 0.5) {
        console.log("Operation succeeded!");
    } else {
        throw new Error("Operation failed unexpectedly!");
    }
}

const totalMissions = 20;

const successReward = 13;
const failureReward = 1;
const participationBonus = 3;

let totalVacationDays = 0;

for (let mission = 1; mission <= totalMissions; mission++) {
    try {
        executeOperation(); // Attempt the operation.
        totalVacationDays += successReward; // Add days for success.
    } catch (err) {
        console.error(`Mission ${mission}: ${err.message}`); // Log the failure.
        totalVacationDays += failureReward; // Add days for failure.
    } finally {
        totalVacationDays += participationBonus; // Add participation bonus.
    }
}

console.log(`Total vacation days earned: ${totalVacationDays}`);