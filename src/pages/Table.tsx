// Install dependencies first:
// npm install html2canvas

// Install dependencies first:
// npm install html2canvas jspdf

import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import {
  Calendar,
  Clock,
  LocateFixedIcon,
  LocateIcon,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Printer,
  Download,
  FileText,
} from 'lucide-react';

const TableNumber = () => {
  const [tableNumber, setTableNumber] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const cardRef = useRef(null);

  // Handle table number navigation
  const incrementTable = () => setTableNumber((prev) => Math.min(prev + 1, 33));
  const decrementTable = () => setTableNumber((prev) => Math.max(prev - 1, 1));

  // Download a single table number
  const handleDownloadSingle = async () => {
    const element = cardRef.current;
    // Scale increases quality (e.g., 4x default DPI for higher print quality)
    // Using scale 4 for high resolution while maintaining A4 compatibility
    const canvas = await html2canvas(element, { scale: 4, useCORS: true });
    const imgData = canvas.toDataURL('image/jpeg', 1.0); // Using JPEG with highest quality (1.0)

    // Create a download link for the high-quality JPG
    const link = document.createElement('a');
    link.href = imgData;
    link.download = `table-number-${tableNumber}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Generate a PDF with 8 cards per A4 page (2 rows x 4 columns layout)
  const handleDownloadBatch = async () => {
    setIsGenerating(true);
    setProgress(0);

    const element = cardRef.current;
    const copies = 12; // Total copies needed
    const cardsPerPage = 6; // 6 cards per A4 page
    const totalPages = Math.ceil(copies / cardsPerPage);

    try {
      // Generate the image once
      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/jpeg', 1.0);

      // Create PDF (A4 size in landscape: 297mm x 210mm)
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      // A4 landscape dimensions
      const pageWidth = 297;
      const pageHeight = 210;

      // Card dimensions on the PDF (90mm x 99mm) - larger width for 3-column layout
      // Arrange 3 cards horizontally (across) and 2 cards vertically (down)
      const cardWidth = 70; // Wider cards for 3-column layout
      const cardHeight = 99; // Same height as before

      // Add gaps between cards for easier cutting (5mm gaps)
      const gapSize = 5; // 5mm gap between cards

      // Calculate total width and height including gaps
      const totalWidth = cardWidth * 3 + gapSize * 2; // 3 cards with 2 gaps between them
      const totalHeight = cardHeight * 2 + gapSize; // 2 cards with 1 gap between them

      // Calculate margins to center the cards on the page
      const horizontalMargin = (pageWidth - totalWidth) / 2;
      const verticalMargin = (pageHeight - totalHeight) / 2;

      let cardsAdded = 0;
      let currentPage = 0;

      while (cardsAdded < copies) {
        if (currentPage > 0) {
          pdf.addPage();
        }

        // Add 6 cards to the current page (or remaining cards if less than 6)
        // Arrange 3 cards horizontally (across) and 2 cards vertically (down)
        for (let row = 0; row < 2 && cardsAdded < copies; row++) {
          for (let col = 0; col < 3 && cardsAdded < copies; col++) {
            // Calculate position with gaps between cards
            const xPos = horizontalMargin + col * (cardWidth + gapSize);
            const yPos = verticalMargin + row * (cardHeight + gapSize);

            pdf.addImage(imgData, 'JPEG', xPos, yPos, cardWidth, cardHeight);
            cardsAdded++;

            // Update progress
            setProgress(Math.round((cardsAdded / copies) * 100));
          }
        }

        currentPage++;
      }

      // Save the PDF
      pdf.save(`table-${tableNumber}-cards.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Generate PDFs for all table numbers (1-33) with 13 copies each
  const handleGenerateAllTables = async () => {
    setIsGenerating(true);
    setProgress(0);

    try {
      const totalTables = 33;
      let tablesProcessed = 0;

      // Process one table number at a time
      for (let table = 1; table <= totalTables; table++) {
        // Update the table number
        setTableNumber(table);

        // Wait for the component to update with the new table number
        await new Promise((resolve) => setTimeout(resolve, 100));

        const element = cardRef.current;
        const copies = 13; // Total copies needed
        const cardsPerPage = 6; // 6 cards per A4 page

        // Generate the image for current table number
        const canvas = await html2canvas(element, { scale: 2, useCORS: true });
        const imgData = canvas.toDataURL('image/jpeg', 1.0);

        // Create PDF (A4 size in landscape: 297mm x 210mm)
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'mm',
          format: 'a4',
        });

        // A4 landscape dimensions
        const pageWidth = 297;
        const pageHeight = 210;

        // Card dimensions on the PDF (90mm x 99mm) - larger width for 3-column layout
        // Arrange 3 cards horizontally (across) and 2 cards vertically (down)
        const cardWidth = 90; // Wider cards for 3-column layout
        const cardHeight = 99; // Same height as before

        // Add gaps between cards for easier cutting (5mm gaps)
        const gapSize = 5; // 5mm gap between cards

        // Calculate total width and height including gaps
        const totalWidth = cardWidth * 3 + gapSize * 2; // 3 cards with 2 gaps between them
        const totalHeight = cardHeight * 2 + gapSize; // 2 cards with 1 gap between them

        // Calculate margins to center the cards on the page
        const horizontalMargin = (pageWidth - totalWidth) / 2;
        const verticalMargin = (pageHeight - totalHeight) / 2;

        let cardsAdded = 0;
        let currentPage = 0;

        while (cardsAdded < copies) {
          if (currentPage > 0) {
            pdf.addPage();
          }

          // Add 6 cards to the current page (or remaining cards if less than 6)
          // Arrange 3 cards horizontally (across) and 2 cards vertically (down)
          for (let row = 0; row < 2 && cardsAdded < copies; row++) {
            for (let col = 0; col < 3 && cardsAdded < copies; col++) {
              // Calculate position with gaps between cards
              const xPos = horizontalMargin + col * (cardWidth + gapSize);
              const yPos = verticalMargin + row * (cardHeight + gapSize);

              pdf.addImage(imgData, 'JPEG', xPos, yPos, cardWidth, cardHeight);
              cardsAdded++;
            }
          }

          currentPage++;
        }

        // Save the PDF
        pdf.save(`table-${table}-cards.pdf`);

        tablesProcessed++;
        setProgress(Math.round((tablesProcessed / totalTables) * 100));

        // Small delay between processing tables
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    } catch (error) {
      console.error('Error generating PDFs:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-4 px-8">
      <h1>TABLE CARDS VIEW (DEV VIEW)</h1>
      <div className="mb-4 text-sm text-gray-600">
        Card size: 90mm × 99mm (fits 6 on A4 landscape)
      </div>

      {/* Table number controls */}
      <div className="flex items-center justify-center space-x-4 mb-4">
        <button
          onClick={decrementTable}
          disabled={tableNumber <= 1}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="text-xl font-medium">Table {tableNumber} of 33</div>
        <button
          onClick={incrementTable}
          disabled={tableNumber >= 33}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div
        ref={cardRef}
        className="relative w-[90mm] h-[130mm] overflow-hidden bg-white shadow-lg border-1 border-rose-200/20"
      >
        {/* Background image with soft overlay */}
        {/* 👰🏻 Background image */}
        <picture className="absolute inset-0 z-0">
          <img
            src="/images/couple-1.jpeg"
            alt="Background"
            className="w-full h-full object-cover opacity-70"
          />
        </picture>

        <div className="absolute inset-0 bg-gradient-to-b from-rose-100/40 to-white/20" />

        <div className="relative px-6 flex flex-col items-center justify-between h-full pb-10 z-10">
          {/* top line */}
          <div className="absolute top-0 -translate-y-px left-1/2 -translate-x-1/2">
            <div className="w-24 sm:w-36 h-0.5 bg-gradient-to-r from-transparent via-rose-200 to-transparent" />
          </div>

          <main className="text-center flex flex-1 flex-col items-center justify-center -mt-24">
            <h1 className="text-[150px] font-mono">{tableNumber}</h1>
            {/* Separator */}
          </main>

          {/* bottom line */}
          <footer className="mt-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 sm:w-12 bg-rose-200/70" />
              <div className="w-2 h-2 rounded-full bg-rose-200" />
              <div className="h-px w-8 sm:w-12 bg-rose-200/70" />
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-px">
              <div className="w-24 sm:w-36 h-0.5 bg-gradient-to-r from-transparent via-rose-200 to-transparent" />
            </div>
            <h1 className="font-serif text-gray-800 flex items-center justify-center">
              <div className="text-lg mb-2">Muhammad</div>
              <div className="text-lg mb-2">
                <span className="text-rose-400 mx-2 text-md font-thin">&</span>
                Saodat
              </div>
            </h1>
            <div className="flex items-center justify-center">
              <span className="text-gray-700 font-medium mx-auto text-xs">
                14.08.2025
              </span>
            </div>
          </footer>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center space-y-4">
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={handleDownloadSingle}
            className="px-6 py-3 text-lg font-medium text-white bg-gray-800 rounded hover:bg-gray-700 transition-colors flex items-center"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Single Card
          </button>

          <button
            onClick={handleDownloadBatch}
            disabled={isGenerating}
            className="px-6 py-3 text-lg font-medium text-white bg-rose-500 rounded hover:bg-rose-600 transition-colors flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <FileText className="w-5 h-5 mr-2" />
            {isGenerating
              ? `Generating... ${progress}%`
              : `Generate PDF (12 copies)`}
          </button>

          <button
            onClick={handleGenerateAllTables}
            disabled={isGenerating}
            className="px-6 py-3 text-lg font-medium text-white bg-purple-600 rounded hover:bg-purple-700 transition-colors flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <Printer className="w-5 h-5 mr-2" />
            {isGenerating
              ? `Processing... ${progress}%`
              : `Generate All Tables (1-33)`}
          </button>
        </div>

        {isGenerating && (
          <div className="w-full max-w-md bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-rose-500 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableNumber;
