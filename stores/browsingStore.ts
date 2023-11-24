import type { RouteLocationNormalized } from '#vue-router';
import { isPageAuthProtected } from '~/utils/shadcn/utils';

export const useBrowsingStore = defineStore('browsingStore', {
  state: (): { lastVisitedNonAuthPage: string | RouteLocationNormalized; firstVisitHappened: boolean } => ({
    firstVisitHappened: false,
    lastVisitedNonAuthPage: '/',
  }),

  actions: {
    visitedNewPage(page: RouteLocationNormalized) {
      this.firstVisitHappened = true;
      if (isPageAuthProtected(page)) {
        return;
      }
      this.lastVisitedNonAuthPage = page;
    },
  },
});
