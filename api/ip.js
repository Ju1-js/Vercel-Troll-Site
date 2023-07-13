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
        <audio id="intro-clip" autoplay style="display: none" preload="auto">
          <source src="../audio/ftlq-intro.mp3" type="audio/mpeg">
        </audio>
        <audio id="main-loop" loop muted autoplay style="display: none" preload="auto">
          <source src="../audio/ftlq-loop.mp3" type="audio/mpeg">
        </audio>
        <script>
          const introClip = document.getElementById('intro-clip');
          const mainLoop = document.getElementById('main-loop');
          introClip.addEventListener('ended', function() {
            introClip.parentNode.removeChild(introClip);
            mainLoop.currentTime = 0;
            mainLoop.muted = false;
            mainLoop.play();
          });
          const overlay = document.getElementById('click-overlay');
          const hideOverlay = function() {
            document.removeEventListener('click', hideOverlay);
            document.removeEventListener('keydown', hideOverlay);
            overlay.style.display = 'none';
            introClip.play();
          };
          document.addEventListener('click', hideOverlay);
          document.addEventListener('keydown', hideOverlay);
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
