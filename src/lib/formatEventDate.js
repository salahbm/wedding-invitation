/**
 * Formats a date string based on the current language
 * @param {string} isoString - The ISO date string to format
 * @param {('full'|'short'|'time')} [format='full'] - The format type to use
 * @param {string} [language='en'] - The language code (en, ru, uz)
 * @returns {string} The formatted date string in the specified language
 * 
 * @example
 * // returns "Monday, January 1, 2024" (in English)
 * // returns "Понедельник, 1 января 2024" (in Russian)
 * // returns "Dushanba, 1 yanvar 2024" (in Uzbek)
 * formatEventDate("2024-01-01T00:00:00.000Z", "full", "en|ru|uz")
 * 
 * // returns "January 1, 2024" (in English)
 * formatEventDate("2024-01-01T00:00:00.000Z", "short", "en")
 * 
 * // returns "00:00"
 * formatEventDate("2024-01-01T00:00:00.000Z", "time")
 */
export const formatEventDate = (isoString, format = 'full', language = 'en') => {
    const date = new Date(isoString);

    const formats = {
        full: {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'Asia/Jakarta'
        },
        short: {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            timeZone: 'Asia/Jakarta'
        },
        time: {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: 'Asia/Jakarta'
        }
    };
    
    // Language mapping for locale strings
    const localeMap = {
        'en': 'en-US',
        'ru': 'ru-RU',
        'uz': 'uz-UZ'
    };

    // We'll use the native locale formatting for each language
    // This will automatically handle month and day names in the correct language

    // Get the appropriate locale based on language
    const locale = localeMap[language] || 'en-US';
    
    // Handle time format separately
    if (format === 'time') {
        return date.toLocaleTimeString(locale, formats[format]);
    }
    
    // Use the appropriate locale for date formatting
    let formatted = date.toLocaleDateString(locale, formats[format]);
    
    // Format adjustment for full date if needed
    if (format === 'full') {
        // For some languages, we might need specific adjustments
        // But the native locale formatting should handle most cases correctly
        const parts = formatted.split(', ');
        if (parts.length === 2) {
            formatted = `${parts[0]}, ${parts[1]}`;
        }
    }

    return formatted;
};