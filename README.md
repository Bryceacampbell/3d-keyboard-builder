# 3D Keyboard Builder

An interactive 3D keyboard visualization tool built with React and Three.js that allows users to customize and explore mechanical keyboard designs in real-time.

## 🔗 Live Demo

Visit the live demo at: [https://bryceacampbell.github.io/3d-keyboard-builder/](https://bryceacampbell.github.io/3d-keyboard-builder/)

## ✨ Features

- **Interactive 3D Visualization**: Real-time 3D rendering of keyboard models using Three.js
- **Multiple Keyboard Types**: Support for popular split keyboards:
  - Corne (36-key split keyboard)
  - Lily58 (58-key split keyboard)
- **Switch Compatibility**: Toggle between switch types:
  - Cherry MX switches
  - Kailh Choc low-profile switches
- **Cover Options**: Choose between different case cover materials:
  - 3D printed covers
  - Acrylic covers
- **Part Visibility Control**: Show/hide individual keyboard components:
  - Case bottom and top
  - PCB (Printed Circuit Board)
  - Headers and battery
  - Arduino Nano controller
  - Switches and keycaps
  - Cover hardware
- **Color Customization**: Customize colors for:
  - Case bottom
  - Keycaps
  - Case cover
- **Exploded View**: Toggle between assembled and exploded views for better part visualization

## 🛠️ Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Three.js** - 3D graphics library
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for react-three-fiber
- **Vite** - Fast build tool and development server



## 🎯 Usage

1. **Select Keyboard Type**: Choose between Corne or Lily58 layouts
2. **Pick Switch Type**: Toggle between MX and Choc switches
3. **Choose Cover Material**: Select 3D printed or acrylic covers
4. **Customize Parts**: Use checkboxes to show/hide individual components
5. **Adjust Colors**: Use color pickers to customize case and keycap colors
6. **Toggle View**: Switch between assembled and exploded views

## 🎨 3D Models

The application uses high-quality GLB (GL Transmission Format Binary) models for each keyboard component. Models are organized by keyboard type and switch compatibility:

- Each keyboard type has dedicated model sets for MX and Choc switches
- Components include case parts, electronics, switches, and keycaps
- Models support both assembled and exploded view positioning


## 🙏 Acknowledgments

- Built with modern React and Three.js ecosystem
- Inspired by the mechanical keyboard community
- 3D models sourced from [typeractive.xyz](https://typeractive.xyz)