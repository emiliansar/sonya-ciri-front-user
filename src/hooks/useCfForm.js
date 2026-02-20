import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { cfFormSchema, defaultCfFormValues } from "@/schemas/cfFormSchema"
import { useEffect } from "react"

export const useCfForm = (defaultValues) => {
    const form = useForm({
        resolver: zodResolver(cfFormSchema),
        defaultValues: defaultValues || defaultCfFormValues,
        mode: "onChange"
    })

    useEffect(() => {
        if (defaultValues && Object.keys(defaultValues).length > 0) {
            console.log("Обновляем форму данными:", defaultValues)
            form.reset(defaultValues)
        }
    }, [defaultValues, form])

    const onSubmit = (values) => {
        return console.log("Form Submitted: ", values)
    }

    const resetForm = () => {
        form.reset(defaultCfFormValues)
    }

    const toggleHour = (hour) => {
        const currentHours = form.getValues("selectedHours") || []

        if (currentHours.includes(hour)) {
            // Если час уже выбран - удаляем
            form.setValue(
                "selectedHours",
                currentHours.filter(h => h !== hour),
                { shouldValidate: true }
            )
        } else {
            // Если час не выбран - добавляем
            form.setValue(
                "selectedHours",
                [...currentHours, hour].sort((a, b) => a - b), // сортируем по порядку
                { shouldValidate: true }
            )
        }
    }

    return {
        form,
        onSubmit,
        resetForm,
        formState: form.formState,
        errors: form.formState.errors,
    }
}