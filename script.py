import pandas as pd

# Charger le CSV
df = pd.read_csv("C:/xampp/htdocs/ITforGreen/public/data/udemy.csv")

# Convertir en JSON
df.to_json("udemy.json", orient="records", indent=4)

print("✅ Conversion terminée ! Fichier JSON créé : udemy.json")
