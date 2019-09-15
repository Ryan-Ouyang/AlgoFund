const config = require('./config.js');

const express = require('express')
const app = express()
const port = 3001

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/payout', async function(req, res) {
    const note = req.body.note
    const amount = req.body.amount
    const toAddr = req.body.toAddr
    
    var recoveredAccount = await algosdk.mnemonicToSecretKey(mnemonic); 
    console.log(recoveredAccount.addr);

    let params = algodclient.getTransactionParams();
    let endRound = params.lastRound + parseInt(1000);

    let txn = {
        "from": config.ESCROW_MNEMONIC,
        "to": toAddr,
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

    return res.send('Recieved POST request')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
