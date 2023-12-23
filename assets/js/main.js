//    ------------- Global ---------------

let game = {
    "level": 1,
    "cardCount": 9,
    "round": false
};

let cards = [];

let player = {
    "score": 0,
    "choice1": "",  // id of clicked card
    "choice2": "",
    "lives": 3,
    "win": 0
};


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

//    ------------- Cards Database ---------------

let potentialCards = [
    {
        "id": "",
        "title": "Foliage—Oak Tree and Fruit Seller",
        "artist": "Édouard Jean Vuillard",
        "date": "1918",
        "img": "https://www.artic.edu/iiif/2/e170725f-cc12-cb0f-841e-8b1ea918933e/full/400,/0/default.jpg",
        "code": "",
        "won": false
    },
    {
        "id": "",
        "title": "Design for Printed Textile",
        "artist": "Fredrica Justina Staack",
        "date": "1934",
        "img": "https://www.artic.edu/iiif/2/90b3ed63-d5a0-fd99-86b6-a3e9cf73708e/full/400,/0/default.jpg",
        "code": "",
        "won": false
    },
    {
        "id": "",
        "title": "Martha's Vineyard 8",
        "artist": "Aaron Siskind",
        "date": "1947",
        "img": "https://www.artic.edu/iiif/2/049a1323-f24c-fa36-d197-bccee45cee87/full/400,/0/default.jpg",
        "code": "",
        "won": false
    },
    {
        "id": "",
        "title": "The Shepherd",
        "artist": "Paulus Potter",
        "date": "1649",
        "img": "https://www.artic.edu/iiif/2/ccf10c35-ea59-995b-28d8-5026d2c0c1f8/full/400,/0/default.jpg",
        "code": "",
        "won": false
    },
    {
        "id": "",
        "title": "The Courtesans Somenosuke and Kisegawa of the Matsubaya",
        "artist": "Kitagawa Utamaro",
        "date": "1802",
        "img": "https://www.artic.edu/iiif/2/a030ffdc-c542-786f-af11-7379854892ac/full/400,/0/default.jpg",
        "code": "",
        "won": false
    },
    {
        "id": "",
        "title": "Lid with Lion-Dog, probably for Incense Burner",
        "artist": "Unknown",
        "date": "1199",
        "img": "https://www.artic.edu/iiif/2/2839ccc3-8fbb-73d4-54fc-4fe640b4da3e/full/400,/0/default.jpg",
        "code": "",
        "won": false
    },
    {
        "id": "",
        "title": "The Bodhisattva Seishi, from the triptych Approach of the Amida Trinity",
        "artist": "Unknown",
        "date": "1300",
        "img": "https://www.artic.edu/iiif/2/c0ef0433-aada-9f5a-713f-7c61333c4d06/full/400,/0/default.jpg",
        "code": "",
        "won": false
    },
    {
        "id": "",
        "title": "Drunkenness of Noah",
        "artist": "Michelangelo Buonarroti",
        "date": "1599",
        "img": "https://www.artic.edu/iiif/2/0b31dfb0-34e8-4985-a91f-cf5abfa2fbbd/full/400,/0/default.jpg",
        "code": "",
        "won": false
    },
    {
        "id": "",
        "title": "Cattle and Sheep with Herdsman in Rocky Landscape",
        "artist": "Johann Heinrich Roos",
        "date": "1685",
        "img": "https://www.artic.edu/iiif/2/ba70d605-a3df-cd65-8003-6c2adea38b8c/full/400,/0/default.jpg",
        "code": "",
        "won": false
    },
    {
        "id": "",
        "title": "#126, Tokyo",
        "artist": "Yasuhiro Ishimoto",
        "date": "1969",
        "img": "https://www.artic.edu/iiif/2/be5ebd9c-5223-8970-4d2e-a51562461925/full/400,/0/default.jpg",
        "code": "",
        "won": false
    },
    {
        "id": "",
        "title": "Lobster Pots - Selsea Bill",
        "artist": "James McNeill Whistler",
        "date": "1881",
        "img": "https://www.artic.edu/iiif/2/11262c19-1238-cc6f-9888-d55e75d944c4/full/400,/0/default.jpg",
        "code": "",
        "won": false
    },
    {
        "id": "",
        "title": "Ogden Ridge from Sherlock Valley",
        "artist": "Edward C. Porter",
        "date": "1964",
        "img": "https://www.artic.edu/iiif/2/d39a7f76-9e15-d963-9711-ba516086df60/full/400,/0/default.jpg",
        "code": "",
        "won": false
    },
    {
        "id": "",
        "title": "Maxima Egestas Est Avaritia, Design for a footed dish",
        "artist": "Johann Theodor de Bry",
        "date": "1588",
        "img": "https://www.artic.edu/iiif/2/b2553bc9-290a-d0e7-7175-af9943171a0d/full/400,/0/default.jpg",
        "code": "",
        "won": false
    },
    {
        "id": "",
        "title": "Plum Trees and Pheasants (Furnishing Fabric)",
        "artist": "Bannister Hall Print Works",
        "date": "1850",
        "img": "https://www.artic.edu/iiif/2/c431191d-376a-7bb9-9d9d-f70cc007b780/full/400,/0/default.jpg",
        "code": "",
        "won": false
    },
    {
        "id": "",
        "title": "Te atua (The God), from the Suite of Late Wood-Block Prints",
        "artist": "Paul Gauguin",
        "date": "1899",
        "img": "https://www.artic.edu/iiif/2/1a265610-6b2f-e16f-9174-7124564a839e/full/400,/0/default.jpg",
        "code": "",
        "won": false
    },
    {
        "id": "",
        "title": "Bust of Shakespeare",
        "artist": "Wedgwood Manufactory",
        "date": "1799",
        "img": "https://www.artic.edu/iiif/2/981d2bea-5113-05bf-c28e-212e06c178a5/full/400,/0/default.jpg",
        "code": "",
        "won": false
    },
    {
        "id": "",
        "title": "Christ Presented to the People: Oblong Plate",
        "artist": "Rembrandt van Rijn",
        "date": "1655",
        "img": "https://www.artic.edu/iiif/2/42e4a905-7ad0-ab08-0c43-27af3b23c9d0/full/400,/0/default.jpg",
        "code": "",
        "won": false
    },
    {
        "id": "",
        "title": "Untitled",
        "artist": "Ralph Eugene Meatyard",
        "date": "1960",
        "img": "https://www.artic.edu/iiif/2/b2969aae-23ac-3d52-ed06-1d3c0345d891/full/400,/0/default.jpg",
        "code": "",
        "won": false
    },
    {
        "id": "",
        "title": "Standing Male Figure (Mankishi)",
        "artist": "Songye",
        "date": "1925",
        "img": "https://www.artic.edu/iiif/2/83bdab6c-cf6b-1f13-05e5-2cbd98431bdd/full/400,/0/default.jpg",
        "code": "",
        "won": false
    },
    {
        "id": "",
        "title": "Art Institute of Chicago Competition, First Floor Plan",
        "artist": "Studio of Paul Philippe Cret",
        "date": "1934",
        "img": "https://www.artic.edu/iiif/2/e23672eb-5e41-2eac-60c1-cd683341962e/full/400,/0/default.jpg",
        "code": "",
        "won": false
    },
    {
        "id": "",
        "title": "Pair of Pine Tree Shillings",
        "artist": "John Hull",
        "date": "1682",
        "img": "https://www.artic.edu/iiif/2/f05859c8-c54d-af98-7cfd-5a6d82b228b6/full/400,/0/default.jpg",
        "code": "",
        "won": false
    },
    {
        "id": "",
        "title": "Protest Surrounding the Construction of Narita Airport",
        "artist": "Unknown",
        "date": "1978",
        "img": "https://www.artic.edu/iiif/2/113e922b-f5d6-d0c0-00a0-cb54c7b1bc22/full/400,/0/default.jpg",
        "code": "",
        "won": false
    },
    {
        "id": "",
        "title": "Louis Hesselin",
        "artist": "Robert Nanteuil",
        "date": "1658",
        "img": "https://www.artic.edu/iiif/2/acb980aa-a3c4-0cd1-e5ce-3c1e0ffd1b96/full/400,/0/default.jpg",
        "code": "",
        "won": false
    },
    {
        "id": "",
        "title": "The Late Mrs. Morris",
        "artist": "David Claypoole Johnston",
        "date": "1828",
        "img": "https://www.artic.edu/iiif/2/e12c60a6-a708-bfd2-c4dc-7e1f5d22795d/full/400,/0/default.jpg",
        "code": "",
        "won": false
    },
    {
        "id": "",
        "title": "The Black Mill, Winchelsea",
        "artist": "Frank Brangwyn",
        "date": "1908",
        "img": "https://www.artic.edu/iiif/2/dd36470d-b96f-0d78-8869-ab2e765799f5/full/400,/0/default.jpg",
        "code": "",
        "won": false
    },
    {
        "id": "",
        "title": "Design for a Chimney Piece",
        "artist": "Unknown Italian",
        "date": "1799",
        "img": "https://www.artic.edu/iiif/2/dcbb9f7d-8d12-ae01-6bca-896aba419bc7/full/400,/0/default.jpg",
        "code": "",
        "won": false
    },
    {
        "id": "",
        "title": "Bamboo Wood",
        "artist": "Yoshida Hiroshi",
        "date": "1939",
        "img": "https://www.artic.edu/iiif/2/a67f77e4-7b87-1fbf-4c41-5ac73a92e600/full/400,/0/default.jpg",
        "code": "",
        "won": false
    },
    {
        "id": "",
        "title": "Hermes, plate 48 from Drawings for The Iliad",
        "artist": "Meriden Gravure Company",
        "date": "1962",
        "img": "https://www.artic.edu/iiif/2/a535c9c9-d85c-4cd5-641f-d1e997b94b49/full/400,/0/default.jpg",
        "code": "",
        "won": false
    },
    {
        "id": "",
        "title": "Shin Bridge, Nikko (Nikko Shinkyo)",
        "artist": "Kawase Hasui",
        "date": "1953",
        "img": "https://www.artic.edu/iiif/2/735e1ce9-72a1-9bb9-b894-afa131c835f5/full/400,/0/default.jpg",
        "code": "",
        "won": false
    },
    {
        "id": "",
        "title": "Pair of Mitten Gauntlets",
        "artist": "Unknown",
        "date": "1900",
        "img": "https://www.artic.edu/iiif/2/561814c4-4618-8449-a079-6465207298ab/full/400,/0/default.jpg",
        "code": "",
        "won": false
    }];

