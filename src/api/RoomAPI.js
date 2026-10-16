import {client} from "@/utils/helper";

async function fatchRoom() {
    try {
        const response = await client.get("room");
        if (response.data.success) {
            return response.data
        }
    } catch (error) {
        return {
            massage: "Internal Server error",
            category: [],
            success: false
        }
    }
}

export { fatchRoom };