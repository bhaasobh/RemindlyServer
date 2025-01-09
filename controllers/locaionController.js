const predefinedLocations = [
    { name: 'Location A', latitude: 37.7749, longitude: -122.4194 }, // Example: San Francisco
    { name: 'Location B', latitude: 34.0522, longitude: -118.2437 }, // Example: Los Angeles
  ];
  
  // Function to calculate distance (Haversine formula)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Earth's radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };
  
  // Controller: Check proximity to predefined locations
  exports.checkProximity = (req, res) => {
    const { latitude, longitude } = req.body;
  
    if (!latitude || !longitude) {
      return res.status(400).json({ error: 'Latitude and longitude are required.' });
    }
  
    // Check proximity to predefined locations
    const nearbyLocations = predefinedLocations.filter((location) => {
      const distance = calculateDistance(latitude, longitude, location.latitude, location.longitude);
      return distance < 1; // Within 1 km
    });
  
    if (nearbyLocations.length > 0) {
      res.json({ nearby: true, locations: nearbyLocations });
    } else {
      res.json({ nearby: false });
    }
  };
  