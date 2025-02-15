import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '10s', target: 10 },  // Ramp-up to 10 VUs in 10 seconds
    { duration: '30s', target: 100 }, // Stay at 100 VUs for 30 seconds
    { duration: '10s', target: 0 },   // Ramp-down to 0 VUs
  ],
  thresholds: {
    http_req_duration: ['p(90)<500'],  // 90% of requests should be < 500ms
    http_req_failed: ['rate<0.01'],    // Failure rate should be < 1%
  },
};

export default function () {
  let res = http.get('https://www.google.com');

  check(res, {
    'Status code is 200': (r) => r.status === 200,
    'Response time is < 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1); // Pause for 1 second before the next request
}


