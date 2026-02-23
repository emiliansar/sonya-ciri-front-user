import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function HourDropDown({
    field,
    label,
    placeholder,
    props
}) {
    return (
        <FormItem className="form-item">
            <FormLabel className="form-label">{ label }</FormLabel>
            <Select
                onValueChange={(v) => field.onChange(v ? parseInt(v) : undefined)}
                value={field.value?.toString() ?? ""}
                className="w-full"
            >
                <FormControl className="w-full text-[16px] font-medium">
                    <SelectTrigger >
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                </FormControl>
                <SelectContent>
                    {[...Array(24)].map((_, i) => (
                        <SelectItem
                            key={i}
                            value={i.toString()}
                            className="text-[16px] font-medium"
                        >
                            {i.toString().padStart(2, '0')}:00
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <FormMessage className="form-desc-message" />
        </FormItem>
    )
}

{/* <FormItem>
    <FormLabel>Время пробуждения</FormLabel>
    <Select
        onValueChange={(v) => field.onChange(v ? parseInt(v) : undefined)}
        value={field.value?.toString() ?? ""}
        // value={`${field.value?.toString().padStart(2, '0')}:00`}
    >
        <FormControl>
            <SelectTrigger>
                <SelectValue placeholder="Выберите время пробуждения" />
            </SelectTrigger>
        </FormControl>
        <SelectContent>
            {[...Array(24)].map((_, i) => (
                <SelectItem
                    key={i}
                    value={i.toString()}
                >
                    {i.toString().padStart(2, '0')}:00
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
    <FormMessage />
</FormItem> */}