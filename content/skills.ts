export interface SkillGroup {
  label: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    skills: ["Python", "SQL", "R", "C++", "Bash"],
  },
  {
    label: "Libraries",
    skills: [
      "scikit-learn",
      "PyTorch",
      "TensorFlow",
      "HuggingFace Transformers",
      "XGBoost",
      "DoWhy",
      "PySpark",
      "Prophet",
      "OpenCV",
    ],
  },
  {
    label: "Tools",
    skills: [
      "Databricks",
      "Apache Airflow",
      "MLflow",
      "Docker",
      "AWS (S3, Glue, Athena)",
      "Git",
      "Tableau",
      "Power BI",
    ],
  },
  {
    label: "Core Competencies",
    skills: [
      "Statistical & ML Modelling",
      "Time-Series Forecasting",
      "Causal Inference",
      "Model Deployment & Pipeline Reliability",
    ],
  },
];
