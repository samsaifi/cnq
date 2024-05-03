import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AboutComponent } from './components/about/about.component';
import { authGuard } from './guard/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { ViewSnippetComponent } from './components/view-snippet/view-snippet.component';
import { loginGuard } from './guard/login.guard';
import { EditSnippetComponent } from './components/edit-snippet/edit-snippet.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [loginGuard],
    },
    {
        path: 'signup',
        component: SignupComponent,
        canActivate: [loginGuard],
    },
    {
        path: 'about',
        loadComponent: () =>
            import('./components/about/about.component').then(
                (mod) => mod.AboutComponent
            ),
    },
    {
        path: 'create-bin',
        loadComponent: () =>
            import('./components/code-bin/code-bin.component').then(
                (mod) => mod.CodeBinComponent
            ),
        canActivate: [authGuard],
    },
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'snippet/:id',
        component: ViewSnippetComponent,
    },
    {
        path: 'snippet/edit/:id',
        component: EditSnippetComponent,
    },
    {
        path: '**',
        component: NotFoundComponent,
    },
];
