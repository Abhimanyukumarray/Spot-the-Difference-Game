const jsonConfig = {
    "gameTitle": "Spot the Difference - Animals",
    "images": {
      "image1": "./img/animal1.jpg",
      "image2": "./img/animal2.jpg"
    },
    "differences": [
      { "x": 100, "y": 200, "width": 50, "height": 50 },
      { "x": 300, "y": 150, "width": 40, "height": 40 },
      { "x": 500, "y": 300, "width": 30, "height": 30 }
    ]
  };
  
  const image1 = document.getElementById("image1");
  const image2 = document.getElementById("image2");
  const wrapper1 = document.getElementById("image1-wrapper");
  const wrapper2 = document.getElementById("image2-wrapper");
  const scoreElement = document.getElementById("score");
  const messageElement = document.getElementById("message");
  const timerElement = document.getElementById("timer");
  const titleElement = document.getElementById("game-title");
  
  let foundDifferences = [];
  let startTime;
  let timerInterval;
  
  const TIME_LIMIT = 30; 
  
  function updateTimer() {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const timeLeft = TIME_LIMIT - elapsed;
    timerElement.textContent = timeLeft;
  
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      evaluateGameResult();
    }
  }
  
  function evaluateGameResult() {
    if (foundDifferences.length >= 3) {
      messageElement.textContent = `Winner!.`;
    } else {
      messageElement.textContent = `Looser! No differences found.`;
    }
  }
  
  function loadGame(config) {
    titleElement.textContent = config.gameTitle;
    image1.src = config.images.image1;
    image2.src = config.images.image2;
  
    foundDifferences = [];
    scoreElement.textContent = 0;
    messageElement.textContent = "";
    startTime = Date.now();
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
  
    document.querySelectorAll(".marker").forEach(m => m.remove());
  
    [wrapper1, wrapper2].forEach(wrapper => {
      wrapper.onclick = e => {
        const rect = wrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        checkDifference(x, y, wrapper);
      };
    });
  }
  
  function checkDifference(x, y, wrapper) {
    const img = wrapper.querySelector("img");
    const scaleX = img.naturalWidth / wrapper.offsetWidth;
    const scaleY = img.naturalHeight / wrapper.offsetHeight;
    const adjustedX = x * scaleX;
    const adjustedY = y * scaleY;
  
    jsonConfig.differences.forEach((diff, index) => {
      if (foundDifferences.includes(index)) return;
      if (
        adjustedX >= diff.x && adjustedX <= diff.x + diff.width &&
        adjustedY >= diff.y && adjustedY <= diff.y + diff.height
      ) {
        foundDifferences.push(index);
        addMarker(wrapper1, diff);
        addMarker(wrapper2, diff);
        scoreElement.textContent = foundDifferences.length;

        if (foundDifferences.length === 3) {
          clearInterval(timerInterval);
          messageElement.textContent = `Winner!`;  
        }
      }
    });
  }
  
  function addMarker(wrapper, diff) {
    const marker = document.createElement("div");
    marker.classList.add("marker");
    const scaleX = wrapper.offsetWidth / wrapper.querySelector("img").naturalWidth;
    const scaleY = wrapper.offsetHeight / wrapper.querySelector("img").naturalHeight;
    marker.style.left = `${diff.x * scaleX}px`;
    marker.style.top = `${diff.y * scaleY}px`;
    marker.style.width = `${diff.width * scaleX}px`;
    marker.style.height = `${diff.height * scaleY}px`;
    wrapper.appendChild(marker);
  }
  
  loadGame(jsonConfig);
  
  