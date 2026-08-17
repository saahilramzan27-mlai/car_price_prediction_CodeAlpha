<div align="center">

  <h1>🚗 Car Price Prediction ML Dashboard</h1>
  <p>An end-to-end Machine Learning pipeline and interactive web app for predicting used car valuations.</p>

  <!-- Badges -->
  <p>
    <a href="https://4kp3qr.csb.app/"><img src="https://img.shields.io/badge/Live_Dashboard-Click_Here-brightgreen?style=for-the-badge&logo=codesandbox&logoColor=white" alt="Live Dashboard"></a>
    <img src="https://img.shields.io/badge/Python-3.10%2B-blue?style=for-the-badge&logo=python&logoColor=white" alt="Python Version">
    <img src="https://img.shields.io/badge/Scikit--Learn-1.2%2B-orange?style=for-the-badge&logo=scikit-learn&logoColor=white" alt="Scikit Learn">
  </p>

  <br />

  <!-- Primary Call To Action Button -->
  <a href="https://4kp3qr.csb.app/" target="_blank">
    <img src="https://img.shields.io/badge/🚀_LAUNCH_INTERACTIVE_DASHBOARD-4kp3qr.csb.app-purple?style=for-the-badge" alt="Launch App" width="380" />
  </a>

</div>

---

## 📌 Project Overview

This repository hosts a machine learning pipeline engineered to accurately estimate used vehicle market values based on key attributes such as mileage, age, brand prestige, and performance specs. It includes data preprocessing, robust outlier detection, feature engineering, model selection, and an interactive prediction web app.

---

## ⚡ Key Features

* 🧹 **Automated Data Processing**: Strips hidden spaces, handles missing data, and scales numeric/categorical features via Scikit-Learn `ColumnTransformer`.
* 📊 **Outlier Detection**: Employs Interquartile Range (IQR) and Isolation Forest algorithms to clean extreme data points.
* ⚙️ **Feature Engineering**: Dynamically derives indicators such as `mileage_per_year`, `hp_per_liter`, `log_mileage`, and luxury brand flags.
* 🤖 **Multi-Model Pipeline**: Trained on Ridge Regression, Random Forest, and Gradient Boosting models with automated feature importance ranking.
* 🌐 **Interactive Dashboard**: Deployed web frontend for real-time inference and price estimation.

---

## 🛠️ Tech Stack & Libraries

| Category | Tools & Libraries |
| :--- | :--- |
| **Language** | Python 3 |
| **Data Processing** | Pandas, NumPy |
| **Machine Learning** | Scikit-Learn, SciPy |
| **Visualization** | Matplotlib, Seaborn |
| **Deployment** | JavaScript, CodeSandbox |

---

## 🚀 Quick Start

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/saahilramzan27-mlai/car_price_prediction_CodeAlpha.git](https://github.com/saahilramzan27-mlai/car_price_prediction_CodeAlpha.git)
   cd car_price_prediction_CodeAlpha
