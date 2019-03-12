import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http,HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http'

import { RouterModule, Routes } from '@angular/router';
import { CommonModule,APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';  
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { DialogComponent } from './dialog/dialog.component';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UserComponent } from './user/user.component';
import { MainPageComponent } from './mainpage/mainpage.component';
import { PageNotFoundComponent } from './Others/page-not-found/page-not-found.component';
import { ServerDownPageComponent } from './Others/server-down-page/server-down-page.component';
import { NoAccessPageComponent } from './Others/no-access-page/no-access-page.component';
import { FindAnAssignmentSllListComponent } from './AssignmentDetails//find-an-assignment-sll-list.component';
import { DetailDescriptionRrdComponent } from './AssignmentDetails/detail-description-rrd.component';
import { CustomizedJobSearchComponent } from './customised-job-search/customised-job-search.component';
import { ApplicationStatusComponent } from './application-status/application-status.component';
import { MyFavouritesComponent } from './my-favourites/my-favourites.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { FaqComponent } from './faq/faq.component';
import { SearchResultComponent } from './customised-job-search/search-result.component';

import { AttendanceFAQComponent } from './faq/attendanceFAQ.component';
import { CrowdSourcingFAQComponent } from './faq/crowdSourcing.component';
import { GuidelinesFAQComponent } from './faq/guidelinesFAQ.component';
import { LeadDetailsFAQComponent } from './faq/leadDetailsFAQ.component';
import { MySchedulingFAQComponent } from './faq/mySchedulingFAQ.component';
import { UpdateContactFAQComponent } from './faq/updateContactFAQ.component';
import { UpdatePrefLocationFAQComponent } from './faq/updatePrefLocationFAQ';


 import { UserService } from './user/user.service';
 import { CommonService} from './customised-job-search/common.service';
 import { FindAnAssignmentSllListService } from './AssignmentDetails/find-an-assignment-sll-list.service';
 import { DetailDescriptionRRDService } from './AssignmentDetails/detail-description-rrd.service';
import { UpdateProfileService } from './update-profile/update-profile.service';


import { FilterPipe } from './filter.pipe';

import {FileValueAccessor} from './Others/file-control-value-accessor'
import {FileValidator} from './Others/file-input-validator'

import { CookieService } from 'ngx-cookie-service';

import { UpdateProfileNewComponent } from './update-profile-new/update-profile-new.component';

import { DatePipe } from '@angular/common'

import { MyDatePickerModule } from 'mydatepicker';

import { JwtModule } from '@auth0/angular-jwt';

import { Adal4Service, Adal4HTTPService } from 'adal-angular4';
import { ChatbotComponent } from './chatbot/chatbot.component';   
import { ChatModule } from '@progress/kendo-angular-conversational-ui';
import { ChatService } from './chatbot/chat.service';   

export function tokenGetter() {
  return localStorage.getItem('access_token');
}
 const appRoutes: Routes = [
  { path: 'login', component: UserComponent},   
  { path: 'user', component: UserComponent},
  { path: 'update', component: UpdateProfileComponent },
  { path: 'updateNew', component: UpdateProfileNewComponent },
  { path: 'mainpage', component: MainPageComponent },
  { path: 'noaccess', component: NoAccessPageComponent },
  { path: 'serverDown', component: ServerDownPageComponent },
  { path: 'applicationStatus', component: ApplicationStatusComponent },
  { path: 'myfavs', component: MyFavouritesComponent },
  { path: 'findAnAssignmentSllListComponent', component: FindAnAssignmentSllListComponent },
  { path: 'faq', component: FaqComponent },         
  { path: 'search', component: SearchResultComponent },
  { path: 'detailDescriptionRRD', component: DetailDescriptionRrdComponent },
  { path: 'customizedJobSearch', component: CustomizedJobSearchComponent },    
  
  { path: 'updateContact', component: UpdateContactFAQComponent },
  { path: 'udpatePrefLocation', component: UpdatePrefLocationFAQComponent },
  { path: 'myScheduling', component: MySchedulingFAQComponent },
  { path: 'leadDetails', component: LeadDetailsFAQComponent },
  { path: 'attendance', component: AttendanceFAQComponent },
  { path: 'crowdSourcing', component: CrowdSourcingFAQComponent },
  { path: 'guidelines', component: GuidelinesFAQComponent },
  { path: 'chatbot', component: ChatbotComponent },
  { path:'access_token', redirectTo:'/login',pathMatch:'full'},
  {path:'', redirectTo: '/login', pathMatch: 'full'},  
  { path: '**', component: PageNotFoundComponent }
 ]

 @NgModule({
  imports: [
    BrowserModule, 
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    CommonModule,
    FormsModule, 
    ReactiveFormsModule, 
    RouterModule.forRoot(appRoutes, { useHash: true }),
    AngularMultiSelectModule,
    MyDatePickerModule,
    ChatModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:9090'],
        blacklistedRoutes: ['localhost:9090/auth/']
      }
    })
  ],
  declarations: [
      DialogComponent,
      HeaderComponent,
      AppComponent,
      FooterComponent,
      UserComponent,
      MainPageComponent,
      FindAnAssignmentSllListComponent,
      CustomizedJobSearchComponent,
      ApplicationStatusComponent,
      MyFavouritesComponent,
      UpdateProfileComponent,
      SearchResultComponent,
      DetailDescriptionRrdComponent,
      FaqComponent,
      AttendanceFAQComponent,
      CrowdSourcingFAQComponent,
      GuidelinesFAQComponent,
      LeadDetailsFAQComponent,
      MySchedulingFAQComponent,
      UpdateContactFAQComponent,
      UpdatePrefLocationFAQComponent,

      ServerDownPageComponent,
      NoAccessPageComponent,
       PageNotFoundComponent,
       LoginComponent,
       FilterPipe,
       FileValueAccessor,
       FileValidator,
       UpdateProfileNewComponent,
       ChatbotComponent],
  bootstrap: [AppComponent],
  providers: [
    Adal4Service,                                                      
    {                                                                   
      provide: Adal4HTTPService,                                        
      useFactory: Adal4HTTPService.factory,                             
      deps: [Http, Adal4Service]                                        
    },
    CookieService,
    UserService,
    CommonService,
    ChatService,
    FileValueAccessor,
    UpdateProfileService,
    FindAnAssignmentSllListService, 
    DetailDescriptionRRDService,
  DatePipe]
})
export class AppModule { }
