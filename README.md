# Expense Tracker

A modern, feature-rich expense tracking application built with React and Vite. Track your expenses, set budgets, and gain insights into your spending patterns.

## 🚀 Features

### Core Functionality
- ✅ Add, edit, and delete expenses
- ✅ Categorize expenses with custom icons
- ✅ Local storage persistence
- ✅ Responsive design for all devices

### Advanced Features
- 📊 **Dashboard Overview** - Summary cards showing today, week, month, and all-time expenses
- 🎯 **Budget Tracking** - Set monthly budgets with visual progress indicators and alerts
- 🔍 **Advanced Filtering** - Filter by date range, category, amount, and search text
- 📈 **Analytics** - Category breakdown with percentage distribution
- 📁 **Data Management** - Export/import expenses via CSV files
- 🎨 **Modern UI** - Clean, intuitive interface with smooth animations

### Categories Available
- 🍽️ Food
- ✈️ Travel  
- 🛍️ Shopping
- 🎬 Entertainment
- 🏥 Health
- 📚 Education
- 💡 Utilities
- 🚗 Transportation
- 📦 Others

## 🛠️ Technology Stack

- **Frontend:** React 19.1.0
- **Build Tool:** Vite 6.3.5
- **Styling:** Tailwind CSS 4.1.8
- **Date Handling:** date-fns 4.1.0
- **Code Quality:** ESLint

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd expense-tracker
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

## 🚀 Deployment

### Option 1: Netlify (Recommended)
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`

### Option 2: Vercel
1. Connect your GitHub repository to Vercel
2. Set framework preset to "Vite"
3. Deploy automatically on push

### Option 3: GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts:
   ```json
   "deploy": "gh-pages -d dist"
   ```
3. Run: `npm run build && npm run deploy`

## 📱 Usage

### Adding Expenses
1. Navigate to the Dashboard tab
2. Fill in the expense form with amount, category, date, and optional description
3. Click "Add Expense"

### Budget Management
1. Go to the Budget tab
2. Click "Set Budget" to establish a monthly budget
3. Monitor your spending with visual progress indicators
4. Receive alerts when approaching or exceeding budget limits

### Data Management
1. Visit the Data tab
2. Export your expenses as CSV for backup or analysis
3. Import expenses from CSV files
4. View detailed statistics about your spending

### Filtering Expenses
1. Go to the Expenses tab
2. Use the filter panel to narrow down expenses by:
   - Category
   - Date range
   - Amount range
   - Search text

## 🔧 Development

### Project Structure
```
src/
├── components/          # React components
│   ├── BudgetTracker.jsx
│   ├── CategoryBreakdown.jsx
│   ├── DataManagement.jsx
│   ├── ExpenseForm.jsx
│   ├── ExpenseList.jsx
│   ├── FilterPanel.jsx
│   └── Summary.jsx
├── hooks/              # Custom React hooks
│   └── useLocalStorage.js
├── utils/              # Utility functions
│   ├── categories.js
│   └── dataExport.js
├── App.jsx             # Main application component
└── main.jsx           # Application entry point
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Customization

### Adding New Categories
Edit `src/utils/categories.js` to add new expense categories with custom icons and colors.

### Styling
The app uses Tailwind CSS. Modify component classes or add custom CSS as needed.

### Features
The modular architecture makes it easy to add new features. Each component is self-contained and follows React best practices.

## 🐛 Known Issues

- None currently reported

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Y Mani Chandra Reddy**

- GitHub: [@Mani-Chandra65](https://github.com/Mani-Chandra65)

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Vite for the lightning-fast build tool
- date-fns for date manipulation utilities

---

Made with ❤️ for better financial management+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
