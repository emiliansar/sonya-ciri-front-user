import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, Select } from "radix-ui";

export default function HourDropDown({ onChange, value }) {
    return (
        <FormItem>
            <FormLabel>Час приёма пищи</FormLabel>
            <Select
                onValueChange={(v) => onChange(parseInt(v))}
                value={value?.toString()}
            >
                <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Выберите время приёма пищи" />
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
        </FormItem>
    )
}