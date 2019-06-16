const axios = require('axios');

export async function get(url) {
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(res => {
        resolve(res.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  })
}