import type { Milestone } from "@/lib/roadmap";

export type ReachedStep = { value: number; day: string };

export function StarMilestone({
  milestone: _milestone,
  reached: _reached,
}: {
  milestone: Milestone;
  reached: ReachedStep[];
}) {
  return null;
}
