# ChromoXplorer

Exploring 3D Chromatin Architecture Through Interactive Visualization  
Capstone Project — Temple University CIS 4296

**Live Site:** https://chromoxplorer.netlify.app  
**Repository:** https://github.com/daveyloder/ChromoXplorer

---

## Overview

ChromoXplorer is an interactive web application designed to help users explore 3D chromatin architecture.  
The platform introduces a simplified, educational interface that allows students and researchers to visualize:

- Chromosomes and genomic regions in 3D space
- Looping structures
- Compartment-level organization
- High-level chromatin interactions

This project emphasizes accessibility, clarity, and visual learning.  
For background information and scientific context, see the included manuscript:

**Exploring Chromatin Architecture: The ChromoXplorer Project**

---

## Features

### Interactive 3D Genome Exploration

- WebGL-based visualization using Three.js
- Clickable genomic elements
- Highlighting, animation, and guided focus tools

### Educational Support

- Definitions and concept explanations
- Built-in tutorial flow
- Visual metaphors for complex genome architecture concepts

### Lightweight Deployment

- Runs fully in the browser
- No backend required
- Fast hosting via Netlify

---

## Technology Stack

| Layer         | Tools                                                   |
| ------------- | ------------------------------------------------------- |
| Frontend      | React (Vite), JavaScript/TypeScript (if used), Three.js |
| Deployment    | Netlify                                                 |
| Assets        | Local 3D models, UI content, instructional materials    |
| Documentation | Project manuscript and internal design notes            |

---

## Getting Started (Local Development)

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Project Structure

based on srce folder

```bash
│   App.css
│   App.jsx
│   index.css
│   main.jsx
│
├───assets
│   └───images
│           logo.png
│
├───components
│   ├───Account
│   │       AccountForms.module.css
│   │       AccountSidebar.jsx
│   │       AccountSidebar.module.css
│   │       ChangePasswordForm.jsx
│   │       EditProfileForm.jsx
│   │
│   ├───Admin
│   │       DatasetList.jsx
│   │       DatasetList.module.css
│   │       DatasetUploadForm.jsx
│   │       DatasetUploadForm.module.css
│   │
│   ├───Background
│   │       Startfield.jsx
│   │
│   ├───Explorer
│   │       ExplorerCellTypeDropdown.jsx
│   │       ExplorerLevelControls.jsx
│   │       ExplorerTopBar.jsx
│   │
│   ├───Genome3D
│   │   │   ABCompartmentView.jsx
│   │   │   ChromosomeTerritories.jsx
│   │   │   ChromosomeTerritories3D.jsx
│   │   │   GenomeModel.jsx
│   │   │   GenomeScene.jsx
│   │   │
│   │   └───shaders
│   └───Layout
│           Footer.jsx
│           Footer.module.css
│           NavBar.jsx
│           NavBar.module.css
│
├───context
│       AuthContext.jsx
│
├───data
│   │   genomePresets.json
│   │   hierarchicalGenome.txt
│   │   mockGenomeFile.txt
│   │
│   └───mappings
│           chr1_1mb_gm12878_list_coordinate_mapping.txt
│
├───pages
│       AccountPage.jsx
│       AccountPage.module.css
│       AdminPage.jsx
│       AdminPage.module.css
│       ExplorerPage.jsx
│       ExplorerPage.module.css
│       LoginPage.jsx
│       LoginPage.module.css
│       ManageDatasetsPage.jsx
│       ManageDatasetsPage.module.css
│       SignupPage.jsx
│       SignupPage.module.css
│       SplashPage.jsx
│       SplashPage.module.css
│
└───utils
    ├───generation
    │       generateChromosomeCluster.js
    │
    ├───math
    │       average.js
    │
    ├───parsing
    │       parseGenomeFile.js
    │       parsePDB.js
    │
    └───presets
            loadPresets.js
            savePresets.js
```

## Test Logins

These accounts are available for evaluating the prototype

```
User Email: admin@test.com
Password: (just type anything in the login page)
```

```
User Email: paid@test.com
Password: (just type anything in the login page)
```

## Known Limitations

- Visualizations represent conceptual models, not real Hi-C or sequencing data.
- Mobile device performance may vary due to rendering constraints.
- Some UI panels are prototype-level and scheduled for refinement.

## Future Development

- Integration of real genomic datasets (Hi-C, Micro-C, ChIP-seq)

- More realistic chromosome modeling

- Annotation overlays and interaction heatmaps

- User-specific saved views and profiles

- Expanded educational modules and tutorials

## Authors

- **David Loder**
- **Y Kien Mai**
- **Charlie Toothaker**
- **Michael Balogun**
- **Danny Huang**
- **Jans Tarriela**
- **Nour Ayyash**
- **Noah Memon**
- **Blake Weitzel**
- **Violet Nguyen**
