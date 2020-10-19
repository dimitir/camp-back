

function filterByTerm(inputArr, searchTerm) {
    const regex = new RegExp(searchTerm, "i");
    return inputArr.filter(function (arrayElement) {
        return arrayElement.url.match(regex);
    });
}



describe('Filter test', () => {
    test('it should filter by a search term(link)', () => {
        const input = [
            { id: 1, url: "https://www.url1.dev" },
            { id: 2, url: "https://www.url2.dev" },
            { id: 3, url: "https://www.link3.dev" }
        ];

        const output = [{ id: 1, url: "https://www.url1.dev" }];

        expect(filterByTerm(input, "url")).toContainEqual(output[0]);
        // expect(filterByTerm(input, "LINK")).toEqual(output); // New test
    })
})



