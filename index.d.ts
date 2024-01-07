declare module '#app' {
    interface PageMeta {
      settingsItems?: Array< {
        title: string;
        href: string;
      }>,
      stupid: boolean,
    }
  }