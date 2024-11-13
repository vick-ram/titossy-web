export const paginate = <T>(data: T[], currentPage: number, itemsPerPage: number) => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return data.slice(start, end)
}