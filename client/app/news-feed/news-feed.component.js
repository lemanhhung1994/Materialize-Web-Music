;(function (app) {
    "use strict";
        app.component('newsFeed', {
            controller  : NewsFeedController,
            controllerAs: 'newsFeed',
            templateUrl : 'app/news-feed/news-feed.html'
        });

    NewsFeedController.$inject = ['Pubnub', '$scope', 'newFeedService'];

    function NewsFeedController(Pubnub, $scope, newFeedService) {
        var newsFeed = this;
        newsFeed.message = 'love';
        newsFeed.categories = [
            {
                name: 'Top',
                value: 1
            },
            {
                name: 'FUN',
                value: 2
            },
            {
                name: 'Love',
                value: 3
            }
        ];

        newsFeed.listNewsFeed = newFeedService.getNewFeed();

        newsFeed.category = newsFeed.categories[0];
        newsFeed.chooseCategory = function (category) {
            newsFeed.category = category;
        };

        newsFeed.postNewsFeed = function () {
            Pubnub.publish({
                channel: 'hello_world',
                message : newsFeed.message,
                triggerEvents: true
            })
        };


        Pubnub.subscribe({
            channel: 'hello_world',
            triggerEvents: ['message', 'connect'],
            callback: function (message) {
                console.log(message);
                newsFeed.message = message;
                $scope.$apply();
            }
        });
    }
})(angular.module('emPlusApp'));