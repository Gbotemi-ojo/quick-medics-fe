export const EXTERNAL_API_URL = 'https://quick-medics-be.vercel.app/api';
// export const EXTERNAL_API_URL = 'http://localhost:5000/api';
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}` 
  } : {
    'Content-Type': 'application/json'
  };
};

// ... Auth Functions (loginUser, googleLogin, resetPassword) ...
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

// --- HOME CONFIG (NEW) ---
export const fetchHomeConfig = async () => {
    try {
        const response = await fetch(`${EXTERNAL_API_URL}/drugs/home-config`);
        if (!response.ok) throw new Error("Failed to load home config");
        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error("Home Config Error:", error);
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
        console.error("Failed to fetch categories", error);
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

// ... Payment, Orders, Profile functions ...
export const getPaystackKey = async () => {
  const response = await fetch(`${EXTERNAL_API_URL}/payment/config`);
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
    if(!response.ok) throw new Error("Failed to fetch orders");
    return await response.json();
};

export const fetchProfile = async () => {
    const response = await fetch(`${EXTERNAL_API_URL}/profile`, { headers: getAuthHeaders() });
    if(!response.ok) throw new Error("Failed to fetch profile");
    const result = await response.json();
    return result.data;
};

export const updateProfile = async (profileData) => {
    const response = await fetch(`${EXTERNAL_API_URL}/profile`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(profileData)
    });
    if(!response.ok) throw new Error("Failed to update profile");
    return await response.json();
};

export const changePassword = async (passwords) => {
    const response = await fetch(`${EXTERNAL_API_URL}/profile/password`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(passwords)
    });
    if(!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Failed to change password");
    }
    return await response.json();
};
