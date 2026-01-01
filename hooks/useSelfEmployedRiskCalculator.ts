import { useMemo } from "react";
import { calculateBlockScores, calculateRisk } from "@/components/calculator-self-employed/riskUtils";

export function useSelfEmployedRiskCalculator(answers: Record<string, number>) {
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

