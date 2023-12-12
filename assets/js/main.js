let game = {
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

    for (let i = 1; i <= game['level-count']; i++) {    // Populating the cardList. Depending on the level the number of cards will vary.
        cardList.push(i);
    };

    let numOfPairs = Math.floor(cardList.length / 2);

    for (let j = 0; j < numOfPairs; j++) {
        let pair = [];
        let pairs = [];
        
        do {
            pair = [Math.floor(Math.random() * cardList.length), Math.floor(Math.random() * cardList.length)]
        } while (pair[0] === pair[1]);

        pair.sort().reverse();
        pairs.push([cardList[pair[0]], cardList[pair[1]]]);   

        cardList.splice(pair[0], 1);
        cardList.splice(pair[1], 1);

        let randomPage = Math.floor(Math.random() * 9398);
        let randomArt = Math.floor(Math.random() * 12);

        for (pair of pairs) {
            $(`#card-${pair[0]} .flip-card-back`).html("");
            $(`#card-${pair[1]} .flip-card-back`).html("");

            $.when(
                $.getJSON(`https://api.artic.edu/api/v1/artworks?page=${randomPage}`),
            ).then(
                function (response) {
                    var artwork = response;
                    const iiif = "/full/843,/0/default.jpg";

                    //console.log(artwork);
                    //console.log(artwork.data[randomArt]);

                    console.log(pair);

                    $(`#card-${pair[0]} .flip-card-back`).html(`<img src="${artwork.config.iiif_url}/${artwork.data[randomArt].image_id}${iiif}">`);
                    $(`#card-${pair[1]} .flip-card-back`).html(`<img src="${artwork.config.iiif_url}/${artwork.data[randomArt].image_id}${iiif}">`);

                }
            )
        } 
    }

    if (cardList.lenght !== 0) {
        let randomPage = Math.floor(Math.random() * 9398);
        let randomArt = Math.floor(Math.random() * 12);

        $(`#card-${cardList[0]} .flip-card-back`).html("");

        $.when(
            $.getJSON(`https://api.artic.edu/api/v1/artworks?page=${randomPage}`),
        ).then(
            function (response) {
                var artwork = response;
                const iiif = "/full/843,/0/default.jpg";

                //console.log(artwork);
                //console.log(artwork.data[randomArt]);

                $(`#card-${cardList[0]} .flip-card-back`).html(`<img src="${artwork.config.iiif_url}/${artwork.data[randomArt].image_id}${iiif}">`);
            }
        );
        console.log(cardList[0]);
    }

    
}

fillCards();