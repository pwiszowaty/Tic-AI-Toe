import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { GameComponent } from './app/GameComponent';
if (process.env.ENV === 'production') {
  enableProdMode();
}
bootstrap(GameComponent, []);
