import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slick-nav',
  templateUrl: './slick-nav.component.html',
  styleUrls: ['./slick-nav.component.scss'],
})
export class SlickNavComponent implements OnInit, AfterViewInit {
  @Input() time: string;
  @Input() type: string;
  slideConfig = {
    vertical: true,
    infinite: true,
    arrows: false,
    slidesToShow: 4,
    centerMode: false,
    focusOnSelect: true,
    verticalSwiping: true,
    swipeToSlide: true,
  };

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    $('.carousel').each(function () {
      const com = this as any;
      com.slick.getSlideCount = function () {
        // tslint:disable
        let _ = this,
          slidesTraversed,
          swipedSlide,
          centerOffset;

        centerOffset =
          _.options.centerMode === true
            ? _.slideWidth * Math.floor(_.options.slidesToShow / 2)
            : 0;

        if (_.options.swipeToSlide === true) {
          // tslint:disable-next-line:only-arrow-functions
          _.$slideTrack.find('.slick-slide').each(function (index, slide) {
            // tslint:disable-next-line:one-variable-per-declaration
            let offsetPoint = slide.offsetLeft,
              outerSize = $(slide).outerWidth();

            if (_.options.vertical === true) {
              offsetPoint = slide.offsetTop;
              outerSize = $(slide).outerHeight();
            }
            if (offsetPoint - centerOffset + outerSize / 2 > _.swipeLeft * -1) {
              swipedSlide = slide;
              return false;
            }
          });
          slidesTraversed =
            Math.abs(
              +$(swipedSlide).attr('data-slick-index') - _.currentSlide
            ) || 1;

          return slidesTraversed;
        } else {
          return _.options.slidesToScroll;
        }
      };

      com.slick.getNavigableIndexes = function () {
        // tslint:disable
        let _ = this,
          breakPoint = 0,
          counter = 0,
          // tslint:disable-next-line:prefer-const
          indexes = [],
          max;

        if (_.options.infinite === false) {
          max = _.slideCount;
        } else {
          breakPoint = _.options.slideCount * -1;
          counter = _.options.slideCount * -1;
          max = _.slideCount * 2;
        }

        while (breakPoint < max) {
          indexes.push(breakPoint);
          breakPoint = counter + _.options.slidesToScroll;
          counter +=
            _.options.slidesToScroll <= _.options.slidesToShow
              ? _.options.slidesToScroll
              : _.options.slidesToShow;
        }

        return indexes;
      };
    });
  }

  ngOnInit(): void {}

  afterChange(event: any) {
    switch (event.currentSlide % 4) {
      case 0: // artist
        this.router.navigate(['/home', this.time, 'artist']);
        break;
      case 1: // track
        this.router.navigate(['/home', this.time, 'track']);
        break;
      case 2: // album
        this.router.navigate(['/home', this.time, 'album']);
        break;
      case 3: // genre
        this.router.navigate(['/home', this.time, 'genre']);
        break;
    }
  }

  slickInit(event: any) {
    switch (this.type) {
      case 'artist':
        event.slick.slickGoTo(0);
        break;
      case 'track':
        event.slick.slickGoTo(1);
        break;
      case 'album':
        event.slick.slickGoTo(2);
        break;
      case 'genre':
        event.slick.slickGoTo(3);
        break;
    }
  }
}
