document.getElementById('btn-anexar').addEventListener('click', function() {
    document.getElementById('documento').click();
});

document.getElementById('documento').addEventListener('change', function() {
    const fileName = this.files[0] ? this.files[0].name : '';
    document.getElementById('file-chosen').textContent = fileName;
});