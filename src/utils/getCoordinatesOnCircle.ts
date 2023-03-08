export const getCoordinatesOnCircle = (radius: number, angle: number) => {
    return {
        x: radius * Math.sin((Math.PI * 2 * angle) / 360),
        y: radius * Math.cos((Math.PI * 2 * angle) / 360)
    };
};