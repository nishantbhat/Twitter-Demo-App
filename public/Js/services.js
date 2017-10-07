


/********************************************************************************************************************/
/** *****************************************************************************************************************/
/**                                                                                                                **/
/**                                                                                                                **/
/** style Page                                                                                                     **/
/**                                                                                                                **/
/** Author: Nishant Bhat                                                                                           **/
/**                                                                                                                **/
/** Date of creation : 06-10-2017                                                                                  **/
/**                                                                                                                **/
/** Purpose:  Creating Service To Authorise the user login , session handling ,Tweets fetching                     **/
/**                                                                                                                **/
/** Details:                                                                                                       **/
/**       login page user authentication And Tweets List fetching from the twitter are Written here.               **/
/**                                                                                                                *                                                                                                              **/
/**                                                                                                                **/
/** ABC company CONFIDENTIAL                                                                                       **/
/** ______________________________________________________________________________________________________________ **/
/**                                                                                                                **/
/**  [2012] - [2017] ABC company                                                                                   **/
/**  All Rights Reserved.                                                                                          **/
/**                                                                                                                **/
/** NOTICE:  All information contained herein is, and remains                                                      **/
/** the property of ABC company  and its suppliers,                                                                **/
/** if any.  The intellectual and technical concepts contained                                                     **/
/** herein are proprietary to ABC company                                                                          **/
/** and its suppliers and may be covered by U.S. and Foreign Patents,                                              **/
/** patents in process, and are protected by trade secret or copyright law.                                        **/
/** Dissemination of this information or reproduction of this material                                             **/
/** is strictly forbidden unless prior written permission is obtained                                              **/
/** from ABC company.                                                                                              **/
/**                                                                                                                **/
/********************************************************************************************************************/
/******************************************************************************************************************/







angular.module('twitterApp.services', [])
    

    .factory('twitterService', function($q) {

    var authorizationResult = false;

    return {
        initialize: function() {
            //initialize OAuth.io with public key of the application
            OAuth.initialize('e6u0TKccWPGCnAqheXQYg76Vf2M', {cache:true});
            //try to create an authorization result when the page loads, this means a returning user won't have to click the twitter button again
            authorizationResult = OAuth.create('twitter');
        },
        isReady: function() {
            return (authorizationResult);
        },
        connectTwitter: function() {
            var deferred = $q.defer();
            OAuth.popup('twitter', {cache:true}, function(error, result) { //cache means to execute the callback if the tokens are already present
                if (!error) {
                    authorizationResult = result;
                    deferred.resolve();
                } else {
                    //do something if there's an error
                }
            });
            return deferred.promise;
        },
        clearCache: function() {
            OAuth.clearCache('twitter');
            authorizationResult = false;
        },
        getLatestTweets: function () {
            //create a deferred object using Angular's $q service
            var deferred = $q.defer();
            var promise = authorizationResult.get('/1.1/statuses/home_timeline.json').done(function(data) {
                //https://dev.twitter.com/docs/api/1.1/get/statuses/home_timeline
                //when the data is retrieved resolved the deferred object
                console.log(data)
                deferred.resolve(data)
            });
            //return the promise of the deferred object
            return deferred.promise;
        }
    }
    
});


