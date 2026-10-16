import React from "react";
import Add from "@/components/admin/Add.jsx";

export default function page() {
  return (
    <Add backButton={"/admin/rooms"} tital={"Room"} urlname={"room"} />
  );
}
