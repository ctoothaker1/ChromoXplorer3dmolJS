import { useEffect, useRef, useState } from 'react';

const PDBViewer = ({ pdbData, pdbUrl }) => {
  const viewerRef = useRef(null);
  const containerRef = useRef(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Dynamically import 3Dmol
    const init3Dmol = async () => {
      try {
        // Load 3Dmol from CDN
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

        // Create viewer
        const config = { backgroundColor: 'white' };
        viewerRef.current = window.$3Dmol.createViewer(containerRef.current, config);

        // Load PDB data
        if (pdbData) {
          loadPDBData(pdbData);
        } else if (pdbUrl) {
          loadPDBFromURL(pdbUrl);
        } else {
          // Load example molecule
          loadPDBFromURL('https://files.rcsb.org/download/1YCR.pdb');
        }
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

  useEffect(() => {
    if (viewerRef.current && pdbData) {
      loadPDBData(pdbData);
    }
  }, [pdbData]);

  useEffect(() => {
    if (viewerRef.current && pdbUrl) {
      loadPDBFromURL(pdbUrl);
    }
  }, [pdbUrl]);

  const loadPDBData = (data) => {
    if (!viewerRef.current) return;
    
    viewerRef.current.clear();
    viewerRef.current.addModel(data, 'pdb');
    viewerRef.current.setStyle({}, { cartoon: { color: 'spectrum' } });
    viewerRef.current.zoomTo();
    viewerRef.current.render();
    viewerRef.current.zoom(1.2, 1000);
  };

  const loadPDBFromURL = async (url) => {
    setLoading(true);
    setError(null);
    
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

  const changeStyle = (styleName) => {
    if (!viewerRef.current) return;

    const styles = {
      cartoon: { cartoon: { color: 'spectrum' } },
      stick: { stick: { colorscheme: 'Jmol' } },
      sphere: { sphere: { colorscheme: 'Jmol' } },
      line: { line: { colorscheme: 'Jmol' } },
      cross: { cross: { colorscheme: 'Jmol' } }
    };

    viewerRef.current.setStyle({}, styles[styleName] || styles.cartoon);
    viewerRef.current.render();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        loadPDBData(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex gap-2 flex-wrap items-center">
        <h2 className="text-xl font-bold">PDB Viewer</h2>
        
        <input
          type="file"
          accept=".pdb"
          onChange={handleFileUpload}
          className="text-sm border rounded px-2 py-1"
        />
        
        <div className="flex gap-2">
          <button
            onClick={() => changeStyle('cartoon')}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            Cartoon
          </button>
          <button
            onClick={() => changeStyle('stick')}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
          >
            Stick
          </button>
          <button
            onClick={() => changeStyle('sphere')}
            className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm"
          >
            Sphere
          </button>
          <button
            onClick={() => changeStyle('line')}
            className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 text-sm"
          >
            Line
          </button>
        </div>
      </div>

      {loading && (
        <div className="text-blue-600">Loading PDB file...</div>
      )}

      {error && (
        <div className="text-red-600 bg-red-50 p-3 rounded">
          Error: {error}
        </div>
      )}

      <div
        ref={containerRef}
        className="w-full h-96 border-2 border-gray-300 rounded relative bg-white"
      />

      <div className="text-sm text-gray-600">
        <p>Controls:</p>
        <ul className="list-disc list-inside">
          <li>Left click + drag to rotate</li>
          <li>Right click + drag to pan</li>
          <li>Scroll to zoom</li>
        </ul>
      </div>
    </div>
  );
};

export default PDBViewer;