const algosdk = require('algosdk');

const utils = require('util');

const baseServer = "https://testnet-algorand.api.purestake.io/ps1"
const port = "";

// Create client for transaction POST
const postToken = {
    'X-API-key' : 'B3SU4KcVKi94Jap2VXkK83xx38bsv95K5UZm2lab',
    'Content-Type' : 'application/x-binary'
}

const postAlgodclient = new algosdk.Algod(postToken, baseServer, port); // Binary content type

//Create client for GET of Transaction parameters 
const token = {
    'X-API-key' : 'B3SU4KcVKi94Jap2VXkK83xx38bsv95K5UZm2lab',
}


const algodclient = new algosdk.Algod(token, baseServer, port); 

// var mnemonic = "whale pencil wheat orange major trial long scatter flash web antenna popular gentle hard virtual expose comfort comfort setup exotic nominee betray clarify above idea"; 
// var recoveredAccount = algosdk.mnemonicToSecretKey(mnemonic); 
// console.log(recoveredAccount.addr);

async function sendTransaction(mnemonic, note) {

    var recoveredAccount = algosdk.mnemonicToSecretKey(mnemonic); 
    console.log(recoveredAccount.addr);

    let params = await algodclient.getTransactionParams();
    let endRound = params.lastRound + parseInt(1000);

    let txn = {
        "from": recoveredAccount.addr,
        "to": "AEC4WDHXCDF4B5LBNXXRTB3IJTVJSWUZ4VJ4THPU2QGRJGTA3MIDFN3CQA",
        "fee": 10,
        "amount": 2,
        "firstRound": params.lastRound,
        "lastRound": endRound,
        "genesisID": params.genesisID,
        "genesisHash": params.genesishashb64,
        "note": new utils.TextEncoder("utf-8").encode(note)
    };

    let signedTxn = algosdk.signTransaction(txn, recoveredAccount.sk);
    let tx = (await postAlgodclient.sendRawTransaction(signedTxn.blob));
    console.log("Transaction : " + tx.txId);
}

sendTransaction("whale pencil wheat orange major trial long scatter flash web antenna popular gentle hard virtual expose comfort comfort setup exotic nominee betray clarify above idea", "press f")
