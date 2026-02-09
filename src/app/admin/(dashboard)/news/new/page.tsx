import { redirect } from "next/navigation";

export default function NewNewsRedirect() {
  redirect("/admin/news");
}
