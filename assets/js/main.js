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
    "lives": 3
}

function createCards() {
    for (let i = 0; i < game.cardCount; i++) {
        let card = {};
        card.id = `card-${i}`;
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
        }

    });
}

function checkPair(choice1, choice2) {
    choice1 = cards.find(card => card.id === player.choice1);
    choice2 = cards.find(card => card.id === player.choice1);

    if (choice1.img === choice2.img) {
        player.score += 100;
        showScore();
        cards.splice(choice1, 1);
        cards.splice(choice2, 1);
    } else {
        $(".flip-card", ".flip-card-inner").removeClass("flip");
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

$("#start-game").on("click", startGame);

function startGame() {
    $("#start-game").addClass("no-display");
    $("#game").css("opacity", "1");
    createCards();
    showCards(cards).then(() => playerMove());
}
