import { Download, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Fragment, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import html2canvas from "html2canvas";
import config from "@/config/config";
import { CountdownTimer } from "@/components/shared/CountDownTimer";

export default function Hero() {
  const { t } = useTranslation();
  const [guestName, setGuestName] = useState("");
  const cardRef = useRef(null);

  const cardVariants = {
    hidden: { opacity: 0, y: 28, scale: 0.94 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 115, damping: 18, mass: 0.8 },
    },
  };

  const contentVariants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.09, delayChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.48, ease: "easeOut" },
    },
  };

  const downloadFile = (canvas) => {
    const link = document.createElement("a");
    link.download = `${config.data.groomName}-${config.data.brideName}-Wedding-Invitation.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#fdfbf7",
        scale: 2,
      });
      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/png"),
      );
      const file = new File(
        [blob],
        `${config.data.groomName}-${config.data.brideName}-Wedding-Invitation.png`,
        { type: "image/png" },
      );
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        );

      if (isMobile && navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: t("landing.invitation"),
          });
        } catch (error) {
          if (error.name !== "AbortError") downloadFile(canvas);
        }
      } else {
        downloadFile(canvas);
      }
    } catch (error) {
      console.error("Error generating card image:", error);
    }
  };

  useEffect(() => {
    const guestParam = new URLSearchParams(window.location.search).get("guest");
    if (guestParam) setGuestName(guestParam);
  }, []);

  return (
    <Fragment>
      <section
        id="home"
        className="relative flex w-full flex-col items-center overflow-hidden px-4 pb-12 pt-20 text-center sm:pb-16 sm:pt-24"
      >
        <div className="pointer-events-none absolute -left-20 top-36 h-56 w-56 rounded-full bg-primary-100/45 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-12 h-64 w-64 rounded-full bg-accent/80 blur-3xl" />

        <motion.article
          ref={cardRef}
          variants={cardVariants}
          initial="hidden"
          animate="show"
          className="relative min-h-[470px] w-full max-w-[430px] overflow-hidden rounded-[28px] border border-primary-100 bg-card shadow-[0_16px_48px_hsl(var(--primary)_/_0.08)] sm:min-h-[520px]"
        >
          <img
            src="/images/hero.jpg"
            alt="Wedding invitation background"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-[#fffaf7]/45 to-white/90" />
          <div className="absolute inset-3 rounded-[22px] border border-white/80" />

          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="show"
            className="relative z-10 flex min-h-[470px] flex-col px-5 py-7 sm:min-h-[520px] sm:px-9 sm:py-9"
          >
            <motion.div variants={itemVariants}>
              <p className="mx-auto max-w-xs text-[11px] font-medium leading-relaxed tracking-wide text-primary-600 sm:text-sm">
                {t("hero.bismillah")}
              </p>
              <div className="mx-auto mt-4 flex w-32 items-center gap-3 text-primary-300">
                <span className="h-px flex-1 bg-current" />
                <Heart className="h-3 w-3" fill="currentColor" />
                <span className="h-px flex-1 bg-current" />
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-1 flex-col items-center justify-center py-6"
            >
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-gray-500">
                {t("hero.weddingOf")}
              </p>
              <h1 className="font-serif text-[2.35rem] leading-[1.05] text-gray-800 sm:text-5xl">
                <span className="block">{config.data.groomName}</span>
                <span className="my-1 block text-2xl font-normal italic text-primary-400 sm:my-2 sm:text-3xl">
                  {t("hero.and")}
                </span>
                <span className="block">{config.data.brideName}</span>
              </h1>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-3">
              <p className="rounded-xl bg-white/55 px-3 py-2 text-sm font-medium leading-relaxed text-primary-600 backdrop-blur-sm">
                {guestName
                  ? t("landing.personalInvitation", { guestName })
                  : t("landing.generalInvitation")}
              </p>
            </motion.div>
          </motion.div>
        </motion.article>

        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.45 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleDownload}
          className="mt-6 min-h-12 flex items-center gap-2 rounded-full border border-primary-200 bg-white/90 px-5 py-2.5 text-sm font-semibold text-primary-600 shadow-sm backdrop-blur-sm transition-colors hover:bg-primary-50"
        >
          <Download className="h-4 w-4" />
          {t("hero.downloadCard")}
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.3 }}
          className="relative z-10 mt-10 w-full max-w-2xl"
        >
          <span className="inline-flex rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-primary-600">
            {t("hero.saveTheDate")}
          </span>
          <p className="mx-auto mt-4 max-w-md text-sm italic leading-relaxed text-gray-500 sm:text-base">
            {t("hero.withJoy")}
          </p>

          <CountdownTimer targetDate={config.data.date} />

          <div className="mt-9 flex items-center justify-center gap-4 text-primary-300">
            <span className="h-px w-16 bg-primary-200" />
            <Heart className="h-5 w-5" fill="currentColor" />
            <span className="h-px w-16 bg-primary-200" />
          </div>
        </motion.div>
      </section>
    </Fragment>
  );
}
