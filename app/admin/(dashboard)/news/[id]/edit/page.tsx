import { redirect } from "next/navigation";

export default function EditNewsRedirect() {
  redirect("/admin/news");
}
