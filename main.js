const aCT = new AutoCompleteTrie()

const words = ['the', 'their', 'this', 'that', 'they', 'there', 'does', 'did', 'do']
words.forEach(w => aCT.addWord(w))

$('#search').keyup(event => {
    const word = $('#search').val()
    const result = aCT.predictWord(word)
    const source = $("#autoComplete-template").html();
    const template = Handlebars.compile(source);
    const newHTML = template({ result });
    $("#autoComplete").empty()
    $("#autoComplete").append(newHTML);
})

$('#autoComplete').on('click', '.autoClass', function(){
    const word = $(this).data().content;
    console.log(word);
    $('#search').val(word)
})

