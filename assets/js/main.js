let game = {
    "score": 0,
    "level": 1,
    "level-count": 9
};

$("#start-game").on("click", startGame);  // click button to start game

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

    createPairs();
};

function level() {
    game.level++;

    $("#level").html(`
        <h2>Level: </h2>
        <h2>${game.level}</h2>
    `);
};

function createPairs() { 
    $("html").css("cursor", "wait");

    let cardList = [];

    for (let i = 1; i <= game['level-count']; i++) {    // Populating the cardList. Depending on the level the number of cards will vary.
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
    let randomPage = Math.floor(Math.random() * 9398);
    let randomArt = Math.floor(Math.random() * 12);

    $(`#card-${pair[0]} .flip-card-back`).html("");
    if (pair.length > 1) {
        $(`#card-${pair[1]} .flip-card-back`).html("");
    }

    $.when(
        $.getJSON(`https://api.artic.edu/api/v1/artworks?page=${randomPage}`),
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

/*
function (errorResponse) {
            console.error("Error loading artwork:", errorResponse);
            if (retries > 0) {
                // Retry if there's an error
                console.error(`Error loading artwork. Retrying... (${retries} retries left)`);
                loadArtwork(pair, retries - 1);
            } else {
                console.error("Max retries reached. Unable to load artwork.");
                // Handle error when max retries are reached
            }
        }
*/