interface Minutely15 {
  rain: number[];
  snowfall: number[];
  sunshine_duration: number[];
  temperature_2m: number[];
  time: string[];
}
function calcBestTime(data: Minutely15, duration: string) {
    const amountDuration = Number(duration)
    const bestRainTime: Array<number> = []
    const bestTempTime: Array<number> = []

    // Note to self, should be other way around + all together
    for(let i = data.rain.length - 1 - amountDuration; i > amountDuration; i-- ) {
        bestRainTime[i] = data.rain[i]
        bestTempTime[i] = data.temperature_2m[i]

        if(amountDuration >= 2) {
            bestRainTime[i] += data.rain[i + 1]
            bestTempTime[i] += data.temperature_2m[i + 1]
        }
        if(amountDuration === 4) {
            bestRainTime[i] += data.rain[i + 2] + data.rain[i + 3]
            bestTempTime[i] += data.temperature_2m[i + 2] + data.temperature_2m[i + 3]
        } 
    }

    console.log(bestTempTime)
}

export async function getBestTime(longitude: string, latitude: string, time: string, duration: string) {
    try {
        const params = new URLSearchParams({
            latitude,
            longitude,
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
        if(!data.minutely_15) return 'No data'
        calcBestTime(data.minutely_15, duration)
        
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
        return {city: item.properties.name, country: item.properties.country, long: item.geometry.coordinates[0], latt: item.geometry.coordinates[1]}
       })
       return cityData
    } catch {
        throw new Error('Failed to fetch locations'); 
    };
}