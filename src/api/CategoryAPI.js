import { client } from "@/utils/helper";

async function fatchCategory({ status = null, limit = null } = {}) {
  try {
    const searchParams = new URLSearchParams();

    if (status !== null) {
      searchParams.append("status", String(status));
    }

    if (limit !== null) {
      searchParams.append("limit", String(limit));
    }

    const query = searchParams.toString();
    const url = query ? `/category?${query}` : "/category";

    console.log("Category API URL:", url);
    console.log("Category API Base URL:", client.defaults.baseURL);

    const response = await client.get(url);

    console.log("Category API Status:", response.status);
    console.log("Category API Response:", response.data);

    if (response.data?.success) {
      return response.data;
    }

    throw new Error(
      response.data?.message ||
        response.data?.massage ||
        "Category API returned success: false",
    );
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.massage ||
      error.message ||
      "Unknown category API error";

    console.error("CATEGORY FETCH FAILED:", {
      message: errorMessage,
      url: error.config?.url,
      baseURL: error.config?.baseURL,
      status: error.response?.status,
      response: error.response?.data,
    });

    return {
      success: false,
      message: errorMessage,
      data: [],
    };
  }
}

async function fatchCategorybyId(id) {
  try {
    const response = await client.get(`/category/${id}`);

    if (response.data?.success) {
      return response.data;
    }

    throw new Error(
      response.data?.message || response.data?.massage || "Category not found",
    );
  } catch (error) {
    console.error("CATEGORY FETCH BY ID FAILED:", {
      message: error.message,
      status: error.response?.status,
      response: error.response?.data,
    });

    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.response?.data?.massage ||
        error.message ||
        "Internal Server Error",
      data: null,
    };
  }
}

export { fatchCategory, fatchCategorybyId };
