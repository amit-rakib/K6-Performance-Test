import { check } from 'k6'
import http from 'k6/http'


export let options = {
    stages: [
        {duration: '10s', target: 100},
        {duration: '30s', target: 200},
        {duration: '30', target: 500},
        {duration: '10s', target: 0}
    ],
    thresholds: {
        http_req_duration: ['p(90)<500'],
        http_req_failed: ['rate<0.01']
    }
}


export default function (){
    const response = http.get("https://www.youtube.com/watch?v=HZI4ytQDRtg")

    check(response, {
        '200 OK': r=>r.status === 200,
        'Response time < 500': r=>r.timings.duration<500,
    })
}