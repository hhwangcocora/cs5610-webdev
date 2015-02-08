
function sendRequest(query) {
    var url = "http://en.wikipedia.org/w/api.php?action=query&format=json&callback=test&prop=info&limit=500&titles=" + encodeURIComponent(query);
    jQuery.ajax({
        "async": true,
        "url": url,
        "dataType": 'jsonp',
        "method": "GET",
        "error": function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus + ': ' + errorThrown);
        },
        "success": function (data, textStatus, jqXHR) {
            var pages = data.query.pages
            for (page in pages) {
                jQuery.ajax({
                    "async": true,
                    "url": "http://en.wikipedia.org/w/api.php?action=query&format=json&callback=test&prop=info&inprop=url&pageids=" + page,
                    "dataType": 'jsonp',
                    "method": "GET",
                    "error": function (jqXHR, textStatus, errorThrown) {
                        console.log(textStatus + ': ' + errorThrown);
                    },
                    "success": function (data, textStatus, jqXHR) {

                        for (page in data.query.pages) {
                            var url = data.query.pages[page]['fullurl']
                            var newLink = $('<a></a>')
                            newLink.attr('href', url)
                            newLink.attr('target', '_blank')
                            newLink.html(url)
                            $('#result').append(newLink)
                        }

                        if (data.Error || data.Response) {
                            exists = 0;
                        }
                    }
                })
            }

            if (data.Error || data.Response) {
                exists = 0;
            }
        }
    });

}


function startQuery(ele) {
    var queryStr = $('#query')[0].value
    if (queryStr.length > 0) {

        $('#result').empty()
        sendRequest(queryStr)
    }
}