export class Book {
  constructor(
    public id: number,
    public title: string,
    public author: string,
    public publicationYear: number,
    public genre: string,
    public isbn: string,
    public publisher: string,
    public pageCount: number,
    public language: string,
    public summary: string,
    public coverImage: string,
    public rating: number,
    public publishedDate: Date,
    public keywords: string[],
    public price: number,
    public isAvailable: boolean,
    public discountPrice?: number
  ) {
  }
}
