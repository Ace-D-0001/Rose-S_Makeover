import { createContext, useContext, useState, useEffect } from 'react';

const SiteContentContext = createContext(null);

export function SiteContentProvider({ children }) {
  const [siteContent, setSiteContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSiteContent();
  }, []);

  const fetchSiteContent = async () => {
    try {
      const res = await fetch('/api/site-content');
      if (!res.ok) throw new Error('Failed to fetch site content');
      const data = await res.json();
      
      if (data.error && !data.homepage) {
        // Content not seeded yet, use fallback
        setError(data.error);
        setSiteContent(null);
      } else {
        setSiteContent(data);
        setError(null);
      }
    } catch (err) {
      console.error('Error loading site content:', err);
      setError(err.message);
      setSiteContent(null);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    siteContent,
    loading,
    error,
    refetch: fetchSiteContent,
  };

  return (
    <SiteContentContext.Provider value={value}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error('useSiteContent must be used within a SiteContentProvider');
  }
  return context;
}
