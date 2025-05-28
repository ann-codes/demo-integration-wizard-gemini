import React, { useState } from 'react';
import axios from 'axios';
import { AnalyzeResponse, HubspotFieldsResponse } from '../types';

const API_BASE = 'http://localhost:3032';

function toYaml(cluster: string, topics: string[], fields: string[]) {
  return `topic_cluster: ${cluster}\ntopics:\n${topics.map(t => `  - ${t}`).join('\n')}\nhubspot_fields:\n${fields.map(f => `  - ${f}`).join('\n')}\ndynamic_lists:\n  - name: Hot ${cluster} Leads\n    filter: Surge_Score > 50\n`;
}

const IntegrationForm: React.FC = () => {
  const [description, setDescription] = useState('');
  const [topics, setTopics] = useState<string[]>([]);
  const [cluster, setCluster] = useState('');
  const [yaml, setYaml] = useState('');
  const [fields, setFields] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    setYaml('');
    setFields([]);
    try {
      const res = await axios.post<AnalyzeResponse>(`${API_BASE}/analyze`, { product_description: description });
      setTopics(res.data.topics);
      const clusterName = description.trim().split(' ').slice(0, 3).join('_') || 'My_Cluster';
      setCluster(clusterName);
      const hubspotFields = [
        `${clusterName}_Surge_Score`,
        `${clusterName}_Topic_Count`,
        `${clusterName}_Last_Surge_Date`
      ];
      setFields(hubspotFields);
      setYaml(toYaml(clusterName, res.data.topics, hubspotFields));
    } catch (err: any) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleHubspot = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await axios.post<HubspotFieldsResponse>(`${API_BASE}/create-hubspot-fields`, {
        cluster,
        topics
      });
      if (res.data.success) {
        setSuccess('HubSpot fields created successfully!');
      } else {
        setError(res.data.error || 'Unknown error');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleAnalyze} className="w-full max-w-lg bg-primary-light p-6 rounded shadow flex flex-col gap-4">
      <label className="font-semibold">Product or Service Description</label>
      <textarea
        className="border rounded p-2 min-h-[60px]"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
        placeholder="Describe your product or service..."
      />
      <button
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Analyzing...' : 'Suggest Topics'}
      </button>
      {yaml && (
        <>
          <label className="font-semibold mt-2">YAML Output</label>
          <textarea
            className="border rounded p-2 font-mono text-sm bg-primary-light"
            value={yaml}
            readOnly
            rows={8}
            onFocus={e => e.target.select()}
          />
          <button
            type="button"
            className="bg-primary-dark text-white px-4 py-2 rounded hover:bg-primary-dark/90"
            onClick={handleHubspot}
            disabled={loading}
          >
            {loading ? 'Integrating...' : 'Integrate with HubSpot'}
          </button>
        </>
      )}
      {success && <div className="text-primary-dark font-semibold">{success}</div>}
      {error && <div className="text-red-500 font-semibold">{error}</div>}
    </form>
  );
};

export default IntegrationForm;
