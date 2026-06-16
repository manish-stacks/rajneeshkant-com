"use client";

import { motion } from "framer-motion";
import { stats } from "@/lib/data";

export function StatsSection() {
  return (
    <section className="bg-brand-blue py-8 lg:py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center text-white"
            >
              <p className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-1">
                {s.value}
              </p>
              <p className="text-blue-200 text-xs sm:text-sm">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}