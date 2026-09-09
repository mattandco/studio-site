"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { TypewriterAudio } from "@/lib/typewriterAudio";

type StrikeKind = "key" | "space";

type MotionContextValue = {
  reduceMotion: boolean;
  soundOn: boolean;
  toggleSound: () => void;
  strike: (kind: StrikeKind) => void;
  bell: () => void;
  /** increments every time sound is turned on, so listeners can react */
  soundEnabledTick: number;
};

const MotionContext = createContext<MotionContextValue | null>(null);

export function useMotion() {
  const ctx = useContext(MotionContext);
  if (!ctx) {
    throw new Error("useMotion must be used within a MotionProvider");
  }
  return ctx;
}

const REDUCE_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia(REDUCE_MOTION_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCE_MOTION_QUERY).matches;
}

function getReducedMotionServerSnapshot() {
  // No motion preference is known on the server; the client re-syncs to the
  // real value immediately after hydration via useSyncExternalStore.
  return false;
}

export function MotionProvider({ children }: { children: ReactNode }) {
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
  const [soundOn, setSoundOn] = useState(false);
  const [soundEnabledTick, setSoundEnabledTick] = useState(0);
  const [audio] = useState(() => new TypewriterAudio());

  useEffect(() => {
    return () => {
      audio.close();
    };
  }, [audio]);

  const strike = useCallback(
    (kind: StrikeKind) => {
      audio.strike(kind);
    },
    [audio]
  );

  const bell = useCallback(() => {
    audio.bell();
  }, [audio]);

  const toggleSound = useCallback(() => {
    setSoundOn((prev) => {
      const next = !prev;
      if (next) {
        audio.init();
        audio.resume();
        audio.setEnabled(true);
        setSoundEnabledTick((n) => n + 1);
      } else {
        audio.setEnabled(false);
      }
      return next;
    });
  }, [audio]);

  return (
    <MotionContext.Provider
      value={{
        reduceMotion,
        soundOn,
        toggleSound,
        strike,
        bell,
        soundEnabledTick,
      }}
    >
      {children}
    </MotionContext.Provider>
  );
}
