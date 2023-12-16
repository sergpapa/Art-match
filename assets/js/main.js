let game = {
    "level": 1,
    "cardCount": 9
}

let cards = [];

let player = {
    "score": 0,
    "choice1": "",
    "choice2": "",
    "lives": 3,
    "win": 0
}

var scWrong = new Audio();
scWrong.src = "assets/tunes/wrong.mp3";
scWrong.preload = 'auto';

var scCorrect = new Audio();
scCorrect.src = "assets/tunes/correct-answer.mp3";
scCorrect.preload = 'auto';

var scSelect = new Audio();
scSelect.src = "assets/tunes/select.mp3";
scSelect.preload = 'auto';

var scGameOver = new Audio();
scGameOver.src = "assets/tunes/game-over.mp3";
scGameOver.preload = 'auto';

var scFlip = new Audio();
scFlip.src = "assets/tunes/flip.mp3";
scFlip.preload = 'auto';
scFlip.volume = 0.2;

var scWinLevel = new Audio();
scWinLevel.src = "assets/tunes/win-level.mp3";
scWinLevel.preload = 'auto';
scWinLevel.volume = 0.2;

var scSoundtrack = new Audio();
scSoundtrack.src = "assets/tunes/glossy-Coma-Media.mp3";
scSoundtrack.preload = 'auto';
scSoundtrack.loop = true;
scSoundtrack.volume = 0.5;

// soundtrack from https://pixabay.com/music/

function createCards() {
    $("#game").html("");

    for (let i = 0; i < game.cardCount; i++) {
        let card = {};
        card.id = `card-${i}`;
        card.img = "";
        card.title = "";
        card.artist = "";
        card.date = "";
        card.won = false;
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

    createPairs(cards).then(() => {
        console.log('done');
        showCards(cards).then(() => message("Begin!")).then(() => playerMove());
    });
}

function createPairs(cards, ) {
    return new Promise((resolve) => {
        let cardsTemp = [...cards];
        let numOfPairs = Math.floor(cards.length / 2);

        $("html").css("cursor", "wait");
        let loadingMessage =
        `
        <div class="box">
            <div class="box-inner">
                <h1>Loading
                <i class="fa-solid fa-circle fa-bounce"></i>
                <i class="fa-solid fa-circle fa-bounce"></i>
                <i class="fa-solid fa-circle fa-bounce"></i>
                </h1>
            </div>
        </div>`;

        $(".flex-container").append(loadingMessage);
        $(".box").hide();
        $(".box").fadeIn("slow");

        let promises = [];

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
                promises.push(loadArtwork(pair));
            } 
        }
        if (cardsTemp.length > 0) {
            let remainder = [cardsTemp[0]];
            promises.push(loadArtwork(remainder));
        }

        Promise.all(promises).then(() => {
            $("html").css("cursor", "pointer");
            $(".box").remove();
            resolve();
        });
    });
}

function loadArtwork(pair) {   
    return new Promise((resolve) => {

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
                const iiif = "/full/400,/0/default.jpg";    // change image size

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
                resolve();
            }
        );
    });
}

function showCards(cards) {
    return new Promise((resolve) => {
        cards.forEach((card, index) => {
            setTimeout(() => {
                $(`#${card.id} .flip-card-inner`).addClass("flip");
                playTune(scFlip);

                setTimeout(() => {
                    //$(`#${card.id}`).removeClass("flip");
                    $(`#${card.id} .flip-card-inner`).removeClass("flip");
                    playTune(scFlip);

                    if (index === cards.length - 1) {
                        resolve();
                    }

                }, 1500); 
            }, 2000 * index); 
        });
    });
}

function message(message) {
    let messageToAppend =
        `
        <div class="box">
            <div class="box-inner">
                <h1>${message}</h1>
            </div>
        </div>
       `;
    $(".box").append(messageToAppend);
    $(".box").hide();
    $(".box").fadeIn("slow");
    $(".box").on("click", function () {
        $(".box").fadeOut(300, function () { $(this).remove(); });
    });
}

function playTune(tune) {
    $("#soundtrack").prop("volume", 0.2);
    tune.play();
    tune.onended = function () {
        $("#soundtrack").prop("volume", "0.5");
    };
} 

function playerMove() {
    $(".flip-card").on("click", function () {
        $(this).children(".flip-card-inner").addClass("flip");
        
        let clickedCard = cards.find(card => card.id === this.id);   // fixed issue with flipped cards counting again as choices

        if (player.choice1 === "" && clickedCard.won === false) {
            playTune(scSelect);
            player.choice1 = this.id;
        } else if (player.choice2 === "" && clickedCard.won === false) {
            player.choice2 = this.id;
        }
        if (player.choice1 !== "" && player.choice2 !== "") {
            checkPair(player.choice1, player.choice2);
            gameStatus();
        }
    });
}

function checkPair(choice1, choice2) {
    choice1 = cards.find(card => card.id === player.choice1);
    choice2 = cards.find(card => card.id === player.choice2);

    if (choice1.img === choice2.img) {
        playTune(scCorrect);

        choice1.won = true;
        choice2.won = true;

        let correctPair = 
        `
        <div class="box">
            <div class="box-inner">
                <h1>${choice1.title}</h1>
                <div class="details">
                    <p>${choice1.artist}</p>
                    <p>${choice1.date}</p>
                </div>
                <img src="${choice1.img}" alt="image of ${choice1.title}">
                <h2>+100</h2>
            </div>
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

    } else {
        playTune(scWrong);
        setTimeout(function () { 
            for (item of cards) {
                if (!item.won) {
                    $(`#${item.id}`).children(".flip-card-inner").removeClass("flip")
                }
            }
         }, 1000);
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
            playTune(scGameOver);
            message("Game Over");
            $(".box").append(`<h2>Score: ${player.score}</h2>`);
            $(".box").append(`<p class="message">Press to start a new game!</>`);

            $(window).on("click", startGame);
            // add score to leaderboard
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
    } else {
        game.cardCount = 9;
    }

    createCards();

}


$("#start-game").on("click", function() {
    playTune(scSelect);
    startGame();
});   // press start to begin game


$(".sound-toggler-inner").on("click", function () {
    if ($("#soundtrack").prop("muted")) {
        $("#soundtrack").prop("muted", false);
    } else {
        $("#soundtrack").prop("muted", true);
    }
})


function startGame() {
    $("#start-game").addClass("no-display");
    $("#soundtrack").trigger('play');
    $("#soundtrack").prop("volume", 0.2);

    game.level = 1;
    cards = [];

    player.score = 0;
    player.lives = 3;
    player.win = 0;
    player.choice1 = "";
    player.choice2 = "";

    $("#lives p").show();

    $("#game").css("opacity", "1");
    startLevel();
}