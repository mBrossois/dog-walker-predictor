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