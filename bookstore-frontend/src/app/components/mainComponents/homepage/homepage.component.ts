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
    // this.firstClone = this.items.get(0)?.nativeElement.cloneNode(true);
    // console.log(this.firstClone);
    // this.lastClone = this.items.get(this.totalItems - 1)?.nativeElement.cloneNode(true);
    // console.log(this.lastClone);
    this.firstClone = this.el.nativeElement.querySelectorAll('.carousel-element')[0]
    // this.lastClone = this.el.nativeElement.querySelectorAll('.carousel-items')[this.totalItems - 1].cloneNode(true);
    // this.carouselWrapper.appendChild(this.firstClone);
    // this.carouselWrapper.nativeElement.insertAdjacentElement('afterbegin', this.lastClone);
    // this.carouselWrapper.nativeElement.appendChild(this.lastClone);
    // this.carouselWrapper.insertBefore(this.lastClone, this.el.nativeElement.querySelectorAll('.carousel-items')[0]);

    // Genişliği ayarlama
    this.carouselWrapper.style.width = `calc(100% * ${this.totalItems + 2})`;
  }
  ngOnInit(): void {
    // Kaydırma fonksiyonları

    this.array = [];
  }
  // @ViewChildren('carouselitems') items!: QueryList<ElementRef>;
  // @ViewChild('carouselwrapper') carouselWrapper!: ElementRef;
  // @ViewChild('nextBtn') nextBtn!: ElementRef;
  // @ViewChild('prevBtn') nextBtn!: ElementRef;
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
    //const carouselWrapper = document.querySelector(".carousel-wrapper");
    //const items = document.querySelectorAll(".carousel-items");
    this.moveCarousel("next", this.currentIndexRef, this.totalItems);

    // Başlangıç konumunu ayarla
    this.updateCarousel(this.currentIndexRef, 1);
    console.log("next");

  }
  carouselPrev() {
    this.moveCarousel("prev", this.currentIndexRef, this.totalItems);
    // this.updateCarousel(this.currentIndex, 1);
    console.log("prev");

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

  // updateCarousel2 = (currentIndex: number) => {
  //   this.carouselWrapper.nativeElement.style.transform = `translateX(${currentIndex * itemWidthPercentage
  //     }%)`;
  // }

  moveCarousel = (direction: string, currentIndexRef: { currentIndex: number }, totalItems: number) => {
    const maxIndex = totalItems - 1; // Maksimum index (son kopyalanmış öğe)
    this.array.push(direction);
    if (direction === "next") {
      // var flag = 1;
      if (currentIndexRef.currentIndex == 0) {
        currentIndexRef.currentIndex = 7;
        // flag = 0;
      }
      if (currentIndexRef.currentIndex == 4) {
        currentIndexRef.currentIndex = -1;
        // flag = 0;
      }
      if (currentIndexRef.currentIndex < -1) {
        currentIndexRef.currentIndex *= -1;
      }
      currentIndexRef.currentIndex++;
      if (currentIndexRef.currentIndex < 0) {
        currentIndexRef.currentIndex *= -1;
      }
      if (currentIndexRef.currentIndex >= maxIndex - 1) {
        currentIndexRef.currentIndex = 1; // Başlangıç konumu
      }

      if (this.array.length > 1) {
        if (this.array[this.array.length - 2] == "prev") {
          this.updateCarousel(this.currentIndexRef, 2);
        }
      }
      this.updateCarousel(this.currentIndexRef, 1);
      requestAnimationFrame(() => {
        this.carouselWrapper.style.transition = "transform 0.5s ease"; // Animasyon tekrar açık
      });
    } else if (direction === "prev") {
      currentIndexRef.currentIndex--;
      if (currentIndexRef.currentIndex < 0) {
        currentIndexRef.currentIndex += 5;
      }
      //carouselWrapper.style.transition = "none"; // Geçici animasyon kapalı
      if (this.array.length > 1) {
        if (this.array[this.array.length - 2] == "next") {
          this.updateCarousel(this.currentIndexRef, 2);
        }
      }
      this.updateCarousel(this.currentIndexRef, 1);
      //currentIndex *= -1;
      requestAnimationFrame(() => {
        this.carouselWrapper.transition = "transform 0.5s ease"; // Animasyon tekrar açık
      });
    }
  }
}
