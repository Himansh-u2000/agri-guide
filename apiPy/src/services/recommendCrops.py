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
    input_data_scaled = scaler.transform(input_data)  # Apply the same scaling
    
    # Get the 5 nearest neighbors
    distances, indices = knn.kneighbors(input_data_scaled, n_neighbors=5)
    
    # Fetch the nearest data points
    nearest_crops = y[indices[0]]  # Labels of the 5 nearest neighbors
    nearest_distances = distances[0]  # Corresponding distances
    
    # Accuracy of prediction
    predicted_label = knn.predict(input_data_scaled)[0]
    accuracy = (nearest_crops == predicted_label).sum() / 5 * 100  # Percentage match in top 5
    
    # Create list of top 5 crops
    top_5_crops = list(nearest_crops)        
    return top_5_crops

