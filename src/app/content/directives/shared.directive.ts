import { NgModule } from "@angular/core";
import { PlaceholderPipe } from "../pipe/placeholder.pipe";
import { SafePipe } from "../pipe/safe.pipe";
import { modalDirective } from "./modal";

@NgModule({
    declarations:[
        modalDirective,
        SafePipe,
        PlaceholderPipe
    ],
    exports : [
        modalDirective,
        SafePipe,
        PlaceholderPipe
    ]
})
export class SharedDirective { }