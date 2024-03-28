import { CategoriesApi } from "./CategoriesApi";

export async function fetchCategories() {
    return await CategoriesApi.getCategories();
}

export async function fetchCategoryById(categoryId: string) {
    return await CategoriesApi.getCategoryById(categoryId);
}