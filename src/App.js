import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import './App.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function App() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="App">
      <h1>PDF Viewer</h1>
      <div className="pdf-controls">
        <button onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber <= 1}>
          Previous
        </button>
        <span>
          Page {pageNumber} of {numPages}
        </span>
        <button onClick={() => setPageNumber(pageNumber + 1)} disabled={pageNumber >= numPages}>
          Next
        </button>
        <button onClick={() => setScale(scale + 0.1)}>Zoom In</button>
        <button onClick={() => setScale(scale - 0.1)}>Zoom Out</button>
      </div>
      <Document
        file="sample.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} scale={scale} />
      </Document>
    </div>
  );
}

export default App;