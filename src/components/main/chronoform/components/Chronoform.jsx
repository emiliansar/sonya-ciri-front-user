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
import HourSelector from "./HourSelector"

export default function Chronoform({ defaultValues }) {
    const {
        form,
        onSubmit,
        resetForm
    } = useCfForm(defaultValues || null)

    return (
        <Form {...form}>
            <form
                className="flex flex-col gap-[10]"
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
                                    onChange={(e) => field.onChange(parseInt(e.target.value) || "")}
                                    value={field.value?.toString() || ""}
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
                                onValueChange={(v) => field.onChange(parseInt(v))}
                                value={field.value?.toString()}
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
                                onValueChange={(v) => field.onChange(parseInt(v))}
                                value={field.value?.toString()}
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
                        const safeValue = field.value ?? 1;

                        return (
                            <FormItem>
                                <FormLabel>Качество сна</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={(v) => field.onChange(parseInt(v))}
                                        value={safeValue.toString()}
                                        className="flex"
                                    >
                                        {
                                        [...Array(10)]
                                        // .map(i => {
                                        //     console.log(i += 1)
                                        //     return i += 1
                                        // })
                                        .map((_, i) => i + 1)
                                        // Array.from({ length: 24 }, (_, i) => i + 1)
                                        // sleepQuality
                                        ?.map((v, i) => (
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