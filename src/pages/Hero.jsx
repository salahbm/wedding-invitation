import { Download, Heart, LoaderCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { formatEventDate } from "@/lib/formatEventDate";
import config from "@/config/config";
import { CountdownTimer } from "@/components/shared/CountDownTimer";

export default function Hero() {
  const { t, i18n } = useTranslation();
  const [guestName, setGuestName] = useState("");
  const cardRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState(false);

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
    if (!cardRef.current || isDownloading) return;
    setIsDownloading(true);
    setDownloadError(false);

    try {
      const { default: html2canvas } = await import("html2canvas");
      await document.fonts.ready;
      await Promise.all(
        Array.from(cardRef.current.querySelectorAll("img"), (image) =>
          image.decode(),
        ),
      );
      const canvas = await html2canvas(cardRef.current, {
        useCORS: true,
        backgroundColor: "#fdfbf7",
        scale: 2,
      });
      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/png"),
      );
      if (!blob) throw new Error("Unable to generate invitation image");
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
      setDownloadError(true);
    } finally {
      setIsDownloading(false);
    }
  };

  useEffect(() => {
    const guestParam = new URLSearchParams(window.location.search).get("guest");
    if (guestParam) setGuestName(guestParam);
  }, []);

  return (
    <section
      id="home"
      aria-labelledby="invitation-heading"
      className="relative flex w-full flex-col items-center px-4 pb-12 pt-24 text-center sm:px-8 sm:pb-16"
    >
      <motion.article
        ref={cardRef}
        variants={cardVariants}
        initial="hidden"
        animate="show"
        className="w-full max-w-xl overflow-hidden border border-border bg-card shadow-[0_12px_48px_hsl(var(--primary)_/_0.06)]"
      >
        <motion.div variants={contentVariants} initial="hidden" animate="show">
          <div className="px-6 pb-8 pt-8 sm:px-12 sm:pb-10 sm:pt-10">
            <motion.p
              variants={itemVariants}
              className="mx-auto max-w-xs text-xs leading-relaxed text-muted-foreground"
            >
              {t("hero.bismillah")}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="my-6 flex items-center justify-center gap-4 text-primary-300"
              aria-hidden="true"
            >
              <span className="h-px w-12 bg-primary-200" />
              <Heart className="h-4 w-4" strokeWidth={1.25} />
              <span className="h-px w-12 bg-primary-200" />
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-secondary-foreground">
                {t("hero.weddingOf")}
              </p>
              <h1
                id="invitation-heading"
                className="font-serif text-[clamp(2rem,9vw,3.5rem)] font-normal leading-[1.12] tracking-tight text-primary"
              >
                <span className="block break-words">
                  {config.data.groomName}
                </span>
                <span className="my-2 block text-2xl italic text-muted-foreground">
                  {t("hero.and")}
                </span>
                <span className="block break-words">
                  {config.data.brideName}
                </span>
              </h1>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="mx-auto mt-6 max-w-sm break-words text-sm leading-relaxed text-gray-600"
            >
              {guestName
                ? t("landing.personalInvitation", { guestName })
                : t("landing.generalInvitation")}
            </motion.p>
          </div>

          <motion.div
            variants={itemVariants}
            className="relative isolate flex min-h-40 items-center justify-center overflow-hidden bg-[#252c25] px-6 py-8 sm:min-h-48"
          >
            <img
              src="/images/hero.jpg"
              alt=""
              className="absolute inset-0 -z-20 h-full w-full object-cover object-[center_60%]"
            />
            <div className="absolute inset-0 -z-10 bg-[#19231d]/75" />
            <div className="text-white">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#e8d6bd]">
                {t("hero.saveTheDate")}
              </p>
              <p className="mt-3 font-serif text-2xl leading-snug">
                <time dateTime={config.data.date}>
                  {formatEventDate(
                    config.data.date,
                    "short",
                    i18n.resolvedLanguage,
                  )}
                </time>
              </p>
              <p className="mt-3 text-sm text-white/90">
                <span className="tabular-nums">{config.data.time}</span>
                <span className="mx-3" aria-hidden="true">
                  ·
                </span>
                {config.data.location}
              </p>
            </div>
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
        disabled={isDownloading}
        aria-busy={isDownloading}
        className="mt-6 flex min-h-12 max-w-full items-center justify-center gap-3 rounded-full border border-primary-200 bg-card px-6 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary-50 disabled:cursor-wait disabled:opacity-70"
      >
        {isDownloading ? (
          <LoaderCircle
            className="h-4 w-4 shrink-0 animate-spin"
            aria-hidden="true"
          />
        ) : (
          <Download className="h-4 w-4 shrink-0" aria-hidden="true" />
        )}
        {t(isDownloading ? "hero.preparingCard" : "hero.downloadCard")}
      </motion.button>
      {downloadError && (
        <p role="alert" className="mt-3 max-w-sm text-sm text-destructive">
          {t("hero.downloadError")}
        </p>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.3 }}
        className="mt-12 w-full max-w-xl border-t border-border pt-8"
      >
        <p className="mx-auto max-w-sm font-serif text-xl leading-relaxed text-gray-700">
          {t("hero.withJoy")}
        </p>
        <CountdownTimer targetDate={config.data.date} />
      </motion.div>
    </section>
  );
}
