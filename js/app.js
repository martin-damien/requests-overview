$(function() {

    let favicon = new Favico({
        animation : 'popFade'
    });

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

            favicon.badge(requests.length);

            updateTable();

        });

    }

    function updateTable() {

        $('tbody tr:not(#lineTemplate)').remove();

        requests.forEach(function (request) {

            let updateDate = moment(request.updated_at);
            let votes = request.upvotes - request.downvotes;

            $('#lineTemplate').attr('data-id', request.id);
            $('#lineTemplate .lastUpdate').html(updateDate.fromNow());
            $('#lineTemplate a.title')
                .attr('href', request.web_url)
                .html(request.title);
            $('#lineTemplate .avatar img')
                .attr('src', request.author.avatar_url)
                .attr('alt', request.author.name);

            let $newLine = $('#lineTemplate').clone();

            $newLine.removeAttr('id');
            $newLine.removeClass('d-none');

            if (votes < 0) {
                $newLine.addClass('bg-danger');
            }

            if (votes > 0) {
                $newLine.addClass('bg-success');
            }

            $newLine.appendTo($('tbody'));

            uptadeProjectInformations(request.id, request.project_id);

        });

    }

    function uptadeProjectInformations(id, project_id) {

        $.ajax({
            url: gitlabInstance + "/projects/" + project_id,
            headers: {
                'PRIVATE-TOKEN': gitlabToken
            }
        })
        .done(function (project) {

            let $project = $('tr[data-id="' + id + '"] .project');

            $project.html(project.name);
            $project.attr('href', project.web_url);

        });

    }
    
    updateData();

    setInterval(updateData, secondsToRefresh * 1000);

});