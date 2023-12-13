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

$("#start-game").on("click", startGame);

function startGame() {
    $("#start-game").addClass("no-display");
    $("#game").css("opacity", "1");
    createCards();
}
