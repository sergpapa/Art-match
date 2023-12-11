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
    }

    if (cardList.length % 2 !== 0) {
        let randomCard;

        do {
            randomCard = Math.floor(Math.random() * cardList.length);
        } while (randomCard === 0);

        console.log("random Card: ", randomCard);


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
                console.log(artwork.config.iiif_url);
                console.log(artwork.data[randomArt].image_id);

                $(`#card-${randomCard} .flip-card-back`).html(`<img src="${artwork.config.iiif_url}/${artwork.data[randomArt].image_id}${iiif}">`);

                console.log(artwork.config.iiif_url + "/" + artwork.data[randomArt].image_id + iiif);
            }
        );
    }



    for (let i; i < game['level-count']; i++) {
        $(`#card-${i + 1}`).html("");

        let randomArt = Math.floor(Math.random() * 100000)

        console.log(randomArt);

        $.when(
            $.getJSON(`https://api.artic.edu/api/v1/artworks/${randomArt}`),
        ).then(
            function (response) {
                var artwork = response;
                const iiif = "/full/843,/0/default.jpg";

                console.log(artwork.data.id);
                console.log(artwork.config.iiif_url);
                console.log(artwork.data.image_id);

                $(`#card-${i + 1}`).html(`<img src="${artwork.config.iiif_url}/${artwork.data.image_id}${iiif}">`);

                console.log(artwork.config.iiif_url + "/" + artwork.data.image_id + iiif);
            }
        );
    };
};

fillCards();

