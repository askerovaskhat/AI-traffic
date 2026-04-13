

// Simulated Sergek Data
export const fetchSergekData = async () => {
  // In a real app: fetch('https://api.sergek.kz/v1/snapshot/almaty')
  return {
    active_cameras: 42,
    occupancy_rate: 0.65,
    detected_incidents: 2,
    flow_speed: 45 // km/h
  };
};

// Simulated AirKaz Data (PM2.5)
export const fetchAirKazData = async () => {
  // In a real app: fetch('https://airkaz.org/api/v1/stations/almaty')
  return [
    { id: 'AQ-01', location: 'Abay/Abylai Khan', pm25: 35, status: 'Moderate' },
    { id: 'AQ-02', location: 'Panfilov/Tole Bi', pm25: 12, status: 'Good' },
    { id: 'AQ-03', location: 'Kenesary/Kaldayakov', pm25: 28, status: 'Good' }
  ];
};

// Real OpenStreetMap Overpass API call for Almaty Golden Square
export const fetchOSMFeatures = async () => {
  const query = `
    [out:json][timeout:25];
    (
      node["natural"="tree"](43.23,76.93,43.25,76.95);
      node["amenity"="bench"](43.23,76.93,43.25,76.95);
      way["highway"](43.23,76.93,43.25,76.95);
    );
    out body;
    >;
    out skel qt;
  `;
  try {
    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: query
    });
    return await response.json();
  } catch (e) {
    console.error("OSM Fetch Error", e);
    return null;
  }
};

// Simulated Citybus GPS Data
export const fetchBusPositions = async () => {
  return [
    { route: '32', lat: 43.242, lng: 76.941, delay: -2 },
    { route: '92', lat: 43.238, lng: 76.945, delay: 5 },
    { route: '118', lat: 43.245, lng: 76.938, delay: 0 }
  ];
};
