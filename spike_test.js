import { check, sleep } from 'k6'
import http from 'k6/http'


export let options = {

 stages: [
    {duration: '5s', target: 10},
    {duration: '5s', target: 500},
    {duration: '10s', target: 500},
    {duration: '5s', target: 10},
    {duration: '5s', target: 0}
 ],

 thresholds: {
    http_req_duration: ['p(90)<2000'],
    http_req_failed: ['rate<0.01']
 }
}




export default function () {
    const res = http.get("https://www.youtube.com/watch?v=HZI4ytQDRtg")
   

    check(res, {
        '200 Ok': r=>r.status === 200,
        'Response time < 2000': r=>r.timings.duration < 2000
    })

    sleep(1)

}