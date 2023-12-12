const bar = document.querySelector(".bar");

setTimeout(() => {
    bar.style.setProperty("--progress", "75%");
}, 500);


//bar.style.setProperty("display", "block")