function getInnerTextById(id) {
    return document.getElementById(id).innerText;
}
function getInputValueById(id) {
    return document.getElementById(id).value;
}

function updateTotalBalance() {
    const totalBalance = parseFloat(getInnerTextById('noakhali-balance')) + parseFloat(getInnerTextById('feni-balance')) + parseFloat(getInnerTextById('quota-protest-balance'));
    document.getElementById('total-balance').innerText = totalBalance;
}

document.getElementById('donate-btn').addEventListener('click',function(event){
    document.getElementById('history-btn').classList.add('custom-btn');
    document.getElementById('history-btn').classList.remove('custom-active-btn');
    document.getElementById('donate-btn').classList.add('custom-active-btn');
    document.getElementById('donate-btn').classList.remove('custom-btn');

    document.getElementById('donate-container').classList.remove('hidden');
    document.getElementById('history-container').classList.add('hidden');
})

document.getElementById('history-btn').addEventListener('click',function(event){
    document.getElementById('history-container').classList.remove('hidden');
    document.getElementById('donate-container').classList.add('hidden');

    document.getElementById('history-btn').classList.remove('custom-btn');
    document.getElementById('history-btn').classList.add('custom-active-btn');
    document.getElementById('donate-btn').classList.remove('custom-active-btn');
    document.getElementById('donate-btn').classList.add('custom-btn');
})


function donationBalanceById(inputId, balanceId) {
    const donateAmount = parseFloat(getInputValueById(inputId));

    if (typeof donateAmount !== 'number' || donateAmount <= 0) {
        alert('Please enter a valid amount!');
        document.getElementById(inputId).value = '';
        return;
    }
    const currentBalance = parseFloat(getInnerTextById(balanceId));
    const newBalance = currentBalance + donateAmount;
    document.getElementById(balanceId).innerText = newBalance;
    updateTotalBalance();
    document.getElementById(inputId).value = '';

    var div = document.createElement('div');

    let reason = ''; // Use let instead of const
    const time = new Date().toLocaleString();

    // Ensure balanceId is defined before using it
    if (typeof balanceId !== "undefined") {
        if (balanceId === 'noakhali-balance') {
            reason = 'Donated for Flood at Noakhali, Bangladesh';
        } else if (balanceId === 'feni-balance') {
            reason = 'Donated for Flood at Feni, Bangladesh';
        } else if (balanceId === 'quota-protest-balance') {
            reason = 'Donated for Quota Protest at Bangladesh';
        }
    } else {
        console.error("balanceId is not defined");
    }

    if (typeof donateAmount !== "undefined") {
        div.innerHTML = `
            <h1>${donateAmount} is ${reason}</h1>
            <p>Date: ${time}</p>
        `;
    } else {
        console.error("donateAmount is not defined");
    }

    console.log(div);

    // Ensure the container exists before appending
    const historyContainer = document.getElementById('history-container');
    if (historyContainer) {
        historyContainer.appendChild(div);
    } else {
        console.error("Element with ID 'history-container' not found");
    }
}

document.getElementById('noakhali-donate-btn').addEventListener('click', function (event) {
    donationBalanceById('noakhali-donate-balance', 'noakhali-balance');
})

document.getElementById('feni-donate-btn').addEventListener('click', function (event){
    donationBalanceById('feni-donate-balance', 'feni-balance');
})

document.getElementById('quota-protest-donate-btn').addEventListener('click', function (event){
    donationBalanceById('quota-protest-donate-balance', 'quota-protest-balance');
})

document.addEventListener("DOMContentLoaded", function () {
    updateTotalBalance();
});

