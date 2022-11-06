
/**
 * Shuffles array in-place using Fisher-Yates (Knuth)
 * 
 * @param list the list/array to shuffle
 * @returns the shuffles array (same reference as input)
 */
export const shuffle = <K>(list: K[]): K[] => {
    let currentIndex = list.length;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
        // Pick a remaining element.
        const randomIndex = Math.floor(Math.random() * currentIndex--);
        
        // And swap it with the current element.
        [list[currentIndex], list[randomIndex]] = [list[randomIndex], list[currentIndex]];
    }

    return list;
}


/**
 * Highly unoptimised randomised list of upto maxSize elements
 * 
 * @param list the input list
 * @param maxSize the maximum number of elements to slice (defaults to all)
 * @returns a new list with upto maxSize in randized order
 */
export const randomizeList = <K>(list: K[], maxSize?: number): K[] => {
    const copy = shuffle(Array.from(list));
    
    if (maxSize === undefined || maxSize > copy.length) {
        maxSize = copy.length;
    }

    return copy.slice(0, maxSize);
}