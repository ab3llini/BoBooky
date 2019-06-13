import * as loader from '/lib/js/utils/template_loader.js'

export let append_rating = (container, rating) => {
    return loader.append_map(container, '/components/review/rating/rating.html', undefined, (o) => {
        o.find('.rating-icon').each(function(i) {
            if (i + 1 <= rating) {
                $(this).addClass('fa-bookmark')
            }
            else {
                $(this).addClass('fa-bookmark-o')
            }
        })
    }, true)
};