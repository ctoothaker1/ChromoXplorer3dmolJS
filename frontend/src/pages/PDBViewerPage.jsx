import { useEffect, useRef, useState } from 'react';
import styles from './PDBViewerPage.module.css';

export default function PDBViewerPage() {
  const viewerRef = useRef(null);
  const containerRef = useRef(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pdbUrl, setPdbUrl] = useState('https://files.rcsb.org/download/1YCR.pdb');
  const [inputUrl, setInputUrl] = useState('https://files.rcsb.org/download/1YCR.pdb');
  const [selectedAtom, setSelectedAtom] = useState(null);
  const [currentStyle, setCurrentStyle] = useState('cartoon');

  useEffect(() => {
    const init3Dmol = async () => {
      try {
        if (!window.$3Dmol) {
          const script = document.createElement('script');
          script.src = 'https://3Dmol.org/build/3Dmol-min.js';
          script.async = true;
          
          await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
        }

        const config = { backgroundColor: 'white' };
        viewerRef.current = window.$3Dmol.createViewer(containerRef.current, config);

        loadPDBFromURL(pdbUrl);
      } catch (err) {
        setError('Failed to initialize 3Dmol viewer: ' + err.message);
      }
    };

    init3Dmol();

    return () => {
      if (viewerRef.current) {
        viewerRef.current.clear();
      }
    };
  }, []);

  const loadPDBData = (data) => {
    if (!viewerRef.current) return;
    
    viewerRef.current.clear();
    const model = viewerRef.current.addModel(data, 'pdb');
    
    applyStyle(currentStyle);
    
    viewerRef.current.zoomTo();
    viewerRef.current.render();
    viewerRef.current.zoom(1.2, 1000);

    viewerRef.current.setClickable({}, true, (atom) => {
      setSelectedAtom({
        element: atom.elem,
        residue: atom.resn,
        residueNumber: atom.resi,
        chain: atom.chain,
        atom: atom.atom,
        x: atom.x?.toFixed(2),
        y: atom.y?.toFixed(2),
        z: atom.z?.toFixed(2)
      });
    });
  };

  const loadPDBFromURL = async (url) => {
    setLoading(true);
    setError(null);
    setSelectedAtom(null);
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to load PDB: ${response.statusText}`);
      }
      const data = await response.text();
      loadPDBData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const applyStyle = (styleName) => {
    if (!viewerRef.current) return;

    const styles = {
      cartoon: { cartoon: { color: 'spectrum' } },
      stick: { stick: { colorscheme: 'Jmol' } },
      sphere: { sphere: { colorscheme: 'Jmol' } },
      line: { line: { colorscheme: 'Jmol' } },
      cross: { cross: { colorscheme: 'Jmol' } },
      ballstick: { stick: {}, sphere: { scale: 0.3 } }
    };

    viewerRef.current.setStyle({}, styles[styleName] || styles.cartoon);
    viewerRef.current.render();
    setCurrentStyle(styleName);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        loadPDBData(e.target.result);
        setLoading(false);
      };
      reader.onerror = () => {
        setError('Failed to read file');
        setLoading(false);
      };
      reader.readAsText(file);
    }
  };

  const handleUrlLoad = () => {
    if (inputUrl.trim()) {
      setPdbUrl(inputUrl);
      loadPDBFromURL(inputUrl);
    }
  };

  const loadExample = (exampleUrl) => {
    setInputUrl(exampleUrl);
    setPdbUrl(exampleUrl);
    loadPDBFromURL(exampleUrl);
  };

  return (
    <div className={styles.viewerWrapper}>
      {/* TOP BAR */}
      <div className={styles.topBar}>
        <h1 className={styles.title}>Protein Structure Viewer</h1>
        <div className={styles.urlControls}>
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="Enter PDB URL or ID"
            className={styles.urlInput}
            onKeyPress={(e) => e.key === 'Enter' && handleUrlLoad()}
          />
          <button onClick={handleUrlLoad} className={styles.loadButton}>
            Load
          </button>
          <label className={styles.fileButton}>
            Upload PDB
            <input
              type="file"
              accept=".pdb"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
          </label>
        </div>
      </div>

      {/* 3D VIEWER */}
      <div className={styles.viewerContainer}>
        {loading && (
          <div className={styles.loadingOverlay}>
            <div className={styles.spinner}></div>
            <p>Loading PDB structure...</p>
          </div>
        )}

        {error && (
          <div className={styles.errorOverlay}>
            <div className={styles.errorBox}>
              <strong>Error:</strong> {error}
            </div>
          </div>
        )}

        <div ref={containerRef} className={styles.viewer3d} />
      </div>

      {/* STYLE CONTROLS */}
      <div className={styles.styleControls}>
        <div className={styles.controlsTitle}>Visualization Style</div>
        <div className={styles.buttonGroup}>
          <button
            onClick={() => applyStyle('cartoon')}
            className={`${styles.styleButton} ${currentStyle === 'cartoon' ? styles.active : ''}`}
          >
            Cartoon
          </button>
          <button
            onClick={() => applyStyle('stick')}
            className={`${styles.styleButton} ${currentStyle === 'stick' ? styles.active : ''}`}
          >
            Stick
          </button>
          <button
            onClick={() => applyStyle('sphere')}
            className={`${styles.styleButton} ${currentStyle === 'sphere' ? styles.active : ''}`}
          >
            Sphere
          </button>
          <button
            onClick={() => applyStyle('line')}
            className={`${styles.styleButton} ${currentStyle === 'line' ? styles.active : ''}`}
          >
            Line
          </button>
          <button
            onClick={() => applyStyle('ballstick')}
            className={`${styles.styleButton} ${currentStyle === 'ballstick' ? styles.active : ''}`}
          >
            Ball & Stick
          </button>
        </div>
      </div>

      {/* EXAMPLE MOLECULES */}
      <div className={styles.examplesPanel}>
        <div className={styles.examplesTitle}>Example Structures</div>
        <div className={styles.examplesList}>
          <button
            onClick={() => loadExample('https://files.rcsb.org/download/1YCR.pdb')}
            className={styles.exampleButton}
          >
            1YCR - Myoglobin
          </button>
          <button
            onClick={() => loadExample('https://files.rcsb.org/download/1BNA.pdb')}
            className={styles.exampleButton}
          >
            1BNA - DNA Double Helix
          </button>
          <button
            onClick={() => loadExample('https://files.rcsb.org/download/2DHB.pdb')}
            className={styles.exampleButton}
          >
            2DHB - Hemoglobin
          </button>
          <button
            onClick={() => loadExample('https://files.rcsb.org/download/1LYZ.pdb')}
            className={styles.exampleButton}
          >
            1LYZ - Lysozyme
          </button>
        </div>
      </div>

      {/* INFO PANEL */}
      {selectedAtom ? (
        <div className={styles.infoPanel}>
          <div className={styles.infoTitle}>Selected Atom</div>
          <div className={styles.infoRow}>
            <strong>Element:</strong> {selectedAtom.element}
          </div>
          <div className={styles.infoRow}>
            <strong>Atom:</strong> {selectedAtom.atom}
          </div>
          <div className={styles.infoRow}>
            <strong>Residue:</strong> {selectedAtom.residue} {selectedAtom.residueNumber}
          </div>
          <div className={styles.infoRow}>
            <strong>Chain:</strong> {selectedAtom.chain}
          </div>
          <div className={styles.infoRow}>
            <strong>Position:</strong> (x: {selectedAtom.x}, y: {selectedAtom.y}, z: {selectedAtom.z})
          </div>
        </div>
      ) : (
        <div className={styles.infoPanel}>
          <div className={styles.infoTitle}>Atom Details</div>
          <div className={styles.infoEmpty}>
            Click any atom in the structure to see details.
            <br /><br />
            <strong>Controls:</strong>
            <ul>
              <li>Left click + drag to rotate</li>
              <li>Right click + drag to pan</li>
              <li>Scroll to zoom</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}