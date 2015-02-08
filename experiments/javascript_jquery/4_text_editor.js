articles = {
    'Sample article': ['This is a sample article. Click to edit...'],
    'Another Sample article': ['This is another sample article. Click to edit...']

}

currentArticle = 'Sample article'


function getIdFromTitle(title) {
    return title.replace(/ /g, "_")
}

function getTitleFromId(id) {
    return id.replace(/_/g, " ")
}

function switchArtile(ele) {
    var newArticle = $(ele)[0]
    currentArticle = getTitleFromId(newArticle.id)
    loadArticle(currentArticle)
}

function loadArticle(title) {
    if (articles.hasOwnProperty(title)) {
        // load article to editable field
        $('#articleField').empty()
        for (i in articles[title]) {
            var p = $('<p></p>')
            p.html(articles[title][i])
            $('#articleField').append(p)
        }
        // highlight article title
        $('.activeArticle').removeClass('activeArticle')
        $('#' + getIdFromTitle(title)).addClass('activeArticle')
    }
}

function loadTitles() {
    $('#fileList').empty()
    var titleArr = Object.keys(articles)
    for (i in titleArr) {
        var li = $('<li class="myTitle" onmouseup="switchArtile(this)"></li>')
        li.attr('id', getIdFromTitle(titleArr[i]))
        var a = $('<a href="#"></a>')
        a.html(titleArr[i])
        li.append(a)
        $('#fileList').append(li)
    }
}

function saveFile(ele) {
    var contents = $($('#articleField')[0].innerHTML)
    console.log(contents)
    articles[currentArticle] = []
    var arrElement = articles[currentArticle]
    for (var i = 0;  i<contents.length; i++) {
        arrElement.push(contents[i].innerText)
    }
    saveToStorage()
}

function saveToStorage() {
    localStorage.setItem('files', JSON.stringify(articles))
}

function loadFromStorage() {
    articles = JSON.parse(localStorage.getItem('files'))
}

function createFile(ele) {
    var newTitle = 'New File'
    for (var i = 0; i < 100; i++) {
        if (!articles.hasOwnProperty(newTitle + ' ' + i)) {
            newTitle = newTitle + ' ' + i
            break;
        }
    }
    articles[newTitle] = ['Start editing...']

    loadTitles()
    loadArticle(newTitle)
}

$(function(){

    // load from local storage if any
    if (localStorage.getItem('files')) {
        loadFromStorage()
    }

    loadTitles()
    loadArticle(currentArticle)

})