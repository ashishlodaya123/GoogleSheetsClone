# Google Sheets Clone

A lightweight, feature-rich Google Sheets clone built with HTML, CSS, JavaScript, and Flask.

## Features

### Core Features
- **Editable Cells**: Click and type directly into cells.
- **Formatting**: Bold, italic, underline, strikethrough, font family, font size, and font color.
- **Dark Mode**: Toggle between light and dark themes.
- **Save/Load**: Save your spreadsheet and load it later.
- **Undo/Redo**: Revert or reapply changes.
- **Export/Import**: Export your spreadsheet as a CSV file or import data from a CSV file.

### Advanced Features
- **Multi-Cell Selection**: Hold `Shift` and click to select multiple cells.
- **Formula Support**: Apply formulas like `SUM`, `AVERAGE`, `MIN`, and `MAX` to selected cells.
- **Cell Merging**: Merge and unmerge cells.
- **Cell Locking**: Lock cells to prevent editing.
- **Cell Comments**: Add comments to cells (hover to view).

### Unique Functionalities
1. **Trend Prediction**: Predict the next value in a sequence using linear regression.
2. **Text Analysis**: Count the number of words and characters in a cell.
3. **Random Number Generator**: Fill selected cells with random numbers.
4. **Emoji Insertion**: Insert emojis into cells.
5. **Cell Comments**: Add comments to cells for additional notes.
6. **Cell Locking**: Lock cells to prevent editing.

## How to Use
1. **Select Cells**: Click on a cell to select it. Hold `Shift` and click to select multiple cells.
2. **Apply Formulas**: Select cells and click "Apply Formula" to apply `SUM`, `AVERAGE`, `MIN`, or `MAX`.
3. **Format Cells**: Use the toolbar to format cells (bold, italic, underline, etc.).
4. **Save/Load**: Save your spreadsheet and load it later.
5. **Export/Import**: Export your spreadsheet as a CSV file or import data from a CSV file.

## Deployment

### Frontend (GitHub Pages)
1. Push your code to a GitHub repository.
2. Go to **Settings** → **Pages** and enable GitHub Pages for the `main` branch.
3. Your frontend will be hosted at `https://<username>.github.io/<repository-name>/`.

### Backend (Render or Heroku)
1. **Render**:
   - Sign up at [Render](https://render.com/).
   - Connect your GitHub repository and deploy the backend.
   - Your backend will be hosted at `https://<service-name>.onrender.com`.

2. **Heroku**:
   - Sign up at [Heroku](https://heroku.com/).
   - Use the Heroku CLI to deploy your backend.
   - Your backend will be hosted at `https://<app-name>.herokuapp.com`.

### Update Frontend URLs
- In `script.js`, update the `fetch` URLs to point to your backend URL.

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Flask (Python)
- **Deployment**: GitHub Pages, Render/Heroku

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.