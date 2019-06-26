import * as loader from '/lib/js/utils/template_loader.js'

$(() => {
    // Automatically inject footer in pages
    loader.append('body', '/components/footer/footer.html', 'footer');
});