let mix = shuffle([...potentialCards]);

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
        cards.push(card);
    }

    let levelLayout = "";
    for (var item of cards) {
        levelLayout = levelLayout + item.code;
    }
    $("#game").html(levelLayout);

    if (screen.width < 825 && game.level > 4) {
        $("#card-15").addClass("small-screen");    // move last card to the middle if screen size is small
    }

    createPairs(cards).then(() => {
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

            for (var currentPair of pairs) {
                // console.log pairs: console.log(currentPair[0].id, currentPair[1].id);
                promises.push(loadArtwork(currentPair));
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

function shuffle(array) {       // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function loadArtwork(pair) {
    return new Promise((resolve) => {
        let randomArt = mix[0];

        $(`#${pair[0].id} .flip-card-back`).html("");
        if (pair.length > 1) {
            $(`#${pair[1].id} .flip-card-back`).html("");
        }

        pair[0].img = randomArt.img;

        $(`#${pair[0].id} .flip-card-back`).html(`<img src="${pair[0].img}" alt="${pair[0].title} by ${pair[0].artist}">`);
        pair[0].title = randomArt.title;
        pair[0].artist = randomArt.artist;
        pair[0].date = randomArt.date;

        if (pair.length > 1) {
            pair[1].img = randomArt.img;
            $(`#${pair[1].id} .flip-card-back`).html(`<img src="${pair[1].img}" alt="${pair[1].title} by ${pair[1].artist}">`);
            pair[1].title = randomArt.title;
            pair[1].artist = randomArt.artist;
            pair[1].date = randomArt.date;
        }

        mix.shift();
        resolve();
    }
    );
}

function showCards(cards) {
    return new Promise((resolve) => {
        setTimeout(() => {
            cards.forEach((card, index) => {
                setTimeout(() => {
                    $(`#${card.id} .flip-card-inner`).addClass("flip");
                    playTune(scFlip);

                    setTimeout(() => {

                        $(`#${card.id} .flip-card-inner`).removeClass("flip");
                        playTune(scFlip);

                        if (index === cards.length - 1) {
                            resolve();
                        }

                    }, 1500);
                }, 2000 * index);
            });
        }, 500);
    });
}

function message(message) {
    game.round = false;
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
        $(".box").fadeOut(300, function () { $(this).remove(); }); // https://stackoverflow.com/questions/1807187/how-to-remove-an-element-slowly-with-jquery
        game.round = true;
    });
}

function playerMove() {
    $(".box").on("click", () => game.round = true);

    $(".flip-card").on("click", function () {
        if (game.round) {
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
        `;
        message(correctPair);

        player.score += 100;
        player.win++;
        showScore();
        gameStatus();
        $(".box").on("click", () => game.round = true);

    } else {
        game.round = false;
        playTune(scWrong);

        setTimeout(function () {
            for (var item of cards) {
                if (!item.won) {
                    $(`#${item.id}`).children(".flip-card-inner").removeClass("flip");
                    game.round = true;
                }
            }
        }, 1000);
        player.lives = player.lives - 1;
        $(`#life-${player.lives}`).hide("slow");
        gameStatus();

    }

    player.choice1 = "";
    player.choice2 = "";
}

