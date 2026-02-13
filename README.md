# Context Steering Simulation

A canvas-based simulation implementing context steering agents using Digital Differential Analyzer (DDA) ray casting.

## Overview

The simulation provides multiple modes for visualizing and interacting with DDA algorithms and context steering behavior:

- **DDA Visualization**: Interactive line drawing showing grid cell traversal and intersection points
- **Ray Casting**: DDA-based ray casting with obstacle detection
- **Context Steering Agents**: Agents that use ray casting from multiple receptors to navigate around obstacles
- **Material Paint Mode**: Click-to-place obstacles in the world

Agents use a receptor-based system where each agent has multiple directional receptors that cast rays to detect obstacles. The agent steers toward the receptor direction with the lowest danger value.

## Project Structure

```
agents/
  - agent.js          # SteeringAgent class with receptor-based navigation
  - steering.js       # Additional steering utilities

core/
  - dda.js            # Digital Differential Analyzer implementation
  - geometry.js       # Geometric utilities
  - core.js           # Core helper functions
  - rational.js       # Rational number utilities

modes/
  - DDAMode.js        # DDA visualization mode
  - RayCastingMode.js # Ray casting visualization
  - ContextSteeringMode.js # Agent placement mode
  - MaterialPaintMode.js  # Obstacle placement mode

simulation/
  - simulation.js     # Main simulation loop
  - renderer.js       # Rendering system
  - controls.js       # Control handlers
  - events.js         # Event management
  - state.js          # Simulation state

world/
  - world.js          # World state and cell management
  - display.js        # Canvas display management
```

## Screen Recordings


https://github.com/user-attachments/assets/eff915d0-9ee2-4c98-8239-6f809c257966


https://github.com/user-attachments/assets/61a55b71-6be0-4487-a622-9883c2a350c5



<!-- TO-DO: Add screen recordings -->

## Future Developments

<!-- TO-DO: Add future development plans -->

## Notes and Takeaways

<!-- TO-DO: Add notes and takeaways -->
