let game = {
    "level": 1,
    "cardCount": 9, 
    "inProgress": false
}

let cards = [];

let player = {
    "score": 0,
    "choice1": "",
    "choice2": "",
    "lives": 3,
    "win": 0
}

function createCards() {
    for (let i = 0; i < game.cardCount; i++) {
        let card = {};
        card.id = `card-${i}`;
        card.img = "";
        card.title = "";
        card.artist = "";
        card.date = "";
        card.code = 
        `
        <div id="${card.id}" class="flip-card">
            <div class="flip-card-inner">
                <div class="flip-card-front">
                    <p><i class="fa-solid fa-star center"></i></p>
                </div>
                <div class="flip-card-back">${card.img}</div>
            </div>
        </div>`;
        cards.push(card)
    }

    let levelLayout = "";
    for (item of cards) {
        levelLayout = levelLayout + item.code;
    }
    $("#game").html(levelLayout);

    createPairs(cards)
    showCards(cards).then(() => beginMessage()).then(() => playerMove());
}

function createPairs(cards, ) {
    let cardsTemp = [...cards];
    let numOfPairs = Math.floor(cards.length / 2);

    for (let j = 0; j < numOfPairs; j++) {
        let pairs = [];
        let pair = [];
        do {
            pair = [Math.floor(Math.random() * cardsTemp.length), Math.floor(Math.random() * cardsTemp.length)];
        } while (pair[0] === pair[1]);

        pair.sort().reverse();
        pairs.push([cardsTemp[pair[0]], cardsTemp[pair[1]]]);

        cardsTemp.splice(pair[0], 1);
        cardsTemp.splice(pair[1], 1);

        for (pair of pairs) {
            console.log(pair);
            loadArtwork(pair);
        } 
    }
    if (cardsTemp.length > 0) {
        let remainder = [cardsTemp[0]];
        loadArtwork(remainder);
    }
}

function loadArtwork(pair) {
    $("html").css("cursor", "wait");

    let randomPage = Math.floor(Math.random() * 9398);
    let randomArt = Math.floor(Math.random() * 12);

    $(`#${pair[0].id} .flip-card-back`).html("");
    if (pair.length > 1) {
        $(`#${pair[1].id} .flip-card-back`).html("");
    }

    $.when(
        $.getJSON(`https://api.artic.edu/api/v1/artworks?page=${randomPage}`)
    ).then(
        function (response) {
            let artwork = response;
            const iiif = "/full/843,/0/default.jpg";

            //console.log(artwork);
            console.log(artwork.data[randomArt]);

            pair[0].img = `${artwork.config.iiif_url}/${artwork.data[randomArt].image_id}${iiif}`;

            $(`#${pair[0].id} .flip-card-back`).html(`<img src="${pair[0].img}">`);
            pair[0].title = `${artwork.data[randomArt].title}`;
            pair[0].artist = `${artwork.data[randomArt].artist_title}`;
            pair[0].date = `${artwork.data[randomArt].date_end}`;

            if (pair.length > 1) {
                pair[1].img = `${artwork.config.iiif_url}/${artwork.data[randomArt].image_id}${iiif}`;
                $(`#${pair[1].id} .flip-card-back`).html(`<img src="${pair[1].img}">`);
                pair[1].title = `${artwork.data[randomArt].title}`;
                pair[1].artist = `${artwork.data[randomArt].artist_title}`;
                pair[1].date = `${artwork.data[randomArt].date_end}`;
            };

            console.log(`Pairing Successfull`);
        }
    );
}

function showCards(cards) {
    return new Promise((resolve) => {
        cards.forEach((card, index) => {
            setTimeout(() => {
                $(`#${card.id}`).addClass("flip");
                $(`#${card.id} .flip-card-inner`).addClass("flip");

                setTimeout(() => {
                    $(`#${card.id}`).removeClass("flip");
                    $(`#${card.id} .flip-card-inner`).removeClass("flip");

                    if (index === cards.length - 1) {
                        resolve();
                    }

                }, 1500); 
            }, 2000 * index); 
        });
    });
}

function beginMessage() {
    let beginMessage =
        `
        <div class="box">
            <h1>Begin!</h1>
        </div>
       `;
    $(".flex-container").append(beginMessage);
    $(".box").hide();
    $(".box").fadeIn("slow");
    $(".box").on("click", function () {
        $(".box").fadeOut(300, function () { $(this).remove(); });
    });
}

function playerMove() {
    $(".flip-card").on("click", function () {
        $(this).toggleClass("flip");
        $(this).children(".flip-card-inner").toggleClass("flip");

        if (player.choice1 === "") {
            player.choice1 = this.id;
        } else if (player.choice2 === "") {
            player.choice2 = this.id;
        }
        if (player.choice1 !== "" && player.choice2 !== "") {
            checkPair(player.choice1, player.choice2);
            gameStatus()
        }
    });
}

function checkPair(choice1, choice2) {
    choice1 = cards.find(card => card.id === player.choice1);
    choice2 = cards.find(card => card.id === player.choice2);

    const cardsRemaining = cards.filter( (card) => {
        return card !== choice1 && card !== choice2;
    })

    console.log(choice1.id);
    console.log(choice2.id);

    if (choice1.img === choice2.img) {
        let correctPair = 
        `
        <div class="box">
            <h1>${choice1.title}</h1>
            <div class="details">
                <p>${choice1.artist}</p>
                <p>${choice1.date}</p>
            </div>
            <img src="${choice1.img}" alt="image of ${choice1.title}">
            <h2>+100</h2>
        </div>
        `

        $(".flex-container").append(correctPair);
        $(".box").hide();
        $(".box").fadeIn("slow");
        $(".box").on("click", function() {
            $(".box").fadeOut(300, function () { $(this).remove(); });
        })

        player.score += 100;
        player.win ++;
        showScore();

        cards = cardsRemaining;
        console.log(cards);
        
    } else {
        $(".flip-card", ".flip-card-inner").removeClass("flip");
        player.lives = player.lives - 1;
        $(`#life-${player.lives}`).hide("slow");
    }

    player.choice1 = "";
    player.choice2 = "";
}

function showScore() {
    $("#score").html(
        `
        <h2>Score:</h2>
        <h2>${player.score}</h2>`
    )
}

function showLevel() {
    $("#level").html(
        `
        <h2>Level:</h2>
        <h2>${game.level}</h2>`
    );
}

function gameStatus() {
    if (player.lives <= 0) {
        setTimeout(function () {
            alert("Game Over");
            // add score to leaderboard
            //start new game
        }, 500); 
    } else if (player.win >= Math.floor(game.cardCount/2)) {
        setTimeout(function () {
            $(".box").fadeOut(300, function () { $(this).remove(); }); // https://stackoverflow.com/questions/1807187/how-to-remove-an-element-slowly-with-jquery
            alert("You won the level");
            game.level ++;
            showLevel();
            cards = [];
            player.win = 0;
            startLevel();
        }, 500); 
    }
}

function startLevel() {
    if (game.level > 2 && game.level < 5) {
        game.cardCount = 12;
        $(".grid-container").css("grid-template-columns", "auto auto auto auto");
    } else if (game.level > 4) {
        game.cardCount = 16;
    }

    createCards();

}

$("#start-game").on("click", startGame);

function startGame() {
    $("#start-game").addClass("no-display");
    $("#game").css("opacity", "1");
    startLevel();
}


