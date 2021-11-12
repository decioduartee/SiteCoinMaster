var table = document.querySelector('#contagem-usuarios'),
rows = table.getElementsByTagName('tr'),
text = 'textContent' in document ? 'textContent' : 'innerText';

for (var i = 0, ii = 1, len = rows.length; i < len; i++, ii++){
    rows[i].children[0][text] = ii;
}