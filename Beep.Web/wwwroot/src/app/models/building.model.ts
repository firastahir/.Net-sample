import { Premise } from './premise.model';

export class Building {
    buildingId: number;
    epmBuildingId: number;
    name: string;
    constructionStatus: string;
    function: string;
    floorArea: number;
    yearBuilt: number;
    addressLine1: string;
    city: string;
    state: string;
    zipCode: string;
    occupancyPercent: string;
    comments: string;
    autoExportOptIn: string;
    totalBuildings: number;
    premiseList: Premise[];
}
