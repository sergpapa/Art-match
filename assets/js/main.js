//    ------------- Global ---------------

let game = {
    "level": 1,
    "cardCount": 9,
    "round": false,
}

let cards = [];

let player = {
    "score": 0,
    "choice1": "",  // id of clicked card
    "choice2": "",
    "lives": 3,
    "win": 0
}


//    ------------- Music ---------------

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
scSoundtrack.src = "assets/tunes/glossy-Coma-Media.mp3";  // soundtrack from https://pixabay.com/music/
scSoundtrack.preload = 'auto';
scSoundtrack.loop = true;
scSoundtrack.volume = 0.2;

function playTune(tune) {
    if ($("#soundtrack").prop("muted") === false) {
        $("#soundtrack").prop("volume", 0.2);
        tune.play();
    }
} 

//    ------------- Game funcitons ---------------

function createCards() {
    $("#game").html("");

    let loadingMessage =
    `
    <div class="box loading">
        <div class="box-inner">
            <h1>Loading <br>
            <i class="fa-solid fa-circle fa-bounce"></i>
            <i class="fa-solid fa-circle fa-bounce" style="--fa-animation-delay: 250ms;"></i>
            <i class="fa-solid fa-circle fa-bounce" style="--fa-animation-delay: 500ms;"></i>
            </h1>
        </div>
    </div>`;

    $(".flex-container").append(loadingMessage);
    $(".box").hide();
    $(".box").fadeIn("slow");

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

    if (screen.width < 825 && game.level > 4) {
        $("#card-15").addClass("small-screen");    // move last card to the middle if screen size is small
    }

    createPairs(cards).then(() => {
        console.log('done');
        showCards(cards).then(() => message("<h1>Begin!</h1>")).then(() => playerMove());
    });
}

function createPairs(cards) {
    return new Promise((resolve) => {
        let cardsTemp = [...cards];
        let numOfPairs = Math.floor(cards.length / 2);

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
                console.log(pair[0].id, pair[1].id); // console.log pairs
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
                ${message}
            </div>
        </div>
       `;
    $(".flex-container").append(messageToAppend);
    $(".box").hide();
    $(".box").fadeIn("slow");
    $(".box").on("click", function () {
        playTune(scSelect);
        $(".box").fadeOut(300, function () { $(this).remove(); });
    });
}

function playerMove() {
    game.round = true;

    $(".flip-card").on("click", function () {
        $(this).children(".flip-card-inner").addClass("flip");

        let clickedCard = cards.find(card => card.id === this.id);   // fixed issue with flipped cards counting again as choices

        if (player.choice1 === "" && clickedCard.won === false) {
            playTune(scSelect);
            player.choice1 = this.id;
        } else if (player.choice2 === "" && clickedCard.won === false && player.choice1 !== clickedCard.id) {
            player.choice2 = this.id;
        }

        if (player.choice1 !== "" && player.choice2 !== "") {
            checkPair(player.choice1, player.choice2);
        }
    });
}

function checkPair(choice1, choice2) {
    choice1 = cards.find(card => card.id === player.choice1);
    choice2 = cards.find(card => card.id === player.choice2);

    if (choice1.img === choice2.img) {
        game.round = false;

        playTune(scCorrect);

        choice1.won = true;
        choice2.won = true;

        let correctPair = 
        `
        <h1>${choice1.title}</h1>
        <div class="details">
            <p>${choice1.artist}</p>
            <p>${choice1.date}</p>
        </div>
        <img src="${choice1.img}" alt="image of ${choice1.title}">
        <h2>+100</h2>
        `
        message(correctPair);

        player.score += 100;
        player.win ++;
        showScore();
        gameStatus();    // it is here now

    } else {
        game.round = false;

        playTune(scWrong);

        setTimeout(function () { 
            for (item of cards) {
                if (!item.won) {
                    $(`#${item.id}`).children(".flip-card-inner").removeClass("flip");
                }
            }
         }, 1000);
        player.lives = player.lives - 1;
        $(`#life-${player.lives}`).hide("slow");
        gameStatus();  // aaaaand here

        game.round = true; // should I put it her or inside the setTimout?
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

function addToLeaderboard() {
    let name = $("#name").val();
    let score = player.score;

    let leaderboardTable = $("#leaderboard");

    let insertIndex = -1;
    leaderboardTable.find('tr').each(function (index, row) {
        let existingScore = parseInt($(row).find('td:eq(1)').text(), 10);
        if (score > existingScore) {
            insertIndex = index;
            return false;
        }
    });

    let newRow = `
        <tr>
            <td>${name}</td>
            <td>${score}</td>
        </tr>
    `;

    if (insertIndex !== -1) {
        leaderboardTable.find('tr').eq(insertIndex).before(newRow);
    } else {
        leaderboardTable.append(newRow);
    }
}

function gameStatus() {
    if (player.lives <= 0) {
        game.round = false;

        setTimeout(function () {

            playTune(scGameOver);

            let gameOverMessage =
            `
            <div class="box">
                <div class="box-inner">
                <h1>Game Over</h1>
                <h2>Score: ${player.score}</h2>
                <form>
                    <label for="name">First name:</label>
                    <input type="text" id="name" name="name" required>
                    <button id="start-new-game" >Start New Game</button>
                </form>
                </div>
            </div>`
            
            $(".flex-container").append(gameOverMessage);
            $(".box").hide();
            $(".box").fadeIn("slow");

            $("form").on("click", function () {
                if ($("#name").val() !== "") {
                    console.log($("#name").val())  // check the input value
                    $(".box").remove();
                    startGame();
                    };
                }
            );

            addToLeaderboard();  // LeaderBoard
        }, 500); 

    } else if (player.win >= Math.floor(game.cardCount/2)) {
        $(".box").on("click", function() {
            setTimeout(function () {
                message("<h1>You won the level</h1>");
                // https://stackoverflow.com/questions/1807187/how-to-remove-an-element-slowly-with-jquery
                game.level ++;
                showLevel();
                cards = [];
                player.win = 0;
                $(".box").on("click", startLevel);
            }, 500); 
        })  
    }
}

function startLevel() {

    if (game.level > 2 && game.level < 5) {
        game.cardCount = 12;
        if (screen.width > 825){
            $(".grid-container").css("grid-template-columns", "auto auto auto auto");
        }
    } else if (game.level > 4) {
        game.cardCount = 16;
        if (screen.width > 825){
            $(".grid-container").css("grid-template-columns", "auto auto auto auto");
        }
    } else {
        game.cardCount = 9;
    }

    createCards();
}

//    ------------- Always Active ---------------

$("#start-game").on("click", function() {
    playTune(scSelect);
    startGame();
});   // press start to begin game


$(".sound-toggler-inner").on("click", function () {
    $(".sound-off").toggleClass("no-display");
    $(".sound-on").toggleClass("no-display");
    
    if ($("#soundtrack").prop("muted")) {
        $("#soundtrack").prop("muted", false);
    } else {
        $("#soundtrack").prop("muted", true);
    }
})

//    ------------- Start ---------------

function startGame() {
    $("#start-game").addClass("no-display");
    $("#soundtrack").trigger('play');
    $("#soundtrack").prop("volume", 0.2);

    $("meta[name='viewport']").attr('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');

    game.level = 1;
    cards = [];

    player.score = 0;
    player.lives = 3;
    player.win = 0;
    player.choice1 = "";
    player.choice2 = "";

    $("#lives p").show();

    $("#game").css("opacity", "1");
    showScore();
    showLevel();
    startLevel();

    $("html").css("cursor", "wait");
    
    console.log("Here is your score: ", player.score);
}