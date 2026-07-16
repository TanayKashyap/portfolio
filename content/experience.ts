export interface Experience {
  company: string;
  title: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
  /** Headline numbers rendered as mono "stat chips". */
  metrics: string[];
}

export const experience: Experience[] = [
  {
    company: "PepsiCo",
    title: "Data Science Intern",
    location: "Mississauga, Ontario",
    start: "May 2025",
    end: "Sep 2025",
    bullets: [
      "Forecasted weekly brand market share trends for PepsiCo brands vs. competitors using time-series modelling, enabling marketing leadership to identify 3 high-opportunity customer segments and prioritize 2 regions for targeted promotions.",
      "Designed a customer segmentation pipeline using K-Means and hierarchical clustering on 10,000+ retail locations, and developed a cosine-similarity scoring workflow in Python to classify new stores, improving campaign targeting precision by 28%.",
      "Built a media effectiveness model using regularized multivariate regression + uplift modelling in DoWhy and scikit-learn to quantify incremental ROI by channel, which guided cross-channel budget reallocation and increased marketing ROI by 22%.",
    ],
    metrics: ["28%", "22%", "10,000+"],
  },
  {
    company: "Royal Bank of Canada (RBC)",
    title: "Data Science Intern",
    location: "Toronto, Ontario",
    start: "Sep 2024",
    end: "Dec 2024",
    bullets: [
      "Conducted A/B testing on personalized shopping offers and applied Inverse Probability Weighting (IPW) to correct selection bias, improving model fairness and resulting in a 20% uplift in offer redemption rates across key customer segments in production.",
      "Built a personalized travel-offer recommendation model by training a feedforward neural network with embedding layers and batch normalization (TensorFlow), achieving a 35% increase in click-through rates in live deployment conditions.",
      "Improved receipt data extraction workflows by fine-tuning a BERT-based Named Entity Recognition (NER) model (HuggingFace Transformers), improving entity classification accuracy by 11%, enabling richer downstream customer-spend features.",
    ],
    metrics: ["20%", "35%", "11%"],
  },
  {
    company: "Royal Bank of Canada (RBC)",
    title: "Data Analyst Intern",
    location: "Toronto, Ontario",
    start: "Jan 2024",
    end: "May 2024",
    bullets: [
      "Developed a Tableau credit risk dashboard, reducing reporting time by 30% and accelerating identification of deteriorating accounts.",
      "Developed an automated data quality validation framework using YData and Airflow, detecting 5 critical data integrity issues pre-production and significantly improving the reliability and stability of enterprise risk scoring pipelines.",
      "Enhanced our early warning signal model using Monte Carlo simulation and prescriptive scenario optimization techniques, enabling risk teams to identify credit deterioration approximately 2 months earlier and proactively adjust portfolio exposure strategies.",
    ],
    metrics: ["30%", "2 months"],
  },
  {
    company: "Magnet Forensics",
    title: "Machine Learning Intern",
    location: "Waterloo, Ontario",
    start: "Jan 2023",
    end: "May 2023",
    bullets: [
      "Improved data reliability for anomaly detection pipelines by developing a TensorFlow autoencoder with regularized latent representations, reducing reconstruction error by 30% and strengthening threat intelligence feature consistency in workflows.",
      "Increased object detection robustness by 15% by training a Generative Adversarial Network (GAN)-based synthetic data generator to augment edge-case imagery, expanding dataset diversity by 10,000+ additional samples used in production model retraining.",
      "Implemented a homomorphic encryption inference pipeline using Microsoft SEAL, containerized with Docker, enabling secure ML on encrypted data while preserving 93% model accuracy, reinforcing privacy-first model deployment practices.",
    ],
    metrics: ["30%", "15%", "93%"],
  },
];
