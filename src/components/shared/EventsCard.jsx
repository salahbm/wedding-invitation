// EventCard.jsx
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import {
  Calendar,
  Clock,
  MapPin,
  CalendarPlus,
  X,
  Chrome,
  Apple,
  Calendar as CalendarIcon,
} from "lucide-react";
import { formatEventDate } from "@/lib/formatEventDate";

const Modal = ({ isOpen, onClose, children }) => {
  const dialogRef = useRef(null);
  const { t } = useTranslation();
  useEffect(() => {
    if (!isOpen) return;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector("button")?.focus();
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;
      const buttons = dialogRef.current?.querySelectorAll("button");
      if (!buttons?.length) return;
      const first = buttons[0];
      const last = buttons[buttons.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus();
    };
  }, [isOpen, onClose]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={t("events.addToCalendar")}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="relative max-h-[85svh] w-full max-w-sm overflow-y-auto rounded-3xl border border-border bg-card p-6 shadow-xl"
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

const CalendarButton = ({ icon: Icon, label, onClick, className = "" }) => (
  <motion.button
    onClick={onClick}
    className={`flex items-center space-x-3 w-full p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors ${className}`}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <Icon className="w-5 h-5" />
    <span className="text-gray-700 font-medium">{label}</span>
  </motion.button>
);

/**
 * SingleEventCard component displays an event card with options to add the event
 * to various calendars (Google Calendar, Apple Calendar, and Outlook Calendar).
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.eventData - Object containing event data.
 * @param {string} props.eventData.date - The date of the event (expected format: YYYY-MM-DD).
 * @param {string} props.eventData.startTime - The start time of the event (expected format: HH:mm).
 * @param {string} props.eventData.endTime - The end time of the event (expected format: HH:mm).
 * @param {string} props.eventData.title - The title of the event.
 * @param {string} props.eventData.description - A description of the event.
 * @param {string} props.eventData.location - The location where the event takes place.
 * @param {string} props.eventData.timeZone - The time zone of the event.
 *
 * @example
 * const eventData = {
 *   date: '2023-10-15',
 *   startTime: '14:00',
 *   endTime: '16:00',
 *   title: 'Wedding Ceremony - Reception',
 *   description: 'Join us to celebrate the wedding ceremony and reception.',
 *   location: 'Sunset Gardens',
 *   timeZone: 'Asia/Samarkand'
 * };
 *
 * <SingleEventCard eventData={eventData} />
 *
 * @returns {JSX.Element} A JSX element representing the event card.
 */
const SingleEventCard = ({ eventData }) => {
  const { t, i18n } = useTranslation();
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  const googleCalendarLink = () => {
    const startDate = new Date(`${eventData.date}T${eventData.startTime}:00`);
    const endDate = new Date(`${eventData.date}T${eventData.endTime}:00`);

    const formatDate = (date) => {
      return date.toISOString().replace(/-|:|\.\d+/g, "");
    };

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventData.title)}&dates=${formatDate(startDate)}/${formatDate(endDate)}&details=${encodeURIComponent(eventData.description)}&location=${encodeURIComponent(eventData.location)}&ctz=${eventData.timeZone}`;
  };

  const generateICSContent = () => {
    const startDate = new Date(`${eventData.date}T${eventData.startTime}:00`);
    const endDate = new Date(`${eventData.date}T${eventData.endTime}:00`);

    const formatICSDate = (date) => {
      return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    };

    return `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
URL:${window.location.href}
DTSTART:${formatICSDate(startDate)}
DTEND:${formatICSDate(endDate)}
SUMMARY:${eventData.title}
DESCRIPTION:${eventData.description}
LOCATION:${eventData.location}
END:VEVENT
END:VCALENDAR`;
  };

  const downloadICSFile = () => {
    const icsContent = generateICSContent();
    const blob = new Blob([icsContent], {
      type: "text/calendar;charset=utf-8",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${eventData.title.toLowerCase().replace(/ /g, "-")}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative">
      <motion.div
        className="bg-card rounded-3xl p-6 border border-border space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800">
            {eventData.title.split(" - ")[0]}
          </h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="min-h-11 min-w-11 flex items-center justify-center rounded-full bg-primary-50 text-primary hover:bg-primary-100 transition-colors"
            aria-label={t("events.addToCalendar")}
            onClick={() => setShowCalendarModal(true)}
          >
            <CalendarPlus className="w-5 h-5" />
          </motion.button>
        </div>
        <div className="space-y-3 text-gray-600">
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 shrink-0 text-primary-500" />
            <span className="capitalize">
              {formatEventDate(eventData.date, "full", i18n.language)}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 shrink-0 text-primary-500" />
            <span>
              {eventData.startTime} - {eventData.endTime}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="w-5 h-5 shrink-0 text-primary-500" />
            <span>{eventData.location}</span>
          </div>
        </div>
      </motion.div>

      <Modal
        isOpen={showCalendarModal}
        onClose={() => setShowCalendarModal(false)}
      >
        <div className="space-y-6 ">
          <div className="flex justify-between  items-center">
            <h3 className="text-xl font-semibold text-gray-800">
              {t("events.addToCalendar")}
            </h3>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowCalendarModal(false)}
              aria-label={t("controls.close")}
              className="min-h-11 min-w-11 flex items-center justify-center rounded-full text-gray-500 hover:bg-muted"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          <div className="space-y-3">
            <CalendarButton
              icon={(props) => (
                <Chrome
                  {...props}
                  className="w-5 h-5 shrink-0 text-primary-500"
                />
              )}
              label={t("events.googleCalendar")}
              onClick={() => window.open(googleCalendarLink(), "_blank")}
            />

            <CalendarButton
              icon={(props) => (
                <Apple {...props} className="w-5 h-5 text-gray-900" />
              )}
              label={t("events.appleCalendar")}
              onClick={downloadICSFile}
            />

            <CalendarButton
              icon={(props) => (
                <CalendarIcon {...props} className="w-5 h-5 text-blue-600" />
              )}
              label={t("events.outlookCalendar")}
              onClick={downloadICSFile}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

// Main EventCards component that handles multiple events
const EventCards = ({ events }) => {
  return (
    <div className="space-y-4">
      {events.map((event, index) => (
        <SingleEventCard key={index} eventData={event} />
      ))}
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

CalendarButton.propTypes = {
  icon: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

SingleEventCard.propTypes = {
  eventData: PropTypes.shape({
    date: PropTypes.string.isRequired,
    startTime: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    timeZone: PropTypes.string,
  }).isRequired,
};

EventCards.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      startTime: PropTypes.string.isRequired,
      endTime: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      location: PropTypes.string.isRequired,
      timeZone: PropTypes.string,
    }),
  ).isRequired,
};

export default EventCards;
