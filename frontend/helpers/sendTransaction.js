const algosdk = require('algosdk');
const config = require('./config.js');

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

async function sendTransaction(mnemonic, note, amount) {

    var recoveredAccount = algosdk.mnemonicToSecretKey(mnemonic); 
    console.log(recoveredAccount.addr);

    let params = await algodclient.getTransactionParams();
    let endRound = params.lastRound + parseInt(1000);

    let txn = {
        "from": recoveredAccount.addr,
        "to": config.ESCROW_ADDRESS,
        "fee": 10,
        "amount": amount,
        "firstRound": params.lastRound,
        "lastRound": endRound,
        "genesisID": params.genesisID,
        "genesisHash": params.genesishashb64,
        "note": algosdk.encodeObj(note)
    };

    let signedTxn = algosdk.signTransaction(txn, recoveredAccount.sk);
    let tx = (await postAlgodclient.sendRawTransaction(signedTxn.blob));
    console.log("Transaction : " + tx.txId);
    return tx.txId;
}

module.exports = sendTransaction