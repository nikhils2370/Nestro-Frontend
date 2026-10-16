import {client} from "@/utils/helper";

async function fatchCategory({ status = null, limit = null } = {}) {
  try {
      const searchParams = new URLSearchParams();
      if (status !== null) {
        searchParams.append("status", status);
      }

      if (limit !== null) {
        searchParams.append("limit", limit);
      }
    console.log(searchParams, "category API");
    


    const response = await client.get(`category?${searchParams.toString()}`);
    if (response.data.success) {
      return response.data;
    }
  } catch (error) {
    return {
      massage: "Internal Server error",
      category: [],
      success: false,
    };
  }
}


async function fatchCategorybyId(id) {
  try {
    const response = await client.get(`category/${id}`);
    if (response.data.success) {
      return response.data;
    }
  } catch (error) {
    return {
      massage: "Internal Server error",
      category: [],
      success: false,
    };
  }
}

export {fatchCategory,fatchCategorybyId}