import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, AfterViewInit {
  constructor(private el: ElementRef) { }
  ngAfterViewInit(): void {
    this.carouselWrapper = this.el.nativeElement.querySelector(".carousel-wrapper");
    this.items = this.el.nativeElement.querySelectorAll('.carousel-element');
    this.nextBtn = this.el.nativeElement.querySelector('#nextBtn');
    this.prevBtn = this.el.nativeElement.querySelector('#prevBtn');
    this.totalItems = this.el.nativeElement.querySelectorAll('.carousel-element').length;
    this.firstClone = this.el.nativeElement.querySelectorAll('.carousel-element')[0]
    this.carouselWrapper.style.width = `calc(100% * ${this.totalItems + 2})`;
  }
  ngOnInit(): void {
    this.array = [];
  }
  currentIndexRef = { currentIndex: 0 };
  array: any;
  totalItems: number = 0;
  firstClone!: object;
  lastClone!: object;
  carouselWrapper: any;
  items: any;
  nextBtn: any;
  prevBtn: any;

  carouselNext() {
    this.moveCarousel("next", this.currentIndexRef, this.totalItems);
    this.updateCarousel(this.currentIndexRef, 1);
  }
  carouselPrev() {
    this.moveCarousel("prev", this.currentIndexRef, this.totalItems);
  }

  updateCarousel = (currentIndexRef: { currentIndex: number }, carouselType: number) => {
    var itemsPerPage: number;
    var itemWidthPercentage: number;
    if ((window.innerWidth >= 768 && window.innerWidth <= 1024) || (window.innerWidth > 1024 && window.innerWidth < 1280)) {
      itemsPerPage = 2;
      itemWidthPercentage = 100 / itemsPerPage;
    } else if (window.innerWidth <= 640 || (window.innerWidth < 768 && window.innerWidth >= 640)) {
      itemsPerPage = 1;
      itemWidthPercentage = 100 / itemsPerPage;
    } else {
      itemsPerPage = 4;
      itemWidthPercentage = 100 / itemsPerPage;
    }
    if (carouselType == 1) {
      this.carouselWrapper.style.transform = `translateX(-${currentIndexRef.currentIndex * itemWidthPercentage
        }%)`;
    } else {
      this.carouselWrapper.style.transform = `translateX(${currentIndexRef.currentIndex * itemWidthPercentage
        }%)`;
    }
  }

  moveCarousel = (direction: string, currentIndexRef: { currentIndex: number }, totalItems: number) => {
    const maxIndex = totalItems - 1; // Maksimum index (son kopyalanmış öğe)
    this.array.push(direction);
    if (direction === "next") {
      if (currentIndexRef.currentIndex == 0) {
        currentIndexRef.currentIndex = 7;
      }
      if (currentIndexRef.currentIndex == 4) {
        currentIndexRef.currentIndex = -1;
      }
      if (currentIndexRef.currentIndex < -1) {
        currentIndexRef.currentIndex *= -1;
      }
      currentIndexRef.currentIndex++;
      if (currentIndexRef.currentIndex < 0) {
        currentIndexRef.currentIndex *= -1;
      }
      if (currentIndexRef.currentIndex >= maxIndex - 1) {
        currentIndexRef.currentIndex = 1;
      }

      if (this.array.length > 1) {
        if (this.array[this.array.length - 2] == "prev") {
          this.updateCarousel(this.currentIndexRef, 2);
        }
      }
      this.updateCarousel(this.currentIndexRef, 1);
      requestAnimationFrame(() => {
        this.carouselWrapper.style.transition = "transform 0.5s ease";
      });
    } else if (direction === "prev") {
      currentIndexRef.currentIndex--;
      if (currentIndexRef.currentIndex < 0) {
        currentIndexRef.currentIndex += 5;
      }
      if (this.array.length > 1) {
        if (this.array[this.array.length - 2] == "next") {
          this.updateCarousel(this.currentIndexRef, 2);
        }
      }
      this.updateCarousel(this.currentIndexRef, 1);
      requestAnimationFrame(() => {
        this.carouselWrapper.transition = "transform 0.5s ease";
      });
    }
  }
}
