import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function FormRadioGroupStr({
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
                    onValueChange={(v) => field.onChange(v ? v.toString() : undefined)}
                    value={field.value?.toString() ?? ""}
                    className="w-full flex flex-col items-start gap-2 pt-[10px]"
                >
                    {
                    array
                    .map((v, i) => (
                        <FormItem
                            key={i}
                            className="flex items-center gap-2.5"
                        >
                            <FormControl>
                                <RadioGroupItem
                                    className="rounded-full border-gray-500 border-2 border-solid
                                    data-[state=checked]:border-[#8A2BE2]
                                    data-[state=checked]:bg-[#8A2BE2]"
                                    value={v.toString()}
                                />
                            </FormControl>
                            <FormLabel className="text-[16px]">
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