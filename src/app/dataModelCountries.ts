export class DataModelCountries {
    constructor(
        public country: string,
        public totalConfirmed: number,
        public totalDeaths: number,
        public totalRecovered: number,
        public totalActive: number
    )  {}

}