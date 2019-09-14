const algosdk = require('algosdk');

const baseServer = "https://testnet-algorand.api.purestake.io/ps1"
const port = "";

//Create client for GET of Transaction parameters 
const token = {
    'X-API-key' : 'B3SU4KcVKi94Jap2VXkK83xx38bsv95K5UZm2lab',
}


const algodclient = new algosdk.Algod(token, baseServer, port);

var keys = algosdk.generateAccount();
console.log("Address: " + keys.addr);
console.log("Secret key: " + keys.sk);
console.log("Mnemonic: " + algosdk.secretKeyToMnemonic(keys.sk));
