// script.js


function searchSong() {
    const searchInput = document.getElementById("search-field").value.toLowerCase();
    const container = document.getElementById("song-container");

    // Limpiar resultados previos
    container.innerHTML = "";

    if (!searchInput) {
        container.innerHTML = "<p class='text-white'>Por favor digita un nombre de artista.</p>";
        return;
    }

    const script = document.createElement('script');
    script.src = `https://api.deezer.com/search?q=${encodeURIComponent(searchInput)}&output=jsonp&callback=handleDeezerResponse`;
    document.body.appendChild(script);
}

function handleDeezerResponse(response) {
    const container = document.getElementById("song-container");

    if (response.data.length === 0) {
        container.innerHTML = "<p class='text-white'>No se encontraron canciones para ese artista.</p>";
        return;
    }

    response.data.slice(0, 10).forEach(song => {
        const songElement = document.createElement("div");
        songElement.className = "card mb-3 bg-dark text-white";
        songElement.innerHTML = `
            <div class="row g-0">
                <div class="col-md-2">
                    <img src="${song.album.cover_small}" class="img-fluid rounded-start" alt="cover">
                </div>
                <div class="col-md-10">
                    <div class="card-body">
                        <h5 class="card-title">${song.title}</h5>
                        <p class="card-text">Artista: ${song.artist.name}</p>
                        <button class="btn btn-outline-light" onclick="playSong('${song.preview}', '${song.title}')">Reproducir</button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(songElement);
    });
}

// Reproductor
function playSong(url, songTitle) {
    const audioPlayer = document.getElementById("audio-player");
    const currentSongTitle = document.getElementById("current-song-title");

    // Cambiar el título de la canción que se está reproduciendo
    currentSongTitle.textContent = `Reproduciendo: ${songTitle}`;

    // Reproducir la vista previa
    audioPlayer.src = url;
    audioPlayer.play();
}
