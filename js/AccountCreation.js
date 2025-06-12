document.getElementById('btn-annex').addEventListener('click', function() {
    document.getElementById('input-file').click();
});

document.getElementById('input-file').addEventListener('change', function() {
    const fileName = this.files[0] ? this.files[0].name : '';
    document.getElementById('file-chosen').textContent = fileName;
});