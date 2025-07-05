# 💸 Expense Tracker

A fast, lightweight expense tracker built using **React + Vite**. Helps you manage daily spending with local storage, categories, summaries, and more.

---

## 1️⃣ Features

1. Add expenses with title, amount, and category
2. Categories: **Food**, **Travel**, **Shopping**, **Others**
3. Stores data in **Local Storage** (no backend)
4. Clear all expenses with one click
5. Summary section includes:
   - Total spent in the **last 7 days**
   - Total spent in the **last 30 days**
   - Category-wise spending totals
6. Full list of all added expenses

---

## 2️⃣ Tech Stack

- ⚛️ React (with Hooks)
- ⚡ Vite (for fast dev environment)
- 🎨 CSS
- 💾 Local Storage
- 📁 JavaScript (ES6+)

---

## 3️⃣ Installation (After Downloading ZIP)

1. Click **Code > Download ZIP**

2. Extract the ZIP folder

3. Open a terminal in the extracted folder

4. Install dependencies:

   ```bash
   npm install
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open the app in your browser:

   ```
   http://localhost:5173
   ```

---

## 4️⃣ Deployment

To deploy the app (GitHub Pages, Netlify, or Vercel):

1. Build the production version:

   ```bash
   npm run build
   ```

2. Deploy the `dist/` folder using your preferred hosting:

   - **GitHub Pages**: use `gh-pages` package or push `dist/` to `docs/` branch
   - **Netlify/Vercel**: connect repo, set build command as `npm run build`, output folder as `dist`

---

## 5️⃣ Folder Structure

```
src/
├── components/      # Reusable UI components
├── hooks/           # Custom React hooks (if any)
├── utils/           # Utility functions
├── App.jsx          # Main app component
├── main.jsx         # Entry point
public/              # Static files
vite.config.js       # Vite config
package.json         # Dependencies & scripts
```

---

## 6️⃣ Scripts

```bash
npm run dev       # Start local development server
npm run build     # Create production build
npm run preview   # Preview production build locally
```

---

## 7️⃣ Upcoming Features

- ✏️ Edit individual expenses
- ❌ Delete specific entries
- 🔍 Filter by category/date
- 📱 Responsive design for mobile
- 📈 Graphs and visual insights

---

## 8️⃣ License

This project is open source and free to use.\
Feel free to contribute, fork, or customize it to suit your needs!

