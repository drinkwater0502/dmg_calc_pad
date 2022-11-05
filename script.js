let awakeningsArray = []
let combosArrayMain = []
let combosArraySub = []
let objArray = []


function addAwakening(myAwakening) {
    if (awakeningsArray.includes(myAwakening)) {
        awakeningsArray.push(myAwakening)
        let numOfAwakening = getOccurrence(awakeningsArray, myAwakening)
        let findMyLi = document.getElementById(myAwakening)
        let findMyA = findMyLi.lastChild
        findMyA.innerHTML = `x${numOfAwakening}`
    } else {
    let numOfAwakening = 1
    awakeningsArray.push(myAwakening)
    let newLi = document.createElement("li")
    let newInput = document.createElement("input")
    let newA = document.createElement("a")
    
    document.getElementById("awakenings-list").appendChild(newLi)
    
    newLi.appendChild(newInput)
    newLi.setAttribute("id", myAwakening)
    
    newInput.setAttribute("type", "image")
    newInput.setAttribute("src", myAwakening)
    newInput.setAttribute("onclick", `removeAwakening("${myAwakening}")`)

    newLi.appendChild(newA)
    newA.innerHTML = `x${numOfAwakening}`
    }
}

function removeAwakening(myAwakening) {
    let awakeningIndex = awakeningsArray.indexOf(myAwakening)
    if (awakeningIndex !== -1) {
        awakeningsArray.splice(awakeningIndex, 1)
    }
    numOfAwakening = getOccurrence(awakeningsArray, myAwakening)
    let findMyLi = document.getElementById(myAwakening)
    let findMyA = findMyLi.lastChild
    if (numOfAwakening == 0) {
        findMyLi.remove()
    }
    findMyA.innerHTML = `x${numOfAwakening}`
}

function addCombo (myCombo) {
    let comboObj = {type: myCombo}
    let orbsValue
    let rowsValue
    let msAttr

    let numEnhancedOrbs = parseInt(document.getElementById('numEnhanced').value)
    
    if (myCombo == 'blob') {
        orbsValue = parseInt(document.getElementById("bloborbnumber").value)
        rowsValue = parseInt(document.getElementById("blobrownumber").value)
    } else if (myCombo == 'row') {
        rowsValue = 1
        orbsValue = 6
    } else {
        rowsValue = 0
        orbsValue = numOrbsInCombo(myCombo)
    }
    
    if (document.getElementById('main-radio').checked) {
        msAttr = 'main'
    } else {
        msAttr = 'sub'
    }

    comboObj["numOfOrbs"] = orbsValue
    comboObj["numRows"] = rowsValue
    comboObj["numEnhancedOrbs"] = numEnhancedOrbs
    comboObj["msAttr"] = msAttr
    comboObj["damage"] = 0


    if (validateCombo(comboObj) == false) {
        return
    }

    removeComboErrors()

    objArray.push(comboObj)

    updateComboLists()
}

function removeCombo(idx) {
    objArray.splice(idx, 1)
    updateComboLists()
}

function getOccurrence(array, value) {
    var count = 0;
    array.forEach((v) => (v === value && count++));
    return count;
}

function chooseID(filename) {
    if (filename == 'threec' || filename == 'l' || filename == 'cross' || filename == 'vdp' || filename == 'heartl' || filename == 'heartvdp') {
        return 'combo3'
    } else if (filename == 'fourc' || filename == 'nonrow') {
        return 'combo4'
    } else if (filename == 'fivec') {
        return 'combo5'
    } else {
        return 'comborow'
    }
}

function comboToFile(combo) {
    if (combo == 'threec') {
        return "./images/orbs/3.PNG"
    } else if (combo == 'fourc') {
        return "./images/orbs/4.PNG"
    } else if (combo == 'fivec') {
        return "./images/orbs/5.PNG"
    } else if (combo == 'row') {
        return "./images/orbs/row.PNG"
    } else if (combo == 'nonrow') {
        return "./images/orbs/nonrowtrans.png"
    } else if (combo == 'l') {
        return "./images/orbs/ltrans.png"
    } else if (combo == 'cross') {
        return "./images/orbs/crosstrans.png"
    } else if (combo == 'vdp') {
        return "./images/orbs/vdp.PNG"
    } else if (combo == 'heartl') {
        return "./images/orbs/heartltrans.png"
    } else if (combo == 'heartvdp') {
        return "./images/orbs/heartvdp.PNG"
    } else if (combo == 'blob') {
        return "./images/orbs/blob.PNG"
    }
}

function validateInputs() {
    let baseATK = Number(document.getElementById('ATK').value)
    let hm = Number(document.getElementById('LM').value)
    let lm = Number(document.getElementById('HM').value)
    let spike = Number(document.getElementById('SPIKE').value)

    if (isNaN(baseATK) || isNaN(hm) || isNaN(lm) || isNaN(spike)) {
        document.getElementById('idiotCheck').innerHTML = 'Inputs must be numbers'
        return false
    } else if (baseATK <= 0) {
        document.getElementById('idiotCheck').innerHTML = 'ATK cannot be empty and must be greater than 0'
        return false
    } else if (hm < 0) {
        document.getElementById('idiotCheck').innerHTML = "Helper Multiplier must be greater than 0 (leave input empty if you don't want a multiplier)"
        return false
    } else if (lm < 0) {
        document.getElementById('idiotCheck').innerHTML = "Leader Multiplier must be greater than 0 (leave input empty if you don't want a multiplier)"
        return false
    } else if (spike < 0) {
        document.getElementById('idiotCheck').innerHTML = "Spike Multiplier must be greater than 0 (leave input empty if you don't want a multiplier)"
        return false
    } else {
        document.getElementById('idiotCheck').innerHTML = ''
        return true
    }
}

