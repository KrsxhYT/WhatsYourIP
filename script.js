document.addEventListener('DOMContentLoaded', function() {
    // Detect and display user agent info immediately
    displayUserAgentInfo();
    
    // Fetch IP and location information
    fetchIpInfo();
    
    // Set up blacklist check button
    document.getElementById('check-blacklist').addEventListener('click', checkBlacklistStatus);
});

function displayUserAgentInfo() {
    const userAgent = navigator.userAgent;
    document.getElementById('user-agent').textContent = userAgent;
    
    // Simple browser detection
    let browser = "Unknown";
    if (userAgent.includes("Firefox")) browser = "Firefox";
    else if (userAgent.includes("Chrome")) browser = "Chrome";
    else if (userAgent.includes("Safari")) browser = "Safari";
    else if (userAgent.includes("Edge")) browser = "Edge";
    else if (userAgent.includes("Opera")) browser = "Opera";
    else if (userAgent.includes("MSIE") || userAgent.includes("Trident")) browser = "Internet Explorer";
    
    document.getElementById('browser').textContent = browser;
    
    // Simple OS detection
    let os = "Unknown";
    if (userAgent.includes("Windows")) os = "Windows";
    else if (userAgent.includes("Mac")) os = "MacOS";
    else if (userAgent.includes("Linux")) os = "Linux";
    else if (userAgent.includes("Android")) os = "Android";
    else if (userAgent.includes("iOS")) os = "iOS";
    
    document.getElementById('os').textContent = os;
}

async function fetchIpInfo() {
    try {
        // First try IPv4 and basic info from a free API
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        // Display the information
        document.getElementById('ipv4').textContent = data.ip || "Not available";
        document.getElementById('country').textContent = data.country_name || "Unknown";
        document.getElementById('region').textContent = data.region || "Unknown";
        document.getElementById('city').textContent = data.city || "Unknown";
        document.getElementById('postal').textContent = data.postal || "Unknown";
        document.getElementById('coordinates').textContent = `${data.latitude || "?"}, ${data.longitude || "?"}`;
        document.getElementById('isp').textContent = data.org || "Unknown";
        document.getElementById('asn').textContent = data.asn || "Unknown";
        
        // Try to detect IPv6
        detectIPv6();
        
        // Check for VPN/Proxy
        checkPrivacyStatus(data.ip);
    } catch (error) {
        console.error("Error fetching IP info:", error);
        document.getElementById('ipv4').textContent = "Failed to load IP information";
    }
}

function detectIPv6() {
    // This is a simple detection - in production you'd need server-side support
    const connection = window.connection || window.mozConnection || window.webkitConnection;
    if (connection) {
        const addresses = connection.addresses || [];
        const ipv6 = addresses.find(addr => addr.includes(':'));
        if (ipv6) {
            document.getElementById('ipv6').textContent = ipv6;
        }
    }
}

function checkPrivacyStatus(ip) {
    // In a real implementation, you would call an API to check for VPN/proxy
    // This is just a simulation
    setTimeout(() => {
        const statusElement = document.querySelector('.privacy-status');
        const iconElement = document.querySelector('.status-icon');
        const textElement = document.querySelector('.status-text');
        
        // Random result for demo purposes
        const isSuspicious = Math.random() > 0.7;
        
        if (isSuspicious) {
            statusElement.style.backgroundColor = '#ffebee';
            iconElement.style.backgroundColor = 'var(--danger-color)';
            textElement.textContent = 'Potential VPN/Proxy detected';
        } else {
            statusElement.style.backgroundColor = '#e8f5e9';
            iconElement.style.backgroundColor = 'var(--secondary-color)';
            textElement.textContent = 'No VPN/Proxy detected';
        }
    }, 1500);
}

function checkBlacklistStatus() {
    const button = document.getElementById('check-blacklist');
    button.disabled = true;
    button.textContent = 'Checking...';
    
    // Simulate API call
    setTimeout(() => {
        // Random result for demo
        const isBlacklisted = Math.random() > 0.9;
        
        if (isBlacklisted) {
            alert('Warning: This IP appears in 1 blacklist database');
        } else {
            alert('This IP is not found in any blacklist databases');
        }
        
        button.disabled = false;
        button.textContent = 'Check Blacklist Status';
    }, 2000);
}