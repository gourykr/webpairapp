import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FhomePage } from './fhome';

@NgModule({
  declarations: [
    FhomePage,
  ],
  imports: [
    IonicPageModule.forChild(FhomePage),
  ],
})
export class FhomePageModule {}
