import { getJobPostings } from "@/lib/actions/career";
import CareersListClient from "./CareersListClient";

export default async function CareersAdminPage() {
  let jobs;
  try {
    jobs = await getJobPostings();
  } catch {
    jobs = [];
  }
  return <CareersListClient initialJobs={jobs} />;
}
