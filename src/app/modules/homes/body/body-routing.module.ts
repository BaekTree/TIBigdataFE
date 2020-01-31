import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { HomeListContainerComponent } from './home-list-container/home-list-container.component';

import { QuerytestComponent } from './search/querytest/querytest.component';

// import { FlaskComponent } from './containers/flask/flask.component';
import { SearchResultComponent } from './search/search-result/search-result.component';
import { AnalysisComponent } from './search/search-result/analysis/analysis.component';
import { WordcloudComponent } from './search/search-result/wordcloud/wordcloud.component';
import { MainContainerComponent } from './main-container/main-container.component'

const routes: Routes = [
    { path: '',
      component: MainContainerComponent,
      outlet : 'main'
    },
    // {
    //     path: 'library',
    //     component: HomeListContainerComponent,
        
    // },

    {
      path:'querytest',
            component: QuerytestComponent
    },

    // {
    //   path:'flask',
    //         component: FlaskComponent
    // },
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

