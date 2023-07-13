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
          #click-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 1);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            z-index: 9999;
            cursor: pointer;
          }
        </style>
      </head>
      <body>
        <div id="click-overlay">Click for calculator</div>
        <audio id="audio-player" autoplay style="display: none" preload="auto">
          <source id="intro-clip" src="../audio/ftlq-intro.mp3" type="audio/mpeg">
          <source id="main-loop" src="../audio/ftlq-loop.mp3" type="audio/mpeg">
        </audio>
        <script>
          const audioPlayer = document.getElementById('audio-player');
          const introClip = document.getElementById('intro-clip');
          const mainLoop = document.getElementById('main-loop');
          audioPlayer.addEventListener('ended', function() {
            audioPlayer.src = mainLoop.src;
            audioPlayer.loop = true;
          });
          const overlay = document.getElementById('click-overlay');
          overlay.addEventListener('click', function() {
            overlay.style.display = 'none';
            audioPlayer.play();
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
