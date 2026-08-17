import React, { useState, useMemo, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  Cell,
  ReferenceLine,
} from "recharts";

export const CAR_DATA = {
  best_model_name: "Linear Regression",
  final_metrics: { MAE: 1474.56, RMSE: 1882.28, R2: 0.9831 },
  model_comparison: [
    {
      model: "Linear Regression",
      MAE: 1474.56,
      RMSE: 1882.28,
      R2_test: 0.9831,
      R2_train: 0.9838,
      R2_cv_mean: 0.9829,
      R2_cv_std: 0.0022,
    },
    {
      model: "Ridge Regression",
      MAE: 1474.64,
      RMSE: 1881.8,
      R2_test: 0.9831,
      R2_train: 0.9838,
      R2_cv_mean: 0.9829,
      R2_cv_std: 0.0022,
    },
    {
      model: "Gradient Boosting",
      MAE: 1610.75,
      RMSE: 2017.05,
      R2_test: 0.9806,
      R2_train: 0.9897,
      R2_cv_mean: 0.9816,
      R2_cv_std: 0.0028,
    },
    {
      model: "Lasso Regression",
      MAE: 1625.94,
      RMSE: 2065.59,
      R2_test: 0.9797,
      R2_train: 0.9807,
      R2_cv_mean: 0.9799,
      R2_cv_std: 0.0029,
    },
    {
      model: "SVR (RBF)",
      MAE: 1742.94,
      RMSE: 2258.45,
      R2_test: 0.9757,
      R2_train: 0.9909,
      R2_cv_mean: 0.9767,
      R2_cv_std: 0.0009,
    },
    {
      model: "Random Forest",
      MAE: 2075.21,
      RMSE: 2661.14,
      R2_test: 0.9662,
      R2_train: 0.9948,
      R2_cv_mean: 0.9674,
      R2_cv_std: 0.0047,
    },
  ],
  feature_importance: [
    { feature: "is_luxury_brand", importance: 0.14478184006188 },
    { feature: "age_years", importance: 0.09220106116072842 },
    { feature: "brand_Tesla", importance: 0.0713816831073894 },
    { feature: "brand_Subaru", importance: 0.049884384837692405 },
    { feature: "brand_Kia", importance: 0.04768363864049305 },
    { feature: "brand_Hyundai", importance: 0.04172126925332558 },
    { feature: "mileage", importance: 0.041411815875228096 },
    { feature: "brand_Audi", importance: 0.04115008393566482 },
    { feature: "fuel_type_Electric", importance: 0.040440363903305 },
    { feature: "brand_Mercedes-Benz", importance: 0.03833235921305966 },
    { feature: "brand_Nissan", importance: 0.035764768054032905 },
    { feature: "goodwill_x_hp", importance: 0.0336450200282616 },
    { feature: "brand_Volkswagen", importance: 0.029315081932745648 },
    { feature: "horsepower", importance: 0.02835646420167679 },
    { feature: "brand_Chevrolet", importance: 0.02516216400089046 },
  ],
  actual_vs_predicted_sample: [
    { actual: 8120.82, predicted: 6980.3 },
    { actual: 32961.7, predicted: 28511.36 },
    { actual: 57408.92, predicted: 57207.57 },
    { actual: 27291.89, predicted: 27268.62 },
    { actual: 56037.94, predicted: 57104.21 },
    { actual: 48504.67, predicted: 46896.36 },
    { actual: 9467.32, predicted: 11486.22 },
    { actual: 15061.79, predicted: 15272.41 },
    { actual: 7051.33, predicted: 8507.99 },
    { actual: 18871.82, predicted: 16271.22 },
    { actual: 9676.19, predicted: 5703.03 },
    { actual: 2500.0, predicted: 4284.12 },
    { actual: 11401.82, predicted: 10840.46 },
    { actual: 13044.26, predicted: 12272.94 },
    { actual: 27955.16, predicted: 31380.16 },
    { actual: 35286.23, predicted: 33069.2 },
    { actual: 15171.14, predicted: 16590.62 },
    { actual: 2500.0, predicted: -4811.91 },
    { actual: 15032.57, predicted: 11117.68 },
    { actual: 41141.95, predicted: 40395.15 },
    { actual: 21708.47, predicted: 21780.83 },
    { actual: 18608.42, predicted: 20388.57 },
    { actual: 8731.25, predicted: 12788.92 },
    { actual: 24960.76, predicted: 24968.73 },
    { actual: 2500.0, predicted: 3232.88 },
    { actual: 15666.65, predicted: 13641.89 },
    { actual: 21809.13, predicted: 21353.25 },
    { actual: 26174.01, predicted: 22844.42 },
    { actual: 21843.47, predicted: 21223.6 },
    { actual: 16440.99, predicted: 14705.03 },
    { actual: 3941.61, predicted: 6161.83 },
    { actual: 16682.12, predicted: 18734.07 },
    { actual: 15514.39, predicted: 14329.52 },
    { actual: 11840.57, predicted: 11253.5 },
    { actual: 28791.9, predicted: 29479.67 },
    { actual: 21208.24, predicted: 21990.45 },
    { actual: 62487.49, predicted: 60608.08 },
    { actual: 25235.87, predicted: 24305.04 },
    { actual: 24446.56, predicted: 27258.49 },
    { actual: 4681.97, predicted: 7280.44 },
    { actual: 4174.83, predicted: 3632.12 },
    { actual: 26086.19, predicted: 25689.15 },
    { actual: 18593.76, predicted: 20331.42 },
    { actual: 28086.25, predicted: 24877.56 },
    { actual: 14582.94, predicted: 15189.88 },
    { actual: 2500.0, predicted: 3904.24 },
    { actual: 24856.92, predicted: 24943.45 },
    { actual: 3323.13, predicted: 6390.07 },
    { actual: 12511.65, predicted: 15792.3 },
    { actual: 32070.74, predicted: 30248.9 },
    { actual: 9855.66, predicted: 9387.35 },
    { actual: 28266.74, predicted: 28237.91 },
    { actual: 13860.39, predicted: 14402.58 },
    { actual: 20892.15, predicted: 22987.37 },
    { actual: 11503.59, predicted: 11832.62 },
    { actual: 4711.24, predicted: 8032.61 },
    { actual: 2500.0, predicted: 4069.75 },
    { actual: 25537.45, predicted: 24843.18 },
    { actual: 20323.98, predicted: 17457.08 },
    { actual: 12908.92, predicted: 14232.14 },
    { actual: 12199.8, predicted: 11962.34 },
    { actual: 13986.06, predicted: 13718.42 },
    { actual: 5188.03, predicted: 6928.59 },
    { actual: 18992.91, predicted: 20132.19 },
    { actual: 2500.0, predicted: 1817.81 },
    { actual: 24380.48, predicted: 29967.28 },
    { actual: 14268.59, predicted: 14445.59 },
    { actual: 57588.59, predicted: 57555.06 },
    { actual: 35693.34, predicted: 37002.47 },
    { actual: 27864.81, predicted: 24943.24 },
    { actual: 21543.8, predicted: 21518.9 },
    { actual: 11013.34, predicted: 8462.28 },
    { actual: 20190.18, predicted: 20210.06 },
    { actual: 3483.85, predicted: 1844.62 },
    { actual: 9336.76, predicted: 12752.77 },
    { actual: 15222.58, predicted: 16311.21 },
    { actual: 24167.61, predicted: 23005.92 },
    { actual: 32856.2, predicted: 34093.63 },
    { actual: 16416.48, predicted: 15192.38 },
    { actual: 14767.02, predicted: 11585.64 },
    { actual: 26113.83, predicted: 24511.76 },
    { actual: 26778.07, predicted: 25633.6 },
    { actual: 28191.27, predicted: 27635.53 },
    { actual: 57646.11, predicted: 56591.61 },
    { actual: 6396.56, predicted: 6199.35 },
    { actual: 19113.32, predicted: 19342.16 },
    { actual: 24867.51, predicted: 25944.06 },
    { actual: 2500.0, predicted: 4810.57 },
    { actual: 26106.28, predicted: 24221.54 },
    { actual: 20870.56, predicted: 19591.94 },
    { actual: 19023.73, predicted: 17498.71 },
    { actual: 4474.75, predicted: 7491.75 },
    { actual: 15620.28, predicted: 12835.82 },
    { actual: 34202.94, predicted: 36115.02 },
    { actual: 16244.6, predicted: 14415.96 },
    { actual: 48171.87, predicted: 48914.91 },
    { actual: 26995.24, predicted: 26905.21 },
    { actual: 19675.71, predicted: 20213.62 },
    { actual: 22092.73, predicted: 21751.18 },
    { actual: 49813.66, predicted: 48097.53 },
    { actual: 30547.44, predicted: 30392.17 },
    { actual: 41152.49, predicted: 43842.69 },
    { actual: 38235.83, predicted: 40779.89 },
    { actual: 11197.89, predicted: 12968.19 },
    { actual: 16972.91, predicted: 17909.65 },
    { actual: 25921.89, predicted: 25996.65 },
    { actual: 2500.0, predicted: 4075.83 },
    { actual: 2500.0, predicted: 2268.26 },
    { actual: 62999.21, predicted: 62589.63 },
    { actual: 2500.0, predicted: 2473.78 },
    { actual: 18103.81, predicted: 19997.88 },
    { actual: 43159.14, predicted: 42038.22 },
    { actual: 13713.5, predicted: 13734.15 },
    { actual: 15264.98, predicted: 14790.12 },
    { actual: 47658.86, predicted: 46963.37 },
    { actual: 9831.78, predicted: 10735.18 },
    { actual: 19099.2, predicted: 16728.61 },
    { actual: 34121.15, predicted: 32918.76 },
    { actual: 38087.39, predicted: 36484.08 },
    { actual: 53153.04, predicted: 52863.21 },
    { actual: 12833.82, predicted: 13527.29 },
    { actual: 31995.5, predicted: 31159.06 },
    { actual: 10638.81, predicted: 11412.4 },
    { actual: 27540.09, predicted: 26016.56 },
    { actual: 6097.66, predicted: 8149.01 },
    { actual: 13494.43, predicted: 13092.29 },
    { actual: 25414.03, predicted: 27586.86 },
    { actual: 26562.01, predicted: 25186.1 },
    { actual: 9485.59, predicted: 10832.89 },
    { actual: 14532.78, predicted: 13300.46 },
    { actual: 8492.69, predicted: 7622.32 },
    { actual: 17543.56, predicted: 19844.82 },
    { actual: 24993.33, predicted: 25180.2 },
    { actual: 2500.0, predicted: -2424.18 },
    { actual: 19303.28, predicted: 16665.53 },
    { actual: 2500.0, predicted: 5098.32 },
    { actual: 19224.19, predicted: 17695.28 },
    { actual: 3143.89, predicted: 3466.46 },
    { actual: 26602.36, predicted: 27896.55 },
    { actual: 59898.52, predicted: 57639.55 },
    { actual: 7367.49, predicted: 7270.45 },
    { actual: 31978.12, predicted: 27905.61 },
    { actual: 37938.21, predicted: 38055.44 },
    { actual: 10596.73, predicted: 9911.36 },
    { actual: 11725.19, predicted: 11667.94 },
    { actual: 44500.37, predicted: 45101.81 },
    { actual: 28589.48, predicted: 28634.06 },
    { actual: 47821.1, predicted: 49442.42 },
    { actual: 16833.27, predicted: 19114.75 },
    { actual: 13145.63, predicted: 12081.1 },
  ],
  brand_avg_price: {
    Tesla: 49985.0,
    "Mercedes-Benz": 48907.0,
    Lexus: 45247.0,
    BMW: 42941.0,
    Audi: 41411.0,
    Subaru: 19638.0,
    Toyota: 19300.0,
    Honda: 18168.0,
    Volkswagen: 17812.0,
    Mazda: 16054.0,
    Ford: 14548.0,
    Chevrolet: 13366.0,
    Nissan: 12893.0,
    Hyundai: 12350.0,
    Kia: 12315.0,
  },
  correlation_with_price: {
    brand_goodwill: 0.65,
    horsepower: 0.623,
    engine_size_l: 0.267,
    mileage: -0.486,
    age_years: -0.507,
    owner_count: -0.059,
    accident_count: -0.173,
    city_mpg: -0.076,
  },
  dataset_shape: { rows: 3000, columns: 19 },
  brands: [
    "Audi",
    "BMW",
    "Chevrolet",
    "Ford",
    "Honda",
    "Hyundai",
    "Kia",
    "Lexus",
    "Mazda",
    "Mercedes-Benz",
    "Nissan",
    "Subaru",
    "Tesla",
    "Toyota",
    "Volkswagen",
  ],
  fuel_types: ["Diesel", "Electric", "Hybrid", "Petrol"],
  transmissions: ["Automatic", "Manual"],
  feature_ranges: {
    horsepower: [95, 460],
    mileage: [500, 375050],
    age_years: [0, 18],
    engine_size_l: [0.0, 5.42],
  },
  brand_goodwill_map: {
    Audi: 8.59,
    BMW: 8.83,
    Chevrolet: 6.18,
    Ford: 6.46,
    Honda: 8.2,
    Hyundai: 6.8,
    Kia: 6.61,
    Lexus: 9.1,
    Mazda: 7.34,
    "Mercedes-Benz": 9.0,
    Nissan: 6.34,
    Subaru: 7.67,
    Tesla: 8.9,
    Toyota: 8.48,
    Volkswagen: 6.98,
  },
  linear_model_export: {
    intercept: 22331.38549372966,
    coefficients: {
      brand_goodwill: 912.692399187141,
      horsepower: 1627.6183696642984,
      engine_size_l: 911.1525518179022,
      mileage: -2376.9759078669326,
      age_years: -5292.202151171906,
      owner_count: -513.1403070593395,
      accident_count: -677.8081435682064,
      city_mpg: 2.8756900357712825,
      doors: 1.467073436827232,
      mileage_per_year: -153.97288557094694,
      hp_per_liter: 108.74455597613807,
      is_luxury_brand: 8310.259727818242,
      accident_free: 216.82683148569367,
      goodwill_x_hp: 1931.1735150140346,
      brand_Audi: -2361.952888433647,
      brand_BMW: -1169.7078937094188,
      brand_Chevrolet: -1444.270345452071,
      brand_Ford: -985.5591174133936,
      brand_Honda: 593.624091380188,
      brand_Hyundai: -2394.7380660529434,
      brand_Kia: -2736.969095713686,
      brand_Lexus: 641.0504567833027,
      brand_Mazda: -115.2157934770391,
      "brand_Mercedes-Benz": 2200.2197299357617,
      brand_Nissan: -2052.8438615447913,
      brand_Subaru: 2863.288615384926,
      brand_Tesla: 4097.201183364482,
      brand_Toyota: 1183.23140020768,
      brand_Volkswagen: 1682.6415847406447,
      fuel_type_Diesel: -1326.196505845051,
      fuel_type_Electric: 2321.2160266806477,
      fuel_type_Hybrid: 330.8551447094379,
      fuel_type_Petrol: -1325.8746655450313,
      transmission_Automatic: 1267.464229021274,
      transmission_Manual: -1267.4642290212737,
    },
    numeric_features: [
      "brand_goodwill",
      "horsepower",
      "engine_size_l",
      "mileage",
      "age_years",
      "owner_count",
      "accident_count",
      "city_mpg",
      "doors",
      "mileage_per_year",
      "hp_per_liter",
      "is_luxury_brand",
      "accident_free",
      "goodwill_x_hp",
    ],
    numeric_medians: {
      brand_goodwill: 7.4,
      horsepower: 196.75,
      engine_size_l: 2.06,
      mileage: 101825.0,
      age_years: 9.0,
      owner_count: 2.0,
      accident_count: 0.0,
      city_mpg: 28.6,
      doors: 4.0,
      mileage_per_year: 11756.75,
      hp_per_liter: 94.98299319727892,
      is_luxury_brand: 0.0,
      accident_free: 1.0,
      goodwill_x_hp: 14.220195,
    },
    numeric_means: {
      brand_goodwill: 7.499545833333333,
      horsepower: 211.85583333333332,
      engine_size_l: 2.036245833333333,
      mileage: 108089.56166666666,
      age_years: 8.981666666666667,
      owner_count: 1.7670833333333333,
      accident_count: 0.3925,
      city_mpg: 28.074041666666673,
      doors: 3.715,
      mileage_per_year: 11370.858004725327,
      hp_per_liter: 104.5809397158176,
      is_luxury_brand: 0.21375,
      accident_free: 0.6825,
      goodwill_x_hp: 16.1405046875,
    },
    numeric_stds: {
      brand_goodwill: 1.0617918041684564,
      horsepower: 60.25527016484856,
      engine_size_l: 1.0288280701357762,
      mileage: 73637.5110046811,
      age_years: 5.447675090246195,
      owner_count: 0.9011103297537372,
      accident_count: 0.639096041295829,
      city_mpg: 7.8820331766787115,
      doors: 0.6991244524403362,
      mileage_per_year: 4064.4096117082927,
      hp_per_liter: 40.43482344566603,
      is_luxury_brand: 0.4099523600371146,
      accident_free: 0.46550375938331584,
      goodwill_x_hp: 6.052508936656378,
    },
    categorical_features: ["brand", "fuel_type", "transmission"],
    categorical_categories: {
      brand: [
        "Audi",
        "BMW",
        "Chevrolet",
        "Ford",
        "Honda",
        "Hyundai",
        "Kia",
        "Lexus",
        "Mazda",
        "Mercedes-Benz",
        "Nissan",
        "Subaru",
        "Tesla",
        "Toyota",
        "Volkswagen",
      ],
      fuel_type: ["Diesel", "Electric", "Hybrid", "Petrol"],
      transmission: ["Automatic", "Manual"],
    },
  },
};

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');`;

