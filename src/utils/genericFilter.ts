export function genericFilter<T>(
    data: T[],
    filter: string,
    fields: (keyof T)[]
): T[] {
    const normalizeTerm = filter.trim().toLowerCase();
    
    if (!normalizeTerm) return data;

    return data.filter((item) => {
        return fields.some((field) => {
            const value = item[field];
            if (typeof value === 'string') {
                return value.toLowerCase().includes(normalizeTerm);
            }
            return false;
        });
    });
 }