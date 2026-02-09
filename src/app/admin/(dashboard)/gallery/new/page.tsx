import { redirect } from "next/navigation";

export default function NewGalleryRedirect() {
  redirect("/admin/gallery");
}
