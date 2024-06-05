## Financial Dashboard
This project is a financial dashboard that displays various financial metrics and a candlestick chart for a specific stock. The dashboard is built using React and TypeScript, with styling handled by Tailwind CSS. It fetches financial data from a dummy API server and renders it in a user-friendly format.
### Features
- Display of various financial metrics such as Market Cap, P/E ratio, etc.
- Candlestick chart to visualize stock price movements.
- Theme toggle to switch between light and dark modes.
- Adjustable table columns and font size.
- Drag-and-drop functionality to rearrange table items.
- Fetch button to load dummy financial data from an API server.
### Technologies Used
- React
- TypeScript
- Tailwind CSS
- ApexCharts
### Getting Started
#### Prerequisites
Make sure you have the following installed on your system:
- Node.js
#### Installation
1. Clone the repository:
```
git clone https://github.com/yourusername/financial-dashboard.git
cd financial-dashboard
```
1. Install the dependencies:
```
npm install
```
#### Running the Application
1. Start the dummy API server using Docker:
	
2. Start the React application:
```npm run dev
```
1. Open your browser and navigate to http://localhost:3000 to view the application.
### Project Structure
```src/
  components/
    CandlestickChart.tsx
    FetchButton.tsx
    Table.tsx
    TableHeader.tsx
    TableRow.tsx
    TableCell.tsx
    ModeToggle.tsx
    ThemeToggle.tsx
    ColumnInput.tsx
    FontSizeInput.tsx
  context/
    DataContext.tsx
    ThemeContext.tsx
  styles/
    themes.ts
  App.tsx
  index.tsx
```
#### Components
- CandlestickChart.tsx: Displays the candlestick chart for the stock.
- FetchButton.tsx: Button to fetch dummy financial data from the API server.
- Table.tsx: Main table component that displays financial metrics.
- TableHeader.tsx: Header component for the table.
- TableRow.tsx: Row component for the table.
- TableCell.tsx: Cell component for the table.
- ModeToggle.tsx: Button to toggle between view and set modes.
- ThemeToggle.tsx: Button to toggle between light and dark themes.
- ColumnInput.tsx: Input to adjust the number of columns in the table.
- FontSizeInput.tsx: Input to adjust the font size of the table text.
#### Context
- DataContext.tsx: Provides and manages the state for financial data.
- ThemeContext.tsx: Provides and manages the state for the current theme.
#### Styles
- themes.ts: Defines light and dark themes for the application.
### Usage
#### Fetching Data
Click the "Fetch Dummy Data" button to load financial data from the API server. The data will be displayed in the table and candlestick chart.
#### Switching Themes
Click the "Switch to Dark Mode" or "Switch to Light Mode" button to toggle between light and dark themes.
#### Adjusting Table Settings
- Use the column input to change the number of columns displayed in the table.
- Use the font size input to adjust the font size of the table text.
- Drag and drop table cells to rearrange the data.
### Contributing
Contributions are welcome! Please open an issue or submit a pull request for any changes.
### License
This project is licensed under the MIT License. See the LICENSE file for details.
### Acknowledgements
- Alpha Vantage for the stock data API.
- ApexCharts for the charting library.
- Tailwind CSS for the utility-first CSS framework.
