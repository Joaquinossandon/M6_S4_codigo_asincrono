const axios = require("axios");

// axios
//     .get(
//         "https://api.countrylayer.com/v2/all?access_key=280bc408b3629c6e435774a95c40ff25"
//     )
//     .then(({ data }) => {
//         console.log(data);
//     });

const getCountry = async (pais = "chile") => {
    const { data } = await axios.get(
        `https://api.countrylayer.com/v2/name/${pais}?access_key=280bc408b3629c6e435774a95c40ff25&fullText=true`
    );

    console.log(data);
};

getCountry("mexico");
getCountry();
