let progressBarWidth
const coinSound = new Audio('sound/coin.mp3')

if (!localStorage.roundClicksNeed) localStorage.roundClicksNeed = 100
if (!localStorage.userClicks) localStorage.userClicks = 0
if (!localStorage.userCoins) localStorage.userCoins = 0
if (!localStorage.autoClickers) localStorage.autoClickers = 0
if (localStorage.autoClickers >= 1) setInterval(() => coin.click(), 2000)

coin.onclick = () => {
    coinSound.currentTime = 0
    coinSound.play()

    if (progressBarWidth >= 100) {
        resultRoundHref.click()
        uppedMoney.innerText = localStorage.roundClicksNeed / 100
        for (let i = 0; i < 100; i++) localStorage.roundClicksNeed++
        for (let i = 0; i < uppedMoney.innerText; i++) localStorage.userCoins++
        localStorage.userClicks = 0
    } else {
        localStorage.userClicks++
        if (localStorage.x2Click == "true") coin.click()
    }
}

function clearData() {
    const confirmResetData = confirm("Вы действительно хотите удалить данные?")
    if (confirmResetData) {
        localStorage.clear()
        location.reload()
    } delete confirmResetData
}

function infoAlert(text) {
    alert(text)
}

buyX2Click.onclick = () => {
    if (localStorage.userCoins >= 5 && !localStorage.x2Click) {
        for (let i = 0; i < 5; i++) localStorage.userCoins--
        alert("Вы успешно преобрели X2 клик!")
        localStorage.x2Click = true
    } else {
        if (localStorage.userCoins < 5) alert("У вас не достаточно биткоинов!")
        else if (localStorage.x2Click) alert("Вы уже купили данный товар!")
    }
}

buyOneAutoClicker.onclick = () => {
    if (Number(localStorage.userCoins) >= 3 && Number(localStorage.autoClickers) < 25) {
        for (let i = 0; i < 3; i++) localStorage.userCoins--
        alert("Вы успешно преобрели +1 автокликер!")
        localStorage.autoClickers++
        setInterval(() => coin.click(), 2000)
    } else {
        if (Number(localStorage.userCoins) < 3) alert("У вас не достаточно биткоинов!")
        else if (Number(localStorage.autoClickers) < 25) alert("Вы купили полностью этот товар!")
    }
}

setInterval(() => {
    userClicks.innerText = localStorage.userClicks
    roundClicksNeed.innerText = localStorage.roundClicksNeed
    progressBar.style.width = localStorage.userClicks * 100 / localStorage.roundClicksNeed + '%'
    progressBarWidth = localStorage.userClicks * 100 / localStorage.roundClicksNeed
    moneyCount.innerText = Number(localStorage.userCoins)

    if (Number(localStorage.userCoins) >= "5" && !localStorage.x2Click) {
        buyX2Click.innerText = 'Купить за 5 биткоинов'
    } else {
        if (Number(localStorage.userCoins) < "5") {
            buyX2Click.innerText = 'Купить за 5 биткоинов'
            buyX2Click.className = 'btn btn-outline-danger'
        }
        
        if (localStorage.x2Click == "true") {
            buyX2Click.innerText = 'Куплено за 5 биткоинов'
            buyX2Click.className = 'btn btn-outline-warning'
        }
    }

    if (Number(localStorage.userCoins) >= "3" && Number(localStorage.autoClickers) < 25) {
        buyOneAutoClicker.innerText = 'Купить за 3 биткоина'
    } else {
        if (Number(localStorage.userCoins) < 3) {
            buyOneAutoClicker.innerText = 'Купить за 3 биткоина'
            buyOneAutoClicker.className = 'btn btn-outline-danger'
        }
        
        if (Number(localStorage.autoClickers) == 25) {
            buyOneAutoClicker.innerText = 'Куплено полностью'
            buyOneAutoClicker.className = 'btn btn-outline-warning'
        }
    }
}, 50)