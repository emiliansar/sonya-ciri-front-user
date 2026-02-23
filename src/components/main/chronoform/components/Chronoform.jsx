import { useCfForm } from "@/hooks/useCfForm"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { importantMealType, sleepQuality } from '@/variables/cf.variables.js'
import { Input } from "@/components/ui/input"
import HourSelector from "@/components/main/chronoform/components/components/HourSelector"
import { defaultCfFormValues } from "@/schemas/cfFormSchema"
import { useEffect, useState } from "react"
import FormInput from "@/components/main/chronoform/components/components/FormInput"
import HourDropDown from "@/components/main/chronoform/components/components/HourDropDown"
import FormRadioGroupInt from "@/components/main/chronoform/components/components/FormRadioGroupInt"
import FormRadioGroupStr from "@/components/main/chronoform/components/components/FormRadioGroupStr"
import FormResetButton from "@/components/main/chronoform/components/components/FormResetButton"
import { useUserContext } from "@/context/user-context"

export default function Chronoform({ defaultValues }) {
    const {
        access_token,
        refresh_token,
        changeAccessToken
    } = useUserContext()

    const {
        form,
        onSubmit,
        onDelete
    } = useCfForm(
        defaultValues
    )

    useEffect(() => {
        const subscription = form.watch((value, { name, type }) => {
            console.log("Значение поля изменилось:", { name, value })
        })
        return () => subscription.unsubscribe()
    }, [form])

    const submitForm = () => {
        form.handleSubmit(onSubmit(
            form.getValues(),
            access_token,
            refresh_token,
            changeAccessToken
        ))
    }

    const confirmDelete = () => {
        console.log("confirmDelete вызван")
        if (confirm("Вы уверены, что хотите удалить анкету?")) {
            console.log("Confirm Delete прошёл условие")
            onDelete(
                access_token,
                refresh_token,
                changeAccessToken
            )
        }
    }

    return (
        <div className="w-full my-[50px] mx-auto">
            <Form {...form} className="w-full mx-auto mt-[50px]">
                <form
                    className="w-full flex flex-col gap-[20px] items-center"
                    onSubmit={form.handleSubmit((values) =>
                        onSubmit(
                            values,
                            access_token,
                            refresh_token,
                            changeAccessToken
                        )
                    )}
                >
                    <div className="w-full flex items-center justify-center gap-[10px] mb-[20px]">
                        <p className="text-[32px] font-bold">Анкета</p>
                    </div>
                    <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                            <FormInput
                                label="Ваш возраст"
                                type="number"
                                placeholder="18"
                                field={field}
                                onChange={(e) => {
                                    const value = e.target.value;
    
                                    if (value === "") {
                                        field.onChange(undefined)
                                    } else {
                                        field.onChange(parseInt(value, 10))
                                    }
                                }}
                                desc="Введите ваш полный возраст"
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="tag"
                        render={({ field }) => (
                            <FormInput
                                label="Тег анкеты"
                                type="text"
                                placeholder="Введите тег..."
                                field={field}
                                onChange={(e) => { field.onChange(e.target.value) }}
                                desc="Анкеты могут сортироваться по тегу"
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="time_wake_up"
                        render={({ field }) => (
                            <HourDropDown
                                field={field}
                                label="Время пробуждения"
                                placeholder="Выберите время пробуждения"
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="time_to_bed"
                        render={({ field }) => (
                            <HourDropDown
                                field={field}
                                label="Время отхода ко сну"
                                placeholder="Выберите время отхода ко сну"
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="sleep_quality"
                        render={({ field }) => {
                            return (
                                <FormRadioGroupInt
                                    field={field}
                                    label="Качество сна"
                                    desc="Выберите качество сна"
                                    array={[...Array(10)].map((_, i) => i + 1)}
                                />
                            )
                        }}
                    />
                    <FormField
                        control={form.control}
                        name="time_great"
                        render={({ field }) => (
                            <HourSelector
                                value={field.value}
                                onChange={field.onChange}
                                label="Часы наибольшей умственной активности, энергии и концентрации"
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="exam_time"
                        render={({ field }) => (
                            <HourSelector
                                value={field.value}
                                onChange={field.onChange}
                                label="Если бы вам нужно было сдать экзамен с максимальной концентрацией, какое время Вы бы выбрали?"
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="exercise_time"
                        render={({ field }) => (
                            <HourSelector
                                value={field.value}
                                onChange={field.onChange}
                                label="Когда Вам комфортнее заниматься физическими нагрузками?"
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="important_meal_type"
                        render={({ field }) => (
                            <FormRadioGroupStr
                                field={field}
                                label="Какой приём пищи для Вас самый важный по времени (не по меню)?"
                                desc="Выберите самый важный для вас приём пищи"
                                array={["Завтрак", "Обед", "Ужин"]}
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="important_meal_time"
                        render={({ field }) => (
                            <HourSelector
                                value={field.value}
                                onChange={field.onChange}
                                label="Час приёма пищи"
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="energy_decline"
                        array={["Нет", "Почти нет", "Умеренный", "Да, сильный"]}
                        render={({ field }) => (
                            <FormRadioGroupStr
                                field={field}
                                label="Чувствуете ли Вы спад энергии после обеда?"
                                desc="Выберите самый важный для вас приём пищи"
                                array={["Нет", "Почти нет", "Умеренный", "Да, сильный"]}
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="early_rise"
                        render={({ field }) => (
                            <FormRadioGroupStr
                                field={field}
                                label="Можете ли Вы легко перейти на ранний подъём, если это необходимо?"
                                array={["Да, без проблем", "Практически невозможно", "С трудом, но возможно"]}
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="daytime_sleep"
                        render={({ field }) => (
                            <FormRadioGroupStr
                                field={field}
                                label="Спите ли Вы днём или вечером?"
                                array={["Часто, если это возможно", "Да, иногда", "Никогда"]}
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="state_morning"
                        render={({ field }) => (
                            <FormRadioGroupStr
                                field={field}
                                label="Каким Вы просыпаетесь утром?"
                                array={["Свежим и бодрым", "В тумане, но постепенно «раскачиваюсь»", "Усталым, с тяжёлыми веками"]}
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="daily_routine"
                        render={({ field }) => (
                            <FormRadioGroupStr
                                field={field}
                                label="Какой режим дня для Вас наиболее комфортен?"
                                array={["Ранний подъём и ранний отход ко сну", "Гибкий график с пиком активности днём", "Поздний подъём и работа/активность вечером"]}
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="when_tired"
                        render={({ field }) => (
                            <HourSelector
                                value={field.value}
                                onChange={field.onChange}
                                label="Когда чаще всего ощущается усталость?"
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="me_desc"
                        render={({ field }) => (
                            <FormRadioGroupStr
                                field={field}
                                label="Какое утверждение лучше описывает Вас?"
                                array={["«Я люблю начинать день с чёткого плана»", "«Мне нужно время, чтобы войти в ритм»", "«Я предпочитаю работать, когда все спят»"]}
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="great_day_desc"
                        render={({ field }) => (
                            <FormInput
                                label="Опишите Ваш идеальный день с точки зрения расписания"
                                type="text"
                                placeholder="Мой идеальный день:..."
                                field={field}
                                onChange={(e) => { field.onChange(e.target.value) }}
                            />
                        )}
                    />
                    <div className="w-full flex flex-col items-center gap-5 mt-12">
                        <button
                            type="submit"
                            className="max-w-[200px] w-full p-[10px] rounded-2xl text-[18px] font-semibold bg-[#8A2BE2]"
                            disabled={form.formState.isSubmitting}
                        >
                            Отправить
                        </button>

                        <button
                            onClick={confirmDelete}
                            type="button"
                            className="max-w-[200px] w-full p-[10px] rounded-2xl text-[18px] font-semibold bg-[#FF0000]"
                        >
                            Удалить
                        </button>
                    </div>
                </form>
            </Form>
        </div>
    )
}