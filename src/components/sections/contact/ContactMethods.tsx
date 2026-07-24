"use client";

import { motion } from "framer-motion";
import { motionPresets } from "@/lib/motion";
import { profile } from "@/config/profile";
import { ArrowUpRight, Send, Mail } from "lucide-react";
import { IconBrandGithub, IconBrandTwitter, IconBrandLinkedin } from "@tabler/icons-react";

export function ContactMethods() {
  const methods = [
    {
      label: "Email",
      value: profile.personal.email,
      url: `mailto:${profile.personal.email}`,
      icon: <Mail className="w-5 h-5" />
    },
    {
      label: profile.social.github.label,
      value: "@samarth",
      url: profile.social.github.url,
      icon: <IconBrandGithub className="w-5 h-5" />
    },
    {
      label: profile.social.twitter.label,
      value: "@samarth",
      url: profile.social.twitter.url,
      icon: <IconBrandTwitter className="w-5 h-5" />
    },
    {
      label: profile.social.linkedin.label,
      value: "in/samarth",
      url: profile.social.linkedin.url,
      icon: <IconBrandLinkedin className="w-5 h-5" />
    },
    {
      label: profile.social.telegram.label,
      value: "@samarth",
      url: profile.social.telegram.url,
      icon: <Send className="w-5 h-5" />
    }
  ];

  return (
    <div className="space-y-4">
      <motion.h3 
        variants={motionPresets.fadeUp}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        className="text-2xl font-bold text-white mb-8"
      >
        Direct Links
      </motion.h3>
      
      {methods.map((method, i) => (
        <motion.a
          key={method.label}
          href={method.url}
          target="_blank"
          rel="noopener noreferrer"
          variants={motionPresets.fadeUp}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="group flex items-center justify-between p-5 rounded-2xl glass-panel border border-white/5 hover:border-white/20 transition-all duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground group-hover:text-white transition-colors group-hover:bg-accent-blue/20">
              {method.icon}
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">{method.label}</p>
              <p className="text-white font-mono text-sm">{method.value}</p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center transform group-hover:bg-white group-hover:text-black transition-all group-hover:scale-110">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </motion.a>
      ))}
    </div>
  );
}
