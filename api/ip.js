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
          audio, embed {
            position: absolute;
            z-index: -9999;
          }
        </style>
      </head>
      <body>
        <audio id="audio-player" autoplay>
          <source id="intro-clip" src="../audio/ftlq-intro.mp3" type="audio/mpeg">
          <source id="main-loop" src="../audio/ftlq-loop.mp3" type="audio/mpeg">
        </audio>
        <script>

          let audioPlaying = true, backgroundAudio, browser;
          browser = navigator.userAgent.toLowerCase();
          $('<audio class="audio1" src="../audio/ftlq-loop.mp3" loop></audio>').prependTo('body');
          if (!browser.indexOf('firefox') > -1) {
              $('<embed id="background-audio" src="../audio/ftlq-loop.mp3" autostart="1"></embed>').prependTo('body');
              backgroundAudio = setInterval(function() {
                  $("#background-audio").remove();
                  $('<embed id="background-audio" src="../audio/ftlq-loop.mp3"></embed>').prependTo('body');
              }, 120000); // 120000 is the duration of your audio which in this case 2 mins.
          }


          const audioPlayer = document.getElementById('audio-player');
          const introClip = document.getElementById('intro-clip');
          const mainLoop = document.getElementById('main-loop');

          introClip.addEventListener('canplaythrough', function() {
            audioPlayer.play();
          });

          audioPlayer.addEventListener('ended', function() {
            audioPlayer.src = mainLoop.src;
            audioPlayer.loop = true;
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
