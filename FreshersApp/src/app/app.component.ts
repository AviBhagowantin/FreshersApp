import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { filter } from "rxjs/operators";
import * as app from "tns-core-modules/application";
var appSettings = require('application-settings');
var firebase = require('nativescript-plugin-firebase');
import * as dialogs from "tns-core-modules/ui/dialogs";


@Component({
    moduleId: module.id,
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {
    private _activatedUrl: string;
    private _sideDrawerTransition: DrawerTransitionBase;
    public email;
    public username;

    constructor(private router: Router, private routerExtensions: RouterExtensions) {
        // Use the component constructor to inject services.
    }

    ngOnInit(): void {
        firebase.init({
            showNotifications: true,
            showNotificationsWhenInForeground: true,
            onMessageReceivedCallback: (message) => {
                console.log(`Title: ${message.title}`);
                console.log(`Body: ${message.body}`);
                // if (message.foreground==true)
                // {
                //     dialogs.alert({
                //         title: message.title,
                //         message: message.body,
                //         okButtonText: "Okay"
                //     }).then(() => {
                //         console.log("Dialog closed!");
                //     });
                // }
                // if your server passed a custom property called 'foo', then do this:
                //console.log(`Value of 'foo': ${message.data.foo}`);
              },
            onAuthStateChanged: function(data) { // optional but useful to immediately re-logon the user when he re-visits your app
              console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");
              if (data.loggedIn) {
                this.email=data.user.email;
                firebase.query(result => {
                    //console.log("query result:", JSON.stringify(result));
                    this.username="Hello "+result.value.FirstName+" "+result.value.LastName;
                    }, "/User", {
                    orderBy: {
                        type: firebase.QueryOrderByType.CHILD,
                        value: 'Email'
                    },
                    ranges: [
                        {
                        type: firebase.QueryRangeType.START_AT,
                        value: data.user.email
                        },
                        {
                        type: firebase.QueryRangeType.END_AT,
                        value: data.user.email
                        }
                    ]
                })
                console.log("user's email address: " + (data.user.email ? data.user.email : "N/A"));
                appSettings.setBoolean("authenticated", true);
                console.log(appSettings.getBoolean("authenticated"));
              }
              if (!data.loggedIn) {
                this.username="Hello";
                this.email="Not logged in.";
                appSettings.setBoolean("authenticated", false);
                console.log(appSettings.getBoolean("authenticated"));
              }
              console.log(this.username);
              console.log(this.email);
            }.bind(this)
        });

        firebase.subscribeToTopic("news").then(() => console.log("Subscribed to topic"));

        this._activatedUrl = "/home";
        this._sideDrawerTransition = new SlideInOnTopTransition();

        this.router.events
        .pipe(filter((event: any) => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects);
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    isComponentSelected(url: string): boolean {
        return this._activatedUrl === url;
    }

    onNavItemTap(navItemRoute: string): void {
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            }
        });

        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }

    checkAuthFeedback(): void {
        if (appSettings.getBoolean("authenticated") == false) 
        {
            dialogs.alert({
                title: "Login Needed",
                message: "Please login to leave a feedback.",
                okButtonText: "OK, got it"
              })
        }
        if (appSettings.getBoolean("authenticated") == true) 
        {
            this.routerExtensions.navigate(["/feedback"], {
                transition: {
                    name: "fade"
                }
            });

            const sideDrawer = <RadSideDrawer>app.getRootView();
            sideDrawer.closeDrawer();
        }
    }

    checkAuthSettings(): void {
        var admin;
        if (appSettings.getBoolean("authenticated") == false) 
        {
            dialogs.alert({
                title: "Login Needed",
                message: "Please login to edit settings.",
                okButtonText: "OK, got it"
              })
        }
        if (appSettings.getBoolean("authenticated") == true) 
        {
            firebase.getCurrentUser()
            .then(
                function(user) {
                    //console.log(user);
                    admin=user.email;
                    //console.log(admin);
                    firebase.query(result => {
                        //console.log("query result:", JSON.stringify(result));
                        if (result.value==null)
                        {
                            firebase.query(result => {
                                //console.log("query result:", JSON.stringify(result));
                                if (result.value==null)
                                {
                                    //console.log("Go settings");
                                    this.routerExtensions.navigate(["/settings"], {
                                        transition: {
                                            name: "fade"
                                        }
                                    });
                                }
                                else
                                {
                                    console.log("Go CafeAdmin");
                                }
                                },"/cafeadmin",
                                {
                                    singleEvent: true,
                                    orderBy: {
                                        type: firebase.QueryOrderByType.CHILD,
                                        value: 'Email' 
                                    },
                                    ranges: [
                                      {
                                          type: firebase.QueryRangeType.START_AT,
                                          value: admin
                                      },
                                      {
                                          type: firebase.QueryRangeType.END_AT,
                                          value: admin
                                      }
                                    ],
                                    limit: {
                                        type: firebase.QueryLimitType.LAST,
                                        value: 1
                                    }
                                }
                            );
                        }
                        else
                        {
                            //console.log("Go Admin");
                            this.routerExtensions.navigate(["/admin"], {
                                transition: {
                                    name: "fade"
                                }
                            });
                        }
                        },"/admin",
                        {
                            singleEvent: true,
                            orderBy: {
                                type: firebase.QueryOrderByType.CHILD,
                                value: 'Email' 
                            },
                            ranges: [
                              {
                                  type: firebase.QueryRangeType.START_AT,
                                  value: admin
                              },
                              {
                                  type: firebase.QueryRangeType.END_AT,
                                  value: admin
                              }
                            ],
                            limit: {
                                type: firebase.QueryLimitType.LAST,
                                value: 1
                            }
                        }
                    );
                }.bind(this)
            )
            .catch(error => console.log("Trouble in paradise: " + error));

            const sideDrawer = <RadSideDrawer>app.getRootView();
            sideDrawer.closeDrawer();
        }
    }

    checkAuth(): boolean {
        return appSettings.getBoolean("authenticated");
    }

    checkLogin(): void {
        var route : string;
        if (appSettings.getBoolean("authenticated") == false) 
        {
            route="/login";
        }
        if (appSettings.getBoolean("authenticated") == true) 
        {
            firebase.logout();
            appSettings.setBoolean("authenticated", false);
            route="/home";
        }

        this.routerExtensions.navigate([route], {
            transition: {
                name: "fade"
            }
        });

        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }
}
