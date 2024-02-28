$(function(){  
    const player = $('<audio controls autoplay>').appendTo('body');  
    const musicListAPI = 'http://home.softeem.xin:8088/music/listAll';  
    let musics = [];  
    let currentIndex = 0;   
    $('.btn-list').on('click', function(){  
        $('#music-list-dialog').fadeIn(1000);    
        generateMusicList();  
    });  
  
    $('#btn-close').click(function(){  
        $('#music-list-dialog').fadeOut(1000);  
    });   
    $.get(musicListAPI, function(data){  
        musics = data;  
        generateMusicList();  
    });   
    $('#music-list').on('click', 'li', function(){
        $('#music-list li').removeClass('highlight'); 
        $(this).addClass('highlight');    
        currentIndex = $(this).data('index');   
        const m = musics[currentIndex];    
        player.prop('src', m.path);    
        updateDisplayName(m.name);  
        player.trigger('play');  
    });  
    function updateDisplayName(name1){  
        $('#current-music-name').text(name1);  
    }  
    function generateMusicList(){  
        $('#music-list').empty();  
        $.each(musics, function(i, e){   
            $('#music-list').append(`<li data-index="${i}"class="highlightable">${e.name}</li>`);  
        });  
    }
    const playPauseBtn = $('.btn-play-pause');
    const coverImg = $('.cover-img');   
    player.on('play', function() {  
        playPauseBtn.find('i').removeClass('fa-play').addClass('fa-pause');
        coverImg.css('animation-play-state', 'running');    
    });   
    player.on('pause', function() {    
        playPauseBtn.find('i').removeClass('fa-pause').addClass('fa-play');
        coverImg.css('animation-play-state', 'paused');    
    });    
    playPauseBtn.on('click', function() {  
        if (player[0].paused) {  
            player.trigger('play');
            coverImg.css('animation-play-state', 'running');    
        } else {   
            player.trigger('pause'); 
            coverImg.css('animation-play-state', 'paused');   
        }  
    });    
});




    
