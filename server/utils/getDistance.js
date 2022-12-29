function getDistance(positionX, positionY) {
  const nestPosX = 250000;
  const nestPosY = 250000;
  let distance = Math.sqrt(
    Math.pow(nestPosX - positionX, 2) + Math.pow(nestPosY - positionY, 2)
  );
  return distance;
}

module.exports = getDistance;
