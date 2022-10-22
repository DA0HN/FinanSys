import { NgModule } from '@angular/core';
import { AppComponent } from '@finan$ys/app.component';
import { AppRoutingModule } from '@finan$ys/app-routing.module';
import { CoreModule } from '@finan$ys/core/core.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    CoreModule,
  ],
  providers: [],
  bootstrap: [ AppComponent ],
})
export class AppModule {
}
