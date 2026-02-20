import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function FormInput({
    label,
    type,
    placeholder,
    field,
    onChange,
    desc
}) {
    return (
        <FormItem>
            <FormLabel>{ label }</FormLabel>
            <FormControl>
                <Input
                    type={type}
                    placeholder={placeholder}
                    {...field}
                    onChange={onChange}
                    value={field.value ?? ""}
                />
            </FormControl>
            <FormDescription>
                { desc }
            </FormDescription>
            <FormMessage />
        </FormItem>
    )
}

{/* <FormItem>
    <FormLabel>Ваш возраст</FormLabel>
    <FormControl>
        <Input
            type="number"
            placeholder="18"
            {...field}
            onChange={(e) => {
                const value = e.target.value;

                if (value === "") {
                    field.onChange(undefined)
                } else {
                    field.onChange(parseInt(value, 10))
                }
            }}
            value={field.value ?? ""}
        />
    </FormControl>
    <FormDescription>
        Введите ваш полный возраст
    </FormDescription>
    <FormMessage />
</FormItem> */}