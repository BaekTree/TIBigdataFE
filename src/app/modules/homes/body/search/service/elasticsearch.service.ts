import { Injectable } from '@angular/core';
import { Client } from 'elasticsearch-browser';
import * as elasticsearch from 'elasticsearch-browser'
//import { InheritDefinitionFeature } from '@angular/core/src/render3';
import { ArticleSource} from '../querytest/article.interface';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ElasticsearchService {

  private client: Client;
  private ES_URL : string ='http://203.252.103.86:8080';
  private TEST_INDEX = ".monitoring-es-7-2020.01.31";
  // private results: ArticleSource[];
  private articleSource = new Subject<ArticleSource[]>();
  articleInfo$ = this.articleSource.asObservable();
  private searchKeyword: string;

  getResult(info: ArticleSource[]){
    return this.articleSource.next(info);
  }

  setKeyword(keyword){
    this.searchKeyword = keyword;
  }

  getKeyword(){
    return this.searchKeyword;
  }

  private queryalldocs = {
    'query': {
      'match_all': {}
    }
  }

  constructor() {
    if(!this.client){
      this._connect();
    }
   }

   getAllDocument(_index, _type): any{
     return this.client.search({

       body: this.queryalldocs,
       filterPath: ['hits.hits._source']
     });
   }


  fullTextSearch(_field, _queryText): any {
    return this.client.search({
      index : this.TEST_INDEX,
      filterPath: ['hits.hits._source','hits.hits._id', 'hits.total', '_scroll_id'],
      // body: {
      //   'query' : {
      //     'match_phrase_prefix': {
      //       [_field]: _queryText,
      //     }
      //   }
      // },
      '_source': ['post_title','post_date','published_institution_url','post_writer', 'post_body']
    })
  }
  // fullTextSearch original version
  /**
   fullTextSearch(_index, _type, _field, _queryText): any {
     return this.client.search({
 
       filterPath: ['hits.hits._source', 'hits.total', '_scroll_id'],
       body: {
         'query' : {
           'match_phrase_prefix': {
             [_field]: _queryText,
           }
         }
       },
       '_source': ['post_title','post_date','published_institution_url','post_writer', 'post_body']
     })
   }
  */

   //Elasticsearch Connection

   private _connect(){
     this.client = new elasticsearch.Client({
       host: this.ES_URL,
       log: 'trace'
     });
   }

   isAvailable(): any{
     return this.client.ping({
       requestTimeout: Infinity,
       body: 'ES is available'
     });
   }
}
