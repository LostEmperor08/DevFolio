"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { sfx } from "@/lib/audio";

export type PersonaMode = "crimson" | "moonlight";

interface PersonaContextType {
  persona: PersonaMode;
  setPersona: (mode: PersonaMode) => void;
  togglePersona: () => void;
}

const PersonaContext = createContext<PersonaContextType>({
  persona: "crimson",
  setPersona: () => {},
  togglePersona: () => {},
});

export function PersonaProvider({ children }: { children: React.ReactNode }) {
  const [persona, setPersonaState] = useState<PersonaMode>("crimson");

  useEffect(() => {
    const saved = localStorage.getItem("devfolio_persona") as PersonaMode;
    if (saved === "crimson" || saved === "moonlight") {
      setPersonaState(saved);
    }
  }, []);

  const setPersona = (mode: PersonaMode) => {
    setPersonaState(mode);
    sfx.playMechanicalSwitch();
    if (typeof window !== "undefined") {
      localStorage.setItem("devfolio_persona", mode);
    }
  };

  const togglePersona = () => {
    const next = persona === "crimson" ? "moonlight" : "crimson";
    setPersona(next);
  };

  return (
    <PersonaContext.Provider value={{ persona, setPersona, togglePersona }}>
      {children}
    </PersonaContext.Provider>
  );
}

export function usePersona() {
  return useContext(PersonaContext);
}
