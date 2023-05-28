import DateFormat from "../app/helpers/components/DateFormat";

describe("Tests Date formatter", () => {
    test("Date to be in US format", () => {
        expect(DateFormat.formatToUS(new Date("2023-05-28 00:00"))).toBe("2023-05-28");
    });
});