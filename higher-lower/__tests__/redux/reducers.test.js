import * as reducers from "../../redux/reducers";

it("All reducers returns state by default", () => {
    Object.keys(reducers).forEach(reducerKey => {
        if(reducerKey !== "default" && typeof reducers[reducerKey] === "function"){
            expect(reducers[reducerKey]("__foo__", "__bar__")).toBe("__foo__");
        }
    });
});