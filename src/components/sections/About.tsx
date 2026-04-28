"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { staggerContainer } from "@/lib/animations";
import TypewriterText from "@/components/ui/TypewriterText";
import ScrollHint from "@/components/ui/ScrollHint";
import { useLang } from "@/lib/i18n/context";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const shouldReduceMotion = useReducedMotion();
  const { t } = useLang();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const bureauRef = useRef<HTMLDivElement>(null);
  const matteoRef = useRef<HTMLDivElement>(null);
  const macRef = useRef<HTMLDivElement>(null);
  const decoRef = useRef<HTMLDivElement>(null);

  const labelRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const labelInView = useInView(labelRef, { once: true, margin: "-60px" });
  const textInView = useInView(textRef, { once: true, margin: "-60px" });

  const animate = !shouldReduceMotion;
  const [activeStep, setActiveStep] = useState(0);
  const [titleDone, setTitleDone] = useState(false);
  const [bodyDone, setBodyDone] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const svgs = [bureauRef.current, matteoRef.current, macRef.current, decoRef.current];

    const ctx = gsap.context(() => {
      gsap.set(svgs, { opacity: 0, x: 120 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "+=500%",
          pin: stickyRef.current,
          scrub: 1,
          snap: {
            snapTo: "labels",
            duration: { min: 0.3, max: 0.7 },
            ease: "power2.inOut",
          },
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.18) setActiveStep(0);
            else if (p < 0.38) setActiveStep(1);
            else if (p < 0.58) setActiveStep(2);
            else if (p < 0.78) setActiveStep(3);
            else setActiveStep(4);
          },
        },
      });

      tl.addLabel("start")
        .to({}, { duration: 1 })
        .addLabel("step1")
        .fromTo(
          bureauRef.current,
          { opacity: 0, x: 120 },
          { opacity: 1, x: 0, duration: 1, ease: "power2.out" }
        )
        .addLabel("bureau")
        .fromTo(
          matteoRef.current,
          { opacity: 0, x: 120 },
          { opacity: 1, x: 0, duration: 1, ease: "power2.out" }
        )
        .addLabel("matteo")
        .fromTo(
          macRef.current,
          { opacity: 0, x: 120 },
          { opacity: 1, x: 0, duration: 1, ease: "power2.out" }
        )
        .addLabel("mac")
        .fromTo(
          decoRef.current,
          { opacity: 0, x: 120 },
          { opacity: 1, x: 0, duration: 1, ease: "power2.out" }
        )
        .addLabel("deco");
    }, wrapperRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  return (
    <div ref={wrapperRef} style={{ height: "600vh" }}>
      <div
        ref={stickyRef}
        id="about"
        style={{ backgroundColor: "var(--color-bg-accent)" }}
        className="relative w-full h-screen flex flex-col justify-start pt-16 md:pt-20 overflow-hidden"
      >
        <motion.div
          ref={labelRef}
          initial={animate ? { opacity: 0, y: 20 } : false}
          animate={labelInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mx-auto max-w-7xl px-6 md:px-16 mb-10 w-full"
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              fontWeight: 500,
              textTransform: "uppercase" as const,
              letterSpacing: "0.1em",
              color: "var(--color-yellow)",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span aria-hidden="true">●</span>
            {t.aboutSection.label}
          </span>
        </motion.div>

        <div className="mx-auto max-w-7xl px-6 md:px-16 w-full">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16 gap-12">
            {/* Texte */}
            <motion.div
              ref={textRef}
              initial={animate ? "hidden" : false}
              animate={textInView ? "visible" : "hidden"}
              variants={animate ? staggerContainer : undefined}
              className="flex flex-col gap-8 lg:flex-1"
            >
              <TypewriterText
                text={t.aboutSection.title}
                el="p"
                startDelayMs={200}
                caretColor="var(--color-white)"
                onDone={() => setTitleDone(true)}
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(28px, 4vw, 42px)",
                  fontStyle: "italic",
                  lineHeight: 1.25,
                  color: "var(--color-white)",
                }}
              />

              {titleDone && (
                <TypewriterText
                  text={t.aboutSection.body}
                  el="p"
                  startWhenVisible={false}
                  startDelayMs={150}
                  caretColor="rgba(253, 250, 244, 0.7)"
                  onDone={() => setBodyDone(true)}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "17px",
                    lineHeight: 1.75,
                    color: "rgba(253, 250, 244, 0.7)",
                    maxWidth: "52ch",
                  }}
                />
              )}

              {bodyDone && (
                <motion.p
                  initial={animate ? { opacity: 0, y: 12 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(15px, 1.8vw, 18px)",
                    fontStyle: "italic",
                    lineHeight: 1.5,
                    color: "rgba(253, 250, 244, 0.45)",
                    borderLeft: "2px solid var(--color-yellow)",
                    paddingLeft: "20px",
                  }}
                >
                  {t.aboutSection.cta}
                </motion.p>
              )}
            </motion.div>

            {/* Scène 4 SVGs */}
            <div className="lg:flex-shrink-0 lg:w-[360px] xl:w-[420px]">
              <div className="relative" style={{ paddingBottom: "140%" }}>
                {/* Matteo — derrière bureau */}
                <div
                  ref={matteoRef}
                  className="absolute bottom-[5%] left-1/2 -translate-x-1/2"
                  style={{ width: "45%", zIndex: 1 }}
                >
                  <Image
                    src="/images/Matteo.svg"
                    alt="Matteo"
                    width={266}
                    height={580}
                    className="w-full h-auto"
                    priority
                  />
                </div>

                {/* Bureau — devant Matteo */}
                <div
                  ref={bureauRef}
                  className="absolute bottom-0 left-0 right-0"
                  style={{ zIndex: 2 }}
                >
                  <Image
                    src="/images/Bureau.svg"
                    alt="Bureau"
                    width={535}
                    height={284}
                    className="w-full h-auto"
                    priority
                  />
                </div>

                {/* Deco — plante posée sur bureau, à gauche */}
                <div
                  ref={decoRef}
                  className="absolute"
                  style={{
                    bottom: "35%",
                    left: "10%",
                    width: "22%",
                    zIndex: 3,
                  }}
                >
                  <Image
                    src="/images/Deco.svg"
                    alt="Deco"
                    width={160}
                    height={158}
                    className="w-full h-auto"
                    priority
                  />
                </div>

                {/* Mac — posé sur le bureau, à droite */}
                <div
                  ref={macRef}
                  className="absolute"
                  style={{
                    bottom: "35%",
                    right: "8%",
                    width: "32%",
                    zIndex: 3,
                  }}
                >
                  <Image
                    src="/images/Mac.svg"
                    alt="Mac"
                    width={229}
                    height={220}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <ScrollHint visible={activeStep === 0} />
      </div>
    </div>
  );
}
