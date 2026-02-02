import { redirect } from "next/navigation";

export default function EditGalleryRedirect() {
  redirect("/admin/gallery");
}
