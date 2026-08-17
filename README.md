# Car Price Prediction — Advanced ML Project

## ⚠️ About the dataset
The dataset linked in the task (`kaggle.com/datasets/bumba5341/advertisingcsv`) is actually
an **advertising spend** dataset (TV/Radio/Newspaper → Sales) — not car data — and Kaggle
requires an authenticated login this environment can't reach. To deliver a real, working
car-price project, `generate_dataset.py` builds a **synthetic-but-realistic** dataset of
3,000 car listings with genuine, non-trivial relationships between features and price
(brand goodwill, horsepower, mileage, age, accidents, etc.), so every stage of the
pipeline is meaningful. Swap in the real Kaggle car dataset any time — `train_pipeline.py`
will work unchanged as long as column names match.

## Files
| File | Purpose |
|---|---|
| **`car_price_prediction_advanced.ipynb`** | **The main deliverable** — a full data-science notebook, already executed with all outputs/charts baked in. See below. |
| `generate_dataset.py` | Builds the synthetic dataset (3,000 rows, 14 raw columns) |
| `car_data.csv` | The dataset itself |
| `train_pipeline.py` | Standalone script version of the pipeline (cleaning → EDA → feature engineering → 6-model comparison → tuning → evaluation → export) — handy for production/CI, the notebook is the exploratory version |
| `best_model.joblib` / `best_model_notebook.joblib` | Trained, pickled scikit-learn pipeline (preprocessing + model) from the script and notebook runs respectively |
| `model_comparison.csv` | MAE / RMSE / R² for all algorithms tried (script version) |
| `eda_overview.png`, `correlation_heatmap.png`, `feature_importance.png`, `actual_vs_predicted.png` | Charts (also embedded live in the notebook) |
| `car_price_dashboard.jsx` | **Interactive dashboard** (React) — see below |

## The notebook (`car_price_prediction_advanced.ipynb`)
This is the advanced version of the pipeline, structured as a proper data-science
notebook (16 sections, 64 cells, already run so every chart/table/statistic is
visible without re-executing anything):

1. **Setup & data loading** with full `.info()` / `.describe()` profiling
2. **Data quality audit** — duplicate & missingness heatmap, categorical cardinality
3. **Statistical EDA** — Q-Q plots, skew/kurtosis, LOWESS-smoothed scatter grid,
   correlation heatmap, plus formal **ANOVA** (brand, fuel type) and **Welch's
   t-test** (transmission) rather than eyeballing boxplots
4. **Outlier detection** — IQR rule *and* Isolation Forest compared side by side;
   only rows both methods flag get removed, so genuine high-end/high-mileage cars
   are kept
5. **Feature engineering** — interaction terms, log-transforms, engineered ratios,
   each with a stated rationale
6. **Model zoo — 9 algorithms**: Linear, Ridge, Lasso, ElasticNet, SVR, Random
   Forest, Gradient Boosting, **XGBoost**, **LightGBM** — each cross-validated,
   with an overfit-gap chart (train R² − test R²) alongside raw performance
7. **Hyperparameter tuning** via `RandomizedSearchCV` on the top 2 models
8. **Learning curves** to diagnose bias vs. variance
9. **Bootstrap confidence intervals** (1,000 resamples) on R² and MAE — not just
   a point estimate
10. **Interpretability** — permutation importance *and* **SHAP** (summary plot +
    per-feature attribution), so you see both magnitude and direction of effect
11. **Residual diagnostics** — Breusch-Pagan test for heteroscedasticity,
    Shapiro-Wilk test for normality, and error broken down by price quartile and
    luxury vs. mainstream brand
12. **Saved model + a `predict_price()` inference function** ready to call on a
    new listing
13. **Business insights** — what actually drives price, ranked, plus honest
    limitations of the synthetic-data approach
Open it in Jupyter, JupyterLab, VS Code, or Google Colab — everything (including
XGBoost/LightGBM/SHAP installs) is captured in the code cells, so it reruns
cleanly in any environment with those packages available.

## Pipeline summary
1. **Data cleaning** — duplicate removal, missing-value audit (`SimpleImputer`)
2. **EDA** — price distribution, price vs. mileage/horsepower, brand boxplots, correlation heatmap
3. **Feature engineering** — `mileage_per_year`, `hp_per_liter`, `is_luxury_brand`,
   `accident_free`, `goodwill_x_hp` (an interaction term), one-hot encoding for
   brand/fuel/transmission, standard scaling for numerics — all inside a single
   `ColumnTransformer` so it's leak-free and reusable at inference time
4. **Modeling** — Linear, Ridge, Lasso, Random Forest, Gradient Boosting, SVR (RBF),
   each evaluated with train/test split **and** 5-fold cross-validation
5. **Tuning** — `GridSearchCV` on the strongest tree-based model when applicable
6. **Evaluation** — MAE, RMSE, R² (test, train, CV mean/std), actual-vs-predicted and
   residual plots
7. **Export** — best pipeline saved with `joblib`; all metrics/charts data exported to
   JSON and embedded directly into the dashboard so it runs with zero backend
**Result on this dataset:** Linear Regression won (R² = 0.983, MAE ≈ $1,475) — the
synthetic price formula is close to linear, which the comparison table makes visible;
on the real Kaggle-style data you swap in, a tree ensemble may well win instead, and the
pipeline picks whichever performs best automatically.

## The dashboard (`car_price_dashboard.jsx`)
A single-file React artifact styled like a car's instrument cluster (dark panel,
condensed industrial type, amber/teal gauge accents). It includes:
- **Gauge tiles** for R², MAE, RMSE, and the winning model
- **Model comparison** bar chart across all 6 algorithms
- **Feature driver** chart (standardized coefficient magnitude)
- **Actual vs. predicted** scatter with a reference diagonal
- **Price distribution** histogram
- **Average price by brand** (luxury brands highlighted)
- **Feature correlation** chart
- **"Build Sheet" live predictor** — pick a brand, fuel type, horsepower, mileage,
  age, engine size, accident count, and owner count; it recomputes the price
  client-side using the exported linear-model coefficients (no server call)
All chart data is embedded directly in the file (`CAR_DATA` constant), generated
from `train_pipeline.py`'s output — regenerate it any time by rerunning the pipeline
on new data and re-embedding the resulting `dashboard_data.json`.
