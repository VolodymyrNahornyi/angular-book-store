import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Book} from "../../model/book.model";
import {RecentBookComponent} from "./recent-book/recent-book.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-recent-book-list',
  standalone: true,
  imports: [
    RecentBookComponent,
    NgForOf
  ],
  templateUrl: './recent-book-list.component.html',
  styleUrl: './recent-book-list.component.css'
})
export class RecentBookListComponent implements OnInit {

  recentBooks: Book[] = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      publicationYear: 1925,
      genre: "Fiction",
      isbn: "978-0743273565",
      publisher: "Charles Scribner's Sons",
      pageCount: 180,
      language: "English",
      summary: "A novel set in the Jazz Age that tells the story of Jay Gatsby's unrequited love for Daisy Buchanan.",
      coverImage: "https://m.media-amazon.com/images/I/71nNFtlHxHL._SL1500_.jpg",
      rating: 4.5,
      publishedDate: new Date("1925-04-10"),
      keywords: ["classic", "American literature", "Jazz Age", "tragedy"],
      price: 20.99,
      discountPrice: 14.99,
      isAvailable: true
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      publicationYear: 1960,
      genre: "Fiction",
      isbn: "978-0060935467",
      publisher: "J.B. Lippincott & Co.",
      pageCount: 281,
      language: "English",
      summary: "A novel about the serious issues of rape and racial inequality.",
      coverImage: "https://marketplace.canva.com/EAF2FK6OWRM/2/0/752w/canva-brown-and-blue-wizard-fantasy-novel-book-cover-BylerPQ7Ne8.png",
      rating: 4.8,
      publishedDate: new Date("1960-07-11"),
      keywords: ["classic", "American literature", "civil rights", "coming-of-age"],
      price: 18.59,
      isAvailable: true
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      publicationYear: 1949,
      genre: "Dystopian Fiction",
      isbn: "978-0451524935",
      publisher: "Secker & Warburg",
      pageCount: 328,
      language: "English",
      summary: "A dystopian novel set in a totalitarian society ruled by Big Brother.",
      coverImage: "https://marketplace.canva.com/EAFZc43RODQ/1/0/1003w/canva-aesthetic-minimalist-photo-collage-love-story-book-cover-hTYG_lxFolQ.jpg",
      rating: 4.7,
      publishedDate: new Date("1949-06-08"),
      keywords: ["dystopia", "political fiction", "totalitarianism"],
      price: 32.99,
      isAvailable: false
    },
    {
      id: 4,
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      publicationYear: 1951,
      genre: "Fiction",
      isbn: "978-0316769488",
      publisher: "Little, Brown and Company",
      pageCount: 277,
      language: "English",
      summary: "A story about teenage alienation and loss of innocence in post-war America.",
      coverImage: "https://marketplace.canva.com/EAFfSnGl7II/2/0/1003w/canva-elegant-dark-woods-fantasy-photo-book-cover-vAt8PH1CmqQ.jpg",
      rating: 4.0,
      publishedDate: new Date("1951-07-16"),
      keywords: ["coming-of-age", "classic", "American literature"],
      price: 12.99,
      discountPrice: 7.99,
      isAvailable: false
    }
  ];
  sortedRecentBooks: Book[] = [];

  @Output()
  selectedBookEvent: EventEmitter<Book> = new EventEmitter<Book>();

  selectedBook!: Book;

  ngOnInit(): void {
    this.sortedRecentBooks = this.recentBooks
      .sort((a, b) => b.publishedDate.getTime() - a.publishedDate.getTime())
      .slice(0, 4);
  }

  onSelectedBook(book: Book) {
    this.selectedBook = book;
    this.selectedBookEvent.emit(this.selectedBook);
  }
}
