from fastapi import FastAPI
app = FastAPI()

@app.get("/health")
def health_check():
    return {"status": "AI Service Ready"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)