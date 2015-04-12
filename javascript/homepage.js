
$(document).ready(function() {
    $('#homePage').fadeIn(500).show().siblings().hide();
    //$('.accordion .accordion-title').addClass('active');
    //$('.accordion .accordion-content').slideDown(300).addClass('open');
    var handleNav = function(e, ele) {
        var currentAttrValue = ele.attr('href');

        // Show/Hide Tabs
        $(currentAttrValue).fadeIn(500).show().siblings().hide();


        e.preventDefault();
    }
    $('#navigation a').on('click', function(e)  {
        handleNav(e, $(this))

        // Change/remove current tab to active
        $(this).addClass('active').siblings().removeClass('active');
    })
    $('#projectSite').on('click', function(e) {
        handleNav(e, $(this))
        $('#project-tab').addClass('active').siblings().removeClass('active');
    })

    $('.accordion-title').click(function(e) {
        var currentAttrValue = $(this).attr('href');
        if ($(e.target).is('.active')) {
            $(this).removeClass('active');
            $(this).text($(this).text().replace("▽", "▷"))
            $('.accordion ' + currentAttrValue).slideUp(300).removeClass('open');
        } else {
            $(this).addClass('active');
            $(this).text($(this).text().replace("▷", "▽"))
            $('.accordion ' + currentAttrValue).slideDown(300).addClass('open');
        }
        e.preventDefault();
    })
});