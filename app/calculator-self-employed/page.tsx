import { SelfEmployedCalculator } from "@/components/calculator-self-employed/SelfEmployedCalculator"
import Head from "next/head"

export default function CalculatorSelfEmployedPage() {
  return (
    <>
      <Head>
        <title>Калькулятор риска самозанятых | ПростоБюро</title>
      </Head>
      <div
        id="calculator-page"
        className="min-h-screen relative overflow-hidden"
      >
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: "radial-gradient(80% 60% at 20% 10%, rgba(59,130,246,0.25) 0%, rgba(59,130,246,0) 60%), radial-gradient(70% 50% at 80% 0%, rgba(99,102,241,0.25) 0%, rgba(99,102,241,0) 60%), linear-gradient(180deg, #0b1020 0%, #141a35 50%, #1b2147 100%)"
          }}
        />

        <div className="relative z-10">
          <SelfEmployedCalculator />
        </div>
      </div>
    </>
  )
}

