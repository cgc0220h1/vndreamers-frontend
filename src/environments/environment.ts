// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiSource: 'https://vndreamers-dev.herokuapp.com',
  firebaseConfig : {
    apiKey: 'AIzaSyCwKcQqWyLdSwNL9wdjJJ1OdQ5UjLXWd0Y',
    authDomain: 'vndreamer-fontend.firebaseapp.com',
    databaseURL: 'https://vndreamer-fontend.firebaseio.com',
    projectId: 'vndreamer-fontend',
    storageBucket: 'vndreamer-fontend.appspot.com',
    messagingSenderId: '971529387658',
    appId: '1:971529387658:web:d8ee4c923003ff1fb53773',
    measurementId: 'G-SJFGQCF71D'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
