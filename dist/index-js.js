const loginSection = document.getElementById("login-section");
const profileSection = document.getElementById("profile-section");

const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');

const nameLabel = document.getElementById("nameLabel");
const emailLabel = document.getElementById("emailLabel");
const balanceLabel = document.getElementById("balanceLabel");

const depositInput = document.getElementById("depositInput");
const withdrawInput = document.getElementById("withdrawInput");

const tableBody = document.getElementById("transaction-details");

applySectionVisibility();



const btnLogin = document.getElementById('btnLogin');
btnLogin.onclick = function () {
    let emailAddress = emailInput.value;
    let password = passwordInput.value;
    if (!isNullOrEmpty(emailAddress) && !isNullOrEmpty(password)) {
        for (profile of profiles) {
            if (profile.email == emailAddress.trim()) {
                if (profile.password == password) {
                    passwordInput.value = '';
                    loginInfo = profile;
                    applySectionVisibility();
                    return;
                }
                break
            } else {
                continue;
            }
        }
        alert("Email/password is incorrect.");
    } else {
        alert("You must provide both email and password");
    }

};

const btnLogout = document.getElementById("btnLogout");
btnLogout.onclick = function () {
    loginInfo = undefined;
    applySectionVisibility();
};

const btnDeposit = document.getElementById("btnDeposit");
btnDeposit.onclick = function () {
    let value = parseFloat(depositInput.value);
    if (value == NaN) {
        value = 0
    }

    if (value > 0) {
        const newBalance = loginInfo.balance + value;
        balanceLabel.innerText = newBalance;
        const transaction = new TransactionHistory(loginInfo.id, new Date(), "Deposit", value);
        transactionHistory.push(transaction);
        addTransactionHistory(transaction);
        depositInput.value = '0';
        updateBalance(newBalance);
    } else {
        alert("You can only deposit valid positive amount($) > 0");
    }


};
const btnWithdraw = document.getElementById("btnWithdraw");
btnWithdraw.onclick = function () {
    let value = parseFloat(withdrawInput.value);
    if (value == NaN) {
        value = 0
    }

    if (value > 0) {
        const newBalance = loginInfo.balance - value;
        if (newBalance > 0) {
            balanceLabel.innerText = newBalance;
            const transaction = new TransactionHistory(loginInfo.id, new Date(), "Withdraw", value);
            transactionHistory.push(transaction);
            addTransactionHistory(transaction);
            withdrawInput.value = '0';
            updateBalance(newBalance);
        } else {
            alert("You don't have sufficient balance. Please make some deposit first.");
        }
    } else {
        alert("You can only withdraw valid positive amount($) > 0");
    }
};

function applySectionVisibility() {
    if (loginInfo == undefined) {
        loginSection.style.display = 'block';
        profileSection.style.display = 'none';
    } else {
        loginSection.style.display = 'none';
        profileSection.style.display = 'block';

        nameLabel.innerText = loginInfo.name;
        emailLabel.innerText = loginInfo.email;
        balanceLabel.innerText = loginInfo.balance;

        tableBody.clearChildren();
        for (transaction of transactionHistory) {
            if (transaction.id == loginInfo.id) {
                addTransactionHistory(transaction);
            }

        }
    }
}

function addTransactionHistory(transaction) {
    const tr = document.createElement("tr");
    applyRowStyle(tr);

    const tdDate = document.createElement("td");
    const tdType = document.createElement("td");
    const tdAmount = document.createElement("td");

    tr.appendChild(tdDate);
    tr.appendChild(tdType);
    tr.appendChild(tdAmount);

    applyDataStyle(tdDate, tableBody);
    applyDataStyle(tdType, tableBody);
    applyDataStyle(tdAmount, tableBody);

    tdDate.innerText = getDateString(transaction.date);
    tdType.innerText = transaction.type;
    tdAmount.innerText = "$" + transaction.amount;

    tableBody.appendChild(tr);
}


function applyDataStyle(td, tbody) {
    td.scope = "row";
    td.classList.add("px-6");
    td.classList.add("font-medium");
    td.classList.add("whitespace-nowrap");
    if (tbody.children.length % 2 == 0) {
        td.style.background = "lightgray";
    } else {
        td.style.background = "ghostwhite";
    }

}

function applyRowStyle(tr) {
    tr.style.height = "48px";
    tr.classList.add("border-b");
    tr.classList.add("text-center");
    tr.classList.add("border-gray-700");
    tr.classList.add("dark:border-gray-200");
}