import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function FormRadioGroupInt({
    field,
    label,
    desc,
    array
}) {
    return (
        <FormItem className="form-item">
            { label && (
                <FormLabel className="form-label">{ label }</FormLabel>
            )}
            <FormControl className="w-full">
                <RadioGroup
                    onValueChange={(v) => field.onChange(v ? parseInt(v) : undefined)}
                    value={field.value?.toString() ?? ""}
                    className="w-full flex items-center justify-between pt-[10px]"
                >
                    {
                    array
                    .map((v, i) => (
                        <FormItem
                            key={i}
                            className="flex flex-col items-center gap-2.5"
                        >
                            <FormControl>
                                <RadioGroupItem
                                    className="rounded-full border-gray-500 border-2 border-solid
                                    data-[state=checked]:border-[#8A2BE2]
                                    data-[state=checked]:bg-[#8A2BE2]"
                                    value={v.toString()}
                                />
                            </FormControl>
                            <FormLabel>
                                {v}
                            </FormLabel>
                        </FormItem>
                    ))}
                </RadioGroup>
            </FormControl>
            { desc && (
                <FormDescription className="form-desc-message">
                    { desc }
                </FormDescription>
            )}
            <FormMessage className="form-desc-message" />
        </FormItem>
    )
}

// const safeValue = field.value ?? "Завтрак";
// const meal_types = ["Завтрак", "Обед", "Ужин"];

{/* <FormItem>
    <FormLabel>Качество сна</FormLabel>
    <FormControl>
        <RadioGroup
            onValueChange={(v) => field.onChange(v ? parseInt(v) : undefined)}
            value={field.value?.toString() ?? ""}
            className="flex"
        >
            {
            [...Array(10)]
            .map((_, i) => i + 1)
            .map((v, i) => (
                <FormItem
                    key={i}
                >
                    <FormControl>
                        <RadioGroupItem value={v.toString()} />
                    </FormControl>
                    <FormLabel>
                        {v}
                    </FormLabel>
                </FormItem>
            ))}
        </RadioGroup>
    </FormControl>
    <FormDescription>
        Оцените качество своего сна
    </FormDescription>
    <FormMessage />
</FormItem> */}