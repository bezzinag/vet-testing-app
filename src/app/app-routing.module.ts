import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ViewTestsComponent } from './components/view-tests/view-tests.component';
import { TestDetailsComponent } from './components/test-details/test-details.component';
import { AddTestComponent } from './components/add-test/add-test.component';
import { UpdateTestComponent } from './components/update-test/update-test.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'tests', component: ViewTestsComponent },
  { path: 'tests/:id', component: TestDetailsComponent },
  { path: 'add-test', component: AddTestComponent },
  { path: 'update-test/:id', component: UpdateTestComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
