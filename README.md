# 🌍 WanderTales - Your Personal Travel Journal

> ✈️ Capture your adventures, one story at a time

WanderTales is a personal travel journal application that lets you document travel experiences, memories, and stories with ease. Whether you're a globetrotter or weekend explorer, preserve your journeys with location tagging, date tracking, and favorite marking features.


## ✨ Features

- **🔐 User Authentication**: Secure sign-up and login with JWT-based authentication
- **📖 Travel Story Management**: Add, edit, delete, and view your travel stories
- **🔍 Search and Filter**: Find stories by title, content, or location and filter by date range
- **⭐ Favorites**: Mark your favorite travel stories for quick access
- **📱 Responsive UI**: Clean, modern interface built with React and Tailwind CSS

## 🚀 Installation

### 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account (or a local MongoDB instance)
- npm or yarn

### ⚙️ Backend Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/WanderTales.git
cd WanderTales/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory with these environment variables:
```env
ACCESS_TOKEN_SECRET=your_jwt_secret_key
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xymor.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

4. Start the backend server:
```bash
npm start
```

### 🖥️ Frontend Setup

1. Navigate to the frontend directory:
```bash
cd ../frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to http://localhost:5173 (or the port specified by Vite)

## 📝 Usage

1. **👤 Sign Up / Login**: Create an account or log in using your credentials
2. **➕ Add a Travel Story**: Click the "Add" button and fill in the details
3. **👀 View Stories**: Browse through your travel stories on the homepage
4. **✏️ Edit/Delete Stories**: Update or remove existing stories from the view modal
5. **🔍 Search and Filter**: Use the search bar or date picker to find specific stories

## 🔌 API Endpoints

### 🔐 Authentication

- `POST /create-account`: Register a new user
- `POST /login`: Authenticate and receive a JWT token

### 📖 Travel Stories

- `POST /add-travel-story`: Add a new travel story
- `GET /get-all-stories`: Retrieve all travel stories for the authenticated user
- `PUT /edit-story/:id`: Update an existing travel story
- `DELETE /delete-story/:id`: Delete a travel story
- `PUT /update-is-favourite/:id`: Toggle the "favorite" status of a story

### 🔍 Search and Filter

- `GET /search`: Search travel stories by query
- `GET /travel-stories/filter`: Filter travel stories by date range

## 🛠️ Technologies Used

### Backend
- 🟢 Node.js with Express
- 🍃 MongoDB (via MongoDB Atlas)
- 🦋 Mongoose for database modeling
- 🔑 JWT for authentication
- 🔒 bcrypt for password hashing

### Frontend
- ⚛️ React with Vite
- 🎨 Tailwind CSS for styling
- 🧭 React Router for navigation
- 🔄 Axios for API calls
- 🔔 React Toastify for notifications
- 📅 React Day Picker for date selection

## 👥 Contributors

- **N.S.L Karthikeya Reddy** - [GitHub](https://github.com/NSL-Karthikeya-Reddy)
- **Datta Srivathsava Gollapinni** - [GitHub](https://github.com/dattu20038)

## 🔗 Live Demo

Experience WanderTales now: [https://wander-tales-frontend.vercel.app/](https://wander-tales-frontend.vercel.app/)

---

<p align="center">
  📝 Document your journey • 🌎 Explore your memories • 🏆 Cherish your adventures
</p>

