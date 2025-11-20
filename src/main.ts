import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { authInterceptor } from './app/core/interceptors/auth.interceptor';
import { appReducers } from './app/core/store/app.reducers';
import { AuthEffects } from './app/auth/store/auth.effects';
import { TodoEffects } from './app/todos/store/todo.effects';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(routes),
    provideStore(appReducers),
    provideEffects([AuthEffects, TodoEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false
    })
  ]
}).catch(err => console.error(err));

