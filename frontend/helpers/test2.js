const algosdk = require('algosdk');

//Retrieve the token, server and port values for your installation in the algod.net
//and algod.token files within the data directory
const token = "ef920e2e7e002953f4b29a8af720efe8e4ecc75ff102b165e0472834b25832c1";
const server = "http://35.203.3.123/";
const port = "";

//Recover the account
var mnemonic = "whale pencil wheat orange major trial long scatter flash web antenna popular gentle hard virtual expose comfort comfort setup exotic nominee betray clarify above idea";
var recoveredAccount = algosdk.mnemonicToSecretKey(mnemonic);
console.log(recoveredAccount.addr);
//check to see if account is valid
var isValid = algosdk.isValidAddress(recoveredAccount.addr);
console.log("Is this a valid address: " + isValid);


//instantiate the algod wrapper
let algodclient = new algosdk.Algod(token, server, port);
(async () => {
    //Get the relevant params from the algod
    let params = await algodclient.getTransactionParams();
    let endRound = params.lastRound + parseInt(1000);

    let person = {
        firstName: "John",
        lastName: "Doe",
        age: 50,
        eyeColor: "blue"
    };

    //create a transaction
    let txn = {
        "from": recoveredAccount.addr,
        "to": "7ZUECA7HFLZTXENRV24SHLU4AVPUTMTTDUFUBNBD64C73F3UHRTHAIOF6Q",
        "fee": params.fee,
        "amount": 100,
        "firstRound": params.lastRound,
        "lastRound": endRound,
        "genesisID": params.genesisID,
        "genesisHash": params.genesishashb64,
        "note": algosdk.encodeObj(person),
    };
    //sign the transaction
    let signedTxn = algosdk.signTransaction(txn, recoveredAccount.sk);

    let tx = (await algodclient.sendRawTransaction(signedTxn.blob));
    console.log("Transaction : " + tx.txId);

})().catch(e => {
    console.log(e);
});