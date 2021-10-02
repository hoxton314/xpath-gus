function readSingleFile(e) {
    var file = e.target.files[0];
    if (!file) {
        return;
    }
    var reader = new FileReader();
    reader.onload = function (e) {
        var contents = e.target.result;
        //console.log(contents)
        main(contents)
    };
    reader.readAsText(file);
}


window.onload = function () {
    document.getElementById('file-input')
        .addEventListener('change', readSingleFile, false);
};

function main(text) {
    let parser = new DOMParser();
    let xml = parser.parseFromString(text, "text/xml")

    //path = '/teryt/catalog/row[NAZWA_DOD[text()]="województwo"]/NAZWA'
    let path = '/teryt/catalog/row[NAZWA_DOD[text()]="województwo"]/NAZWA'

    let output = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null)
    let result = output.iterateNext()
    window.data = text

    while (result) {
        let row = document.createElement('tr')
        let cell = document.createElement('td')
        let a = document.createElement('a')
        a.href = "javascript:void(0)"
        a.innerText = result.childNodes[0].data
        a.addEventListener("click", processData, false)
        cell.className = "wojCell"
        cell.appendChild(a)
        row.appendChild(cell)
        document.getElementById('tabela').appendChild(row)
        result = output.iterateNext()
    }

}

function processData(e) {
    if(e.target.nodeName=="A"){
    let parser = new DOMParser();
    let xml = parser.parseFromString(window.data, "text/xml")
    console.log(e.target.innerText)
    let filter = e.target.innerText

    if (/\s/g.test(filter)) {
        e.target.innerText = e.target.innerText.split('\n')[0]
    } else {
        //e.target.innerText = e.target.innerText+' '
        let path = `/teryt/catalog/row[NAZWA_DOD[contains(text(), "miasto")] and WOJ[text()]="${filtering(filter)}"]/NAZWA`

        let output = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null)
        let result = output.iterateNext()
        while (result) {
            let rekord = result.childNodes[0].data
            //console.log(rekord)
            let td = document.createElement('td')
            td.innerHTML = rekord
            e.target.appendChild(td)
            result = output.iterateNext()
        }
    }
}
}

function filtering(woj) {
    woj = woj.toLowerCase()
    switch (woj) {
        case 'dolnośląskie':
            return '02'
        case 'kujawsko-pomorskie':
            return '04'
        case 'lubuskie':
            return '08'
        case 'łódzkie':
            return '10'
        case 'lubelskie':
            return '06'
        case 'małopolskie':
            return '12'
        case 'mazowieckie':
            return '14'
        case 'opolskie':
            return '16'
        case 'podlaskie':
            return '20'
        case 'podkarpackie':
            return '18'
        case 'pomorskie':
            return '22'
        case 'świętokrzyskie':
            return '26'
        case 'śląskie':
            return '24'
        case 'warmińsko-mazurskie':
            return '28'
        case 'wielkopolskie':
            return '30'
        case 'zachodniopomorskie':
            return '32'
        default:
            break;
    }
}