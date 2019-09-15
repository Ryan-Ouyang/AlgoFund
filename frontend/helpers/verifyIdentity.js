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

async function verifyIdentity(githubUser, addr) {
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
        console.log(transaction)

        if (transaction.noteb64) {
            let buff = Buffer.from(transaction.noteb64, 'base64');  
            bountyNote = buff.toString('utf-8');
        }

        username = bountyNote.substring(1);

        identityMapping[username] = transaction.from;
    })

    if (identityMapping) {
        console.log(identityMapping)
    } else {
        console.log("No bounties")
    }

    userIsVerified = identityMapping[githubUser] === addr
    console.log(userIsVerified)
    return userIsVerified
}

verifyIdentity("Ryan-Ouyang", "VRMFERUGNTKRSCRHJGIM626PWYD7DDX6YMJ7YBVXFU2Y7ZXH53Z5CS4M4Y")

module.exports = {
    verifyIdentity: verifyIdentity,
};