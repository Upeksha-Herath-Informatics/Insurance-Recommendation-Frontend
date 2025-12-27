'use client';

import { ApiResponse } from '@/types/apiResponse';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface DashboardProps {
  data: ApiResponse;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export default function Dashboard({ data }: DashboardProps) {
  // Prepare chart data
  const scoreComponentsData = [
    { name: 'Financial', value: Math.round(data.policy.explanation.component_scores.financial_score * 100) },
    { name: 'NLP', value: Math.round(data.policy.explanation.component_scores.nlp_score * 100) },
    { name: 'Rule-based', value: Math.round(data.policy.explanation.component_scores.rule_score * 100) },
  ];

  const coverageData = [
    { name: 'Covered', value: data.coverage_analysis.coverage_percentage },
    { name: 'Gaps', value: 100 - data.coverage_analysis.coverage_percentage },
  ];

  const ruleBreakdownData = Object.entries(data.policy.explanation.component_scores.rule_breakdown).map(([key, value]) => ({
    category: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    score: Math.round(value * 100),
  }));

  const shapPositiveData = data.policy_shap.top_positive_contributors.map(item => ({
    feature: item.feature,
    contribution: Math.round(item.contribution * 1000) / 10,
  }));

  const shapNegativeData = data.policy_shap.top_negative_contributors.map(item => ({
    feature: item.feature,
    contribution: Math.abs(Math.round(item.contribution * 1000) / 10),
  }));

  const riderScoresData = data.alternate_riders.map(rider => ({
    name: rider.name,
    score: Math.round(rider.score),
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Insurance Recommendation Results</h1>
          <p className="text-gray-600">Your personalized insurance analysis</p>
        </div>

        {/* Main Policy Recommendation */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-2xl p-8 mb-8 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold mb-2">Recommended Policy</h2>
              <p className="text-4xl font-extrabold mb-4">{data.policy.name}</p>
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <p className="text-sm opacity-90">Match Score</p>
                  <p className="text-3xl font-bold">{Math.round(data.policy.score)}%</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <p className="text-sm opacity-90">Confidence</p>
                  <p className="text-2xl font-bold">{data.policy.explanation.confidence_level}</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90 mb-1">Estimated Monthly Premium</p>
              <p className="text-3xl font-bold">
                LKR {data.policy.explanation.component_scores.financial_breakdown.estimated_premium.toLocaleString()}
              </p>
              <p className="text-sm mt-2">
                <span className="bg-green-500/30 px-3 py-1 rounded-full">
                  {data.policy.explanation.component_scores.financial_breakdown.status.replace(/_/g, ' ').toUpperCase()}
                </span>
              </p>
            </div>
          </div>

          {/* Primary Reasons */}
          <div className="mt-6 pt-6 border-t border-white/30">
            <h3 className="text-xl font-semibold mb-3">Why this policy?</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {data.policy.explanation.primary_reasons.map((reason, idx) => (
                <div key={idx} className="flex items-start space-x-2">
                  <svg className="w-6 h-6 text-green-300 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">{reason}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Score Breakdown and Coverage Analysis */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Score Components */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Score Components</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={scoreComponentsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              {scoreComponentsData.map((item, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600">{item.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{item.value}%</p>
                </div>
              ))}
            </div>
          </div>

          {/* Coverage Analysis */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Coverage Analysis</h3>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={coverageData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {coverageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#10b981' : '#ef4444'} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              <div className="bg-green-50 rounded-lg p-3">
                <p className="text-sm font-semibold text-green-900 mb-1">Covered Risks</p>
                <div className="flex flex-wrap gap-2">
                  {data.coverage_analysis.covered_risk_names.map((risk, idx) => (
                    <span key={idx} className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">
                      {risk}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-red-50 rounded-lg p-3">
                <p className="text-sm font-semibold text-red-900 mb-1">Coverage Gaps</p>
                <div className="flex flex-wrap gap-2">
                  {data.coverage_analysis.gap_names.map((gap, idx) => (
                    <span key={idx} className="text-xs bg-red-200 text-red-800 px-2 py-1 rounded-full">
                      {gap}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rule Breakdown Radar Chart */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Policy Fit Analysis</h3>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={ruleBreakdownData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="category" />
              <PolarRadiusAxis domain={[0, 100]} />
              <Radar name="Fit Score" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* SHAP Values - Feature Importance */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Positive Contributors */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              Top Positive Factors
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={shapPositiveData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="feature" type="category" width={120} />
                <Tooltip />
                <Bar dataKey="contribution" fill="#10b981" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Negative Contributors */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
              Top Negative Factors
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={shapNegativeData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="feature" type="category" width={120} />
                <Tooltip />
                <Bar dataKey="contribution" fill="#ef4444" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Supporting Factors */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Supporting Factors</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.policy.explanation.supporting_factors.map((factor, idx) => (
              <div key={idx} className="bg-blue-50 rounded-lg p-4 flex items-start space-x-3">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-gray-700">{factor}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Breakdown */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Financial Details</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Monthly Income</p>
              <p className="text-2xl font-bold text-gray-900">
                LKR {data.policy.explanation.component_scores.financial_breakdown.monthly_income.toLocaleString()}
              </p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Estimated Premium</p>
              <p className="text-2xl font-bold text-gray-900">
                LKR {data.policy.explanation.component_scores.financial_breakdown.estimated_premium.toLocaleString()}
              </p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Premium Ratio</p>
              <p className="text-2xl font-bold text-gray-900">
                {(data.policy.explanation.component_scores.financial_breakdown.premium_ratio * 100).toFixed(2)}%
              </p>
            </div>
          </div>
        </div>

        {/* Alternative Riders */}
        {data.alternate_riders.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Recommended Additional Riders</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={riderScoresData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-6 space-y-4">
              {data.alternate_riders.map((rider, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{rider.name}</h4>
                      <p className="text-sm text-gray-600">Match Score: {Math.round(rider.score)}%</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-600">Est. Premium</p>
                      <p className="text-lg font-bold text-gray-900">
                        LKR {rider.scores.components.financial_breakdown.estimated_premium.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  {rider.scores.fills_gaps && rider.scores.fills_gaps.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-gray-700 mb-2">Fills Coverage Gaps:</p>
                      <div className="flex flex-wrap gap-2">
                        {rider.scores.fills_gaps.map((gap, gapIdx) => (
                          <span key={gapIdx} className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                            {gap.replace(/_/g, ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition shadow-lg hover:shadow-xl"
          >
            New Recommendation
          </button>
          <button
            onClick={() => window.print()}
            className="px-8 py-3 bg-white text-gray-700 border-2 border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition shadow-lg hover:shadow-xl"
          >
            Print Results
          </button>
        </div>
      </div>
    </div>
  );
}
