"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { motionPresets } from "@/lib/motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { submitContactForm } from "@/app/actions/contact.actions";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const res = await submitContactForm(data);

      if (res.success) {
        setStatus("success");
        setTimeout(() => {
          setStatus("idle");
          (e.target as HTMLFormElement).reset();
        }, 3000);
      } else {
        setStatus("error");
        setErrorMessage(res.error || "Failed to send message.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <motion.div
      variants={motionPresets.fadeUp}
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true }}
      className="glass-panel relative flex h-full flex-col justify-center overflow-hidden rounded-3xl border border-white/10 p-8 md:p-12"
    >
      <div className="bg-accent-blue/5 absolute top-0 right-0 h-64 w-64 rounded-full blur-3xl" />

      <h3 className="relative z-10 mb-2 text-3xl font-bold text-white">Send a Message</h3>
      <p className="text-muted-foreground relative z-10 mb-8">
        I'll get back to you as soon as possible.
      </p>

      <form onSubmit={handleSubmit} className="relative z-10 flex flex-1 flex-col space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-white/80">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="focus:border-accent-blue/50 w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white transition-all outline-none focus:bg-white/5"
              placeholder="John Doe"
              disabled={status === "loading" || status === "success"}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-white/80">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="focus:border-accent-blue/50 w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white transition-all outline-none focus:bg-white/5"
              placeholder="john@example.com"
              disabled={status === "loading" || status === "success"}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-medium text-white/80">
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            required
            className="focus:border-accent-blue/50 w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white transition-all outline-none focus:bg-white/5"
            placeholder="Project Inquiry"
            disabled={status === "loading" || status === "success"}
          />
        </div>

        <div className="flex flex-1 flex-col space-y-2">
          <label htmlFor="message" className="text-sm font-medium text-white/80">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="focus:border-accent-blue/50 w-full flex-1 resize-none rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white transition-all outline-none focus:bg-white/5"
            placeholder="Tell me about your project..."
            disabled={status === "loading" || status === "success"}
          />
        </div>

        <div className="flex items-center justify-between pt-4">
          <AnimatePresence mode="wait">
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-sm text-red-400"
              >
                <AlertCircle className="h-4 w-4" />
                {errorMessage}
              </motion.div>
            )}

            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-sm text-emerald-400"
              >
                <CheckCircle2 className="h-4 w-4" />
                Message sent successfully!
              </motion.div>
            )}
          </AnimatePresence>

          <MagneticButton
            className={`ml-auto flex items-center justify-center gap-2 rounded-xl px-8 py-4 font-medium ${
              status === "success"
                ? "pointer-events-none bg-emerald-500 text-white"
                : "bg-white text-black hover:bg-white/90"
            }`}
            type="submit"
            disabled={status === "loading" || status === "success"}
          >
            {status === "loading" ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : status === "success" ? (
              <>
                Sent <CheckCircle2 className="h-5 w-5" />
              </>
            ) : (
              <>
                Send Message <Send className="h-4 w-4" />
              </>
            )}
          </MagneticButton>
        </div>
      </form>
    </motion.div>
  );
}
