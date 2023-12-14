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
    for (card of cards) {
        levelLayout = levelLayout + card.code;
    }
    $("#game").html(levelLayout);
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
            <h1>Stary Night</h1>
            <div class="details">
                <p>Artist</p>
                <p>Year</p>
            </div>
            <div class="img"></div>
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
    if (player.lives < 0) {
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
    showCards(cards).then(() => beginMessage()).then(() => playerMove());
}

$("#start-game").on("click", startGame);

function startGame() {
    $("#start-game").addClass("no-display");
    $("#game").css("opacity", "1");
    startLevel();
}


