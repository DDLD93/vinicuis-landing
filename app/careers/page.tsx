import { getJobPostings } from "@/lib/actions/career";
import CareersPageClient from "./CareersPageClient";

export default async function CareersPage() {
  let jobs;
  try {
    jobs = await getJobPostings({ activeOnly: true });
  } catch {
    jobs = [];
  }
  return <CareersPageClient jobs={jobs} />;
}
