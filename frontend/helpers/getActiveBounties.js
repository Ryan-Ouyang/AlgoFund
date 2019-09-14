const axiosLibrary = require('axios');
const config = require('./config');

const axios = axiosLibrary.create({
    baseURL: 'http://hackathon.algodev.network:9100/',
    headers: {
        'X-Algo-API-Token': 'ef920e2e7e002953f4b29a8af720efe8e4ecc75ff102b165e0472834b25832c1'
    }
});

async function getActiveBounties() {
    address = config.ESCROW_ADDRESS;
    date = new Date();

    fromDate = '2019-09-13'
    toDate = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${date.getDate() + 1}`

    const queryURL = `/v1/account/${address}/transactions?toDate=${toDate}&fromDate=${fromDate}`
    console.log(queryURL)

    var transactionList;

    await axios.get(queryURL)
        .then(response => {
            transactionList = response.data
        })
        .catch(err => console.log(err))

    console.log(transactionList)
}

getActiveBounties();

module.exports = getActiveBounties;