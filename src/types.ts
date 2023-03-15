export interface Coordinates {
    x: number;
    y: number;
}

export interface Participant {
    id: number;
    name: string;
    tickets: number;
    firstTicketIndex: number;
}

export interface SectorData {
    participant: Participant;
    startAngle: number;
    endAngle: number;
    ticketAngles: number[];
}