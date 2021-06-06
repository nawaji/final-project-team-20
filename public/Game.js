var body = document.body
var table = document.createElement('table')
var trs = []
var tds = []

var pTurn = 'X'
var cTurn = 'O'
var turn

var callBack = function(event){
    console.log(event.target)
    console.log(event.target.parentNode)

    console.log(event.target.parentNode.parentNode)

    var trNumber = trs.indexOf(event.target.parentNode)
    var tdNumber = tds[trNumber].indexOf(event.target.parentNode)

    if(tds[trNumber][tdNumber].textContent !== ''){
        console.log('Not Empty')
    }
    else{
        console.log('Empty')
        tds[trNumber][tdNumber].textContent = pTurn
        var threeTd = false
        if(tds[trNumber][0].textContent === pTurn &&
            tds[trNumber][1].textContent === pTurn &&
            tds[trNumber][2].textContetn === pTurn){
                threeTd = true
        }
        else if(tds[0][tdNumber].textContent === pTurn &&
                tds[1][tdNumber].textContent === pTurn && 
                tds[2][tdNumber].textContent === pTurn){
                    threeTd = true
        }
        else if(Math.abs(trNumber - tdNumber) === 2){
            if(
                tds[0][2].textContent === pTurn &&
                tds[1][1].textContent === pTurn &&
                tds[2][0].textContent === pTurn){
                    threeTd = true
            }
        }

        if(threeTd === true){
            window.alert('Player win the game')
            turn = pTurn
            tds.forEach(function(trs){
                trs.forEach(function(td){
                    td.textContent = ''
                })
            })
        }
        else{
            if(turn === pTurn){
                turn = cTurn
            }else{
                turn = pTurn
            }
        }
    }
}

var i
var j
for(i = 0; i < 3;i++){
    var tr = document.createElement('tr')
    trs.push(tr)
    tds.push([])
    for(j = 0; j < 3;j++){
        var td = document.createElement('td')
        td.addEventListener('click',callBack)
        tds[i].push(td)
        tr.appendChild(td)
    }
    table.appendChild(tr)
}
body.appendChild(table)
