interface Window {
  OBCustomClickHandler?: (
    link: HTMLElement,
    event: Event,
    clickType: "paid-rec" | "organic-rec",
    extraParams: { orgUrl: string }
  ) => boolean;
  app_data?: {
    notifications?: boolean;
    pushCategories?: {
      object_id: number;
      enabled: boolean;
    }[];
    outbrain?: {
      userId?: string;
      appId?: string;
      appVer?: string;
      installationKey?: string;
      obUserId?: string;
      obAppId?: string;
      obAppVer?: string;
      obInstallationKey?: string;
    };
  };
  app_functions?: {
    toggleNotifications: () => void;
    getPushCategories: (
      categoryIds: number[],
      callback: (
        payload:
          | { all_categories: true }
          | { object_id: number; enabled: boolean }[]
          | undefined
      ) => void
    ) => void;
    setPushCategories: (
      payload:
        | { all_categories: true }
        | { object_id: number; enabled: boolean }[]
    ) => void;
    nativeShare: (url: string) => void;
    setNativeMaavronTargeting: (targeting: string) => void;
    showNativeMaavron: (placementId: string) => void;
    setp14sub: (userId: string) => void;
    clearp14sub: () => void;
  };
  redGalaxy: {
    Player: new (id: string) => {
      setup: (config: any) => any;
      destroy: () => void;
    };
  };
  grecaptcha?: {
    execute: (siteKey: string, options: { action: string }) => Promise<string>;
    ready?: (callback: () => void) => void;
  };
}
