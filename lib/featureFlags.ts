"use client";

import { useEffect, useMemo } from "react";

import { featureFlags, type FeatureFlagKey } from "@/config/featureFlags";
import { track } from "@/lib/analytics";

const OVERRIDE_PREFIX = "maidshield.feature_flag.";

function getStoredOverride(flag: FeatureFlagKey): boolean | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(`${OVERRIDE_PREFIX}${flag}`);
  if (raw === "true") {
    return true;
  }
  if (raw === "false") {
    return false;
  }

  return null;
}

export function useFeatureFlag(flag: FeatureFlagKey) {
  const isEnabled = useMemo(() => {
    const override = getStoredOverride(flag);
    if (override !== null) {
      return override;
    }
    return featureFlags[flag].enabled;
  }, [flag]);

  useEffect(() => {
    track("feature_flag_exposed", {
      flag,
      enabled: isEnabled,
    });
  }, [flag, isEnabled]);

  return isEnabled;
}
