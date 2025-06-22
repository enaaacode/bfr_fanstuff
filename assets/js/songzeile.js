function pickSong(songliste) {
  // Erstelle ein neues Date-Objekt mit dem aktuellen Datum und der aktuellen Uhrzeit
  const heute = new Date();

  // Erstelle ein neues Date-Objekt für den 0. Januar des aktuellen Jahres (das ist der Tag vor dem 1. Januar)
  const jahresbeginn = new Date(heute.getFullYear(), 0, 0);

  // Berechne die Differenz in Millisekunden zwischen heute und Jahresbeginn
  const differenz = heute - jahresbeginn;

  // Wandle die Differenz von Millisekunden in Tage um
  // 1000 Millisekunden = 1 Sekunde
  // 60 Sekunden = 1 Minute
  // 60 Minuten = 1 Stunde
  // 24 Stunden = 1 Tag
  const tagDesJahres = Math.floor(differenz / 1000 / 60 / 60 / 24);

  // Berechne den Index für die Songliste, indem du den Tag des Jahres durch die Anzahl der Songs teilst
  // und den Rest nimmst (so bleibt der Index immer im gültigen Bereich)
  const index = tagDesJahres % songliste.length;

  // Hole das Song-Objekt an der berechneten Stelle aus der Songliste
  return songliste[index];
}

function placeSongInHtml(song) {
  // Setze den Text der Songzeile in das Element mit der ID 'songzeile-text'
  document.getElementById("songzeile-text").textContent = song.text;

  // Setze den Link des Songs in das Element mit der ID 'songzeile-link'
  document.getElementById("songzeile-link").href = song.url;

  // Setze den Titel des Songs in das Element mit der ID 'songzeile-title'
  document.getElementById("songzeile-title").textContent = song.title;
}

// Lade die Datei 'songs.json' vom Server
fetch("/songs.json")
  // Wenn die Antwort vom Server kommt, wandle sie in ein JavaScript-Objekt um (JSON parsen)
  .then(function (response) {
    return response.json();
  })
  // Wenn das Parsen erfolgreich war, arbeite mit der Songliste
  .then(pickSong)

  .then(placeSongInHtml);