function showScore() {
    $("#score").html(
        `
        <h2>Score:</h2>
        <h2>${player.score}</h2>`
    );
}

function showLevel() {
    $("#level").html(
        `
        <h2>Level:</h2>
        <h2>${game.level}</h2>`
    );
}

function addToLeaderboard() {
    $("#leaderBoard").html("");

    let name = $("#name").val();
    let score = player.score;
    let leaderBoard = [];

    let leaderboardTable = $("#leaderboard");

    localStorage.setItem(name, score);

    for (let i = 1; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let item = {
            name: key,
            score: parseInt(localStorage.getItem(key)) // Parse score as an integer
        };
        leaderBoard.push(item);
    }

    leaderBoard.sort((a, b) => b.score - a.score);

    let rows =
        `
    `;

    leaderBoard.forEach(attempt => {
        let newRow = `
            <tr id="${attempt.name}">
                <td>${attempt.name}</td>
                <td>${attempt.score}</td>
            </tr>
        `;
        rows += newRow;
    });

    leaderboardTable.append(rows);

    //let table = $('#leaderBoard');

    if ($(`#${name}`)) {
        $(`#${name}`).addClass("active-row");
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
                    <button type="button" id="start-new-game">Start New Game</button>
                </form>
                </div>
            </div>`;

            $(".flex-container").append(gameOverMessage);
            $(".box").hide();
            $(".box").fadeIn("slow");

            $("form").on("click", function () {
                if ($("#name").val() !== "") {
                    console.log($("#name").val()); // check the input value
                    let name = $("#name").val();
                    addToLeaderboard(name);
                    $(".box").remove();
                    startGame();
                }
            }
            );
        }, 500);

    } else if (player.win >= Math.floor(game.cardCount / 2)) {
        $(".box").on("click", function () {
            setTimeout(function () {
                message("<h1>You won the level</h1>");
                game.level++;
                showLevel();
                cards = [];
                player.win = 0;
                $(".box").on("click", startLevel);
            }, 500);
        });
    }
}

function startLevel() {

    if (game.level > 2 && game.level < 5) {
        game.cardCount = 12;
        //if (screen.width > 825){
        $(".grid-container").css("grid-template-columns", "auto auto auto auto");
        //}
    } else if (game.level > 4) {
        game.cardCount = 16;
        //if (screen.width > 825){
        $(".grid-container").css("grid-template-columns", "auto auto auto auto");
        //}
    } else {
        game.cardCount = 9;
    }

    windowResize();
    createCards();
}

//    ------------- Always Active ---------------

$("#start-game").on("click", function () {
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
});

$(".sound-toggler-inner").on("click", () =>
    $("#soundtrack").trigger('play').prop("volume", 0.2)
);


//    ------------- Start ---------------

function startGame() {
    $("#start-game").addClass("no-display");

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
}

// ------------------ on Load ------   

document.addEventListener('DOMContentLoaded', function () {
    const currentPage = window.location.pathname.split('/').pop();

    if (currentPage === 'board.html') {
        addToLeaderboard();
    }
});

// ------------------ Screen Resize ------ 

function windowResize() {
    if (window.innerWidth > 823 && game.cardCount > 10) {
        document.getElementById("game").style.gridTemplateColumns = "auto auto auto auto";
    } else {
        document.getElementById("game").style.gridTemplateColumns = "auto auto auto";
    }

    window.addEventListener("resize", () => {
        if (window.innerWidth > 823 && game.cardCount > 10) {
            document.getElementById("game").style.gridTemplateColumns = "auto auto auto auto";
        } else {
            document.getElementById("game").style.gridTemplateColumns = "auto auto auto";
        }
    });
}