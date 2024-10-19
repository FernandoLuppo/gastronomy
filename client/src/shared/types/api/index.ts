import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export interface ISubmitData {
  route: AppRouterInstance;
  reset: () => void;
}
