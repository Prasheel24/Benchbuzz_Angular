import {Directive} from "@angular/core";
import {NG_VALIDATORS, Validator, FormControl} from "@angular/forms";
import { Conditional } from "@angular/compiler";
import { FileDetector } from "selenium-webdriver/remote";

@Directive({
    selector: "[requireFile]",
    providers: [
        { provide: NG_VALIDATORS, useExisting: FileValidator, multi: true },
    ]
})
export class FileValidator implements Validator {
    static condition1: boolean = false;
    static validate(c: FormControl): {[key: string]: any} {
        
        var condition = c.value == null || c.value.length == 0 ;
        //console.log(c.value.type );
         if(c.value[0]!= undefined){
        var fileInput:File =c.value[0];
        //console.log(fileInput.type=='application/pdf');
        FileValidator.condition1= fileInput.type=='application/pdf';
         }    
        // console.log(condition);
         //console.log(FileValidator.condition1);
        return condition || !FileValidator.condition1 ? { "required" : true} : null;
    }

    validate(c: FormControl): {[key: string]: any} {
      return FileValidator.validate(c);
    }

}