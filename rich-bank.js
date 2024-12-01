const bankAccounts = [
    { id: 1, owner: "Alice", balance: 500 },
    { id: 2, owner: "Bob", balance: 300 }
];

function findAccountById(accountId) {
    // Loop through accounts to find a matching ID
    for (const account of bankAccounts) {
        if (account.id === accountId) {
            return account;
        }
    }
    return null; // Return null if no account is found
}

function addAccount(accountId, accountOwner) {
    // Check if account already exists
    if (findAccountById(accountId)) {
        throw new Error("Account with this ID already exists.");
    }

    // Validate the account ID
    if (!Number.isInteger(accountId) || accountId <= 0) {
        throw new Error("Invalid account ID: It must be a positive integer.");
    }

    // Validate the owner's name
    if (typeof accountOwner !== "string" || accountOwner.trim().length === 0) {
        throw new Error("Invalid owner name: It must be a non-empty string.");
    }

    // Add the new account with a 0 balance
    bankAccounts.push({
        id: accountId,
        owner: accountOwner.trim(),
        balance: 0
    });
}

function depositFunds(accountId, depositAmount) {
    const account = findAccountById(accountId);

    // Ensure the account exists
    if (!account) {
        throw new Error("Account not found.");
    }

    // Validate the deposit amount
    if (!Number.isFinite(depositAmount) || depositAmount <= 0) {
        throw new Error("Invalid deposit amount: Must be a positive number.");
    }

    // Add the deposit to the account balance
    account.balance += depositAmount;
}

function withdrawFunds(accountId, withdrawalAmount) {
    const account = findAccountById(accountId);

    // Ensure the account exists
    if (!account) {
        throw new Error("Account not found.");
    }

    // Validate the withdrawal amount
    if (!Number.isFinite(withdrawalAmount) || withdrawalAmount <= 0) {
        throw new Error("Invalid withdrawal amount: Must be a positive number.");
    }

    // Ensure sufficient balance
    if (account.balance < withdrawalAmount) {
        throw new Error("Insufficient balance for this withdrawal.");
    }

    // Deduct the amount from the account balance
    account.balance -= withdrawalAmount;
}

function transferFunds(senderId, receiverId, transferAmount) {
    const sender = findAccountById(senderId);
    const receiver = findAccountById(receiverId);

    // Validate the sender's account
    if (!sender) {
        throw new Error("Sender account not found.");
    }

    // Validate the receiver's account
    if (!receiver) {
        throw new Error("Receiver account not found.");
    }

    // Validate the transfer amount
    if (!Number.isFinite(transferAmount) || transferAmount <= 0) {
        throw new Error("Invalid transfer amount: Must be a positive number.");
    }

    // Ensure sender has sufficient balance
    if (sender.balance < transferAmount) {
        throw new Error("Insufficient funds for this transfer.");
    }

    // Transfer the amount
    sender.balance -= transferAmount;
    receiver.balance += transferAmount;
}

// Debugging Hints

// Valid Examples:
// getAccountById(1);
// createAccount(3, "Charlie");
// depositMoney(1, 100);
// withdrawMoney(1, 50);
// transferMoney(1, 2, 100);

// Invalid Examples (will throw errors based on validation):
// getAccountById("1"); // Invalid ID
// createAccount(1, "Alice"); // ID already exists
// createAccount("3", "Charlie"); // Invalid ID type
// createAccount(-3, "Charlie"); // Negative ID
// createAccount(3, ["Charlie"]); // Invalid owner type
// createAccount(3, ""); // Empty name
// depositMoney(1, "300"); // Invalid amount
// depositMoney(1, -300); // Negative amount
// withdrawMoney(1, 501); // Insufficient balance
// transferMoney(1, 4, 100); // Destination account not found
// transferMoney(1, 2, 501); // Insufficient source balance