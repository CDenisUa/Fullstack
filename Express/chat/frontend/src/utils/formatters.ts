export const formatMessageTime = (date: string | number | Date): string | null => {
    if (date == null) return null;

    return new Date(date).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    })
}