import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AppComponent } from './app.component';
import { appReducers } from './core/store/app.reducers';
import { logout } from './auth/store/auth.actions';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([]),
        provideMockStore({
          initialState: {
            auth: {
              user: null,
              token: null,
              isAuthenticated: false,
              loading: false,
              error: null
            },
            todos: {
              todos: [],
              selectedTodo: null,
              loading: false,
              error: null
            }
          }
        })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch logout action when onLogout is called', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.onLogout();
    expect(dispatchSpy).toHaveBeenCalledWith(logout());
  });
});

