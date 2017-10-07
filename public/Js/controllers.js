

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
/** Purpose:  Creating the controller for index page  To Authorise the user login , session handling ,Tweets fetching
/**                                                                                                                **/
/** Details:                                                                                                       **/
/**       login page user authentication And Tweets List fetching from the twitter service function() called from here.
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




//inject the twitterService into the controller
app.controller('TwitterController', function($scope, $q, twitterService) {
   
    $scope.tweets; //array of tweets

    twitterService.initialize();

    //using the OAuth authorization result get the latest 20 tweets from twitter for the user
    $scope.refreshTimeline = function() {
        twitterService.getLatestTweets().then(function(data) {
            $scope.tweets = data;
            $('#pagin').show();
            $scope.filteredTodos = data;
                $scope.currentPage = 1;
                $scope.numPerPage = 6;
                $scope.maxSize = 3;

            $scope.makeTodos = function() {
                $scope.todos = [];
                for (i=1;i<=30;i++) {
                    $scope.todos.push(data[i]);
                }
            };
            $scope.makeTodos();

            $scope.$watch("currentPage + numPerPage", function() {
                var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                    , end = begin + $scope.numPerPage;

                $scope.filteredTodos = $scope.todos.slice(begin, end);
            });

        });
    }

    //Logic for Adding the likes locally without page refresh..

    $scope.upvote=function (data,page) {
        data=data+1;
        // $( '#Like' ).last().addClass( "colorclass" );
        console.log(data);
        console.log(page);
        if(page!=1){
            if(data!=1){
                var item=data-1;
                var value1=page-1;
                var data1=value1*6;
                data1=data1+item;
                console.log(data1);
                $scope.todos[data1].favorite_count=$scope.todos[data1].favorite_count+1;

            }else{
                var value=page-1;
                data=value*6;
                console.log(data);
                $scope.todos[data].favorite_count=$scope.todos[data].favorite_count+1;
            }

        }else{
            console.log(data);
            $scope.todos[data-1].favorite_count=$scope.todos[data-1].favorite_count+1;
        }

    };

    //when the user clicks the connect twitter button, the popup authorization window opens
    $scope.connectButton = function() {
        twitterService.connectTwitter().then(function() {
            if (twitterService.isReady()) {
                //if the authorization is successful, hide the connect button and display the tweets
                $('#connectButton').fadeOut(function(){
                    $('#getTimelineButton, #signOut').fadeIn();
                    $scope.refreshTimeline();
                    $('#login-panel').hide();
                });
            }
        });
    }

    //sign out clears the OAuth cache, the user will have to reauthenticate when returning
    $scope.signOut = function() {
        twitterService.clearCache();
        $('#results').hide();
        $('#getTimelineButton, #signOut').fadeOut(function(){
            $('#connectButton').fadeIn();
            $('#login-panel').fadeIn();
        });
    }

    //if the user is a returning user, hide the sign in button and display the tweets
    if (twitterService.isReady()) {
        $('#connectButton').hide();
        $('#getTimelineButton, #signOut').show();
        $scope.refreshTimeline();
    }

});