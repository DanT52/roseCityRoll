const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL || 'http://localhost:8000';

export const getFaqs = async () => {
  const res = await fetch(BACKEND_URL + "/faqs/");
  if (!res.ok) {
    throw new Error('Failed to fetch FAQs');
  }
  return await res.json();
};

export interface FAQCreateUpdate {
  question: string;
  answer: string;
  link?: string;
  linktext?: string;
}

export const createFaq = async (faq: FAQCreateUpdate) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Not authenticated');
  const res = await fetch(BACKEND_URL + "/faqs/", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(faq)
  });
  if (!res.ok) {
    throw new Error('Failed to create FAQ');
  }
  return await res.json();
};

export const updateFaq = async (id: string, faq: FAQCreateUpdate) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Not authenticated');
  const res = await fetch(BACKEND_URL + `/faqs/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(faq)
  });
  if (!res.ok) {
    throw new Error('Failed to update FAQ');
  }
  return await res.json();
};

export const deleteFaq = async (id: string) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Not authenticated');
  const res = await fetch(BACKEND_URL + `/faqs/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) {
    throw new Error('Failed to delete FAQ');
  }
  return await res.json();
};