function numOrbsInCombo(fromHTML) {
    if (fromHTML == 'threec') {
        return 3
    } else if (fromHTML == 'fourc') {
        return 4
    } else if (fromHTML == 'fourc') {
        return 4
    } else if (fromHTML == 'fivec') {
        return 5
    } else if (fromHTML == 'row') {
        return 6
    } else if (fromHTML == 'nonrow') {
        return 6
    } else if (fromHTML == 'l') {
        return 5
    } else if (fromHTML == 'cross') {
        return 5
    } else if (fromHTML == 'vdp') {
        return 9
    } else if (fromHTML == 'heartl') {
        return 0
    } else if (fromHTML == 'heartvdp') {
        return 0
    }
}

function errorMessage(errorString) {
    errorUl = document.getElementById('idiotCheck')
    errorLi = document.createElement("li")
    errorUl.appendChild(errorLi)
    errorText = document.createElement("a")
    errorText.innerHTML = errorString
    errorLi.appendChild(errorText)
}

function comboError(errorString) {
    errorA = document.getElementById('comboError')
    errorA.innerHTML = `ERROR: ${errorString}`
}

function removeComboErrors() {
    errorA = document.getElementById('comboError')
    errorA.innerHTML = ''
}

function validateCombo(obj) {
    if (isNaN(obj["numEnhancedOrbs"])) {
        comboError('Enhanced Orbs can only take numbers')
        return false
    }
    if (isNaN(obj["numOfOrbs"])) {
        comboError('# of orbs can only take numbers')
        return false
    }
    if (isNaN(obj["numRows"])) {
        comboError('# of rows can only take numbers')
        return false
    }
    if (obj["type"] == "blob" && obj["numOfOrbs"] < 7) {
        comboError('Number of orbs in blob cannot be less than 7 (choose other combo options)')
        return false
    }
    if (obj["type"] == "blob" && obj["numOfOrbs"] > 42) {
        comboError('Number of orbs in blob cannot be higher than 42')
        return false
    }
    if (obj["numEnhancedOrbs"] > obj["numOfOrbs"]) {
        comboError('Number of enhanced orbs exceeds number of orbs in combo')
        return false
    }
    if (obj["numEnhancedOrbs"] < 0 || obj["numEnhancedOrbs"] > 42) {
        comboError('Number of enhanced orbs cannot be less than 0 or greater than 42')
        return false
    }
    return true
}

function updateComboLists() {
    document.getElementById("combos-list-main").replaceChildren()
    document.getElementById("combos-list-sub").replaceChildren()
    
    for (let i=0; i<objArray.length; i++) {
        let combolist
        let newLi = document.createElement("li")
        let newInput = document.createElement("input")
        let newA = document.createElement("a")
        
        newInput.setAttribute("type", "image")
        newInput.setAttribute("src", comboToFile(objArray[i]["type"]))
        newInput.setAttribute("class", chooseID(objArray[i]["type"])) // for the size
        newInput.setAttribute("onclick", `removeCombo(${i})`)

        newLi.appendChild(newInput)
        
        if (objArray[i]["numEnhancedOrbs"] > 0) {
            newA.innerHTML = `OE: ${objArray[i]["numEnhancedOrbs"]}`
            newLi.appendChild(newA)
        }

        
        if (objArray[i]["msAttr"] == 'main') {
            combolist = document.getElementById("combos-list-main")
        } else {
            combolist = document.getElementById("combos-list-sub")
        }
        combolist.appendChild(newLi)
    }
}

function baseComboDmg(cardATK) {
    for (let i=0; i<objArray.length; i++) {
        baseDmg = cardATK * (1 + (0.25 * (objArray[i]["numOfOrbs"] - 3)))
        objArray[i]["damage"] = baseDmg

        if (objArray[i]["type"] == "fourc" && awakeningsArray.includes('./images/tpa.png')) {
            numTPA = getOccurrence(awakeningsArray, './images/tpa.png')
            objArray[i]["damage"] = objArray[i]["damage"] * (1.7 ** numTPA)
        }
        if (objArray[i]["type"] == "fourc" && awakeningsArray.includes('./images/tpaplus.png')) {
            numTPAplus = getOccurrence(awakeningsArray, './images/tpaplus.png')
            objArray[i]["damage"] = objArray[i]["damage"] * (2.89 ** numTPAplus)
        }
        if (objArray[i]["type"] == "vdp" && awakeningsArray.includes('./images/piercevoid.png')) {
            numVDP = getOccurrence(awakeningsArray, './images/piercevoid.png')
            objArray[i]["damage"] = objArray[i]["damage"] * (2.5 ** numVDP)
        }
        if (objArray[i]["type"] == "cross" && awakeningsArray.includes('./images/blind.png')) {
            numCross = getOccurrence(awakeningsArray, './images/blind.png')
            objArray[i]["damage"] = objArray[i]["damage"] * (2.5 ** numCross)
        }
        if (objArray[i]["type"] == "l" && awakeningsArray.includes('./images/unlock.png')) {
            numL = getOccurrence(awakeningsArray, './images/unlock.png')
            objArray[i]["damage"] = objArray[i]["damage"] * (1.5 ** numL)
        }
        objArray[i]["damage"] = Math.ceil(objArray[i]["damage"]) //important
    }
}

function calculateDmg() {
    if (validateInputs() == false) {
        return
    }
    baseComboDmg(Number(document.getElementById('ATK').value))
}