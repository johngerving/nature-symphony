export const prerender = true;
export const ssr = true;
export const csr = true; // Keep client-side rendering for interactivity

// Increase cache duration since our content is static
export const config = {
  isr: {
    expiration: 60 * 60 // Cache for 1 hour
  }
}; 