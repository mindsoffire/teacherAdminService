import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LibService } from '../../services/lib.service';

@Component({
  selector: 'app-featured-news',
  templateUrl: './featured-news.component.html',
  styleUrls: ['./featured-news.component.css']
})
export class FeaturedNewsComponent implements OnInit {
  apiKey = '152d1d9e3c7c42baa51b556e94884ec2';
  defaultSource = 'techcrunch';
  main;
  sourceSelector;

  constructor(private router: Router, public tokenSvc: AuthService, public libSvc: LibService) { }
  async ngOnInit() {
    console.log('came here first');
    this.main = document.querySelector('main');
    this.sourceSelector = document.querySelector('#sourceSelector');
    // console.log({ main: this.main, sourceSelector: this.sourceSelector });
    this.updateNews();
    await this.updateSources();
    console.log('inside ngOnInit:', this.sourceSelector.value = this.defaultSource);

    Notification.requestPermission(function (result) {
      if (result === 'granted') {
        navigator.serviceWorker.ready.then(function (registration) {
          registration.showNotification('Vibration Sample', {
            body: 'Buzz! Buzz! ...your food is ready now for collection at the counter...thank you!',
            icon: '/news/fetch-dog.jpg',
            /* vibrate: [200, 100, 200, 100, 200, 100, 200], */
            tag: 'vibration-sample'
          });
        });
      }
      else if (result === 'denied') {

      }
    });

    // (localStorage.getItem('kyc')) ? this.tokenSvc.loggedIn = true : this.tokenSvc.loggedIn = false;

    // if (!this.libSvc.initSearchListOnce) {
    //   this.browseAll();
    //   this.libSvc.initSearchListOnce = true;
    // }

    // if ('serviceWorker' in navigator) {
    //   navigator.serviceWorker.register('news/sw.js')
    //     .then(registration => {
    //       console.log(`ServiceWorker registered on scope:`, registration.scope);
    //       console.log(registration.pushManager.permissionState);
    //       console.log({
    //         registration
    //       });

    //       registration.showNotification('Vibration Sample', {
    //         body: 'Buzz! Buzz! ...your food is ready now for collection at the counter...thank you!',
    //         icon: '/news/fetch-dog.jpg',
    //         /* vibrate: [200, 100, 200, 100, 200, 100, 200], */
    //         tag: 'vibration-sample'
    //       });
    //       registration.getNotifications();
    //       registration.showNotification('Andrew\'s ServiceWorker Cookbook', {
    //         body: 'your food is ready...',
    //       })
    //     })
    //     .catch(err => {
    //       console.log(`ServiceWorker registration failed:`, err);
    //     });
    // }
  }

  public imageSources: string[] = [
    'assets/images/Affinity-at-Serangoon-Singapore-Singapore.jpg',
    'assets/images/Concourse-Skyline-Singapore-Singapore.jpg',
    'assets/images/Margaret-Ville-Alexandra-Commonwealth-Singapore.jpg',
    'assets/images/Sea-Pavilion-Residences-Singapore-Singapore.jpg',
    'assets/images/The-Garden-Residences-Singapore-Singapore.jpg',
  ];

  fallbackjson =
    {
      "articles": [
        {
          "title": "Dog fails to fetch articles, finds ball instead...",
          "url": "",
          "urlToImage": "../../../news/fetch-dog.jpg",
          "description": "Try loading the page again when you're online."
        }
      ]
    };

  browseAll() {
    this.libSvc.browseAllFlag = true;
    this.router.navigate(['/list']);
  }

  showNotification() {
    Notification.requestPermission(function (result) {
      if (result === 'granted') {
        navigator.serviceWorker.ready.then(function (registration) {
          registration.showNotification('Vibration Sample', {
            body: 'Buzz! Buzz! ...your food is ready now for collection at the counter...thank you!',
            icon: '../images/touch/chrome-touch-icon-192x192.png',
            /* vibrate: [200, 100, 200, 100, 200, 100, 200], */
            tag: 'vibration-sample'
          });
        });
      }
      else if (result === 'denied') {

      }
    });
  }

  async updateNews(source = this.defaultSource) {
    const res = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${this.apiKey}`);
    console.log({ updateNews: res, source });
    const json = res.ok == true ? await res.json() : this.fallbackjson;
    console.log({ updateNews: json });
    this.main.innerHTML = json.articles.map(this.createArticle).join('\n');
  }

  async updateSources() {
    const res = await fetch(`https://newsapi.org/v2/sources?apiKey=${this.apiKey}`);
    console.log({ updateSources: res })
    const json = await res.json();
    console.log({ updateSources: json });
    this.sourceSelector.innerHTML = json.sources
      .map(src => `<option value="${src.id}">${src.name}</option>`).join('\n');
  }

  createArticle(article) {
    return `
         <div class="article">
             <a href = "${article.url}" target = "_blank" style="text-decoration: none">
                 <h3><large><strong>${article.title}</strong></large></h3>
                 <img class="article-img" src = "${article.urlToImage}">
                 <p style="margin-top: 2px"><small>${article.description}</small></p>
             </a><hr>
         </div>
         `;
  }

}
