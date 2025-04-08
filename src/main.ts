import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app.module';
import { enableDebugTools } from '@angular/platform-browser';
import { environment } from './app/environment';
import { ApplicationRef } from '@angular/core';

platformBrowser()
  .bootstrapModule(AppModule, {
    ngZoneEventCoalescing: true,
  })
  .then(moduleRef => {
    if (!environment.production) {
      const appRef = moduleRef.injector.get(ApplicationRef); // Get ApplicationRef
      const componentRef = appRef.components[0]; // Get the root component's ComponentRef
      enableDebugTools(componentRef); // Pass the correct ComponentRef
    }
  })
  .catch(err => console.error(err));
