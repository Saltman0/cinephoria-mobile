import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './components/app/app.component';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { appConfig } from "./components/app/app.config";

defineCustomElements(window);

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
