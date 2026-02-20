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
import HourSelector from "@/components/main/chronoform/components/HourSelector"
import { defaultCfFormValues } from "@/schemas/cfFormSchema"
import { useEffect } from "react"
// import HourDropDown from "@/components/main/chronoform/components/HourDropDown"

export default function Chronoform({ defaultValues }) {
    const {
        form,
        onSubmit,
        resetForm
    } = useCfForm(defaultValues || defaultCfFormValues)

    useEffect(() => {
        const subscription = form.watch((value, { name, type }) => {
            console.log("Значение поля изменилось:", { name, value })
        })
        return () => subscription.unsubscribe()
    }, [form])

    return (
        <Form {...form}>
            <form
                className="flex flex-col gap-[10px]"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                        <FormItem>
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
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="tag"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Тег анкеты</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Введите тег..."
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Анкеты могут сортироваться по тегу
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="time_wake_up"
                    render={({ field }) => (
                        <FormItem>
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
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="time_to_bed"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Время отхода ко сну</FormLabel>
                            <Select
                                onValueChange={(v) => field.onChange(v ? parseInt(v) : undefined)}
                                value={field.value?.toString() ?? ""}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Выберите время отхода ко сну" />
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
                    )}
                />
                <FormField
                    control={form.control}
                    name="sleep_quality"
                    render={({ field }) => {
                        // const safeValue = field.value ?? 1;

                        return (
                            <FormItem>
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
                            </FormItem>
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
                    render={({ field }) => {
                        const safeValue = field.value ?? "Завтрак";
                        const meal_types = ["Завтрак", "Обед", "Ужин"];

                        return (
                            <FormItem>
                                <FormLabel>Какой приём пищи для Вас самый важный по времени (не по меню)?</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={(v) => field.onChange(v.toString())}
                                        value={safeValue.toString()}
                                        className="flex flex-col"
                                    >
                                        {
                                        meal_types
                                        .map((v, i) => (
                                            <FormItem
                                                key={i}
                                                className="flex gap-[5px]"
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
                                    Выберите самый важный для вас приём пищи
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )
                    }}
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
                    render={({ field }) => {
                        const safeValue = field.value ?? "Нет";
                        const decline_types = ["Нет", "Почти нет", "Умеренный", "Да, сильный"];

                        return (
                            <FormItem>
                                <FormLabel>Чувствуете ли Вы спад энергии после обеда?</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={(v) => field.onChange(v.toString())}
                                        value={safeValue.toString()}
                                        className="flex flex-col"
                                    >
                                        {
                                        decline_types
                                        .map((v, i) => (
                                            <FormItem
                                                key={i}
                                                className="flex gap-[5px]"
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
                                <FormMessage />
                            </FormItem>
                        )
                    }}
                />
                <FormField
                    control={form.control}
                    name="early_rise"
                    render={({ field }) => {
                        const safeValue = field.value ?? "С трудом, но возможно";
                        const rise_types = ["Да, без проблем", "Практически невозможно", "С трудом, но возможно"];

                        return (
                            <FormItem>
                                <FormLabel>Можете ли Вы легко перейти на ранний подъём, если это необходимо?</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={(v) => field.onChange(v.toString())}
                                        value={safeValue.toString()}
                                        className="flex flex-col"
                                    >
                                        {
                                        rise_types
                                        .map((v, i) => (
                                            <FormItem
                                                key={i}
                                                className="flex gap-[5px]"
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
                                <FormMessage />
                            </FormItem>
                        )
                    }}
                />
                <FormField
                    control={form.control}
                    name="daytime_sleep"
                    render={({ field }) => {
                        const safeValue = field.value ?? "Часто ,если есть возможность";
                        const daytime_sleep_types = ["Часто, если это возможно", "Да, иногда", "Никогда"];

                        return (
                            <FormItem>
                                <FormLabel>Спите ли Вы днём или вечером?</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={(v) => field.onChange(v.toString())}
                                        value={safeValue.toString()}
                                        className="flex flex-col"
                                    >
                                        {
                                        daytime_sleep_types
                                        .map((v, i) => (
                                            <FormItem
                                                key={i}
                                                className="flex gap-[5px]"
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
                                <FormMessage />
                            </FormItem>
                        )
                    }}
                />
                <FormField
                    control={form.control}
                    name="state_morning"
                    render={({ field }) => {
                        const safeValue = field.value ?? "Усталым, с тяжёлыми веками";
                        const types = ["Свежим и бодрым", "В тумане, но постепенно «раскачиваюсь»", "Усталым, с тяжёлыми веками"];

                        return (
                            <FormItem>
                                <FormLabel>Каким Вы просыпаетесь утром?</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={(v) => field.onChange(v.toString())}
                                        value={safeValue.toString()}
                                        className="flex flex-col"
                                    >
                                        {
                                        types
                                        .map((v, i) => (
                                            <FormItem
                                                key={i}
                                                className="flex gap-[5px]"
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
                                <FormMessage />
                            </FormItem>
                        )
                    }}
                />
                <FormField
                    control={form.control}
                    name="daily_routine"
                    render={({ field }) => {
                        const safeValue = field.value ?? "Ранний подъём и ранний отход ко сну";
                        const types = ["Ранний подъём и ранний отход ко сну", "Гибкий график с пиком активности днём", "Поздний подъём и работа/активность вечером"];

                        return (
                            <FormItem>
                                <FormLabel>Какой режим дня для Вас наиболее комфортен?</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={(v) => field.onChange(v.toString())}
                                        value={safeValue.toString()}
                                        className="flex flex-col"
                                    >
                                        {
                                        types
                                        .map((v, i) => (
                                            <FormItem
                                                key={i}
                                                className="flex gap-[5px]"
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
                                <FormMessage />
                            </FormItem>
                        )
                    }}
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
                    render={({ field }) => {
                        const safeValue = field.value ?? "«Я люблю начинать день с чёткого плана»";
                        const types = ["«Я люблю начинать день с чёткого плана»", "«Мне нужно время, чтобы войти в ритм»", "«Я предпочитаю работать, когда все спят»"];

                        return (
                            <FormItem>
                                <FormLabel>Какое утверждение лучше описывает Вас?</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={(v) => field.onChange(v.toString())}
                                        value={safeValue.toString()}
                                        className="flex flex-col"
                                    >
                                        {
                                        types
                                        .map((v, i) => (
                                            <FormItem
                                                key={i}
                                                className="flex gap-[5px]"
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
                                <FormMessage />
                            </FormItem>
                        )
                    }}
                />
                <FormField
                    control={form.control}
                    name="great_day_desc"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Опишите Ваш идеальный день с точки зрения расписания</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Мой идеальный день:..."
                                    {...field}
                                    className="px-[5px]"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <button
                    type="submit"
                    className="bg-transparent border-[#8A2BE2] border-solid border-2"
                >
                    Отправить
                </button>
            </form>
        </Form>
    )
}