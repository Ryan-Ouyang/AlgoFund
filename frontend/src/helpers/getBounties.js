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

const frontAxios = axiosLibrary.create();

async function getBounties() {
    const address = config.ESCROW_ADDRESS;
    const date = new Date();

    const fromDate = '2019-09-13'
    const toDate = `${date.getFullYear() + 1}-${("0" + (date.getMonth() + 1)).slice(-2)}-${date.getDate() + 1}`

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
            const link = bountyNote.split('link�').pop().split('�')[0].substring(1); // MONKAS 
            const type = bountyNote.split('�').pop().split('�')[0];
            const amount = transaction.payment.amount;

            parsedBountyNote = {
                link, type, amount
            }
        }

        
        if (parsedBountyNote.type === 'bounty-create') {
            bountyList.push(parsedBountyNote)
        }
    })

    if (bountyList) {
        // console.log(bountyList)
    } else {
        // console.log("No bounties")
    }

    let returnedList = [];

    await bountyList.forEach(async (bounty, i) => {
        let newURL = bounty.link.substring(19);
        let queryURL = 'https://api.github.com/repos/' + newURL;
        
        await frontAxios.get(queryURL)
        .then(async response => {
            const [postdate, title, repopath, issue_num] = [response.data.created_at, response.data.title, newURL.split('/issues/')[0], newURL.split('/')[newURL.split('/').length -1]];
            await frontAxios.get(`https://api.github.com/users/${newURL.substring(0, newURL.indexOf('/'))}`)
            .then(async response => {
                const avatar = response.data.avatar_url;
                // link: bounty.link, value: bounty.amount/1000000, type: bounty.type, date: postdate, title: title, path: repopath, num: issue_num, image: avatar}
                await returnedList.push({link: bounty.link, value: bounty.amount/1000000, type: bounty.type, date: postdate, title: title, path: repopath, num: issue_num, image: avatar});
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err))
    })

    return returnedList;

}

module.exports = getBounties
