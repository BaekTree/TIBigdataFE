
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeListContainerComponent } from './home-list-container/home-list-container.component';

import { QuerytestComponent } from './body/search/querytest/querytest.component';

import { FlaskComponent } from './containers/flask/flask.component';
import { SearchResultComponent } from './body/search/search-result/search-result.component';
import { AnalysisComponent } from './body/search/search-result/analysis/analysis.component';
import { WordcloudComponent } from './body/search/search-result/wordcloud/wordcloud.component';

const routes: Routes = [
    { path: '',
      component: HomeListContainerComponent,
    },
    {
        path: 'library',
        component: HomeListContainerComponent,
        
    },

    {
      path:'querytest',
            component: QuerytestComponent
    },

    {
      path:'flask',
            component: FlaskComponent
    },
    {
      path:'searchResult',
            component: SearchResultComponent
    },
    {
      path:'analysis',
        component: AnalysisComponent
    },
    {
      path:'wordcloud',
        component: WordcloudComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomesRoutingModule { }
