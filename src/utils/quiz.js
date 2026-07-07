export function shuffleArray(arr) {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function filterQuestions(allQuestions, level) {
  if (level === 'misto') return [...allQuestions];
  return allQuestions.filter((q) => q.level === level);
}

export function computeResults(answers) {
  const total = answers.length;
  const correct = answers.filter((a) => a.correct).length;
  const percentage = total === 0 ? 0 : Math.round((correct / total) * 100);

  const byLevel = { iniciante: { total: 0, correct: 0 }, intermediario: { total: 0, correct: 0 }, avancado: { total: 0, correct: 0 } };
  for (const a of answers) {
    if (byLevel[a.level]) {
      byLevel[a.level].total += 1;
      if (a.correct) byLevel[a.level].correct += 1;
    }
  }
  for (const lvl of Object.values(byLevel)) {
    lvl.percentage = lvl.total === 0 ? 0 : Math.round((lvl.correct / lvl.total) * 100);
  }

  return { total, correct, percentage, byLevel };
}
