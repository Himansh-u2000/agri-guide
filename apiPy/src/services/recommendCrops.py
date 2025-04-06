import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
import os

# Use an absolute path to ensure the file is found
file_path = os.path.join(os.path.dirname(__file__), "Crop_recommendation.csv")
df = pd.read_csv(file_path)  # Corrected path to the CSV file

# Separate features and labels
X = df.iloc[:, :-1].values  # All columns except the last (features)
y = df.iloc[:, -1].values   # Last column (labels)

# Split dataset for training
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Normalize data for better accuracy
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Train KNN Classifier
knn = KNeighborsClassifier(n_neighbors=5, metric='euclidean')  # Using Euclidean distance
knn.fit(X_train, y_train)

# Function to predict label and get top 5 nearest neighbors
def predictCrop(N, P, K, temp, humidity, pH, rainfall):
    input_data = np.array([[N, P, K, temp, humidity, pH, rainfall]])
    input_data_scaled = scaler.transform(input_data)
    
    distances, indices = knn.kneighbors(input_data_scaled, n_neighbors=5)
    
    result = []
    for idx, dist in zip(indices[0], distances[0]):
        crop_data = df.iloc[idx]
        result.append({
            "crop": str(crop_data['label']),
            "N": int(crop_data['N']),
            "P": int(crop_data['P']),
            "K": int(crop_data['K']),
            "temperature": round(float(crop_data['temperature']), 2),
            "humidity": round(float(crop_data['humidity']), 2),
            "ph": round(float(crop_data['ph']), 2),
            "rainfall": round(float(crop_data['rainfall']), 2),
            "distance": round(float(dist), 2)
        })
    
    return result
