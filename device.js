let send_data = {amplitude: 0, onset:'false', beat:'false', type: -1};
let recv_data = {amplitude: 0, onset:'false', beat:'false', type: -1};
let csv; 

/*function saveText(text) {
  rows = text.split("\n");
  for (let i=1; i<rows.length; i++) {
    let data = rows[i].split(',');
    console.log(data);
    csv.push(data);
  }
}*/
/*let promise = fetch('brahms.csv')
              .then(response => response.text())
              .then(text => saveText(text))
              .catch(error => new Error(error));*/

const idfSwitch1 = document.querySelector('#amp');
const idfSwitch2 = document.querySelector('#onset');
const idfSwitch3 = document.querySelector('#beat');
const idfSwitch4 = document.querySelector('#type');

// Amplitude type:float value:[0, 255]
function Switch1() {
    idfSwitch1.value = send_data.amplitude;
    return send_data.amplitude;
}
// Onset type:string value:{'true', 'false'}
function Switch2() {
    idfSwitch2.value = send_data.onset;
    let value = send_data.onset;
    send_data.onset = 'false';
    return value;
}
function Switch3() {
    idfSwitch3.value = send_data.beat;
    let value = send_data.beat;
    send_data.beat = 'false';
    return value;
}
function Switch4() {
    idfSwitch4.value = send_data.type;
    return int(send_data.type);
}

const option1 = {
    apiUrl: 'http://140.113.199.211:81/csm',
    deviceModel: 'Remote_control',
    deviceName: 'MusicTalk',
    idfList: [[Switch1, ['float']],
              [Switch2, ['string']],
              [Switch3, ['string']],
              [Switch4, ['int']]],
    pushInterval: 5,
    interval: {
        Switch1: 1/24,
        Switch2: 1/24,
        Switch3: 1/24,
        Switch4: 1/24
    },
};

const odfName1  = document.querySelector('#speed');
const odfName2 = document.querySelector('#radius');
const odfName3 = document.querySelector('#color');
const odfName4 = document.querySelector('#odf');
const odfName5 = document.querySelector('#odf');

function Name1(data) {
    let speed = 5;
    if(!isNaN(data)){
        if(data > 200)  { speed = 80; }
        else if(data > 150) { speed = 40; }
        else if(data > 100) { speed = 20; }
        else if(data > 50) { speed = 10; }
        else { speed = 5; }
    }
    else if(data == "true") {
        speed = 80;
    }
    odfName1.value = speed;
    recv_data.speed = speed;
    //console.log(recv_data.speed);
}
function Name2(data) {
    //console.log(data);
    odfName2.value = data;
    recv_data.amplitude = data;
}
function Name3(data) {
    //console.log(data);
    odfName3.value = data;
    if(data == "true") {
        recv_data.changecolor = "true";
    }
    else {
        recv_data.changecolor = "false";
    }
}
function Name4(data) {
    //console.log(data);
    odfName4.value = data;
    recv_data.onset = data;
}
function Name5(data) {
    //console.log(data);
    odfName5.value = data;
    recv_data.onset = data;
}

const option2 = {
    apiUrl: 'http://140.113.199.211:81/csm',
    deviceModel: 'P5Demo',
    deviceName: 'P5Demo',
    odfList: [[Name1, ['float']],
              [Name2, ['float']],
              [Name3, ['float']],
              [Name4, ['float']],
              [Name5, ['float']]],
    pushInterval: 5,
    interval: {
        Name1: 1/24,
        Name2: 1/24,
        Name3: 1/24,
        Name4: 1/24,
        Name5: 1/24
    },
};

const da1 = new iottalkjs.DAI(option1);
da1.run();
const da2 = new iottalkjs.DAI(option2);
da2.run();
