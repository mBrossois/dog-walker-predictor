export async function getBestTime(location: string, time: string, duration: string) {
    try {
        const params = new URLSearchParams({
            latitude: '52.52',
            longitude: '13.41',
            minutely_15: 'temperature_2m,rain,snowfall,sunshine_duration',
            forecast_minutely_15: (Number(time) * 4).toString()
        });

        const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            },
       })
       const data = await response.json()
       return data
    } catch {
        throw new Error('Failed to fetch weather forecast'); 
    };
}

interface GeocodingResult {
  type: "FeatureCollection";
  features: Feature[];
}

interface Feature {
  type: "Feature";
  properties: FeatureProperties;
  geometry: Geometry;
}

interface FeatureProperties {
  osm_type: "R" | "N" | "W"; // Relation, Node, Way
  osm_id: number;
  osm_key: string;
  osm_value: string;
  type: "city" | "district" | "county" | "other";
  postcode?: string;
  countrycode: string;
  name: string;
  country: string;
  state?: string;
  county?: string;
  city?: string;
  extent?: [number, number, number, number]; // [minLon, minLat, maxLon, maxLat]
}

interface Geometry {
  type: "Point";
  coordinates: [number, number]; // [longitude, latitude]
}

export async function getLocation(value: string) {
    try {
        const params = new URLSearchParams({
            q: value,
            layer: 'city',
            limit: '5'
        });

        const response = await fetch(`https://photon.komoot.io/api/?${params}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            },
       })
       const data: GeocodingResult = await response.json()
       const cityData = data.features.map(item => {
        return {city: item.properties.name, country: item.properties.country, lan: item.geometry.coordinates[0], long: item.geometry.coordinates[1]}
       })
       return cityData
    } catch {
        throw new Error('Failed to fetch locations'); 
    };
}