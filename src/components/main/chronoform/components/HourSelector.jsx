import { Button } from "@/components/ui/button"
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { useEffect } from "react"

export default function HourSelector({ value = [], onChange, label }) {
    const toggleHour = (hour) => {
        const currentValue = Array.isArray(value) ? value : []

        if (currentValue.includes(hour)) {
            const upValue = currentValue.filter(h => h !== hour)
            onChange(upValue)
            console.log(upValue)
        } else {
            const upValue = [...currentValue, hour].sort((a, b) => a - b)
            onChange(upValue)
            console.log(upValue)
        }
    }

    const isHourSelected = (hour) => {
        return Array.isArray(value) && value.includes(hour)
    }

    useEffect(() => {
        if (value.length === 0) return
    }, [value])

    return (
        <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
                <div className="flex flex-row gap-5">
                    {[...Array(24)]
                    .map((_, i) => i)
                    .map((h, i) => (
                        <Button
                            key={h}
                            type="button"
                            variant={value.includes(h) ? "default":  "outlined"}
                            className={cn(
                                "h-10",
                                isHourSelected(h) && "bg-red-500 text-white"
                            )}
                            onClick={() => toggleHour(h)}
                        >
                            {h.toString().padStart(2, '0')}:00
                        </Button>
                    ))
                    }
                </div>
            </FormControl>
            <FormDescription>
                Выберите часы
            </FormDescription>
            <FormMessage />
        </FormItem>
    )
}