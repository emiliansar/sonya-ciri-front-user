import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";

export default function FormResetButton({
    isReset,
    setIsReset
}) {
    return (
        <Field orientation="horizontal">
            <Checkbox
                name="reset-btn"
                id="reset-btn"
                checked={isReset}
                onCheckedChange={setIsReset}
            />
            <Label htmlFor="reset-btn">Сбросить</Label>
        </Field>
    )
}