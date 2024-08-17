const express = require('express')
const app = express()
const dns = require('dns').promises
const { performance } = require('perf_hooks')
const axios = require('axios')
const path = require('path')
const cors = require('cors')




app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


async function getLocation(ip) {
    try {
        const response = await axios.get(`https://ipinfo.io/${ip}/json`);
        return response.data;
    } catch (error) {
        return { error: 'Location lookup failed' };
    }
}


async function dnsLookUp(domain, type) {


    try {
        const startlookup = performance.now()
        const records = await dns.resolve(domain, type);
        const endlookup = performance.now();
        const time = endlookup - startlookup;
        let loc = [];
        for (const item of records) {
            loc.push(await getLocation(item))
        }
        const startRes = performance.now();
        await getLocation(records[0]);

        const responseTime = performance.now() - startRes;
        console.log(loc);

        const res = {
            name: domain,
            lookuptime: time,
            locations: loc,
            responsetime: responseTime
        }

        return res;
    } catch (error) {
        return 'err'
    }


}



app.post('/', async (req, res) => {
    console.log(req.body);
    let data = [];

    try {
        for (const item of req.body) {
            const d = await dnsLookUp(item.dns, item.type)
            if (d === 'err') {

            } else {
                data.push(d)
            }

        }

        res.json(data).status(200);
    } catch (error) {
        res.json('error').status(500)
    }


})

app.listen(3000, () => {
    console.log("Server started...");

})