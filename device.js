let send_data = {amplitude: 0};
let recv_data = {amplitude: 0};
let csv; 
function saveText(text) {
  rows = text.split("\n");
  for (let i=1; i<rows.length; i++) {
    let data = rows[i].split(',');
    console.log(data);
    csv.push(data);
  }
}

let promise = fetch('brahms.csv')
              .then(response => response.text())
              .then(text => saveText(text))
              .catch(error => new Error(error));


const idf = document.querySelector('#idf');
const odf = document.querySelector('#odf');

function Dummy_Sensor() {
    idf.value = send_data.amplitude;
    return [send_data.amplitude];
}

function Dummy_Control(data) {
    //console.log(data);
    recv_data.amplitude = data[0];
}

const option = {
    apiUrl: 'http://140.113.199.211:81/csm',
    deviceModel: 'Dummy_Device',
    deviceName: 'MyDummyDevice',
    idfList: [[Dummy_Sensor, ['int']]],
    odfList: [[Dummy_Control, ['int']]],
    pushInterval: 5,
    interval: {
        Dummy_Sensor: 1/24,
    },
};

const da = new iottalkjs.DAI(option);
da.run();
