export interface EarthData {
  date: string;
  id: string;
  resource: {
    dataset: string;
    planet: string;
  };
  service_version: string;
  url: string;
}
