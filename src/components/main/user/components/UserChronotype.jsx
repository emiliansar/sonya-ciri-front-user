import { useUserContext } from "@/context/user-context"

export default function UserChronotype() {
    const {
        chronotype
    } = useUserContext()

    if (!chronotype.type) {
        return null
    }

    return (
        <div>
            <p>{chronotype.type}</p>
        </div>
    )
}