const COLORS = {
  bg: "#12151A",
  panel: "#191D24",
  panelAlt: "#1F242C",
  border: "#2A3038",
  borderBright: "#3A4250",
  textPrimary: "#EDEFF2",
  textSecondary: "#8B92A0",
  textDim: "#5B6270",
  teal: "#5EEAD4",
  tealDim: "#2D5D56",
  amber: "#F5A623",
  amberDim: "#5C4620",
  rose: "#FB7185",
  roseDim: "#5B2E36",
};

const MODEL_COLORS = [
  "#5EEAD4",
  "#7DD3FC",
  "#F5A623",
  "#C4B5FD",
  "#FB7185",
  "#94A3B8",
];

/* ---------------------------------------------------------------- */
/* Currency support                                                  */
/* The model was trained and priced in USD. Rates below convert that */
/* USD figure for *display only* — approximate, for reference.       */
/* ---------------------------------------------------------------- */
const CURRENCIES = {
  USD: { code: "USD", symbol: "$", rate: 1, locale: "en-US" },
  PKR: { code: "PKR", symbol: "₨", rate: 278, locale: "en-PK" },
  INR: { code: "INR", symbol: "₹", rate: 83.2, locale: "en-IN" },
  EUR: { code: "EUR", symbol: "€", rate: 0.92, locale: "de-DE" },
  GBP: { code: "GBP", symbol: "£", rate: 0.79, locale: "en-GB" },
  AED: { code: "AED", symbol: "د.إ", rate: 3.67, locale: "ar-AE" },
  SAR: { code: "SAR", symbol: "﷼", rate: 3.75, locale: "ar-SA" },
  CAD: { code: "CAD", symbol: "CA$", rate: 1.37, locale: "en-CA" },
  AUD: { code: "AUD", symbol: "A$", rate: 1.52, locale: "en-AU" },
  JPY: { code: "JPY", symbol: "¥", rate: 149, locale: "ja-JP" },
  CNY: { code: "CNY", symbol: "¥", rate: 7.24, locale: "zh-CN" },
};

