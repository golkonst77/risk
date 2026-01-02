"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Check, Loader2, Gift } from "lucide-react"

interface CouponUsageProps {
  onCouponUsed?: (couponCode: string) => void
  className?: string
}

export function CouponUsage({ onCouponUsed, className = "" }: CouponUsageProps) {
  const [couponCode, setCouponCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const { toast } = useToast()

  const handleUseCoupon = async () => {
    if (!couponCode.trim()) {
      toast({
        title: "Ошибка",
        description: "Введите код купона",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      // В статическом режиме купоны не сохраняются на сервере
      // Можно добавить внешний API для проверки купонов в будущем
      const couponApiUrl = process.env.NEXT_PUBLIC_COUPON_API_URL
      
      if (couponApiUrl) {
        // Если настроен внешний API для купонов
        const response = await fetch(couponApiUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code: couponCode.trim()
          })
        })

        const result = await response.json()

        if (response.ok) {
          setSuccess(true)
          toast({
            title: "Купон использован! 🎉",
            description: `Купон ${couponCode} успешно отмечен как использованный`,
          })
          
          if (onCouponUsed) {
            onCouponUsed(couponCode)
          }
          
          setTimeout(() => {
            setCouponCode("")
            setSuccess(false)
          }, 3000)
        } else {
          toast({
            title: "Ошибка",
            description: result.error || "Купон не найден или уже использован",
            variant: "destructive",
          })
        }
      } else {
        // В статическом режиме просто показываем сообщение
        toast({
          title: "Информация",
          description: "В статическом режиме проверка купонов недоступна. Свяжитесь с нами для активации купона.",
          variant: "default",
        })
      }
    } catch (error) {
      console.error('Ошибка при использовании купона:', error)
      toast({
        title: "Ошибка",
        description: "Произошла ошибка при обработке купона",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Gift className="h-5 w-5" />
          <span>Использовать купон</span>
        </CardTitle>
        <CardDescription>
          Введите код купона для отметки как использованного
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="coupon-code">Код купона</Label>
          <Input
            id="coupon-code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="PROSTOBURO-XXXXXX-XXXX"
            disabled={loading || success}
          />
        </div>
        
        <Button 
          onClick={handleUseCoupon}
          disabled={loading || success || !couponCode.trim()}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Обработка...
            </>
          ) : success ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Купон использован!
            </>
          ) : (
            "Отметить как использованный"
          )}
        </Button>
        
        {success && (
          <div className="text-sm text-green-600 text-center">
            Купон успешно отмечен как использованный
          </div>
        )}
      </CardContent>
    </Card>
  )
} 