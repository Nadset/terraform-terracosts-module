from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import json

app = FastAPI(title="Terracosts API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://app.terracosts.com", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello Terracosts! API prête pour FinOps multi-cloud."}

@app.get("/health")
def health_check():
    return {"status": "OK", "service": "terracosts-api"}

@app.post("/scan")
async def scan_terraform(file: UploadFile = File(...)):
    if not file.filename.endswith('.json'):
        raise HTTPException(status_code=400, detail="Fichier Terraform state JSON requis.")
    
    contents = await file.read()
    try:
        state = json.loads(contents)
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="JSON invalide.")
    
    # Détection provider simple (basé sur resources)
    providers = set()
    for resource in state.get('resources', []):
        provider = resource.get('provider', 'unknown')
        # Strip "provider." pour matcher 'aws', 'azurerm', etc.
        clean_provider = provider.replace("provider.", "") if "provider." in provider else provider
        providers.add(clean_provider)
    
    detected_clouds = []
    if 'aws' in providers:
        detected_clouds.append('AWS')
    if 'azurerm' in providers:
        detected_clouds.append('Azure')
    if 'google' in providers:
        detected_clouds.append('GCP')
    
    # Suggestions basiques d'économies (pattern FinOps)
    suggestions = []
    if 'aws' in providers:
        suggestions.append("Ajouter tags TTL sur EC2 pour auto-stop idle : économies 20-30%.")
    if 'azurerm' in providers:
        suggestions.append("Activer auto-shutdown sur VMs Azure : économies 15-25%.")
    if 'google' in providers:
        suggestions.append("Utiliser preemptible VMs GCP : économies 60-70% sur compute.")
    
    return {
        "detected_providers": list(providers),
        "clouds": detected_clouds,
        "total_resources": len(state.get('resources', [])),
        "suggestions": suggestions,
        "estimated_savings": f"{len(suggestions) * 20}% potentiel si appliqué"
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
