import { useMemo } from "react";
import { calculateBlockScores, calculateRisk } from "@/components/calculator-risk/riskUtils";

export function useRiskCalculator(answers: Record<string, number>) {
  return useMemo(() => {
    const blockScores = calculateBlockScores(answers);
    const { percent, level } = calculateRisk(blockScores);

    return {
      totalPercent: percent,
      riskLevel: level,
      blocks: blockScores
    };
  }, [answers]);
}


