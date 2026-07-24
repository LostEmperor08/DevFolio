"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { motionPresets } from "@/lib/motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    // Spam protection architecture (e.g. check a hidden honeypot field or reCAPTCHA token here)

    try {
      // Mock network request
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Simulate successful submission
      setStatus("success");
      
      // Reset after 3 seconds
      setTimeout(() => {
        setStatus("idle");
        (e.target as HTMLFormElement).reset();
      }, 3000);
    } catch (err) {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try emailing me directly.");
    }
  };

  return (
    <motion.div 
      variants={motionPresets.fadeUp}
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true }}
      className="p-8 md:p-12 rounded-3xl glass-panel border border-white/10 relative overflow-hidden h-full flex flex-col justify-center"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent-blue/5 rounded-full blur-3xl" />
      
      <h3 className="text-3xl font-bold text-white mb-2 relative z-10">Send a Message</h3>
      <p className="text-muted-foreground mb-8 relative z-10">I'll get back to you as soon as possible.</p>

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10 flex-1 flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-white/80">Name</label>
            <input 
              id="name"
              type="text" 
              required
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-accent-blue/50 focus:bg-white/5 transition-all"
              placeholder="John Doe"
              disabled={status === "loading" || status === "success"}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-white/80">Email</label>
            <input 
              id="email"
              type="email" 
              required
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-accent-blue/50 focus:bg-white/5 transition-all"
              placeholder="john@example.com"
              disabled={status === "loading" || status === "success"}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-medium text-white/80">Subject</label>
          <input 
            id="subject"
            type="text" 
            required
            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-accent-blue/50 focus:bg-white/5 transition-all"
            placeholder="Project Inquiry"
            disabled={status === "loading" || status === "success"}
          />
        </div>

        <div className="space-y-2 flex-1 flex flex-col">
          <label htmlFor="message" className="text-sm font-medium text-white/80">Message</label>
          <textarea 
            id="message"
            required
            rows={5}
            className="w-full flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-accent-blue/50 focus:bg-white/5 transition-all resize-none"
            placeholder="Tell me about your project..."
            disabled={status === "loading" || status === "success"}
          />
        </div>

        <div className="pt-4 flex items-center justify-between">
          <AnimatePresence mode="wait">
            {status === "error" && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-red-400 text-sm"
              >
                <AlertCircle className="w-4 h-4" />
                {errorMessage}
              </motion.div>
            )}
            
            {status === "success" && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-emerald-400 text-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                Message sent successfully!
              </motion.div>
            )}
          </AnimatePresence>

          <MagneticButton 
            className={`px-8 py-4 rounded-xl flex items-center justify-center gap-2 font-medium ml-auto ${
              status === "success" 
                ? "bg-emerald-500 text-white pointer-events-none" 
                : "bg-white text-black hover:bg-white/90"
            }`}
            type="submit"
            disabled={status === "loading" || status === "success"}
          >
            {status === "loading" ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : status === "success" ? (
              <>Sent <CheckCircle2 className="w-5 h-5" /></>
            ) : (
              <>Send Message <Send className="w-4 h-4" /></>
            )}
          </MagneticButton>
        </div>
      </form>
    </motion.div>
  );
}
