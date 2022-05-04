let tag = {
    dataArr: [],
    init: function() {
        this.changeStyle();
        this.createTag();
        this.deleteTag();
    },
    changeStyle: function() {
        $('#tagInput').focus(function() {
            $('.tag-wrapper').css('border-color', '#321aba');
        })

        $('#tagInput').blur(function() {
            $('.tag-wrapper').css('border-color', '#d3d3d3');
        })

        $('.tag-wrapper').on('click', function() {
            $('#tagInput').focus();
        })
    },
    createTag: function() {
        $('.tag-wrapper').on('keydown', function(e) {
            let tagElem = $('#tagInput');
            let tagVal = tagElem.val();
            let excessMsg = $('.tag-excess-noti').length;

            if ( e.keyCode === 13 && tagVal !== '' && tag.dataArr.length <= 4 ) {
                for ( let i = 0; i < tag.dataArr.length; i++ ) {
                    if ( tagVal === tag.dataArr[i] ) {
                        tagElem.val('');
                        return false;
                    }
                }

                $('#tagInput').before(`<div class="tag-item">${tagVal}</div>`);
                tag.dataArr.push(tagVal);
                tagElem.val('');
            } else if ( tag.dataArr.length > 4 && excessMsg === 0 ) {
                $('.tag-noti').hide();
                $('.tag-container').append(`<p class='tag-excess-noti'>태그는 최대 5개만 입력 가능합니다.</p>`);
            }
        })
    },
    deleteTag: function() {
        $('.tag-wrapper').on('keydown', function(e) {
            if ( e.keyCode === 8 && $('#tagInput').val() === '' && tag.dataArr.length <= 5 ) {
                tag.dataArr.pop();
                $('.tag-item:last').remove();
                $('.tag-excess-noti').remove();
                $('.tag-noti').show();
            }
        })

        $(document).on('click', '.tag-item', function(e) {
            let tagValue = $(e.target).text();

            tag.dataArr = tag.dataArr.filter((item) => item !== tagValue);
            $(this).remove();
            $('#tagInput').val('');

            if ( tag.dataArr.length < 5 ) {
                $('.tag-excess-noti').remove();
                $('.tag-noti').show();
            }
        })
    }
}

tag.init();