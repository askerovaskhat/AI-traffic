
export enum ViewMode {
  OVERVIEW = 'OVERVIEW',
  PEDESTRIAN = 'PEDESTRIAN',
  TRAFFIC = 'TRAFFIC',
  ANALYTICS = 'ANALYTICS'
}

export type Language = 'en' | 'ru' | 'kk';

export interface SmartPoint {
  id: string;
  lat: number;
  lng: number;
  type: 'traffic-light' | 'sensor' | 'bus-stop';
  status: 'normal' | 'optimized' | 'alert';
  value?: number;
}

export interface RouteStep {
  instruction: string;
  reason: string;
  environmentalBenefit: string;
}

export interface NavigationResult {
  route: RouteStep[];
  totalQuietness: number;
  greeneryIndex: number;
  airQuality: string;
}
