import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login.components';

const routes: Routes = [
    { path: 'login', component: LoginComponent }
];

export const LoginRoutes = RouterModule.forChild(routes);
