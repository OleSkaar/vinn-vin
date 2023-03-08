export interface Coordinates {
    x: number;
    y: number;
}

export interface Participant {
    name: string;
    tickets: number;
}

export interface SectorData {
    participant: Participant;
    startAngle: number;
    endAngle: number;
}