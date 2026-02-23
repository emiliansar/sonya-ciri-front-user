import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function FormInput({
    label,
    type,
    placeholder,
    field,
    onChange,
    desc,
    props
}) {
    const handleChange = (e) => {
        if (onChange) {
            onChange(e)
        } else {
            field.onChange(e.target.value)
        }
    }

    return (
        <FormItem className="form-item">
            <FormLabel className="form-label">{label}</FormLabel>
            <FormControl className="text-[16px] font-regular">
                <Input
                    type={type}
                    placeholder={placeholder}
                    {...field}
                    onChange={handleChange}
                    value={field.value ?? ""}
                    {...props}
                    className="w-full text-[16px] font-regular"
                />
            </FormControl>
            {desc && (
                <FormDescription className="form-desc-message">
                    {desc}
                </FormDescription>
            )}
            <FormMessage className="form-desc-message" />
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