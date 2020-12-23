/* eslint-disable node/no-unsupported-features/es-syntax */
// eslint-disable-next-line max-classes-per-file
import { Pool } from 'tarn';

import server from '@/main/server';

const pool = new Pool<string>({
  max: 1,
  min: 1,

  create: () => {
    console.log('creating');

    return 'abc';
  },

  destroy: () => {
    console.log('destroy');
  },
});

async function run(): Promise<void> {
  const poolRequest = pool.acquire();

  const poolInstance = await poolRequest.promise;
  const poolInstance2 = await poolRequest.promise;
  const poolInstance3 = await poolRequest.promise;

  console.log('Pool Instance ->', poolInstance);
  console.log('Pool Instance ->', poolInstance2);
  console.log('Pool Instance ->', poolInstance3);
}

run();

server();

class ApiCallBackError extends Error {
  constructor() {
    super('Error on calling api!');
  }
}

class ApiCallError extends Error {
  constructor() {
    super('Error on calling api!');
  }
}

async function fetch(name: string): Promise<number> {
  if (name === 'Juan') throw new ApiCallError();
  if (name === 'Cau') throw new ApiCallBackError();

  return 1;
}

async function teste(): Promise<void> {
  try {
    const n1 = await fetch('Cau');
    const n2 = await fetch('Juan');

    console.log(n1, n2);
  } catch (error) {
    if (error instanceof ApiCallError) {
      console.log('Status 400!');
    }

    if (error instanceof ApiCallBackError) {
      console.log('Status 401!');
    }

    console.log('Server stoping!');
  }
}

teste();

(async () => {
  const fetchApi = (name: string): Promise<string> =>
    new Promise((resolve) => resolve(name));

  const fetch1 = fetchApi('Cau1');
  const fetch2 = fetchApi('Cau2');
  const fetch3 = fetchApi('Cau3');

  const [user1, user2, user3] = await Promise.all([fetch1, fetch2, fetch3]);

  console.log(user1, user2, user3);
})();
