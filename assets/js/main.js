let game = {
    "score": 0,
    "level": 1,
    "levelCount": 9,
    "status": false,
    "openCards": 0
};

$("#start-game").on("click", function() {
    startGame();
    $("#start-game").hide();
});  // click button to start game

function startGame() {
    game.score = 0;
    game.level = 1;
    game.status = true;

    $("#level").html(`
        <h2>Level: </h2>
        <h2>${game.level}</h2>
    `);

    $("#score").html(`
        <h2>Score: </h2>
        <h2>${game.score}</h2>
    `);

    createPairs();
    console.log(game.openCards);

    if (game.status) {
        $(".flip-card, .flip-card-inner").on("click", function () {
            $(this).toggleClass("flip");
            game.openCards = game.openCards + 1;
            console.log(game.openCards);

            if (game.openCards > 5) {
                $(".flip-card, .flip-card-inner").removeClass("flip");
                game.openCards = 0;                
            }
        });
    }


};

function level() {
    game.level++;

    $("#level").html(`
        <h2>Level: </h2>
        <h2>${game.level}</h2>
    `);
};

function createPairs() {

    let cardList = [];

    for (let i = 1; i <= game.levelCount; i++) {    // Populating the cardList. Depending on the level the number of cards will vary.
        cardList.push(i);
    };

    let numOfPairs = Math.floor(cardList.length / 2);

    for (let j = 0; j < numOfPairs; j++) {
        let pair = [];
        let pairs = [];

        do {
            pair = [Math.floor(Math.random() * cardList.length), Math.floor(Math.random() * cardList.length)];
        } while (pair[0] === pair[1]);

        pair.sort().reverse();
        pairs.push([cardList[pair[0]], cardList[pair[1]]]);

        cardList.splice(pair[0], 1);
        cardList.splice(pair[1], 1);

        for (pair of pairs) {
            console.log("Began filling cards")
            loadArtwork(pair);
        }
    }

    if (cardList.lenght !== 0) {
        loadArtwork(cardList);
    };


}

function loadArtwork(pair) {
    $("html").css("cursor", "wait");

    let randomPage = Math.floor(Math.random() * 9398);
    let randomArt = Math.floor(Math.random() * 12);

    $(`#card-${pair[0]} .flip-card-back`).html("");
    if (pair.length > 1) {
        $(`#card-${pair[1]} .flip-card-back`).html("");
    }

    $.when(
        $.getJSON(`https://api.artic.edu/api/v1/artworks?page=${randomPage}`)
    ).then(
        function (response) {
            var artwork = response;
            const iiif = "/full/843,/0/default.jpg";

            //console.log(artwork);
            //console.log(artwork.data[randomArt]);

            $(`#card-${pair[0]} .flip-card-back`).html(`<img src="${artwork.config.iiif_url}/${artwork.data[randomArt].image_id}${iiif}">`);
            if (pair.length > 1) {
                $(`#card-${pair[1]} .flip-card-back`).html(`<img src="${artwork.config.iiif_url}/${artwork.data[randomArt].image_id}${iiif}">`);
            };

            console.log(`Pairing Successfull`);
        }
    ).catch(
        function (errorResponse) {
            if (errorResponse.status === 404 || errorResponse.status === 403) {
                console.log("Encountered error: ", errorResponse);
                loadArtwork(pair);
            } else {
                console.log("Unhandled error:", errorResponse);
            }}
    );
}



