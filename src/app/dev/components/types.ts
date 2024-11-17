import { ElementType } from 'react';

export interface PackageInfo {
  name: string;
  version: string;
  description: string;
  docs?: string;
}

export interface BackendSection {
  title: string;
  icon: ElementType;
  packages: PackageInfo[];
}

export interface APIEndpoint {
  path: string;
  method: string;
  description: string;
  parameters?: {
    name: string;
    type: string;
    required: boolean;
    description: string;
  }[];
  response?: {
    type: string;
    example: any;
  };
}