import * as z from 'zod'

export const cfFormSchema = z.object({
    age: z.number({
        required_error: "Возраст обязателен для заполнения",
        invalid_type_error: "Возраст должен быть числом"
    }).int({
        invalid_type_error: "Число должно быть целым"
    }).min(0, {
        message: "Возраст должен быть больше 0"
    }),
    tag: z.string({
        required_error: "Тег обязателен для заполнения",
        invalid_type_error: "Тег должен быть строкой"
    }).min(1, {
        message: "Тег должен содержать минимум 1 символ"
    }).max(100, {
        message: "Тег должен содержать не более 100 символов"
    }),
    time_wake_up: z.number({
        required_error: "Время обязателено для заполнения",
        invalid_type_error: "Время должно быть числом"
    }).int().min(0, {
        message: "Время должно быть больше 0"
    }).max(23, {
        message: "Время должно быть не более 23"
    }),
    time_to_bed: z.number({
        required_error: "Время обязателено для заполнения",
        invalid_type_error: "Время должно быть числом"
    }).int().min(0, {
        message: "Время должно быть больше 0"
    }).max(23, {
        message: "Время должно быть не более 23"
    }),
    sleep_quality: z.number({
        required_error: "Поле обязателено для заполнения",
        invalid_type_error: "Поле должно быть числом"
    }).int().min(0, {
        message: "Качество должно быть больше 0"
    }).max(10, {
        message: "Качество должно быть не более 10"
    }).default(1),
    time_great: z.array(z.number({
        required_error: "Поле обязателено для заполнения",
        invalid_type_error: "Каждый элемент должен быть числом"
    }).int().min(0).max(23)).min(1, "Выберите хотя бы 1 час").default([]),
    exam_time: z.array(z.number({
        required_error: "Поле обязателено для заполнения",
        invalid_type_error: "Каждый элемент должен быть числом"
    }).int().min(0).max(23)).min(1, "Выберите хотя бы 1 час").default([]),
    exercise_time: z.array(z.number({
        required_error: "Поле обязателено для заполнения",
        invalid_type_error: "Каждый элемент должен быть числом"
    }).int().min(0).max(23)).min(1, "Выберите хотя бы 1 час").default([]),
    important_meal_type: z.string({
        required_error: "Поле обязательно для заполнения",
        invalid_type_error: "Поле должно быть строкой"
    }),
    important_meal_time: z.array(z.number({
        required_error: "Поле обязателено для заполнения",
        invalid_type_error: "Каждый элемент должен быть числом"
    }).int().min(0).max(23)).min(1, "Выберите хотя бы 1 час").default([]),
    energy_decline: z.string({
        required_error: "Поле обязательно для заполнения",
        invalid_type_error: "Поле должно быть строкой"
    }),
    early_rise: z.string({
        required_error: "Поле обязательно для заполнения",
        invalid_type_error: "Поле должно быть строкой"
    }),
    daytime_sleep: z.string({
        required_error: "Поле обязательно для заполнения",
        invalid_type_error: "Поле должно быть строкой"
    }),
    state_morning: z.string({
        required_error: "Поле обязательно для заполнения",
        invalid_type_error: "Поле должно быть строкой"
    }),
    daily_routine: z.string({
        required_error: "Поле обязательно для заполнения",
        invalid_type_error: "Поле должно быть строкой"
    }),
    when_tired: z.array(z.number({
        required_error: "Поле обязателено для заполнения",
        invalid_type_error: "Каждый элемент должен быть числом"
    }).int().min(0).max(23)).min(1, "Выберите хотя бы 1 час").default([]),
    me_desc: z.string({
        required_error: "Поле обязательно для заполнения",
        invalid_type_error: "Поле должно быть строкой"
    }),
    great_day_desc: z.string({
        required_error: "Поле обязательно для заполнения",
        invalid_type_error: "Поле должно быть строкой"
    }).min(1, {
        message: "Описание должно содержать минимум 1 символ"
    }).max(150, {
        message: "Описание должно содержать не более 150 символов"
    }),
})

export const defaultCfFormValues = {
    age: undefined,
    tag: "не придумал",
    time_wake_up: undefined,
    time_to_bed: undefined,
    sleep_quality: undefined,
    time_great: [],
    exam_time: [],
    exercise_time: [],
    important_meal_type: "Завтрак",
    important_meal_time: [],
    energy_decline: "Нет",
    early_rise: "С трудом, но возможно",
    daytime_sleep: "Да,иногда",
    state_morning: "Усталым, с тяжёлыми веками",
    daily_routine: "Ранний подъём и ранний отход ко сну",
    when_tired: [],
    me_desc: "«Я люблю начинать день с чёткого плана»",
    great_day_desc: "",
}