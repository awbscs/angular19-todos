import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login.component';
import { login } from '../../store/auth.actions';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule, BrowserAnimationsModule],
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
            }
          }
        })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form initially', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should validate required fields', () => {
    const usernameControl = component.loginForm.get('username');
    const passwordControl = component.loginForm.get('password');

    expect(usernameControl?.hasError('required')).toBeTruthy();
    expect(passwordControl?.hasError('required')).toBeTruthy();
  });

  it('should dispatch login action on valid form submit', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.loginForm.patchValue({
      username: 'testuser',
      password: 'password123'
    });

    component.onSubmit();

    expect(dispatchSpy).toHaveBeenCalledWith(
      login({ credentials: { username: 'testuser', password: 'password123' } })
    );
  });

  it('should not dispatch login action on invalid form submit', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.onSubmit();
    expect(dispatchSpy).not.toHaveBeenCalled();
  });
});

