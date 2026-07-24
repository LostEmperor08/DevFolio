"use client";

import { ContactHero } from "@/components/sections/contact/ContactHero";
import { AvailabilityStatus } from "@/components/sections/contact/AvailabilityStatus";
import { ContactMethods } from "@/components/sections/contact/ContactMethods";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { SupportMyWork } from "@/components/sections/contact/SupportMyWork";

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col items-center pb-0 relative overflow-x-hidden pt-32 bg-black">
      <ContactHero />
      <AvailabilityStatus />
      
      <div className="w-full max-w-[1200px] px-6 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 py-20 relative z-10">
        <div className="lg:col-span-5">
          <ContactMethods />
        </div>
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>

      <SupportMyWork />
    </main>
  );
}
