let send_data = {amplitude: 0, onset:'false'};
let recv_data = {amplitude: 0, onset:'false'};
let csv; 
function saveText(text) {
  rows = text.split("\n");
  for (let i=1; i<rows.length; i++) {
    let data = rows[i].split(',');
    console.log(data);
    csv.push(data);
  }
}

/*let promise = fetch('brahms.csv')
              .then(response => response.text())
              .then(text => saveText(text))
              .catch(error => new Error(error));*/


const idfSwitch1 = document.querySelector('#amp');
const idfSwitch2 = document.querySelector('#onset');
const odf = document.querySelector('#odf');

// Amplitude type:float value:[0, 255]
function Switch1() {
    idfSwitch1.value = send_data.amplitude;
    return send_data.amplitude;
}
// Onset type:string value:{'true', 'false'}
function Switch2() {
    idfSwitch2.value = send_data.onset;
    return send_data.onset;
}
function Switch3() {
    idf.value = send_data.amplitude;
    return send_data.amplitude;
}
function Switch4() {
    idf.value = send_data.amplitude;
    return send_data.amplitude;
}
function Switch5() {
    idf.value = send_data.amplitude;
    return send_data.amplitude;
}

const option1 = {
    apiUrl: 'http://140.113.199.211:81/csm',
    deviceModel: 'Remote_control',
    deviceName: 'MusicTalk',
    idfList: [[Switch1, ['float']],
              [Switch2, ['string']],
              [Switch3, ['float']],
              [Switch4, ['float']],
              [Switch5, ['float']]],
    pushInterval: 5,
    interval: {
        Switch1: 1/24,
        Switch2: 1/24
    },
};

function Dummy_Sensor() {
    const number = Math.floor((1 + Math.random()) * 0x10000);
    idf.value = number;
    return [number];
}
function Dummy_Control(data) {
    //console.log(data);
    [odf.value] = data;
    recv_data.onset = data;
}

const option2 = {
    apiUrl: 'http://140.113.199.211:81/csm',
    deviceModel: 'Dummy_Device',
    deviceName: 'MyDummyDevice',
    idfList: [[Dummy_Sensor, ['int']]],
    odfList: [[Dummy_Control, ['string']]],
    pushInterval: 5,
    interval: {
        Dummy_Sensor: 1/24,
    },
};

const da1 = new iottalkjs.DAI(option1);
da1.run();
const da2 = new iottalkjs.DAI(option2);
da2.run();
