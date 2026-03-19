'use server'

import { Time } from "@/app/types/time";

interface Minutely15 {
  rain: number[];
  snowfall: number[];
  sunshine_duration: number[];
  temperature_2m: number[];
  time: string[];
}
function calcBestTime(data: Minutely15, duration: string) {
    const amountDuration = Number(duration)
    const listRainTimes: Array<number> = []
    const listTempTimes: Array<number> = []
    const listSnowfall: Array<number> = []
    const listSunshine: Array<number> = []

    for(let i = data.rain.length - 1 - amountDuration; i >= 0; i-- ) {
        listRainTimes[i] = data.rain[i]
        listTempTimes[i] = data.temperature_2m[i]
        listSnowfall[i] = data.snowfall[i]
        listSunshine[i] = data.sunshine_duration[i]

        if(amountDuration >= 2) {
            listRainTimes[i] += data.rain[i + 1]
            listTempTimes[i] += data.temperature_2m[i + 1]
            listSnowfall[i] += data.snowfall[i + 1]
            listSunshine[i] += data.sunshine_duration[i + 1]
        }
        if(amountDuration === 4) {
            listRainTimes[i] += data.rain[i + 2] + data.rain[i + 3]
            listTempTimes[i] += data.temperature_2m[i + 2] + data.temperature_2m[i + 3]
            listSnowfall[i] += data.snowfall[i + 2] + data.snowfall[i + 3]
            listSunshine[i] += data.sunshine_duration[i + 2] + data.sunshine_duration[i + 3]
        } 
    }

    let bestTime: Time = {time: data.time[0], rain: listRainTimes[0], snow: listSnowfall[0], temp: listTempTimes[0], sunshine: listSunshine[0]}

    for(let i = 1; i < listTempTimes.length; i++) {
        if(listRainTimes[i] > bestTime.rain) continue;

        if(listRainTimes[i] < bestTime.rain) {
            bestTime = {time: data.time[i], rain: listRainTimes[i], snow: listSnowfall[i], temp: listTempTimes[i], sunshine: listSunshine[i] }
            continue;
        }

        if(listSnowfall[i] > bestTime.snow) continue;
        if(listSnowfall[i] < bestTime.snow) {
            bestTime = {time: data.time[i], rain: listRainTimes[i], snow: listSnowfall[i], temp: listTempTimes[i], sunshine: listSunshine[i] }
            continue;
        }

        if(listTempTimes[i] < bestTime.temp) continue
        if(listTempTimes[i] > bestTime.temp) {
            bestTime = {time: data.time[i], rain: listRainTimes[i], snow: listSnowfall[i], temp: listTempTimes[i], sunshine: listSunshine[i] }
            continue;
        }

        if(listSunshine[i] < bestTime.sunshine) continue
        if(listSunshine[i] > bestTime.sunshine) {
            bestTime = {time: data.time[i], rain: listRainTimes[i], snow: listSnowfall[i], temp: listTempTimes[i], sunshine: listSunshine[i] }
            continue;
        }
    }
    
    return bestTime
}

const defaultDuration = 1

export async function getBestTime(longitude: string, latitude: string, time: string, duration: string) {
    try {
        const params = new URLSearchParams({
            latitude,
            longitude,
            minutely_15: 'temperature_2m,rain,snowfall,sunshine_duration',
            forecast_minutely_15: (Number(time) * 4 + Number(duration) + defaultDuration).toString(),
            timezone: "auto",
        });

        const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            },
        })

        const data = await response.json()
        
        console.log(data)
        if(!data.minutely_15) return 'No data'
        
        return calcBestTime(data.minutely_15, duration)
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