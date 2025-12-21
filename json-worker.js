// public/json-worker.js
self.onmessage = async function(e) {
  const { url } = e.data;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const text = await response.text();
    const data = JSON.parse(text);
    
    self.postMessage({ 
      success: true, 
      data 
    });
  } catch (error) {
    self.postMessage({ 
      success: false, 
      error: error.message 
    });
  }
};