import { check, sleep } from 'k6'
import http from 'k6/http'


export let options = {
     stages: [
        {duration: '5s', target: 50},
        {duration: '2m', target: 50},
        {duration: '5s', target: 0}
     ],
     thresholds: {
        http_req_duration: ['p(90)<500'],
        http_req_failed: ['rate<0.01']

     }
}


export default function(){
    const rs = http.get("https://www.youtube.com/watch?v=LLEo8Y9VEmA")

    check(rs, {
        '200 Ok': r=>r.status === 200,
        "Response time OK": r=>r.timings.duration<500
    })
  sleep(1)

}