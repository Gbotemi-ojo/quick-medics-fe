export const EXTERNAL_API_URL = 'https://quick-medics-be.vercel.app/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    : { 'Content-Type': 'application/json' };
};

export const fetchBanners = async () => {
  try {
    const response = await fetch(`${EXTERNAL_API_URL}/banners`);
    if (!response.ok) return [];
    const result = await response.json();
    return (result.data || []).filter(b => b.isActive);
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createBanner = async (formData) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${EXTERNAL_API_URL}/banners`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
    });
    if(!response.ok) throw new Error("Upload failed");
    return await response.json();
};

export const deleteBanner = async (id) => {
    const response = await fetch(`${EXTERNAL_API_URL}/banners/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    });
    return await response.json();
};

export const toggleBannerStatus = async (id, isActive) => {
    const response = await fetch(`${EXTERNAL_API_URL}/banners/${id}/status`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ isActive })
    });
    return await response.json();
};

export const loginUser = async (email, password) => {
  const response = await fetch(`${EXTERNAL_API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }
  return await response.json();
};

export const googleLogin = async (credential) => {
  const response = await fetch(`${EXTERNAL_API_URL}/auth/google`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ credential }),
  });
  if (!response.ok) throw new Error('Google Login failed');
  return await response.json();
};

export const requestPasswordReset = async (email) => {
  const response = await fetch(`${EXTERNAL_API_URL}/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || 'Failed to send OTP');
  }
  return await response.json();
};

export const confirmPasswordReset = async (email, otp, newPassword) => {
  const response = await fetch(`${EXTERNAL_API_URL}/auth/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp, newPassword }),
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || 'Failed to reset password');
  }
  return await response.json();
};

export const fetchHomeConfig = async () => {
  try {
    const response = await fetch(`${EXTERNAL_API_URL}/drugs/home-config`);
    if (!response.ok) throw new Error("Failed to load home config");
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${EXTERNAL_API_URL}/drugs/categories`);
    if (!response.ok) return [];
    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchDrugs = async (page = 1, limit = 20, search = '', sortBy = 'created_at', sortOrder = 'desc') => {
  const headers = getAuthHeaders();
  const url = `${EXTERNAL_API_URL}/drugs?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}&sortBy=${sortBy}&sortOrder=${sortOrder}`;

  const response = await fetch(url, { headers: { 'Authorization': headers.Authorization } });

  if (response.status === 401 || response.status === 403) {
    localStorage.removeItem('token');
    return null;
  }

  const result = await response.json();
  return result.data;
};

export const createDrug = async (drugData) => {
  const response = await fetch(`${EXTERNAL_API_URL}/drugs`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(drugData),
  });
  return await response.json();
};

export const updateDrug = async (id, drugData) => {
  const response = await fetch(`${EXTERNAL_API_URL}/drugs/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(drugData),
  });
  return await response.json();
};

export const deleteDrug = async (id) => {
    const response = await fetch(`${EXTERNAL_API_URL}/drugs/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    });
    return await response.json();
};

export const updateCategory = async (id, data) => {
    const response = await fetch(`${EXTERNAL_API_URL}/drugs/categories/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
    });
    return await response.json();
};

export const fetchSections = async () => {
    const response = await fetch(`${EXTERNAL_API_URL}/drugs/sections`, { headers: getAuthHeaders() });
    const result = await response.json();
    return result.data || [];
};

export const createSection = async (data) => {
    const response = await fetch(`${EXTERNAL_API_URL}/drugs/sections`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
    });
    return await response.json();
};

export const deleteSection = async (id) => {
    const response = await fetch(`${EXTERNAL_API_URL}/drugs/sections/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    });
    return await response.json();
};

export const fetchSectionItems = async (sectionId) => {
    const response = await fetch(`${EXTERNAL_API_URL}/drugs/sections/${sectionId}/items`, { headers: getAuthHeaders() });
    const result = await response.json();
    return result.data || [];
};

export const updateSectionItems = async (sectionId, drugIds) => {
    const response = await fetch(`${EXTERNAL_API_URL}/drugs/sections/${sectionId}/items`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ drugIds })
    });
    return await response.json();
};

export const fetchAllOrders = async () => {
    const response = await fetch(`${EXTERNAL_API_URL}/orders/all?t=${new Date().getTime()}`, {
        headers: getAuthHeaders(),
    });
    if(!response.ok) throw new Error("Failed to fetch orders");
    const result = await response.json();
    return result.data; 
};

export const updateOrderStatus = async (orderId, status) => {
    const response = await fetch(`${EXTERNAL_API_URL}/orders/${orderId}/status`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status }),
    });
    return await response.json();
};

export const getPaystackKey = async () => {
  const response = await fetch(`${EXTERNAL_API_URL}/payment/config?t=${new Date().getTime()}`);
  if (!response.ok) throw new Error('Failed to fetch payment config');
  const result = await response.json();
  return result.key;
};

export const verifyPayment = async (paymentData) => {
  const response = await fetch(`${EXTERNAL_API_URL}/payment/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(paymentData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Payment verification failed');
  }

  return await response.json();
};

export const fetchMyOrders = async () => {
  const url = `${EXTERNAL_API_URL}/orders/my-orders?t=${new Date().getTime()}`;
  const response = await fetch(url, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch orders");
  return await response.json();
};

export const fetchProfile = async () => {
  const response = await fetch(`${EXTERNAL_API_URL}/profile`, { headers: getAuthHeaders() });
  if (!response.ok) throw new Error("Failed to fetch profile");
  const result = await response.json();
  return result.data;
};

export const updateProfile = async (profileData) => {
  const response = await fetch(`${EXTERNAL_API_URL}/profile`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(profileData)
  });
  if (!response.ok) throw new Error("Failed to update profile");
  return await response.json();
};

export const changePassword = async (passwords) => {
  const response = await fetch(`${EXTERNAL_API_URL}/profile/password`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(passwords)
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Failed to change password");
  }
  return await response.json();
};

export const submitTrainingApplication = async (formData) => {
    const response = await fetch(`${EXTERNAL_API_URL}/training/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    });
    return await response.json();
};
