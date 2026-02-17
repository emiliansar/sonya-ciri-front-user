import { Button } from "@/components/ui/button"
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { cn } from "@/lib/utils"

export default function HourSelector({ value = [], onChange, label }) {
    const toggleHour = (hour) => {
        const currentValue = Array.isArray(value) ? value : []

        if (currentValue.includes(hour)) {
            onChange(currentValue.filter(h => h !== hour))
            console.log(value)
        } else {
            onChange([...currentValue, hour]).sort((a, b) => a - b)
            console.log(value)
        }
    }

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
                                value.includes(h) && "bg-red-500 text-white"
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