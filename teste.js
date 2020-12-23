(async () => {
  let lastN = 0;
  const fetchApi = (name) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (name === 'Cau1') reject(new Error('errorasdasd'));
        else resolve(name);
        console.log(`res ${name}\\${lastN}`);
      }, lastN * 1000);

      lastN += 1;
    });

  const fetch1 = fetchApi('Cau1');
  const fetch2 = fetchApi('Cau2');
  const fetch3 = fetchApi('Cau3');

  const res = await Promise.race([fetch1, fetch2, fetch3]);

  console.log('final resposne:', res);
})();
