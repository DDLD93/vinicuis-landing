import { getDivisions } from "@/lib/actions/division";
import DivisionListClient from "./DivisionListClient";

export default async function DivisionsAdminPage() {
  let divisions;
  try {
    divisions = await getDivisions();
  } catch {
    divisions = [];
  }
  return <DivisionListClient initialDivisions={divisions} />;
}
