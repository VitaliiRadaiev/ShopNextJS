export type CategoryType = {
    id: string;
    title: string;
    filters: FilterGroupType[]
}

type FilterGroupType = {
    id: string;
    categoryId: string;
    title: string;
    items: FilterItemType[];
}

type FilterItemType = {
    id: string;
    filterBlockId: string;
    title: string
}