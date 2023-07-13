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
          });
          const switchTracks = function() {
            mainLoop.currentTime = 0;
            mainLoop.muted = false;
            mainLoop.play();
            crossfade(0.7);
          }
          const crossfade = function(duration) {
            var x = 0;
            var interval = 10; // Interval in milliseconds
            var steps = duration * 1000 / interval;
            var step = 1 / steps;
            
            var currentStep = 0;
            var timer = setInterval(function() {
              x += step;
              currentStep++;
              if (currentStep >= steps) {
                clearInterval(timer);
                x = 1;
              }
              var introVol = Math.cos(x * 0.5*Math.PI);
              var mainVol = Math.cos((1.0 - x) * 0.5*Math.PI);
              introClip.volume = introVol;
              mainLoop.volume = mainVol;
            }, interval);
          }
          introClip.addEventListener('timeupdate', function(){
              var buffer = .75
              if(this.currentTime > this.duration - buffer){
                introClip.removeEventListener('timeupdate', arguments.callee);  
                switchTracks();
              }
          });
          mainLoop.addEventListener('timeupdate', function(){
            var buffer = .75
            if(this.currentTime > this.duration - buffer){
                this.currentTime = 0
                this.play()
            }
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
