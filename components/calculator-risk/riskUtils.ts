import { questions, blockConfig, calculateMaxWeightedScore } from "./config";

export function calculateBlockScores(answers: Record<string, number>) {
  const blocks: Record<number, number> = {};

  questions.forEach(q => {
    const score = answers[q.id] ?? 0;
    if (!blocks[q.block]) blocks[q.block] = 0;
    blocks[q.block] += score;
  });

  return blocks;
}

export function calculateRisk(blockScores: Record<number, number>) {
  let weightedSum = 0;

  Object.entries(blockScores).forEach(([blockId, score]) => {
    const { weight } = blockConfig[Number(blockId)];
    weightedSum += score * weight;
  });

  const maxWeighted = calculateMaxWeightedScore();

  const percent = Math.min(
    100,
    Math.round((weightedSum / maxWeighted) * 100)
  );

  let level: "low" | "medium" | "elevated" | "high" | "critical" = "low";
  if (percent > 75) level = "critical";
  else if (percent > 55) level = "high";
  else if (percent > 30) level = "elevated";
  else if (percent > 10) level = "medium";

  return { percent, level };
}


