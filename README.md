# Starter Code 2025 - Frontend

This is the **frontend starter boilerplate**. 
It is built with **React (via Vite)** and comes preconfigured with authentication, protected routes, and a basic dashboard layout.

---

## 🌍 Environment Variables (create a `.env` file at the root)

```
VITE_API_URL=http://localhost:4000/api
```

- `VITE_API_URL` → Base URL for backend API requests (used in `src/api/` files).

---

## 📦 Installation & Setup

1. Clone the repo:
   ```bash
   git clone <repo-url>
   cd starter-code-2025-frontend-main
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the dev server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview production build:
   ```bash
   npm run preview
   ```

---

## 🗂 Project Structure

```
src/
 ├── api/                # API helpers (auth, etc.)
 ├── assets/             # Static images & logos
 ├── components/         # Shared UI components
 │    ├── Layout.jsx         # Wrapper layout with sidebar
 │    ├── Sidebar.jsx        # Sidebar navigation
 │    └── ProtectedRoute.jsx # Ensures only logged-in users access certain pages
 ├── contexts/
 │    └── AuthContext.jsx    # Manages auth state (login, logout, current user)
 ├── pages/
 │    ├── Login.jsx          # Login screen
 │    ├── Dashboard.jsx      # Example dashboard page
 │    └── UserManagement.jsx # Example CRUD user management
 ├── App.jsx             # Main app with routes
 └── main.jsx            # React entry point
```

---

## 🔐 Authentication Flow

- **`AuthContext.jsx`**  
  - Keeps track of current user, login, and logout functions.  
  - Stores user/token in local storage.  
  - Provides `useAuth()` hook to access auth state anywhere.

- **`ProtectedRoute.jsx`**  
  - Wraps routes that require login.  
  - Redirects to `/login` if no valid session.

- **`auth.js` (API helper)**  
  - Contains login, logout, and `getMe` calls to backend.  
  - All requests use `VITE_API_URL` as base.

---

## 📜 Available Scripts

| Command           | Description                      |
|-------------------|----------------------------------|
| `npm run dev`     | Run local development server     |
| `npm run build`   | Build production-ready files     |
| `npm run preview` | Preview the production build     |
| `npm run lint`    | Run ESLint checks                |

---

## ✅ Notes for Team
- Use this repo as a base for **any new dashboard/frontend project**.  
- Update **`src/api/`** with real endpoints as per backend.  
- Add new pages in `src/pages/` and route them via `App.jsx`.  
- Sidebar links should also be updated in `Sidebar.jsx`.  
- Keep all auth-related logic inside **AuthContext**.  

---
# GPS-project-frontend
# GPS-project-frontend
