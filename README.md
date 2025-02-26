# malaria


## FastAPI service on dev
To create a Python virtual environment and install the packages listed in a `requirements.txt` file, follow these steps:

### 1. **Create a Virtual Environment**
```bash
python3 -m venv myenv
```
This will create a virtual environment named `myenv`. You can replace `myenv` with your preferred name.

### 2. **Activate the Virtual Environment**
- **On macOS/Linux:**
  ```bash
  source myenv/bin/activate
  ```
- **On Windows:**
  ```bash
  myenv\Scripts\activate
  ```

### 3. **Install Packages from `requirements.txt`**
Assuming you have a `requirements.txt` file ready, use the following command:
```bash
pip install -r requirements.txt
```

### 4. **Verify Installation**
You can check if the packages are installed by running:
```bash
pip list
```

### Notes
- Always activate your environment before running scripts or installing new packages to ensure they are installed in the virtual environment.
- Use `deactivate` to exit the virtual environment when done:
  ```bash
  deactivate
  ```

### Run the server
  ```bash
    uvicorn app.main:app --host 0.0.0.0 --port 8000 --log-level debug --reload
  ```


### MongoDB
Acces it by entering the container shell then:
  ```bash
  mongosh --port 27017  --apiVersion 1 --username root --password OTNmYTdjYmZkMjE5ZmYzODg0MDZiYWJh
  ```
