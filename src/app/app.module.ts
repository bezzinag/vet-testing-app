import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ViewTestsComponent } from './components/view-tests/view-tests.component';
import { TestDetailsComponent } from './components/test-details/test-details.component';
import { AddTestComponent } from './components/add-test/add-test.component';
import { UpdateTestComponent } from './components/update-test/update-test.component';
import { HeaderComponent } from './layout/header/header.component';

// Pipes
import { VirusStatusPipe } from './pipes/virus-status.pipe';

// Interceptors
import { AuthInterceptor } from './auth.interceptor';

@NgModule(
  {
    declarations: 
    [
      AppComponent,
      LoginComponent,
      ViewTestsComponent,
      TestDetailsComponent,
      AddTestComponent,
      UpdateTestComponent,
      HeaderComponent,
      VirusStatusPipe
    ],

    imports: 
    [
      BrowserModule,
      AppRoutingModule,
      ReactiveFormsModule,
      HttpClientModule
    ],
    
    providers: 
    [{
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true //  Allows stacking multiple interceptors
    }],

    bootstrap: [AppComponent]
  } 
)

export class AppModule { }
