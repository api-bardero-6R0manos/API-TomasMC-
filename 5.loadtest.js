import http from 'k6/http';
import { check } from 'k6';

export const options = {
  scenarios: {
    vip_storm: {
      executor: 'constant-arrival-rate',
      rate: 65000,
      timeUnit: '1s',
      duration: '2m',
      preAllocatedVUs: 500,
      maxVUs: 2000,
    },
  },
};

export default function () {
  const url = 'http://localhost:3000';
  const params = {
    headers: { 'X-API-Key': 'DEIV_6Ro.manos13_60K' },
  };
  const res = http.get(url, params);
  check(res, { 'status 429': (r) => r.status === 429 });
}
