export interface PolicyScore {
  components: {
    financial_breakdown: {
      estimated_premium: number;
      monthly_income: number;
      premium_ratio: number;
      status: string;
    };
    financial_score: number;
    nlp_score: number;
    rule_breakdown: {
      age_fit: number;
      employment_fit: number;
      goal_alignment: number;
      income_fit: number;
      medical_eligibility: number;
    };
    rule_score: number;
  };
  final_score: number;
  policy_name: string;
  weights: {
    financial: number;
    nlp: number;
    rule: number;
    trigger: number;
  };
}

export interface RiderScore {
  name: string;
  score: number;
  scores: {
    components: {
      financial_breakdown: {
        estimated_premium: number;
        monthly_income: number;
        premium_ratio: number;
        status: string;
      };
      financial_score: number;
      nlp_score: number;
      rule_breakdown: {
        family_relevance: number;
        matched_triggers: string[];
        medical_relevance: number;
        trigger_match: number;
      };
      rule_score: number;
      trigger_breakdown: {
        match_ratio: number;
        matched_triggers: string[];
        total_triggers: number;
        unmatched_triggers: string[];
      };
      trigger_score: number;
    };
    fills_gaps?: string[];
    final_score: number;
    gap_priority?: number;
    rider_name: string;
    weights: {
      financial: number;
      nlp: number;
      rule: number;
      trigger: number;
    };
  };
}

export interface CoverageAnalysis {
  coverage_gaps: string[];
  coverage_percentage: number;
  coverage_ratio: number;
  covered_risk_names: string[];
  covered_risks: string[];
  gap_names: string[];
  policy_coverage: string[];
  total_coverage: string[];
  user_risk_names: string[];
  user_risks: string[];
}

export interface PolicyExplanation {
  component_scores: {
    financial_breakdown: {
      estimated_premium: number;
      monthly_income: number;
      premium_ratio: number;
      status: string;
    };
    financial_score: number;
    nlp_score: number;
    rule_breakdown: {
      age_fit: number;
      employment_fit: number;
      goal_alignment: number;
      income_fit: number;
      medical_eligibility: number;
    };
    rule_score: number;
  };
  concerns: string[];
  confidence: number;
  confidence_level: string;
  primary_reasons: string[];
  recommendation: string;
  supporting_factors: string[];
}

export interface SHAPContributor {
  contribution: number;
  feature: string;
  value: number;
}

export interface PolicySHAP {
  base_value: number;
  component_scores: {
    financial_breakdown: {
      estimated_premium: number;
      monthly_income: number;
      premium_ratio: number;
      status: string;
    };
    financial_score: number;
    nlp_score: number;
    rule_breakdown: {
      age_fit: number;
      employment_fit: number;
      goal_alignment: number;
      income_fit: number;
      medical_eligibility: number;
    };
    rule_score: number;
  };
  feature_names: string[];
  feature_values: number[];
  final_score: number;
  shap_values: number[];
  top_negative_contributors: SHAPContributor[];
  top_positive_contributors: SHAPContributor[];
}

export interface ApiResponse {
  all_policy_scores: {
    [key: string]: PolicyScore;
  };
  alternate_riders: RiderScore[];
  coverage_analysis: CoverageAnalysis;
  policy: {
    explanation: PolicyExplanation;
    name: string;
    score: number;
  };
  policy_shap: PolicySHAP;
  primary_riders: RiderScore[];
  rider_explanations: any[];
  success: boolean;
}
