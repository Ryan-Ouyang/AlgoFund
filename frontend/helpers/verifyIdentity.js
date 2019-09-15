const axiosLibrary = require('axios');
const algosdk = require('algosdk');
const util = require('util');
const config = require('./config');

const axios = axiosLibrary.create({
    baseURL: 'http://hackathon.algodev.network:9100/',
    headers: {
        'X-Algo-API-Token': 'ef920e2e7e002953f4b29a8af720efe8e4ecc75ff102b165e0472834b25832c1'
    }
});

async function verifyIdentity(github, addr) {
    address = config.IDENTITY_ADDRESS;
    date = new Date();

    fromDate = '2019-09-13'
    toDate = `${date.getFullYear() + 1}-${("0" + (date.getMonth() + 1)).slice(-2)}-${date.getDate() + 1}`

    const queryURL = `/v1/account/${address}/transactions?toDate=${toDate}&fromDate=${fromDate}`
    console.log(queryURL)

    var transactionList;

    await axios.get(queryURL)
        .then(response => {
            transactionList = response.data.transactions
        })
        .catch(err => console.log(err))

    let identityMapping = {};
    transactionList.forEach(transaction => {
        // console.log(transaction)

        if (transaction.noteb64) {
            let buff = Buffer.from(transaction.noteb64, 'base64');  
            bountyNote = buff.toString('utf-8');
        }

        console.log(bountyNote);
        // link = bountyNote.split('!').pop().split('�')[0]; // press F to pay respects since algosdk.decodeObj does not work
    })

    // if (bountyList) {
    //     console.log(bountyList)
    // } else {
    //     console.log("No bounties")
    // }

    // return bountyList
}

verifyIdentity("Ryan-Ouyang", "asdf");

module.exports = {
    verifyIdentity: verifyIdentity,
};