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

        $('#requests div:not(#lineTemplate)').remove();

        requests.forEach(function (request) {

            let updateDate = moment(request.updated_at);
            let votes = request.upvotes - request.downvotes;

            $('#lineTemplate').attr('data-id', request.id);
            $('#lineTemplate .lastUpdate').html(updateDate.fromNow());
            $('#lineTemplate h2').html(request.title);
            $('#lineTemplate .author').html(request.author.name);

            let $newLine = $('#lineTemplate').clone();

            $newLine.removeAttr('id');
            $newLine.css('display', 'block');

            $newLine.css('borderRightColor', '#222');

            if (votes < 0) {
                $newLine.css('borderRightColor', '#dc3545');
            }

            if (votes > 0) {
                $newLine.css('borderRightColor', '#28a745');
            }

            $newLine.appendTo($('#requests'));

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

                let $project = $('div[data-id="' + id + '"] .project');

                $project.html(project.name);

            });

    }

    updateData();

    setInterval(updateData, secondsToRefresh * 1000);

});