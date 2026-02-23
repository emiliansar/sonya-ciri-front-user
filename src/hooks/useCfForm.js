import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { cfFormSchema, defaultCfFormValues } from "@/schemas/cfFormSchema"
import { useEffect, useState } from "react"
import { cfService } from "@/services/chronoform.service"

export const useCfForm = (
    defaultValues
) => {
    const form = useForm({
        resolver: zodResolver(cfFormSchema),
        defaultValues: defaultValues && Object.keys(defaultValues).length > 0
        ? defaultValues
        : defaultCfFormValues,
        mode: "onChange"
    })

    const [externalValuesSet, setExternalValuesSet] = useState(false)

    const onSubmit = (
        values,
        access_token,
        refresh_token,
        changeAccessToken
    ) => {
        const isChanged = Object.keys(values).some(key =>
            values[key] !== defaultCfFormValues[key]
        )

        if (isChanged) {
            console.log("Form Submitted: ", values)
            return cfService.updateCF(
                access_token,
                refresh_token,
                changeAccessToken,
                values,
            );
        }
    }

    const onDelete = async (
        access_token,
        refresh_token,
        changeAccessToken
    ) => {
        console.log("OnDelete вызван")
        const request = await cfService.deleteCF(access_token, refresh_token, changeAccessToken);
        console.log(request)
    }

    const pastDefaultValues = (values) => {
        console.log("pastDefaultValues вызван: ", values)
        form.reset(values)
        setExternalValuesSet(true)
    }

    useEffect(() => {
        if (defaultValues && Object.keys(defaultValues).length > 0) {
            const currentValues = form.getValues()
            const hasChanges = Object.keys(defaultValues).some(
                key => currentValues[key] !== defaultValues[key]
            )

            if (hasChanges || !externalValuesSet) {
                console.log("Обновляем форму данными:", defaultValues)
                pastDefaultValues(defaultValues)
            }
        }
    }, [defaultValues, form, externalValuesSet])

    // useEffect(() => {
    //     if (defaultValues && Object.keys(defaultValues).length > 0) {
    //         console.log("Обновляем форму данными:", defaultValues)
    //         pastDefaultValues(defaultValues)
    //     }
    // }, [defaultValues, form])

    return {
        form,
        onSubmit,
        onDelete,
        formState: form.formState,
        errors: form.formState.errors,
    }
}