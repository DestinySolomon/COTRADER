import { create } from "zustand";
import apiClient from "../lib/axios";

const useMockAuth = import.meta.env.VITE_USE_MOCK_AUTH === "true";
const mockToken = "mock-auth-token";

const buildMockUser = ({ name, email }) => ({
  id: "mock-user-id",
  name,
  email,
  timezone: "UTC",
  avatar_url: null,
  onboarding_completed_at: null,
});

/**
 * useAuthStore
 *
 * Manages:
 *  - The currently logged-in user object
 *  - The auth token (also stored in localStorage for persistence)
 *  - Loading and error state during login/register
 *  - login(), register(), logout(), and initAuth() actions
 */
const useAuthStore = create((set, get) => ({
  /* ---- State ---- */
  user: null, // { id, name, email, onboarding_completed_at, ... }
  token: localStorage.getItem("ct_token") || null,
  isLoading: false, // true while an auth API call is in flight
  error: null, // string error message or null
  isInitialized: false, // true once we've checked localStorage on app boot

  /* ---- Actions ---- */

  /**
   * initAuth
   * Called once when the app first loads (in main.jsx).
   * If a token exists in localStorage, fetch the current user from the API
   * to confirm the token is still valid. If not, clear everything.
   */
  initAuth: async () => {
    const token = localStorage.getItem("ct_token");

    if (!token) {
      set({ isInitialized: true });
      return;
    }

    if (useMockAuth) {
      const storedUser = localStorage.getItem("ct_user");
      set({
        user: storedUser ? JSON.parse(storedUser) : null,
        token,
        isInitialized: true,
      });
      return;
    }

    try {
      const response = await apiClient.get("/auth/user");
      const user = response.data.data;

      set({
        user,
        token,
        isInitialized: true,
      });

      // Keep localStorage in sync
      localStorage.setItem("ct_user", JSON.stringify(user));
    } catch {
      // Token is invalid or expired — clear it
      localStorage.removeItem("ct_token");
      localStorage.removeItem("ct_user");
      set({ user: null, token: null, isInitialized: true });
    }
  },

  /**
   * login
   * Sends email + password to the API.
   * On success: stores token and user in state + localStorage.
   * Returns { success: true } or { success: false, message: '...' }
   */
  login: async ({ email, password }) => {
    set({ isLoading: true, error: null });

    if (useMockAuth) {
      const user = buildMockUser({ name: email.split("@")[0], email });
      localStorage.setItem("ct_token", mockToken);
      localStorage.setItem("ct_user", JSON.stringify(user));

      set({ user, token: mockToken, isLoading: false, error: null });
      return { success: true, user };
    }

    try {
      const response = await apiClient.post("/auth/login", { email, password });
      const { token, user } = response.data.data;

      localStorage.setItem("ct_token", token);
      localStorage.setItem("ct_user", JSON.stringify(user));

      set({ user, token, isLoading: false, error: null });
      return { success: true, user };
    } catch (err) {
      const message =
        err.response?.data?.message || "Login failed. Please try again.";
      set({ isLoading: false, error: message });
      return { success: false, message };
    }
  },

  /**
   * register
   * Sends name + email + password to the API.
   * On success: stores token and user (same as login).
   */
  register: async ({ name, email, password, password_confirmation }) => {
    set({ isLoading: true, error: null });

    if (useMockAuth) {
      const user = buildMockUser({ name, email });
      localStorage.setItem("ct_token", mockToken);
      localStorage.setItem("ct_user", JSON.stringify(user));

      set({ user, token: mockToken, isLoading: false, error: null });
      return { success: true, user };
    }

    try {
      const response = await apiClient.post("/auth/register", {
        name,
        email,
        password,
        password_confirmation,
      });
      const { token, user } = response.data.data;

      localStorage.setItem("ct_token", token);
      localStorage.setItem("ct_user", JSON.stringify(user));

      set({ user, token, isLoading: false, error: null });
      return { success: true, user };
    } catch (err) {
      // Laravel returns validation errors as { errors: { field: ['msg'] } }
      const errors = err.response?.data?.errors;
      const message = errors
        ? Object.values(errors).flat()[0] // first validation error message
        : err.response?.data?.message || "Registration failed.";

      set({ isLoading: false, error: message });
      return { success: false, message };
    }
  },

  /**
   * logout
   * Calls the API to invalidate the token server-side,
   * then clears all local state and storage.
   */
  logout: async () => {
    if (!useMockAuth) {
      try {
        await apiClient.post("/auth/logout");
      } catch {
        // Even if the API call fails, clear local state anyway
      }
    }

    localStorage.removeItem("ct_token");
    localStorage.removeItem("ct_user");
    set({ user: null, token: null, error: null });
  },

  /**
   * clearError
   * Utility to reset the error field (e.g. when the user starts typing again)
   */
  clearError: () => set({ error: null }),

  /**
   * setUser
   * Used to update user data after profile edits or onboarding completion
   */
  setUser: (user) => {
    localStorage.setItem("ct_user", JSON.stringify(user));
    set({ user });
  },
}));

export default useAuthStore;
