export interface EpicData {
  identifier: string;
  caption: string;
  image: string;
  version: string;
  centroid_coordinates: Coordinates;
  dscovr_j2000_position: Point;
  lunar_j2000_position: Point;
  sun_j2000_position: Point;
  attitude_quaternions: Quaternions;
  date: string;
  coords: {
    centroid_coordinates: Coordinates;
    dscovr_j2000_position: Point;
    lunar_j2000_position: Point;
    sun_j2000_position: Point;
    attitude_quaternions: Quaternions;
  };
}

export interface Point {
  x: number;
  y: number;
  z: number;
}

export interface Quaternions {
  q0: number;
  q1: number;
  q2: number;
  q3: number;
}

export interface Coordinates {
  lat: number;
  lon: number;
}

