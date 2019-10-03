$(function() {

    joypixels.emojiSize = 64;

    let requests = [];
    let currentPage = 0;

    function updateData() {

        requests = [];

        instances.forEach(function (instance) {
            $.ajax({
                url: instance['server'] + "/merge_requests?state=opened&scope=all&order_by=updated_at",
                headers: {
                    'PRIVATE-TOKEN': instance['token']
                },
                async: false
            })
            .done(function (data) {

                data.forEach(function (request) {
                    requests.push({request: request, server: instance['server'], token: instance['token']});
                });

            });
        });

        sortRequests();
    }

    function changePage() {

        updateData();

        currentPage++;

        if (currentPage * itemsByPage >= requests.length) {
            currentPage = 0;
        }

        $('#pages .current').html(currentPage + 1);
        $('#pages .total').html(Math.ceil(requests.length / itemsByPage));

        updateTable(getRequestsPage());
    }

    function sortRequests() {
        requests = requests.sort(function (a, b) {
            return a.request.updated_at < b.request.updated_at;
        });
    }

    function updateTable(requestsPage) {

        $('#requests div:not(#lineTemplate)').remove();

        requestsPage.forEach(function (request) {

            let updateDate = moment(request.request.updated_at);
            let votes = request.request.upvotes - request.request.downvotes;

            $('#lineTemplate').attr('data-id', request.request.id);
            $('#lineTemplate .lastUpdate').html(updateDate.fromNow());
            $('#lineTemplate h2').html(joypixels.shortnameToImage(request.request.title.replace(new RegExp('WIP\ ?:'), '')));
            $('#lineTemplate .author').html(request.request.author.name);

            let $newLine = $('#lineTemplate').clone();

            $newLine.removeAttr('id');
            $newLine.css('display', 'block');

            $newLine.css('borderRightColor', '#222');

            if (votes < 0) {
                $newLine.addClass('downvoted');
            }

            if (votes > 0) {
                $newLine.addClass('upvoted');
            }

            if (request.request.title.toLowerCase().includes('wip')) {
                $newLine.addClass('wip');
            }

            $newLine.appendTo($('#requests'));

            uptadeProjectInformations(request);

        });

    }

    function uptadeProjectInformations(request) {

        $.ajax({
            url: request.server + "/projects/" + request.request.project_id,
            headers: {
                'PRIVATE-TOKEN': request.token
            }
        })
        .done(function (project) {

            let $project = $('div[data-id="' + request.request.id + '"] .project');

            $project.html(project.name);

        });

    }

    function getRequestsPage() {
        return requests.slice(currentPage * itemsByPage, currentPage * itemsByPage + itemsByPage);
    }

    changePage();

    setInterval(changePage, secondsToChangePage * 1000);
});
