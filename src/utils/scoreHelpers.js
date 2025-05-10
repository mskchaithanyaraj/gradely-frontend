export function getScoreColor(score) {
  const numScore = Number(score);
  const maxScore = getMaxScoreFromLabel(score);

  if (isNaN(numScore) || maxScore === 0) {
    return "";
  }

  const percentage = (numScore / maxScore) * 100;

  if (percentage >= 80) {
    return "text-green-600";
  } else if (percentage >= 60) {
    return "text-blue-600";
  } else if (percentage >= 40) {
    return "text-yellow-600";
  } else {
    return "text-red-600";
  }
}

function getMaxScoreFromLabel(score) {
  const numScore = Number(score);

  if (numScore <= 5) return 5;
  if (numScore <= 10) return 10;
  if (numScore <= 15) return 15;
  return 100;
}
