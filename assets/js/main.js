let game  = {
    "score": 0,
    "level": 1,
    "level-count": 9
};

function startGame() {
    game.score = 0;
    game.level = 1;

    $("#level").html(`
        <h2>Level: </h2>
        <h2>${game.level}</h2>
    `);

    $("#score").html(`
        <h2>Score: </h2>
        <h2>${game.score}</h2>
    `);
};

function level() {
    game.level ++;

    $("#level").html(`
        <h2>Level: </h2>
        <h2>${game.level}</h2>
    `);
};

function fillCards() {
    let cardList = [];

    for (let i = 1; i <= game['level-count']; i++) {
        cardList.push(i);
    };

    if (cardList.length % 2 !== 0) {
        let randomCard;

        do {
            randomCard = Math.floor(Math.random() * cardList.length);
        } while (randomCard === 0);

        let randomPage = Math.floor(Math.random() * 9398);
        let randomArt = Math.floor(Math.random() * 12);

        $(`#card-${randomCard} .flip-card-back`).html("");

        $.when(
            $.getJSON(`https://api.artic.edu/api/v1/artworks?page=${randomPage}`),
        ).then(
            function (response) {
                var artwork = response;
                const iiif = "/full/843,/0/default.jpg";

                console.log(artwork);
                console.log(artwork.data[randomArt]);

                $(`#card-${randomCard} .flip-card-back`).html(`<img src="${artwork.config.iiif_url}/${artwork.data[randomArt].image_id}${iiif}">`);
            }
        ); 

        cardList.splice(randomCard, 1);
    }

    for (let i = 0; i < cardList.length; i++) {
        let randomPair = [];

        do {
            randomNum = Math.floor(Math.random() * (cardList.length - 1)) + 1;
            randomPair = [randomNum, randomNum];
        } while (randomPair[0] === randomPair[1]);

        for (i of randomPair) {
            let indexToRemove = cardList.indexOf(randomPair[i]);

            cardList.splice(indexToRemove, 1);
        }

        console.log(randomPair);
        console.log(cardList);


        let randomPage = Math.floor(Math.random() * 9398);
        let randomArt = Math.floor(Math.random() * 12);

        $(`#card-${randomPair[0]} .flip-card-back`).html("");
        $(`#card-${randomPair[1]} .flip-card-back`).html("");


        $.when(
            $.getJSON(`https://api.artic.edu/api/v1/artworks?page=${randomPage}`),
        ).then(
            function (response) {
                var artwork = response;
                const iiif = "/full/843,/0/default.jpg";

                console.log(artwork);
                console.log(artwork.data[randomArt]);

                $(`#card-${randomPair[0]} .flip-card-back`).html(`<img src="${artwork.config.iiif_url}/${artwork.data[randomArt].image_id}${iiif}">`);
                $(`#card-${randomPair[1]} .flip-card-back`).html(`<img src="${artwork.config.iiif_url}/${artwork.data[randomArt].image_id}${iiif}">`);

                console.log(`#card-${randomPair[0]}`);
                console.log(`#card-${randomPair[1]}`);
            }
        )
    }
};

fillCards();

