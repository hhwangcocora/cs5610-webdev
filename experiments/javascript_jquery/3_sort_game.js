$(function() {
    $('#numbers').sortable({
        axis: 'x',
        stop: function(event, ui){
            // check if the list has been sorted correctly
            var numbers = $('#numbers li')

            var prevNumber
            var sorted = true
            for (var i = 0; i < numbers.length; i++) {
                var currentNumber = numbers[i].innerText
                if (i == 0) {
                    prevNumber = currentNumber
                } else {
                    if (prevNumber <= currentNumber) {
                        prevNumber = currentNumber
                    } else {
                        sorted = false
                        break;
                    }
                }
            }
            if (sorted) {
                console.log('success')
                numbers.addClass('newClass', 1000)
            }
        }
    })
});