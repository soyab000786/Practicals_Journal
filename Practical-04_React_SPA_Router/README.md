# Practical 04: Single Page Application (SPA) with React Router

## 🎯 Practical Aim / Objective
> **Practical Title:** Develop a Single Page Application (SPA) using React Router for navigation between multiple pages.

---

## 📖 Theory & Core Concepts

### 1. Single Page Application (SPA)
In traditional multi-page websites, every click on a link sends a request to the web server, which generates and returns a new HTML document, causing the browser to completely re-render (white screen flash).

In a **Single Page Application (SPA)**:
- A single HTML page is loaded on the initial visit.
- Client-side routing intercepts user clicks on links, changes the URL in the browser address bar (using HTML5 History API), and dynamically switches React components without refreshing the page.

### 2. React Router DOM (v6)
React Router is the standard routing library for React applications.

**Key Components & Hooks:**
- `<BrowserRouter>`: Context provider keeping the UI synced with browser history.
- `<Routes>` and `<Route>`: Maps URL paths to React components.
- `<Link>` and `<NavLink>`: Declarative navigation links. `NavLink` provides active state styling automatically.
- `useParams()`: Accesses dynamic route path parameters (e.g. `/:courseId`).
- `useNavigate()`: Enables programmatic navigation via JavaScript functions.
- `useLocation()`: Provides current URL pathname and state.

---

## 🗺️ Route Mapping Table

| URL Path | Element Rendered | Description |
|:---|:---|:---|
| `/` | `<Home />` | Landing page with highlights and featured courses |
| `/about` | `<About />` | Architectural overview and department details |
| `/courses` | `<Courses />` | Filterable course catalog with dynamic cards |
| `/courses/:courseId` | `<CourseDetails />` | Dynamic route loading details via `useParams()` |
| `/contact` | `<Contact />` | Contact information and interactive query form |
| `*` (Wildcard) | `<NotFound />` | Custom 404 error page for unhandled routes |

---

## 📂 Project Structure
```
Practical-04_React_SPA_Router/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── data/
    │   └── coursesData.js      # Structured mock catalog data
    ├── components/
    │   ├── Navbar.jsx          # Sticky navigation with NavLink active states
    │   └── Footer.jsx          # App footer
    └── pages/
        ├── Home.jsx            # Home overview & quick links
        ├── About.jsx           # Concepts & theory
        ├── Courses.jsx         # Catalog with category filtering
        ├── CourseDetails.jsx   # Dynamic page with useParams() & useNavigate()
        ├── Contact.jsx         # Support inquiry form
        └── NotFound.jsx        # Wildcard 404 page
```

---

## 🚀 How to Run

1. Navigate to this directory:
   ```bash
   cd Practical-04_React_SPA_Router
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Access `http://localhost:5173` in your browser.
