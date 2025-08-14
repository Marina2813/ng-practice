import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePost } from './create-post';

describe('CreatePost', () => {
  let component: CreatePost;
  let fixture: ComponentFixture<CreatePost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatePost]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePost);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
