import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const swUrl = '/ngsw-worker.js'; 
    navigator.serviceWorker.register(swUrl).then((registration) => {
      console.log('Service Worker registrado con el alcance:', registration.scope);
      registration.addEventListener('updatefound', () => {
        const installingWorker = registration.installing;
        if (installingWorker) {
          installingWorker.addEventListener('statechange', () => {
            switch (installingWorker.state) {
              case 'installed':
                if (navigator.serviceWorker.controller) {
                  console.log('Nueva versión de Service Worker disponible. Actualizando...');
                  installingWorker.postMessage({ action: 'skipWaiting' });
                } else {
                  console.log('Service Worker instalado por primera vez.');
                }
                break;
              case 'activating':
                console.log('Service Worker activando');
                break;
              case 'activated':
                console.log('Service Worker activado. Página recargada para aplicar nuevos cambios.');
                window.location.reload();
                break;
              case 'redundant':
                console.log('Service Worker redundante');
                break;
              default:
                console.log('Estado del Service Worker:', installingWorker.state);
            }
          });
        }
      });
    }).catch((error) => {
      console.error('Error al registrar el Service Worker:', error);
    });
  });
}
