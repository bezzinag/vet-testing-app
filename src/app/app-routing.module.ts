import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { ViewTestsComponent } from './components/view-tests/view-tests.component';
import { TestDetailsComponent } from './components/test-details/test-details.component';
import { AddTestComponent } from './components/add-test/add-test.component';
import { UpdateTestComponent } from './components/update-test/update-test.component';

import { AuthGuard } from './guards/auth.guard'; 

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'tests',
    component: ViewTestsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tests/:id',
    component: TestDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-test',
    component: AddTestComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'update-test/:id',
    component: UpdateTestComponent,
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
