import * as z from 'zod'

export const cfFormSchema = z.object({
    age: z.number().int().min(0, {
        message: "Возраст должен быть больше 0"
    }),
    tag: z.string().min(1, {
        message: "Тег должен содержать минимум 1 символ"
    }).max(100, {
        message: "Тег должен содержать не более 100 символов"
    }),
    time_wake_up: z.number().int().min(0).max(23),
    time_to_bed: z.number().int().min(0).max(23),
    sleep_quality: z.number().int().min(1).max(10).default(1),
    time_great: z.array(z.number().int().min(0).max(23)).default([]),
    // exam_time: z.array(z.number().int().min(0).max(23)).default([]),
    // exercise_time: z.array(z.number().int().min(0).max(23)).default([]),
    // important_meal_type: z.string().default(2),
    // important_meal_time: z.array(z.number().int().min(0).max(23)).default([]),
    // energy_decline: z.string(),
    // early_rise: z.string(),
    // daytime_sleep: z.string(),
    // state_morning: z.string(),
    // daily_routine: z.string(),
    // when_tired: z.array(z.number().int().min(0).max(23)).default([]),
    // me_desc: z.string(),
    // great_day_desc: z.string(),
})

export const defaultCfFormValues = {
    age: 8,
    tag: "",
    time_wake_up: undefined,
    time_to_bed: undefined,
    sleep_quality: undefined,
    time_great: [],
    // exam_time: [],
    // exercise_time: [],
    // important_meal_type: "",
    // important_meal_time: [],
    // energy_decline: "",
    // early_rise: "",
    // daytime_sleep: "",
    // state_morning: "",
    // daily_routine: "",
    // when_tired: [],
    // me_desc: "",
    // great_day_desc: "",
}