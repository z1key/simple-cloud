$(function () {
    $('#fileupload').fileupload({

        url: '/upload',
        type: 'PUT',

        done: function (e, data) {
            $("tr:has(td)").remove();
            $.each(data.result, function (index, file) {

                $("#uploaded-files").append(
                    $('<tr/>')
                        .append($('<td/>').text(file.fileName))
                        .append($('<td/>').text(file.fileSize))
                        .append($('<td/>').text(file.fileType))
                        .append($('<td/>').html("<a href='rest/controller/get/"+index+"'>Click</a>"))
                )//end $("#uploaded-files").append()
            });
        },

        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#progress .bar').css(
                'width',
                progress + '%'
            );
        },

        dropZone: $('#dropzone')
    });
    $(document).bind('drop dragover', function (e) {
        e.preventDefault();
    });
});
$(document).bind('dragover', function (e) {
    var dropZone = $('#dropzone');
    dropZone.addClass('in');
    var hoveredDropZone = $(e.target).closest(dropZone);
    dropZone.toggleClass('hover', hoveredDropZone.length);
    dropZone.removeClass('in hover');
});