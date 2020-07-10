import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { setupCourses } from '../common/setup-test-data';
import { CoursesModule } from '../courses.module';
import { CoursesCardListComponent } from './courses-card-list.component';

describe('CourseCardListComponent', () => {

    let component: CoursesCardListComponent;
    let fixture: ComponentFixture<CoursesCardListComponent>;
    let el: DebugElement;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                imports: [CoursesModule]
            })
                .compileComponents()
                .then(() => {
                    fixture = TestBed.createComponent(CoursesCardListComponent);
                    component = fixture.componentInstance;
                    el = fixture.debugElement;
                });
        })
    );

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should display the course list', () => {
        component.courses = setupCourses();

        fixture.detectChanges();

        const cards = el.queryAll(By.css('.course-card'));

        expect(cards).toBeTruthy('Could not find cards');
        expect(cards.length).toBe(12, 'Unexpected number of courses');
    });

    it('should display the first course', () => {
        component.courses = setupCourses();

        fixture.detectChanges();

        const course = component.courses[0];
        const card = el.query(By.css('.course-card:first-child'));
        expect(card).toBeTruthy('Could not find course card');

        const title = card.query(By.css('mat-card-title'));
        expect(title.nativeElement.textContent).toBe(course.titles.description);

        const image = card.query(By.css('img'));
        expect(image.nativeElement.src).toBe(course.iconUrl);
    });
});
