$(function() {

    let requests = [];

    function updateData() {

        $.ajax({
            url: gitlabInstance + "/merge_requests?state=opened&scope=all&order_by=updated_at",
            headers: {
                'PRIVATE-TOKEN': gitlabToken
            }
        })
        .done(function (data) {

            requests = [];

            data.forEach(function (request) {
                requests.push(request);
            });

            updateTable();

        });

    }

    function updateTable() {

        $('tbody tr:not(#lineTemplate)').remove();

        requests.forEach(function (request) {

            let updateDate = moment(request.updated_at);

            $('#lineTemplate td.lastUpdate').html(updateDate.fromNow());
            $('#lineTemplate a.title')
                .attr('href', request.web_url)
                .html(request.title);
            $('#lineTemplate td.avatar img')
                .attr('src', request.author.avatar_url)
                .attr('alt', request.author.name);
            $('#lineTemplate span.sourceBranch').html(request.source_branch);
            $('#lineTemplate span.targetBranch').html(request.target_branch);
            $('#lineTemplate span.upvotes').html(request.upvotes);
            $('#lineTemplate span.downvotes').html(request.downvotes);

            let $newLine = $('#lineTemplate').clone();

            $newLine.removeAttr('id');
            $newLine.removeClass('d-none');

            $newLine.appendTo($('tbody'));

        });

    }
    
    updateData();

    window.setTimeout('updateData()', secondsToRefresh * 1000);

});