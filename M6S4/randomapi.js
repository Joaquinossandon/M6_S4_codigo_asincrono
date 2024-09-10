const { default: axios } = require("axios");

const fetchData = async (url, delay) => {
    return new Promise((res, rej) => {
        setTimeout(async () => {
            const { data } = await axios.get(
                "https://random-data-api.com/api/" + url
            );
            res(data);
        }, delay);
    });
};

fetchData("/name/random_name", 0).then((res) => console.log(res));
fetchData("/restaurant/random_restaurant", 5000).then((res) =>
    console.log(res)
);
fetchData("/stripe/random_stripe", 10000).then((res) => console.log(res));
