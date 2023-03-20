import type { SectorData, Coordinates } from "../types";

const getCoordinatesOnCircle = (radius: number, angle: number) => {
    return {
        x: radius * Math.sin((Math.PI * 2 * angle) / 360),
        y: radius * Math.cos((Math.PI * 2 * angle) / 360)
    };
};

const line = (coords: Coordinates) => `M 0 0 L ${coords.x} ${coords.y}`;

export const getSectorSvgData = (sector: SectorData, radius: number) => {
    const { startAngle, endAngle } = sector;

    const startCoords = getCoordinatesOnCircle(radius, startAngle);
    const endCoords = getCoordinatesOnCircle(radius, endAngle);
    const largeArcFlag = endAngle - startAngle <= -180 ? 1 : 0;

    const centerAngle = (startAngle + endAngle) / 2;

    return {
        sectorPath: `${line(startCoords)} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endCoords.x} ${endCoords.y} z`,
        centerPath: line(getCoordinatesOnCircle(radius, centerAngle)),
        ticketPaths: sector.ticketAngles.map((angle) => line(getCoordinatesOnCircle(radius, angle))),
    };
};