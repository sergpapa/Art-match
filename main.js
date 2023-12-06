function fetchImageData() {
    $("#data").html("");

    $.when(
        $.getJSON(`https://api.artic.edu/api/v1/artworks/129884`),
    ).then(
        function (response) {
            var artwork = response;
            const iiif = "/full/843,/0/default.jpg"

            console.log(artwork.data.id);
            console.log(artwork.config.iiif_url);
            console.log(artwork.data.image_id);

            $("#data").html(`<img src="${artwork.config.iiif_url}/${artwork.data.image_id}${iiif}">`)
    
            console.log(artwork.config.iiif_url + "/" + artwork.data.image_id + iiif)
        }
    )
};

fetchImageData();