const thead = document.querySelectorAll('.aui thead').item(1);
const tbody = document.querySelectorAll('.aui tbody').item(1);
const theadHeaderCells = Array.from(thead.querySelectorAll('th[title]'));

theadHeaderCells.forEach(setClickableTh);
parseToHoursMinutes();

const defaultColor = '#7a869a';
const activeColor = 'rgb(221, 0, 0)';

function setClickableTh(el, index) {

    el.style.cursor = 'pointer';
    el.onclick = () => {

        if (el.style.color === activeColor) {
            el.style.color = defaultColor;
            removeRowBlur();
            return;
        }

        theadHeaderCells.forEach(i => {
            i.style.color = defaultColor;
        });
        el.style.color = activeColor;

        sortByDate(index);
    }
}

function removeRowBlur() {
    const rows = getBodyRows();
    rows.forEach(i => i.style.opacity = '1')
}

function sortByDate(thIndex) {
    const rows = getBodyRows();
    rows.pop();
    const valueRowIndex = getCorrespondingBodyCell(thIndex);

    const headRows = [];
    const tailRows = [];

    for (let row of rows) {
        const cellForCheck = row.querySelectorAll('td').item(valueRowIndex);
        const textContent = cellForCheck.textContent.trim();
        if (textContent) {
            row.style.opacity = '1';
            headRows.push(row);

        } else {
            row.style.opacity = '.2';
            tailRows.push(row);
        }
        tbody.removeChild(row);
    }

    tbody.prepend(...headRows, ...tailRows);
}

function parseToHoursMinutes() {
    const rows = getBodyRows();
    rows.forEach(row => {
        const cells = Array.from(row.querySelectorAll('td'));
        cells.forEach(cell => {
            const textContent = cell.textContent.trim();
            if (/(\d+)(\.\d{1,3})h/.test(textContent)) {
                cell.textContent = cell.textContent.replace(/(\d+)(\.\d{1,3})h/, ($1, $2, $3) =>
                    `${$2}h ${Math.trunc($3 * 60)}m`);
            }
        })
    })

}

function getBodyRows() {
    return Array.from(tbody.querySelectorAll('tr'));
}

function getCorrespondingBodyCell(thIndex) {
    return thIndex + 5;
}
