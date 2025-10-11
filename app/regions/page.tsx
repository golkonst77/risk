"use client"

import { useEffect, useMemo, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface RegionItem {
  code: string
  name: string
}

interface RegionsData {
  version: string
  lastUpdate: string
  source: string
  count: number
  data: RegionItem[]
}

export default function RegionsPage() {
  const [regionsData, setRegionsData] = useState<RegionsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState("")

  const regions = regionsData?.data ?? []
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return regions
    return regions.filter(
      (r) => r.name.toLowerCase().includes(q) || r.code.includes(q)
    )
  }, [regions, query])

  const grouped = useMemo(() => {
    const map = new Map<string, RegionItem[]>()
    filtered
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name, "ru"))
      .forEach((r) => {
        const letter = r.name[0]?.toUpperCase() || "#"
        const arr = map.get(letter) ?? []
        arr.push(r)
        map.set(letter, arr)
      })
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b, "ru"))
  }, [filtered])

  useEffect(() => {
    const loadRegions = async () => {
      try {
        const res = await fetch(`/data/regions.json?v=${Date.now()}`)
        const data = await res.json()
        setRegionsData(data)
      } catch (e) {
        console.error("Ошибка загрузки регионов:", e)
      } finally {
        setLoading(false)
      }
    }
    loadRegions()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Загрузка списка регионов...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              Официальные данные ФНС
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Регионы применения АУСН</h1>
            <p className="text-xl text-white/90 mb-8">
              Список субъектов РФ, где доступна автоматизированная упрощённая система налогообложения
            </p>
            <div className="flex flex-wrap gap-6 justify-center text-sm">
              <div className="flex items-center gap-2">
                <span>{regionsData?.count || 0} регионов</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Обновление: {regionsData?.version || "..."}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
            <div className="relative w-full md:max-w-sm">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск по региону или коду..."
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {grouped.map(([letter]) => (
                <a
                  key={letter}
                  href={`#letter-${letter}`}
                  className="px-2 py-1 text-sm rounded bg-gray-100 hover:bg-blue-600 hover:text-white transition-colors"
                >
                  {letter}
                </a>
              ))}
            </div>
          </div>

          {grouped.map(([letter, items]) => (
            <div key={letter} className="mb-10">
              <h2 id={`letter-${letter}`} className="text-2xl font-bold mb-4 text-gray-900">
                {letter}
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {items.map((r) => (
                  <Card
                    key={r.code}
                    className="bg-white/70 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg text-gray-900">{r.name}</CardTitle>
                        <Badge variant="outline" className="ml-3">{r.code}</Badge>
                      </div>
                      <CardDescription>Регион доступен для применения АУСН</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-gray-600">Код региона: {r.code}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
