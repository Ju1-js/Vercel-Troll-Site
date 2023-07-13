module.exports = (req, res) => {
  const ip = req.headers["x-real-ip"] || req.connection.remoteAddress;
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Calculator</title>
        <style>
          body {
            background: url('../img/skull.gif') repeat;
          }
          #overlay {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
            padding: 20px;
            font-size: 20px;
          }
          #audio-player {
            display: none;
          }
        </style>
      </head>
      <body>
        <audio id="audio-player" autoplay loop>
          <source id="intro-clip" src="../audio/ftlq-intro.mp3" type="audio/mpeg">
          <source id="main-loop" src="../audio/ftlq-loop.mp3" type="audio/mpeg">
        </audio>
        <script>
          const audioPlayer = document.getElementById('audio-player');
          const introClip = document.getElementById('intro-clip');
          const mainLoop = document.getElementById('main-loop');

          introClip.addEventListener('canplaythrough', function() {
            audioPlayer.play();
          });

          audioPlayer.addEventListener('ended', function() {
            audioPlayer.src = mainLoop.src;
          });

        </script>
        <div id="overlay">
          Calculated your IP: ${ip} <br>
          (Didn't log your IP if you're concerned about that)
        </div>
      </body>
    </html>
  `;

  res.setHeader("Content-Type", "text/html");
  res.status(200).send(html);
};
