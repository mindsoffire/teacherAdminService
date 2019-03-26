import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingSearchNewsComponent } from './landing-search-news/landing-search-news.component';
import { FeaturedNewsComponent } from './landing-search-news/featured-news/featured-news.component';
import { ListComponent } from './landing-search-news/list/list.component';
import { DetailsComponent } from './landing-search-news/details/details.component';
import { PluginComponent } from './plugin/plugin.component';
import { AgentKycComponent } from './plugin/agent-kyc/agent-kyc.component';

const routes: Routes = [
  { path: '', redirectTo: 'featured-news', pathMatch: 'full' },
  { path: 'featured-news', component: FeaturedNewsComponent },
  { path: 'list', component: ListComponent },
  { path: 'list/:listId/:usrCode', component: DetailsComponent },
  { path: 'details', component: DetailsComponent },
  { path: 'plugin', component: PluginComponent },
  { path: 'plugin/:email', component: PluginComponent },
  { path: 'agent-kyc', component: AgentKycComponent },
  { path: '**', redirectTo: 'featured-news', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routedComponents = [
  LandingSearchNewsComponent, FeaturedNewsComponent, ListComponent, DetailsComponent,
  PluginComponent, AgentKycComponent
]
