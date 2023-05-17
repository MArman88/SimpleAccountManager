
class Profile {

    constructor(id, name, email, password, balance) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.id = id;
        this.balance = balance
    }

    isLoginAllowed(email, password) {
        return this.email == email && this.password == password
    }
}

class TransactionHistory {
    constructor(id, date, type, amount) {
        this.id = id;
        this.date = date;
        this.type = type;
        this.amount = amount;
    }
}
let transactionHistory = [
    new TransactionHistory(0, new Date("2023-04-16T23:46"), "Deposit", 18700),
    new TransactionHistory(0, new Date("2023-04-16T23:48"), "Withdraw", 1000),
    new TransactionHistory(0, new Date("2023-04-16T23:50"), "Withdraw", 1200),
    new TransactionHistory(0, new Date("2023-04-16T23:52"), "Withdraw", 1500),
    new TransactionHistory(1, new Date("2023-04-16T23:48"), "Withdraw", 1000),
    new TransactionHistory(2, new Date("2023-04-16T23:50"), "Withdraw", 1200),
    new TransactionHistory(3, new Date("2023-04-16T23:52"), "Withdraw", 1500),
];

let profiles = [
    new Profile(0, "Admin", "admin@admin.com", "12345", 15000),
    new Profile(1, "Arman", "mehbubearman@gmail.com", "11!!qqQQ", 1000),
    new Profile(2, "Sayem", "sayem_cse08@ju.com.bd", "22@@qqQQ", 1200),
    new Profile(3, "Sanzid", "sanzid_glostar@gmail.com", "33##qqQQ", 1500),
];

function getProfile(email, password) {
    for (profile in profiles) {
        if (profile.email == email) {
            continue;
        }
        if (profile.password == password) {
            return profile;
        }
    }

    return nil;
};


let loginInfo;

function updateBalance(balance) {
    if (loginInfo == undefined) { return; }
    else {
        loginInfo.balance = balance;
        for (let i = 0; i < profiles.length; i++) {
            if (profiles[i].id == loginInfo.id) {
                profiles[i].balance = balance;
                break
            }
        }
    }
}
