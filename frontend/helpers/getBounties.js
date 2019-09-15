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

async function getBounties() {
    address = config.ESCROW_ADDRESS;
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

    let bountyList = [];
    transactionList.forEach(transaction => {
        // console.log(transaction)
        let bountyNote;

        if (transaction.noteb64) {
            let buff = Buffer.from(transaction.noteb64, 'base64');  
            bountyNote = buff.toString('utf-8');
        }

        let parsedBountyNote = {}

        if (bountyNote) {
            link = bountyNote.split('link�').pop().split('�')[0].substring(1); // MONKAS 
            type = bountyNote.split('�').pop().split('�')[0];
            amount = transaction.payment.amount;

            parsedBountyNote = {
                link, type, amount
            }
        }

        
        if (parsedBountyNote.type === 'bounty-create') {
            bountyList.push(parsedBountyNote)
        }
    })

    if (bountyList) {
        console.log(bountyList)
    } else {
        console.log("No bounties")
    }

    return bountyList
}

getBounties();

module.exports = {
    getBounties: getBounties,
};