const CURRENCY_ORDER = [
  "USD",
  "PKR",
  "INR",
  "EUR",
  "GBP",
  "AED",
  "SAR",
  "CAD",
  "AUD",
  "JPY",
  "CNY",
];

/* ---------------------------------------------------------------- */
/* Responsive breakpoint hook                                       */
/* ---------------------------------------------------------------- */
function useViewport() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1280
  );
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return {
    width,
    isMobile: width < 720,
    isTablet: width >= 720 && width < 1040,
  };
}

/* ---------------------------------------------------------------- */
/* Gauge tile — instrument cluster readout                          */
/* ---------------------------------------------------------------- */
function GaugeTile({
  label,
  value,
  sublabel,
  accent = COLORS.teal,
  sweep = 0.75,
  compact,
}) {
  const R = 42;
  const CIRC = Math.PI * R;
  const dash = CIRC * Math.min(Math.max(sweep, 0), 1);
  return (
    <div
      style={{
        background: `linear-gradient(180deg, ${COLORS.panelAlt}, ${COLORS.panel})`,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 10,
        padding: compact ? "14px 12px 10px" : "18px 18px 14px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        minWidth: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${accent}55, transparent)`,
        }}
      />
      <svg
        width={compact ? "92" : "120"}
        height={compact ? "52" : "66"}
        viewBox="0 0 120 66"
      >
        <path
          d="M 10 60 A 50 50 0 0 1 110 60"
          fill="none"
          stroke={COLORS.border}
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M 10 60 A 50 50 0 0 1 110 60"
          fill="none"
          stroke={accent}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${CIRC}`}
        />
      </svg>
      <div
        style={{
          marginTop: -6,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: compact ? 17 : 24,
          fontWeight: 700,
          color: COLORS.textPrimary,
          letterSpacing: -0.5,
          textAlign: "center",
          maxWidth: "100%",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: compact ? 10 : 11,
          fontWeight: 600,
          color: COLORS.textSecondary,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginTop: 2,
          textAlign: "center",
        }}
      >
        {label}
      </div>
      {sublabel && (
        <div
          style={{
            fontSize: 10,
            color: COLORS.textDim,
            marginTop: 2,
            textAlign: "center",
          }}
        >
          {sublabel}
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Custom Input Elements                                            */
/* ---------------------------------------------------------------- */
function SelectField({ label, value, onChange, options }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: COLORS.textSecondary,
          textTransform: "uppercase",
        }}
      >
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          background: COLORS.panelAlt,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 6,
          color: COLORS.textPrimary,
          padding: "10px 12px",
          fontSize: 14,
          outline: "none",
          fontFamily: "'Inter', sans-serif",
          width: "100%",
          WebkitAppearance: "none",
          appearance: "none",
        }}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function RangeField({ label, value, onChange, min, max, step = 1, unit = "" }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <label
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: COLORS.textSecondary,
            textTransform: "uppercase",
          }}
        >
          {label}
        </label>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            color: COLORS.teal,
            fontWeight: 600,
          }}
        >
          {value.toLocaleString()} {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          accentColor: COLORS.teal,
          cursor: "pointer",
          width: "100%",
          touchAction: "pan-y",
        }}
      />
    </div>
  );
}

/* Compact currency dropdown used in the header */
function CurrencyPicker({ value, onChange, isMobile }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        minWidth: isMobile ? "100%" : 150,
      }}
    >
      <label
        style={{
          fontSize: 10,
          fontWeight: 600,
          color: COLORS.textSecondary,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        Display Currency
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          background: COLORS.panel,
          border: `1px solid ${COLORS.borderBright}`,
          borderRadius: 6,
          color: COLORS.teal,
          padding: isMobile ? "9px 10px" : "8px 10px",
          fontSize: 12,
          fontWeight: 600,
          outline: "none",
          fontFamily: "'JetBrains Mono', monospace",
          width: "100%",
          WebkitAppearance: "none",
          appearance: "none",
          cursor: "pointer",
        }}
      >
        {CURRENCY_ORDER.map((code) => (
          <option key={code} value={code}>
            {code} — {CURRENCIES[code].symbol}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Main Dashboard Component                                         */
/* ---------------------------------------------------------------- */
export default function CarValuationDashboard() {
  const { isMobile, isTablet } = useViewport();
  const [activeTab, setActiveTab] = useState("estimator");
  const [currency, setCurrency] = useState("USD");

  const [brand, setBrand] = useState("Tesla");
  const [fuelType, setFuelType] = useState("Electric");
  const [transmission, setTransmission] = useState("Automatic");
  const [horsepower, setHorsepower] = useState(280);
  const [mileage, setMileage] = useState(35000);
  const [ageYears, setAgeYears] = useState(3);
  const [engineSize, setEngineSize] = useState(0.0);
  const [ownerCount, setOwnerCount] = useState(1);
  const [accidentCount, setAccidentCount] = useState(0);
  const [cityMpg, setCityMpg] = useState(32);

  const curr = CURRENCIES[currency];

  // Convert a USD figure to the selected display currency and format it.
  const fmtPrice = (usdAmount) => {
    const converted = usdAmount * curr.rate;
    return (
      curr.symbol +
      Math.round(converted).toLocaleString(curr.locale, {
        maximumFractionDigits: 0,
      })
    );
  };

  // Compact axis-label formatter (e.g. "24.5k") in the selected currency.
  const fmtPriceCompact = (usdAmount) => {
    const converted = usdAmount * curr.rate;
    if (Math.abs(converted) >= 1000) return (converted / 1000).toFixed(1) + "k";
    return String(Math.round(converted));
  };

  const predictedPrice = useMemo(() => {
    const exp = CAR_DATA.linear_model_export;
    const means = exp.numeric_means;
    const stds = exp.numeric_stds;
    const coeffs = exp.coefficients;

    const brandGoodwill = CAR_DATA.brand_goodwill_map[brand] || 7.5;
    const isLuxury = [
      "Audi",
      "BMW",
      "Lexus",
      "Mercedes-Benz",
      "Tesla",
    ].includes(brand)
      ? 1
      : 0;
    const accidentFree = accidentCount === 0 ? 1 : 0;
    const mileagePerYear = ageYears > 0 ? mileage / ageYears : mileage;
    const hpPerLiter = engineSize > 0 ? horsepower / engineSize : 100;
    const goodwillXHp = (brandGoodwill * horsepower) / 100;

    const rawVals = {
      brand_goodwill: brandGoodwill,
      horsepower,
      engine_size_l: engineSize,
      mileage,
      age_years: ageYears,
      owner_count: ownerCount,
      accident_count: accidentCount,
      city_mpg: cityMpg,
      doors: 4,
      mileage_per_year: mileagePerYear,
      hp_per_liter: hpPerLiter,
      is_luxury_brand: isLuxury,
      accident_free: accidentFree,
      goodwill_x_hp: goodwillXHp,
    };

    let price = exp.intercept;
    Object.keys(rawVals).forEach((key) => {
      if (means[key] !== undefined && stds[key]) {
        const stdVal = (rawVals[key] - means[key]) / stds[key];
        price += stdVal * (coeffs[key] || 0);
      }
    });
    price += coeffs[`brand_${brand}`] || 0;
    price += coeffs[`fuel_type_${fuelType}`] || 0;
    price += coeffs[`transmission_${transmission}`] || 0;

    return Math.max(2500, price);
  }, [
    brand,
    fuelType,
    transmission,
    horsepower,
    mileage,
    ageYears,
    engineSize,
    ownerCount,
    accidentCount,
    cityMpg,
  ]);

  const modelMetricsData = useMemo(() => {
    return CAR_DATA.model_comparison.map((m) => ({
      name: isMobile ? m.model.split(" ")[0] : m.model,
      R2: m.R2_test,
      MAE: m.MAE,
      RMSE: m.RMSE,
    }));
  }, [isMobile]);

  const correlationData = useMemo(() => {
    return Object.entries(CAR_DATA.correlation_with_price).map(
      ([feature, corr]) => ({
        feature: feature.replace(/_/g, " "),
        correlation: corr,
      })
    );
  }, []);

  const tabLabels = {
    estimator: "Estimator",
    models: "Models",
    features: "Features",
    analytics: "Analytics",
  };

  return (
    <div
      style={{
        background: COLORS.bg,
        minHeight: "100vh",
        color: COLORS.textPrimary,
        fontFamily: "'Inter', sans-serif",
        padding: isMobile ? "16px 12px 32px" : "24px 32px",
        boxSizing: "border-box",
        width: "100%",
        overflowX: "hidden",
      }}
    >
      <style>{`
        ${FONT_IMPORT}
        * { box-sizing: border-box; }
        .avd-tabs::-webkit-scrollbar { display: none; }
        select { color-scheme: dark; }
        @media (max-width: 480px) {
          .avd-hero-value { font-size: 34px !important; }
        }
      `}</style>

      {/* Header */}
      <header
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "center",
          gap: isMobile ? 14 : 16,
          marginBottom: isMobile ? 18 : 28,
          borderBottom: `1px solid ${COLORS.border}`,
          paddingBottom: 16,
          flexWrap: "wrap",
        }}
      >
        <div style={{ minWidth: 0 }}>
          <h1
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: isMobile ? 19 : 28,
              letterSpacing: isMobile ? 0.5 : 1,
              textTransform: "uppercase",
              margin: 0,
              color: COLORS.teal,
              lineHeight: 1.2,
            }}
          >
            AUTOVAL ML {isMobile ? "" : "// VALUATION ENGINE"}
          </h1>
          <p
            style={{
              margin: "4px 0 0",
              fontSize: isMobile ? 12 : 13,
              color: COLORS.textSecondary,
            }}
          >
            {isMobile
              ? "Predictive Vehicle Valuation"
              : "Predictive Vehicle Valuation Platform & Architecture Workbench"}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 12,
            width: isMobile ? "100%" : "auto",
            alignItems: isMobile ? "stretch" : "center",
          }}
        >
          <CurrencyPicker
            value={currency}
            onChange={setCurrency}
            isMobile={isMobile}
          />
          <div
            className="avd-tabs"
            style={{
              display: "flex",
              gap: 8,
              width: isMobile ? "100%" : "auto",
              overflowX: isMobile ? "auto" : "visible",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              paddingBottom: isMobile ? 2 : 0,
            }}
          >
            {Object.keys(tabLabels).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  flexShrink: 0,
                  background: activeTab === tab ? COLORS.teal : COLORS.panel,
                  color: activeTab === tab ? COLORS.bg : COLORS.textPrimary,
                  border: `1px solid ${
                    activeTab === tab ? COLORS.teal : COLORS.border
                  }`,
                  padding: isMobile ? "9px 14px" : "8px 16px",
                  borderRadius: 6,
                  fontWeight: 600,
                  fontSize: 12,
                  cursor: "pointer",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {tabLabels[tab]}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Gauges Panel */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "repeat(2, minmax(0, 1fr))"
            : "repeat(auto-fit, minmax(200px, 1fr))",
          gap: isMobile ? 10 : 16,
          marginBottom: isMobile ? 20 : 28,
        }}
      >
        <GaugeTile
          label="Best Model R²"
          value={`${(CAR_DATA.final_metrics.R2 * 100).toFixed(1)}%`}
          sublabel="Linear Regression"
          sweep={CAR_DATA.final_metrics.R2}
          compact={isMobile}
        />
        <GaugeTile
          label="Mean Abs Error"
          value={fmtPrice(CAR_DATA.final_metrics.MAE)}
          sublabel="Test Set Error"
          accent={COLORS.amber}
          sweep={0.82}
          compact={isMobile}
        />
        <GaugeTile
          label="Root Mean Sq Error"
          value={fmtPrice(CAR_DATA.final_metrics.RMSE)}
          sublabel="Test Set RMSE"
          accent={COLORS.rose}
          sweep={0.78}
          compact={isMobile}
        />
        <GaugeTile
          label="Dataset Size"
          value={CAR_DATA.dataset_shape.rows.toLocaleString()}
          sublabel={`${CAR_DATA.dataset_shape.columns} Features Extracted`}
          accent="#7DD3FC"
          sweep={0.9}
          compact={isMobile}
        />
      </div>

      {/* Tab 1: Valuation Estimator */}
      {activeTab === "estimator" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile || isTablet ? "1fr" : "340px 1fr",
            gap: isMobile ? 16 : 24,
          }}
        >
          {/* Controls Panel */}
          <div
            style={{
              background: COLORS.panel,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 10,
              padding: isMobile ? 16 : 20,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: 14,
                textTransform: "uppercase",
                color: COLORS.teal,
                letterSpacing: 1,
              }}
            >
              Vehicle Specifications
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr",
                gap: 16,
              }}
            >
              <SelectField
                label="Brand"
                value={brand}
                onChange={setBrand}
                options={CAR_DATA.brands}
              />
              <SelectField
                label="Fuel Type"
                value={fuelType}
                onChange={setFuelType}
                options={CAR_DATA.fuel_types}
              />
              {isMobile && (
                <div style={{ gridColumn: "1 / -1" }}>
                  <SelectField
                    label="Transmission"
                    value={transmission}
                    onChange={setTransmission}
                    options={CAR_DATA.transmissions}
                  />
                </div>
              )}
            </div>
            {!isMobile && (
              <SelectField
                label="Transmission"
                value={transmission}
                onChange={setTransmission}
                options={CAR_DATA.transmissions}
              />
            )}

            <RangeField
              label="Horsepower"
              value={horsepower}
              onChange={setHorsepower}
              min={CAR_DATA.feature_ranges.horsepower[0]}
              max={CAR_DATA.feature_ranges.horsepower[1]}
              unit="HP"
            />
            <RangeField
              label="Mileage"
              value={mileage}
              onChange={setMileage}
              min={CAR_DATA.feature_ranges.mileage[0]}
              max={150000}
              step={1000}
              unit="mi"
            />
            <RangeField
              label="Age"
              value={ageYears}
              onChange={setAgeYears}
              min={CAR_DATA.feature_ranges.age_years[0]}
              max={CAR_DATA.feature_ranges.age_years[1]}
              unit="yrs"
            />
            <RangeField
              label="Engine Displacement"
              value={engineSize}
              onChange={setEngineSize}
              min={0}
              max={5.0}
              step={0.1}
              unit="L"
            />
            <RangeField
              label="Prior Owners"
              value={ownerCount}
              onChange={setOwnerCount}
              min={0}
              max={5}
              unit="owners"
            />
            <RangeField
              label="Accidents Reported"
              value={accidentCount}
              onChange={setAccidentCount}
              min={0}
              max={3}
              unit="incidents"
            />
            <RangeField
              label="City Fuel Efficiency"
              value={cityMpg}
              onChange={setCityMpg}
              min={10}
              max={60}
              unit="MPG"
            />
          </div>

          {/* Results Display Panel */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: isMobile ? 14 : 20,
              minWidth: 0,
            }}
          >
            <div
              style={{
                background: `linear-gradient(135deg, ${COLORS.panelAlt}, ${COLORS.panel})`,
                border: `1px solid ${COLORS.borderBright}`,
                borderRadius: 10,
                padding: isMobile ? "22px 16px" : 32,
                textAlign: "center",
              }}
            >
              <span
                style={{
                  fontSize: isMobile ? 11 : 12,
                  fontWeight: 700,
                  color: COLORS.textSecondary,
                  textTransform: "uppercase",
                  letterSpacing: 1.5,
                }}
              >
                Estimated Fair Market Value
              </span>
              <div
                className="avd-hero-value"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: isMobile ? 40 : 54,
                  fontWeight: 700,
                  color: COLORS.teal,
                  margin: "12px 0 8px",
                  wordBreak: "break-word",
                }}
              >
                {fmtPrice(predictedPrice)}
              </div>
              <p style={{ color: COLORS.textDim, fontSize: 12, margin: 0 }}>
                Confidence interval ± {fmtPrice(CAR_DATA.final_metrics.MAE)}{" "}
                based on regression test residuals
              </p>
              {curr.code !== "USD" && (
                <p
                  style={{
                    color: COLORS.textDim,
                    fontSize: 10.5,
                    margin: "6px 0 0",
                    opacity: 0.75,
                  }}
                >
                  Model trained in USD · converted at ≈1 USD = {curr.rate}{" "}
                  {curr.code} for display only
                </p>
              )}
            </div>

            {/* Price Scatter Chart */}
            <div
              style={{
                background: COLORS.panel,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 10,
                padding: isMobile ? 12 : 20,
                flex: 1,
                minWidth: 0,
              }}
            >
              <h4
                style={{
                  margin: "0 0 16px",
                  fontSize: 13,
                  color: COLORS.textSecondary,
                  textTransform: "uppercase",
                }}
              >
                {isMobile
                  ? "Actual vs. Predicted Sample"
                  : "Actual vs. Predicted Valuation Overlay Sample"}
              </h4>
              <div style={{ height: isMobile ? 220 : 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart
                    margin={{
                      top: 10,
                      right: isMobile ? 4 : 10,
                      bottom: 10,
                      left: isMobile ? -10 : 10,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={COLORS.border}
                    />
                    <XAxis
                      type="number"
                      dataKey="actual"
                      name="Actual Price"
                      tickFormatter={fmtPriceCompact}
                      stroke={COLORS.textDim}
                      tick={{ fontSize: isMobile ? 10 : 12 }}
                    />
                    <YAxis
                      type="number"
                      dataKey="predicted"
                      name="Predicted Price"
                      tickFormatter={fmtPriceCompact}
                      stroke={COLORS.textDim}
                      tick={{ fontSize: isMobile ? 10 : 12 }}
                      width={isMobile ? 40 : 60}
                    />
                    <Tooltip
                      formatter={(v) => fmtPrice(v)}
                      contentStyle={{
                        background: COLORS.panelAlt,
                        borderColor: COLORS.border,
                        color: COLORS.textPrimary,
                        fontSize: 12,
                      }}
                    />
                    <Scatter
                      data={CAR_DATA.actual_vs_predicted_sample}
                      fill={COLORS.teal}
                      opacity={0.6}
                    />
                    <ReferenceLine
                      x={predictedPrice}
                      stroke={COLORS.amber}
                      strokeDasharray="3 3"
                      label={
                        isMobile
                          ? undefined
                          : {
                              value: "Current Estimate",
                              fill: COLORS.amber,
                              fontSize: 10,
                            }
                      }
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Model Comparison */}
      {activeTab === "models" && (
        <div
          style={{
            background: COLORS.panel,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 10,
            padding: isMobile ? 12 : 20,
          }}
        >
          <h3
            style={{
              margin: "0 0 20px",
              fontSize: 14,
              color: COLORS.teal,
              textTransform: "uppercase",
            }}
          >
            Model Performance Benchmark (R² Score)
          </h3>
          <div style={{ height: isMobile ? 300 : 380 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={modelMetricsData}
                margin={{
                  top: 10,
                  right: isMobile ? 4 : 30,
                  left: isMobile ? -20 : 0,
                  bottom: isMobile ? 40 : 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                <XAxis
                  dataKey="name"
                  stroke={COLORS.textSecondary}
                  interval={0}
                  tick={{
                    fontSize: isMobile ? 9 : 12,
                    angle: isMobile ? -35 : 0,
                    textAnchor: isMobile ? "end" : "middle",
                  }}
                  height={isMobile ? 50 : 30}
                />
                <YAxis
                  domain={[0.95, 1.0]}
                  stroke={COLORS.textSecondary}
                  tick={{ fontSize: isMobile ? 10 : 12 }}
                />
                <Tooltip
                  contentStyle={{
                    background: COLORS.panelAlt,
                    borderColor: COLORS.border,
                    fontSize: 12,
                  }}
                  formatter={(v, name) =>
                    name === "R2" ? Number(v).toFixed(4) : fmtPrice(v)
                  }
                />
                <Bar dataKey="R2" radius={[4, 4, 0, 0]}>
                  {modelMetricsData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={MODEL_COLORS[index % MODEL_COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Tab 3: Feature Drivers */}
      {activeTab === "features" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? 16 : 24,
          }}
        >
          <div
            style={{
              background: COLORS.panel,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 10,
              padding: isMobile ? 12 : 20,
            }}
          >
            <h3
              style={{
                margin: "0 0 16px",
                fontSize: 14,
                color: COLORS.teal,
                textTransform: "uppercase",
              }}
            >
              Top Feature Importance Weights
            </h3>
            <div style={{ height: isMobile ? 320 : 360 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={CAR_DATA.feature_importance}
                  layout="vertical"
                  margin={{ left: isMobile ? 0 : 40, right: isMobile ? 8 : 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                  <XAxis
                    type="number"
                    stroke={COLORS.textDim}
                    tick={{ fontSize: isMobile ? 9 : 12 }}
                  />
                  <YAxis
                    type="category"
                    dataKey="feature"
                    stroke={COLORS.textSecondary}
                    tick={{ fontSize: isMobile ? 9 : 11 }}
                    width={isMobile ? 100 : 130}
                  />
                  <Tooltip
                    contentStyle={{
                      background: COLORS.panelAlt,
                      borderColor: COLORS.border,
                      fontSize: 12,
                    }}
                  />
                  <Bar
                    dataKey="importance"
                    fill={COLORS.teal}
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div
            style={{
              background: COLORS.panel,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 10,
              padding: isMobile ? 12 : 20,
            }}
          >
            <h3
              style={{
                margin: "0 0 16px",
                fontSize: 14,
                color: COLORS.teal,
                textTransform: "uppercase",
              }}
            >
              Feature Correlations to Valuation
            </h3>
            <div style={{ height: isMobile ? 320 : 360 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={correlationData}
                  layout="vertical"
                  margin={{ left: isMobile ? 0 : 40, right: isMobile ? 8 : 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                  <XAxis
                    type="number"
                    domain={[-0.6, 0.7]}
                    stroke={COLORS.textDim}
                    tick={{ fontSize: isMobile ? 9 : 12 }}
                  />
                  <YAxis
                    type="category"
                    dataKey="feature"
                    stroke={COLORS.textSecondary}
                    tick={{ fontSize: isMobile ? 9 : 11 }}
                    width={isMobile ? 90 : 130}
                  />
                  <Tooltip
                    contentStyle={{
                      background: COLORS.panelAlt,
                      borderColor: COLORS.border,
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="correlation" radius={[4, 4, 4, 4]}>
                    {correlationData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.correlation > 0 ? COLORS.teal : COLORS.rose}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Analytics */}
      {activeTab === "analytics" && (
        <div
          style={{
            background: COLORS.panel,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 10,
            padding: isMobile ? 12 : 20,
          }}
        >
          <h3
            style={{
              margin: "0 0 16px",
              fontSize: 14,
              color: COLORS.teal,
              textTransform: "uppercase",
            }}
          >
            Average Valuation by Vehicle Brand
          </h3>
          <div style={{ height: isMobile ? 320 : 360 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={Object.entries(CAR_DATA.brand_avg_price).map(
                  ([b, p]) => ({ brand: b, price: p })
                )}
                margin={{
                  top: 10,
                  right: isMobile ? 4 : 10,
                  left: isMobile ? -20 : 10,
                  bottom: isMobile ? 55 : 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                <XAxis
                  dataKey="brand"
                  stroke={COLORS.textSecondary}
                  interval={0}
                  tick={{
                    fontSize: isMobile ? 9 : 10,
                    angle: -35,
                    textAnchor: "end",
                  }}
                  height={isMobile ? 60 : 40}
                />
                <YAxis
                  stroke={COLORS.textSecondary}
                  tickFormatter={fmtPriceCompact}
                  tick={{ fontSize: isMobile ? 10 : 12 }}
                />
                <Tooltip
                  formatter={(v) => fmtPrice(v)}
                  contentStyle={{
                    background: COLORS.panelAlt,
                    borderColor: COLORS.border,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="price" fill="#7DD3FC" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
