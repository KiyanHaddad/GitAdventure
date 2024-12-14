// MissionControl Object to encapsulate all mission tasks and state
const MissionControl = {
    oneTimeTasks: [],
    monitoringTaskId: null,

    // Task 2: Add One-Time Task Function
    addOneTimeTask(func, delay) {
        this.oneTimeTasks.push({ task: func, delay: delay });
    },

    // Task 3: Run One-Time Tasks Function
    runOneTimeTasks() {
        console.log(" Preparing to execute scheduled tasks...");
        this.oneTimeTasks.forEach(({ task, delay }) => {
            setTimeout(() => {
                console.log(` Task delayed by ${delay / 1000}s is executing:`);
                task();
            }, delay);
        });
    },

    // Task 4: Start Monitoring Function
    startMonitoring() {
        console.log(" Initiating continuous space station monitoring...");

        this.monitoringTaskId = setInterval(() => {
            console.log("Scanning station conditions...");

            // Mock-up condition checks
            const oxygenLevel = Math.random() * 100;
            const powerStatus = Math.random() > 0.1 ? " Power Stable" : " Power Critical!";
            const communicationCheck = Math.random() > 0.05 ? " Comms OK" : " Comms Failure!";

            console.log(`Oxygen: ${oxygenLevel.toFixed(2)}% |  ${powerStatus} |  ${communicationCheck}`);
        }, 2000);
    },

    // Task 5: Stop Monitoring Function
    stopMonitoring() {
        if (this.monitoringTaskId) {
            clearInterval(this.monitoringTaskId);
            console.log(" Monitoring has been terminated.");
        } else {
            console.log(" No monitoring was active to stop.");
        }
    },

    // Task 6: Start Countdown Function
    startCountdown(duration) {
        let timeLeft = duration;
        console.log(` Countdown initialized: T-${timeLeft} seconds`);

        const countdownTimerId = setInterval(() => {
            timeLeft--;
            console.log(` T-${timeLeft} seconds`);

            if (timeLeft <= 0) {
                clearInterval(countdownTimerId);
                console.log(" LIFTOFF! Intergalactic Espresso Explorers are on their way!");
            }
        }, 1000);
    },

    // Task 7: Schedule Pre-Launch Activities and Launch
    scheduleMission() {
        console.log(" Mission scheduling started...");
        
        this.startMonitoring(); // Start continuous monitoring

        this.addOneTimeTask(() => console.log(" Pre-launch system checks complete!"), 5000);
        this.addOneTimeTask(() => this.stopMonitoring(), 10000);
        this.addOneTimeTask(() => this.startCountdown(10), 15000);

        this.runOneTimeTasks(); // Execute all scheduled one-time tasks
    },
};

// Start the mission
MissionControl.scheduleMission();
