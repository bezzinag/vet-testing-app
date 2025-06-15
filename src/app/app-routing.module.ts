import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { ViewTestsComponent } from './components/view-tests/view-tests.component';
import { TestDetailsComponent } from './components/test-details/test-details.component';
import { AddTestComponent } from './components/add-test/add-test.component';
import { UpdateTestComponent } from './components/update-test/update-test.component';

import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  // All roles can view tests
  {
    path: 'tests',
    component: ViewTestsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: ['ROLE_ADMIN', 'ROLE_CLERK', 'ROLE_VET'] }
  },
  {
    path: 'tests/:id',
    component: TestDetailsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: ['ROLE_ADMIN', 'ROLE_CLERK', 'ROLE_VET'] }
  },

  // Only VET can add tests
  {
    path: 'add-test',
    component: AddTestComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: ['ROLE_VET'] }
  },

  // Only ADMIN and CLERK can update tests
  {
    path: 'update-test/:id',
    component: UpdateTestComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: ['ROLE_ADMIN', 'ROLE_CLERK'] }
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
