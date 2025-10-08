export const rotateIndex = (index: number, steps: number, limit: number) => {
    steps %= limit;
    steps += limit;
    return (index + steps) % limit;
};
