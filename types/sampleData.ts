// Sample response data for testing the dashboard
// You can use this in your browser console or create a test button

export const sampleApiResponse = {
  "all_policy_scores": {
    "ClickLife": {
      "components": {
        "financial_breakdown": {
          "estimated_premium": 3360.0000000000005,
          "monthly_income": 140000,
          "premium_ratio": 0.024000000000000004,
          "status": "highly_affordable"
        },
        "financial_score": 1.0,
        "nlp_score": 0.4042326807975769,
        "rule_breakdown": {
          "age_fit": 0.7545454545454545,
          "employment_fit": 1.0,
          "goal_alignment": 1.0,
          "income_fit": 1.0,
          "medical_eligibility": 1.0
        },
        "rule_score": 0.9386363636363636
      },
      "final_score": 0.7700041655518792,
      "policy_name": "ClickLife",
      "weights": {
        "financial": 0.3,
        "nlp": 0.35,
        "rule": 0.35,
        "trigger": 0.0
      }
    }
  },
  "alternate_riders": [
    {
      "name": "Disability Income",
      "score": 61.3,
      "scores": {
        "components": {
          "financial_breakdown": {
            "estimated_premium": 2800.0,
            "monthly_income": 140000,
            "premium_ratio": 0.02,
            "status": "highly_affordable"
          },
          "financial_score": 1.0,
          "nlp_score": 0.32104364037513733,
          "rule_breakdown": {
            "family_relevance": 0.8,
            "matched_triggers": ["dependents"],
            "medical_relevance": 0.8,
            "trigger_match": 0.5
          },
          "rule_score": 0.62,
          "trigger_breakdown": {
            "match_ratio": 0.5,
            "matched_triggers": ["dependents"],
            "total_triggers": 2,
            "unmatched_triggers": ["high_income"]
          },
          "trigger_score": 0.5
        },
        "fills_gaps": ["family_protection", "disability"],
        "final_score": 0.613365274131298,
        "gap_priority": 1.8,
        "rider_name": "Disability Income",
        "weights": {
          "financial": 0.1,
          "nlp": 0.35,
          "rule": 0.3,
          "trigger": 0.25
        }
      }
    }
  ],
  "coverage_analysis": {
    "coverage_gaps": ["family_protection", "disability", "child_health"],
    "coverage_percentage": 25.0,
    "coverage_ratio": 0.25,
    "covered_risk_names": ["Death benefit / Life cover"],
    "covered_risks": ["death"],
    "gap_names": ["Family income protection", "Disability income protection", "Children healthcare"],
    "policy_coverage": ["death"],
    "total_coverage": ["death"],
    "user_risk_names": ["Family income protection", "Death benefit / Life cover", "Disability income protection", "Children healthcare"],
    "user_risks": ["family_protection", "death", "disability", "child_health"]
  },
  "policy": {
    "explanation": {
      "component_scores": {
        "financial_breakdown": {
          "estimated_premium": 3360.0000000000005,
          "monthly_income": 140000,
          "premium_ratio": 0.024000000000000004,
          "status": "highly_affordable"
        },
        "financial_score": 1.0,
        "nlp_score": 0.4042326807975769,
        "rule_breakdown": {
          "age_fit": 0.7545454545454545,
          "employment_fit": 1.0,
          "goal_alignment": 1.0,
          "income_fit": 1.0,
          "medical_eligibility": 1.0
        },
        "rule_score": 0.9386363636363636
      },
      "concerns": [],
      "confidence": 0.7700041655518792,
      "confidence_level": "High",
      "primary_reasons": [
        "Perfect match for your primary goal: Cheap & quick",
        "Good age match for your profile (20 years)"
      ],
      "recommendation": "ClickLife",
      "supporting_factors": [
        "Designed for your Mid income bracket",
        "Suitable for Contract employment type",
        "Provides protection for your 4 dependent(s)",
        "Accepts your medical risk profile (Low risk)",
        "Financially suitable - estimated premium is highly_affordable"
      ]
    },
    "name": "ClickLife",
    "score": 77.0
  },
  "policy_shap": {
    "base_value": 0.5,
    "component_scores": {
      "financial_breakdown": {
        "estimated_premium": 3360.0000000000005,
        "monthly_income": 140000,
        "premium_ratio": 0.024000000000000004,
        "status": "highly_affordable"
      },
      "financial_score": 1.0,
      "nlp_score": 0.4042326807975769,
      "rule_breakdown": {
        "age_fit": 0.7545454545454545,
        "employment_fit": 1.0,
        "goal_alignment": 1.0,
        "income_fit": 1.0,
        "medical_eligibility": 1.0
      },
      "rule_score": 0.9386363636363636
    },
    "feature_names": ["Age", "Income Level", "Has Dependents", "Rule Match Score", "Semantic Similarity", "Affordability"],
    "feature_values": [0.2, 0.5, 1.0, 0.9386363636363636, 0.4042326807975769, 1.0],
    "final_score": 0.7700041655518792,
    "shap_values": [-0.044375, 0.0, 0.02625, 0.15352272727272726, -0.03351856172084808, 0.15],
    "top_negative_contributors": [
      {
        "contribution": -0.044375,
        "feature": "Age",
        "value": 0.2
      },
      {
        "contribution": -0.03351856172084808,
        "feature": "Semantic Similarity",
        "value": 0.4042326807975769
      }
    ],
    "top_positive_contributors": [
      {
        "contribution": 0.15352272727272726,
        "feature": "Rule Match Score",
        "value": 0.9386363636363636
      },
      {
        "contribution": 0.15,
        "feature": "Affordability",
        "value": 1.0
      },
      {
        "contribution": 0.02625,
        "feature": "Has Dependents",
        "value": 1.0
      }
    ]
  },
  "primary_riders": [],
  "rider_explanations": [],
  "success": true
};
