export async function getCities() {
  
  // const city = 'india';
  // const API_KEY = 'a24d0389c1a23b6ef8e229a01263f13c'
  
  const res = await fetch(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=99`);
  
  const data = res.json();
  console.log("retun",data);
  return data;
 
}

