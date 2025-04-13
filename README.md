# 🐾 Spot the Difference - Animals Game

A fun and interactive game built with **HTML**, **CSS**, and **JavaScript** where players spot differences between two animal images.

---

## 🎮 Game Features

- JSON-configurable difference data
- 30-second countdown timer
-  Automatic win detection when **at least one difference** is found
-  Visual markers show discovered differences
-  Real-time score and timer
- Simple and responsive layout

---

## 🔧 How It Works

- The game loads two side-by-side images.
- Differences are defined in a `jsonConfig` object.
- Players click on the image where they think a difference is.
- If correct:
  - A marker highlights the spot
  - Score is updated
  - Game ends instantly after first found difference and shows a **win** message
- If no differences are found within the time limit, the game shows a **lose** message.

---

## 🧩 Example JSON Config

```js
const jsonConfig = {
  "gameTitle": "Spot the Difference - Animals",
  "images": {
    "image1": "./img/animal1.jpg",
    "image2": "./img/animal2.jpg"
  },
  "differences": [
    { "x": 100, "y": 200, "width": 50, "height": 50 },
    { "x": 300, "y": 150, "width": 40, "height": 40 },
    { "x": 500, "y": 300, "width": 30, "height": 30 }
  ]
};
