import EditForm from "@/components/admin/EditForm";
import { fatchCategorybyId } from "@/api/CategoryAPI";
import React from "react";

export default async function EditPage({ params }) {
  const promise = await params;

  const { success, data, message } = await fatchCategorybyId(
    promise.category_id,
  );
  // console.log(success);
  // console.log(data);
  // console.log(message);

  if (!success) {
    throw new Error(
      typeof message === "string" ? message : "Unable to load category",
    );
  }
  return (
    <EditForm backButton={"/admin/category"} tital={"category"} data={data} />
  );
}
