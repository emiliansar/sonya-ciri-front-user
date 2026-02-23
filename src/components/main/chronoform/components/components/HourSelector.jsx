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
        <FormItem className="form-item flex flex-col gap-1.5 items-start">
            <FormLabel className="font-semibold text-[20px]">{label}</FormLabel>
            <FormControl className="w-full">
                <div className="w-full flex flex-row gap-5 flex-wrap items-center gap-1.5">
                    {[...Array(24)]
                    .map((_, i) => i)
                    .map((h, i) => (
                        <Button
                            key={h}
                            type="button"
                            variant={value.includes(h) ? "default":  "outlined"}
                            className={cn(
                                "h-12 w-15 border-2 border-gray-500 text-white",
                                isHourSelected(h) && "bg-[#8A2BE2] border-[#8A2BE2] text-white"
                            )}
                            onClick={() => toggleHour(h)}
                        >
                            {h.toString().padStart(2, '0')}:00
                        </Button>
                    ))
                    }
                </div>
            </FormControl>
            <FormDescription className="form-desc-message">
                Выберите часы
            </FormDescription>
            <FormMessage className="form-desc-message" />
        </FormItem>
    )
}