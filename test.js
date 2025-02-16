import { check } from 'k6'
import http from 'k6/http'



export let options = {
    stages: [
        {duration: '10s', target: 10},
        {duration: '30s', target: 100},
        {duration: '10s', target: 0},
    ],
    thresholds: {
        http_req_duration: ['p(90)<500'],
        http_req_failed: ['rate<0.01'],
    }
}


export default function () {
    const response = http.get("https://www.youtube.com/watch?v=HZI4ytQDRtg")
    
    check(response, {
        '200 Ok': r=>r.status === 200,
        'Response time is < 500ms': r=>r.timings.duration < 500,
    })

}