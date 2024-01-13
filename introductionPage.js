const button = document.querySelector('button');
const distanceBetween = (p1x, p1y, p2x, p2y) => {
  const dx = p1x - p2x;
  const dy = p1y - p2y;
  return Math.sqrt(dx * dx + dy * dy);
};

goodSound = new Audio("https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/goodbell.mp3"),
badSound = new Audio("https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/bad.mp3"),



document.addEventListener('mousemove', (event) => {
  const questionHeading = document.querySelector('.question')
  // .value.toLowerCase();

  const inputValue = document.querySelector('input[name="name"]').value.toLowerCase().trim();
  if (inputValue === "chinu") {
    // window.location.href = 'candles.html';
    goodSound.play();
    window.location.href = 'candles.html';
    return;
  }

  const comparisonString1 = "nikita";
  const comparisonString2 = "niki";
  if (inputValue.includes(comparisonString1.toLowerCase().trim())) {
    questionHeading.textContent = "Are you sure?";
  } 
  else if (inputValue.includes(comparisonString2.toLowerCase().trim()))
  {
    questionHeading.textContent = "Come on!";
  }
  else {
    questionHeading.textContent = "Who is this?";
    document.body.style.cursor = "none";
    // badSound.play();
    
  }


  const radius = Math.max(button.offsetWidth * 0.75, button.offsetHeight * 0.75, 100);

  const bx = button.parentNode.offsetLeft + button.offsetLeft + button.offsetWidth / 2;
  const by = button.parentNode.offsetTop + button.offsetTop + button.offsetHeight / 2;

  const dist = distanceBetween(event.clientX, event.clientY, bx, by) * 2;
  const angle = Math.atan2(event.clientY - by, event.clientX - bx);

  const ox = -1 * Math.cos(angle) * Math.max((radius - dist), 0);
  const oy = -1 * Math.sin(angle) * Math.max((radius - dist), 0);

  const rx = oy / 2;
  const ry = -ox / 2;

  button.style.transition = `all 0.1s ease`;
  button.style.transform = `translate(${ox}px, ${oy}px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  button.style.boxShadow = `0px ${Math.abs(oy)}px ${Math.abs(oy) / radius * 40}px rgba(0,0,0,0.15)`;
});