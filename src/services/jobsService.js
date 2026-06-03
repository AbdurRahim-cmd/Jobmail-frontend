import axios from "axios";
import { API_URL } from "@/config/api";
import { getToken } from "@/lib/auth";

const client = axios.create({ baseURL: API_URL });

client.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export async function fetchJobs({ search = "", portal = "", page = 1, limit = 10, signal } = {}) {
  const params = {};
  if (search) params.search = search;
  if (portal) params.portal = portal;
  params.page = page;
  params.limit = limit;
  const res = await client.get("/jobs", { params, signal });
  const payload = res.data?.data ?? res.data;
  return {
    items: payload.items || [],
    total: payload.pagination?.total ?? 0,
    page: payload.pagination?.page ?? page,
    limit: payload.pagination?.limit ?? limit,
    totalPages: payload.pagination?.totalPages ?? 0,
  };
}

export async function fetchJobById(id, { signal } = {}) {
  const res = await client.get(`/jobs/${id}`, { signal });
  return res.data?.data ?? res.data;
}

export async function triggerSyncJobs() {
  const res = await client.post("/jobs/sync");
  return res.data?.data ?? res.data;
}

export async function fetchSyncStatus({ signal } = {}) {
  const res = await client.get("/jobs/sync/status", { signal });
  return res.data?.data ?? res.data;
}
