<div align="center">

  # 🏎️ Car Price Prediction — Advanced Machine Learning

  <p>An end-to-end data science pipeline and interactive React dashboard for predicting used vehicle market valuations with advanced feature engineering, outlier detection, and 9-model automated benchmarking.</p>

  <p>
    <a href="https://4kp3qr.csb.app/"><img src="https://img.shields.io/badge/Live_Dashboard-Launch_App-brightgreen?style=for-the-badge&logo=codesandbox&logoColor=white" alt="Live Dashboard"></a>
    <img src="https://img.shields.io/badge/Python-3.10%2B-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python">
    <img src="https://img.shields.io/badge/Scikit--Learn-1.2%2B-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white" alt="Scikit-Learn">
    <img src="https://img.shields.io/badge/React-18.0-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
    <img src="https://img.shields.io/badge/XGBoost-1.7%2B-EC6C00?style=for-the-badge" alt="XGBoost">
  </p>

  <br />

  <a href="https://4kp3qr.csb.app/" target="_blank">
    <img src="https://img.shields.io/badge/🚀_LAUNCH_LIVE_INTERACTIVE_DASHBOARD-4kp3qr.csb.app-purple?style=for-the-badge" alt="Launch Dashboard" width="400" />
  </a>

</div>

---

## 📌 Dataset Note

> **Context:** The dataset provided in the original task link defaulted to an advertising spend dataset rather than automotive data. To deliver a complete, realistic production machine learning project, `generate_dataset.py` constructs a **synthetic-but-realistic 3,000-row vehicle dataset** featuring non-trivial feature relationships (brand prestige, horsepower, engine size, mileage decay, and accident history). 
>
> The entire pipeline (`train_pipeline.py` and `car_price_prediction_advanced.ipynb`) is completely modular — **you can drop in any real-world car dataset at any time without changing the code**, as long as column names match.

---

## 📂 Repository File Structure

| Category | File | Description |
| :--- | :--- | :--- |
| 📓 **Main Deliverable** | `car_price_prediction_advanced.ipynb` | Full exploratory data science notebook with pre-rendered visualizations, statistical tests, and SHAP analyses. |
| ⚙️ **Core Scripts** | `train_pipeline.py` | Production-ready, automated pipeline (data cleaning → feature engineering → model training → export). |
| | `generate_dataset.py` | Generates the 3,000-row realistic synthetic vehicle dataset (`car_data.csv`). |
| 💻 **Interactive UI** | `car_price_dashboard.jsx` | React dashboard styled like a luxury vehicle instrument panel with live client-side inference. |
| 📦 **Artifacts & Data** | `car_data.csv` | Raw tabular dataset (3,000 listings, 14 feature columns). |
| | `best_model.joblib` | Serialized Scikit-Learn `ColumnTransformer` + model pipeline ready for production deployment. |
| | `model_comparison.csv` | Benchmarked metrics across all evaluated regression algorithms. |
| 🖼️ **Visual Assets** | `*.png` (`eda_overview`, `correlation_heatmap`, etc.) | Exported high-resolution analytical plots embedded across project documentation. |

---

## 🔬 Exploratory Data Science Notebook Overview

The core notebook (`car_price_prediction_advanced.ipynb`) is organized into **16 analytical sections across 64 pre-executed cells**:

* **Data Audit & Quality Profiling:** Deep inspection with `.info()`, `.describe()`, missingness heatmaps, and categorical cardinality checks.
* **Rigorous Statistical Testing:** Replaces arbitrary visual boxplots with formal **ANOVA** (testing brand and fuel type variance) and **Welch’s t-test** (transmission pricing significance).
* **Dual-Stage Outlier Removal:** Combines **Interquartile Range (IQR)** with an **Isolation Forest** model; rows are only dropped when flagged by *both* methods to preserve legitimate high-end supercar data.
* **Feature Engineering:** Constructs non-linear terms (`mileage_per_year`, `hp_per_liter`, `goodwill_x_hp`, and `log_mileage`) with explicit domain rationales.
* **9-Algorithm Model Zoo:** Evaluates Linear, Ridge, Lasso, ElasticNet, SVR, Random Forest, Gradient Boosting, **XGBoost**, and **LightGBM**. Features an overfit-gap metric ($\text{Train } R^2 - \text{Test } R^2$).
* **Bootstrap Confidence Intervals:** Runs 1,000 resamples to output standard error bounds for $R^2$ and MAE.
* **Model Interpretability:** Uses **SHAP (SHapley Additive exPlanations)** summary plots and permutation importances to uncover feature directionality and impact magnitude.
* **Residual Diagnostics:** Formally checks error distribution using **Breusch-Pagan** (heteroscedasticity) and **Shapiro-Wilk** (normality) tests, stratified across price quartiles.

---

## ⚡ End-to-End Pipeline Summary
1. **Leak-Free Transformation:** All preprocessing (Standard Scaling for numerics, One-Hot Encoding for categoricals, and Imputation) is encapsulated inside a single Scikit-Learn `ColumnTransformer` to prevent data leakage during cross-validation.
2. **Automated Model Selection:** Evaluates algorithms using 5-fold cross-validation.
3. **Champion Model:** Linear Regression selected ($R^2 = 0.983$, $\text{MAE} \approx \$1,475$). 
4. **Client-Side Export:** Model coefficients and metric data are serialized into JSON and embedded into the React frontend for zero-latency client-side prediction.

---

## 🎛️ Interactive React Dashboard

The companion dashboard (`car_price_dashboard.jsx`) is styled after a vehicle instrument cluster with dark mode paneling, amber/teal accents, and industrial type.

* **Metric Telemetry:** Live gauge cards for $R^2$, MAE, RMSE, and Champion Model metrics.
* **Model Comparison Grid:** Interactive bar charts comparing all benchmarked algorithms.
* **Feature Driver Analysis:** Standardized coefficient weights highlighting market price drivers.
* **Build Sheet Estimator:** Interactive input panel (Brand, Horsepower, Mileage, Age, Accident Count) that recalculates estimated vehicle value instantly in the browser without requiring a backend server.

---

## 🚀 Quick Start Guide

1. **Clone the Repository:**
   ```bash
   git clone [https://github.com/saahilramzan27-mlai/car_price_prediction_CodeAlpha.git](https://github.com/saahilramzan27-mlai/car_price_prediction_CodeAlpha.git)
   cd car_price_prediction_CodeAlpha
