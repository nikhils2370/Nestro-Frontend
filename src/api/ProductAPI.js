import { client } from "@/utils/helper";

async function fetchProduct({
  category = null,
  categoryId = null,
  room_type = null,
  status = null,
  max_price = null,
  min_price = null,
  stock = null,
  sort = null,
  bestSeller = null,
  page = 1,
  limit = 9,
} = {}) {
  try {
    const searchParams = new URLSearchParams();
    console.log(category);

    if (category !== null) {
      searchParams.append("category", category);
    }
    if (categoryId) {
      searchParams.append("categoryId", categoryId);
    }

    if (room_type !== null) {
      searchParams.append("room_type", room_type);
    }

    if (status !== null) {
      searchParams.append("status", status);
    }

    if (stock !== null) {
      searchParams.append("stock", stock);
    }

    if (bestSeller !== null) {
      searchParams.append("bestSeller", bestSeller);
    }

    if (sort !== null) {
      searchParams.append("sort", sort);
    }

    if (min_price !== null) {
      searchParams.append("min_price", min_price);
    }

    if (max_price !== null) {
      searchParams.append("max_price", max_price);
    }

    // Pagination
    searchParams.append("page", page);
    searchParams.append("limit", limit);

    const response = await client.get(`product?${searchParams.toString()}`);

    if (response.data.success) {
      return response.data;
    }

    return {
      message: "Products not found",
      product: [],
      success: false,
      pages: 1,
      total: 0,
    };
  } catch (error) {
    console.error("Fetch Product Error:", error);

    return {
      message: "Internal Server Error",
      product: [],
      success: false,
      pages: 1,
      total: 0,
    };
  }
}

async function fetchProductById(id) {
  try {
    const response = await client.get(`product/${id}`);

    if (response.data.success) {
      return response.data;
    }

    return {
      message: "Product not found",
      product: {},
      success: false,
    };
  } catch (error) {
    return {
      message: "Internal Server Error",
      product: {},
      success: false,
    };
  }
}

export { fetchProduct, fetchProductById };
