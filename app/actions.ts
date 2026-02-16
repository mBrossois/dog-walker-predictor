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

    // Note to self, should be other way around + all together
    data.rain.forEach((rain, index) => {
        if(index >= 3) bestRainTime[index - 3] = bestRainTime[index - 3] += rain
        if(index >= 2) bestRainTime[index - 2] = bestRainTime[index - 2] += rain
        if(index >= 1) bestRainTime[index - 1] = bestRainTime[index - 1] += rain
        bestRainTime[index] = bestRainTime[index] = rain
    });

    const bestTempTime: Array<number> = []
    data.temperature_2m.forEach((temp, index) => {
        if(index >= 3) bestTempTime[index - 3] = bestTempTime[index - 3] += temp
        if(index >= 2) bestTempTime[index - 2] = bestTempTime[index - 2] += temp
        if(index >= 1) bestTempTime[index - 1] = bestTempTime[index - 1] += temp
        bestTempTime[index] = bestTempTime[index] = temp
    });

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
        return {city: item.properties.name, country: item.properties.country, lang: item.geometry.coordinates[0], long: item.geometry.coordinates[1]}
       })
       return cityData
    } catch {
        throw new Error('Failed to fetch locations'); 
    };
}