# 🦠 MalarIA Project  

## 🚀 Overview  

**MalarIA** is an advanced **AI-powered system for malaria diagnosis and analysis**, integrating **expert systems, deep learning, and fuzzy logic** to enhance precision in malaria detection and treatment recommendations. The system consists of:  

- **An Expert System (Fuzzy Rule-Based Reasoning using CLIPS)** for malaria diagnosis and treatment recommendations.  
- **A Deep Learning Model (CNN with TensorFlow/Keras)** for **microscopic image classification** of malaria-infected cells.  
- **A FastAPI Backend** for data processing, medical analysis, and AI inference.  
- **A React Frontend** for user interaction, including visualization of diagnostic results and analytics.  
- **MongoDB Database** to store patient data, diagnostic history, and model inferences.

---

## ⚙️ Backend Setup (FastAPI)

To set up the backend environment and start the FastAPI server, follow these steps:

### 1️⃣ **Navigate to the Backend Directory**
```bash
cd backend
```

### 2️⃣ **Create a Python Virtual Environment**
```bash
python3 -m venv venv
```

### 3️⃣ **Activate the Virtual Environment**
- **On macOS/Linux:**
  ```bash
  source venv/bin/activate
  ```
- **On Windows:**
  ```bash
  venv\Scripts\activate
  ```

### 4️⃣ **Install Dependencies**
```bash
pip install -r requirements.txt
```

### 5️⃣ **Run the FastAPI Server**
```bash
uvicorn app.app:app --reload
```

### 6️⃣ **Access FastAPI API Documentation**
Once the server is running, you can access the API documentation in your browser:

- 📜 **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- 📄 **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

## 🗄️ Database Setup (MongoDB with Docker)

To install and start **MongoDB** and **Mongo Express** using Docker, follow these steps:

### 1️⃣ **Start MongoDB with Docker Compose**
```bash
docker-compose up -d
```

### 2️⃣ **Access MongoDB UI**
Mongo Express provides a web-based UI for managing your database:
- 🌍 **Mongo Express**: [http://localhost:27017](http://localhost:27017)

---

## 🎨 Frontend Setup (React)

To set up the frontend and start the React application, follow these steps:

### 1️⃣ **Navigate to the Frontend Directory**
```bash
cd frontend
```

### 2️⃣ **Install Dependencies**
```bash
npm install
```

### 3️⃣ **Start the Frontend Server**
```bash
npm start
```

### 4️⃣ **Access the React Application**
Once the frontend is running, open your browser and go to:
- 🖥️ **MalarIA App**: [http://localhost:3000](http://localhost:3000)

---

## 📝 Notes & Best Practices
✅ Ensure **Docker** is installed and running before executing `docker-compose up`.  
✅ Ensure **Node.js** is installed before running `npm` commands.  
✅ Always **activate your virtual environment** before running backend scripts.  
✅ The **backend and frontend must run simultaneously** for full application functionality.  

---

💡 **Need Help?** If you encounter any issues, check the logs or restart the services:
```bash
docker-compose restart
```
For further troubleshooting, refer to the official documentation of [FastAPI](https://fastapi.tiangolo.com/), [MongoDB](https://www.mongodb.com/), and [React](https://reactjs.org/).

---
🚀 **Happy Coding!**
