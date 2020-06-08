let progressBarWidth
const coinSound = new Audio('sound/coin.mp3')

if (!localStorage.roundClicksNeed) localStorage.roundClicksNeed = 100
if (!localStorage.userClicks) localStorage.userClicks = 0
if (!localStorage.userCoins) localStorage.userCoins = 0
if (!localStorage.autoClickers) localStorage.autoClickers = 0
if (localStorage.autoClickers >= 1) setInterval(() => {for (let i = 0; i < localStorage.autoClickers; i++) coin.click()}, 2000)

coin.onclick = () => {
    if (!localStorage.offSound) {
        coinSound.currentTime = 0
        coinSound.play()
    }

    if (progressBarWidth >= 100) {
        resultRoundHref.click()
        if (localStorage.minus50score == "true") uppedMoney.innerText = localStorage.roundClicksNeed / 50
        else uppedMoney.innerText = localStorage.roundClicksNeed / 100
        for (let i = 0; i < 100; i++) localStorage.roundClicksNeed++
        if (localStorage.minus50score == "true") for (let i = 0; i < 50; i++) localStorage.roundClicksNeed--
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

function toggleSound() {
    if (localStorage.offSound == "true") delete localStorage.offSound
    else if (!localStorage.offSound) localStorage.offSound = true
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

minus50score.onclick = () => {
    if (localStorage.userCoins >= 10 && !localStorage.minus50score) {
        for (let i = 0; i < 10; i++) localStorage.userCoins--
        alert("Вы успешно преобрели -50 очков!")
        localStorage.minus50score = true
        for (let i = 0; i < 50; i++) localStorage.roundClicksNeed--
    } else {
        if (localStorage.userCoins < 10) alert("У вас не достаточно биткоинов!")
        else if (localStorage.minus50score) alert("Вы уже купили данный товар!")
    }
}

buyOneAutoClicker.onclick = () => {
    if (Number(localStorage.userCoins) >= 3 && Number(localStorage.autoClickers) < 25) {
        for (let i = 0; i < 3; i++) localStorage.userCoins--
        alert("Вы успешно преобрели +1 автокликер!")
        localStorage.autoClickers++
        if (!coinInterval) coinInterval = setInterval(() => coin.click(), 2000)
    } else {
        if (Number(localStorage.userCoins) < 3) alert("У вас не достаточно биткоинов!")
        else if (Number(localStorage.autoClickers) < 25) alert("Вы купили полностью этот товар!")
    }
}

setInterval(() => {
    userClicks.innerText = localStorage.userClicks
    roundClicksNeed.innerText = localStorage.roundClicksNeed
    progressBarWidth = localStorage.userClicks * 100 / localStorage.roundClicksNeed
    progressBar.style.width = progressBarWidth + '%'
    moneyCount.innerText = Number(localStorage.userCoins)
    if (!localStorage.offSound) offSound.innerText = 'Выключить'
    else offSound.innerText = 'Включить'

    if (Number(localStorage.userCoins) >= 5 && !localStorage.x2Click) {
        buyX2Click.innerText = 'Купить за 5 биткоинов'
        buyX2Click.className = 'btn btn-outline-primary'
    } else {
        if (Number(localStorage.userCoins) < 5) {
            buyX2Click.innerText = 'Купить за 5 биткоинов'
            buyX2Click.className = 'btn btn-outline-danger'
        }
        
        if (localStorage.x2Click == "true") {
            buyX2Click.innerText = 'Куплено за 5 биткоинов'
            buyX2Click.className = 'btn btn-outline-warning'
        }
    }

    if (Number(localStorage.userCoins) >= 3 && Number(localStorage.autoClickers) < 25) {
        buyOneAutoClicker.innerText = 'Купить за 3 биткоина'
        buyOneAutoClicker.className = 'btn btn-outline-primary'
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

    if (Number(localStorage.userCoins) >= 10 && !localStorage.minus50score) {
        minus50score.innerText = 'Купить за 10 биткоинов'
        minus50score.className = 'btn btn-outline-primary'
    } else {
        if (Number(localStorage.userCoins) < 10) {
            minus50score.innerText = 'Купить за 10 биткоинов'
            minus50score.className = 'btn btn-outline-danger'
        }
        
        if (localStorage.minus50score) {
            minus50score.innerText = 'Куплено за 10 биткоинов'
            minus50score.className = 'btn btn-outline-warning'
        }
    }
}, 50)