import { NgModule } from "@angular/core";
import { modalDirective } from "./modal";

@NgModule({
    declarations:[
        modalDirective
    ],
    exports : [
        modalDirective
    ]
})
export class SharedDirective { }