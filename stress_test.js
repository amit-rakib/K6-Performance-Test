import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '10s', target: 50 },   // Ramp up to 50 users in 10 seconds
    { duration: '30s', target: 200 },  // Increase to 200 users over 30 seconds
    { duration: '30s', target: 500 },  // Stress: Hold 500 users for 30 seconds
    { duration: '10s', target: 0 },    // Cooldown: Ramp down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(90)<500'],  // 90% of requests should be under 500ms
    http_req_failed: ['rate<0.01'],    // Failure rate should be less than 1%
  },
};

export default function () {
  let response = http.get('https://www.google.com');

  check(response, {
    'Response status is 200': (r) => r.status === 200,
    'Response time < 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1); // Pause for 1 second before sending the next request
}
