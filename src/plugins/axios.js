'use strict'

import Vue from 'vue'
import axios from 'axios'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    config.headers.Authorization =
      'bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI4YTlIQUFCc3dzSHk4M1libFVvZW1FX1ZmcUhZZXE2V2FjcDd1elUzLTJBIn0.eyJqdGkiOiIwNmJhZjI4ZC1hMWRhLTQ3MDEtYjU0My0zY2ZmY2M0Njk0MzMiLCJleHAiOjE1OTIzODExNDAsIm5iZiI6MCwiaWF0IjoxNTkyMzc1NzQwLCJpc3MiOiJodHRwczovL2F1dGgtcmRjZW50ZXIuaW5zcHVyY2xvdWQuY24vYXV0aC9yZWFsbXMvcGljcCIsImF1ZCI6WyJjbGllbnQtaW5zcHVydGVzdDEwIiwiYWNjb3VudCJdLCJzdWIiOiIwZjQ3MjcyOS0xYjU0LTRlZjgtYWY2Zi03NDY2MGM4ZjA3NzciLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJjb25zb2xlIiwibm9uY2UiOiIzNTI5ZjQ5NC05ZDU4LTRjNzMtODQ2YS0wNjhmMTE0YzI1OWEiLCJhdXRoX3RpbWUiOjE1OTIzNzM3MjEsInNlc3Npb25fc3RhdGUiOiJlZWFhMDU2Yy1lY2ZjLTQ5MzItYTVkMy00NTk4MDkwNDNkNGUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIkFDQ09VTlRfQURNSU4iLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiY2xpZW50LWluc3B1cnRlc3QxMCI6eyJyb2xlcyI6WyJhZG1pbiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZ3JvdXBzIjpbIi9ncm91cC1pbnNwdXJ0ZXN0MTAiXSwicHJvamVjdCI6Imluc3B1cnRlc3QxMCIsInByZWZlcnJlZF91c2VybmFtZSI6Imluc3B1cnRlc3QxMCIsImVtYWlsIjoiaW5zcHVydGVzdDEwQGluc3B1ci5jb20ifQ.BeWaSLGQVFObnCzpQhHS4ODnJpMpLS9b7aqm3_xudv9ooQ3SLXaCraJvvr6-5w8JzWNw0D_sUZ2FSKEDyVjOYUxkOttdIiZ-rqpXGfA_ULn9O0FAd-hE_9TPb6rmWO2cSS1FL9QgFrGxcaKEMn7DHywnWMKaC9l8gNKW5qC4Ku8o4LZwt5WXULOpWyXCLb82RQRLSLUWdxug-mEbGn6Gy8rRimbnwsA--prEIudPz4w6C45ATqpswmtc-8LivvC_BLaa807eTq_H8uJmBcn4cqwwsV9WuRiVV6ujW1sVXb14ogigxkqmgN8YWqeKHd9ZvPM4o7SepOLFKWgvuMXAbQ'
    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error)
  }
)

Plugin.install = function(Vue, options) {
  Vue.axios = _axios
  window.axios = _axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios
      },
    },
    $axios: {
      get() {
        return _axios
      },
    },
  })
}

Vue.use(Plugin)

export default Plugin
